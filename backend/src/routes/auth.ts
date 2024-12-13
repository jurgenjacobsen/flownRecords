import { Router, Request, Response } from "express";
import { body, validationResult } from 'express-validator';

import { UserAuth } from '../utils/userAuth';
import { Users } from '../app';
import passport from "passport";

const router = Router();

router.get('/protected', UserAuth.Authenticate, (req: Request, res: Response) => {
    res.status(200).json({ message: 'Protected route' });
  });
  
router.post('/register', [
body('username').isLength({ min: 4 }).withMessage('Username must be at least 4 characters long'),
body('email').isEmail().withMessage('Invalid email address'),
body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], async (req: Request, res: Response): Promise<any> => {
let errors = validationResult(req);
if(!errors.isEmpty()) return res.status(400).json({ message: errors.array() });

try {
    let userExists = await Users.schema.findOne({ 
    $or: [{ 'data.username': req.body.username }, { 'data.email': req.body.email }]
    });

    if(userExists) return res.status(400).json({ message: 'Email or username already exists' });

    if(req.body.password !== req.body.confirmPassword) return res.status(400).json({ message: 'Passwords do not match' });

    let newUserData = await UserAuth.newUserData({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
    });

    if(!newUserData || "message" in newUserData) return res.status(500).json({ message: newUserData.message || 'Failed to create user' });
    await Users.set(newUserData.userId, newUserData);

    return res.status(200).json({ message: 'User created successfully' });
} catch(e) {
    console.error(e);
    return res.status(500).json({ message: 'Internal server error' });
}
});
  
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: false
}));

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect('/');
    });
});

// Remove on production
router.get('/test', [
    UserAuth.Authenticate,
    UserAuth.hasPermissions(['ADMIN']),
], (req: any, res: any): any => {
    return res.status(200).json({ message: 'Authorized!' });
});

export default router;