import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import multer from 'multer';
import path from 'path';

import { Users } from '../app';
import { fileHandle, Snowflake } from '../utils/dataHandle';
import { UserAuth } from '../utils/userAuth';
import { User } from '../utils/types';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// TEST ROUTE
router.get('/test', (req: Request, res: Response) => {
  res.sendFile('index.html', { root: 'test' });
});

/*  Data upload, parse, validation
    (Data storage and user authentication not implemented yet)
*/
router.post('/upload', upload.single('flightData'), (req: Request, res: Response): any  => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  
  const fileBuffer = req.file.buffer;
  const ext = path.extname(req.file.originalname).toLowerCase().trim();
  const data = fileHandle(ext, fileBuffer);

  if (!data || "message" in data)
  return res.status(400).json({ message: data?.message || 'Invalid file format' });

  return res.status(200).json(data);
});

/*  Fetch user data

*/

router.get('/user/:id', async (req, res): Promise<any> => {
  if(!req.params.id) res.status(400).json({ message: 'Invalid user ID' });

  let user = await Users.fetch(req.params.id);
  if(!user) return res.status(404).json({ message: 'User not found' });
  
  console.log(user);

  return res.status(200).json(user);
});

router.post('/user/:id/edit', (req: Request, res: Response) => {
  if(!req.params.id) res.status(400).json({ message: 'Invalid user ID' });
  res.status(200).json({ message: 'Under construction' });
});

router.post('/user/:id/delete', (req: Request, res: Response) => {
  if(!req.params.id) res.status(400).json({ message: 'Invalid user ID' });
  res.status(200).json({ message: 'Under construction' });
});

router.post('/user/register', [
  body('username').isLength({ min: 4 }).withMessage('Username must be at least 4 characters long'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], async (req: Request, res: Response): Promise<any> => {
  let errors = validationResult(req);
  if(!errors.isEmpty()) return res.status(400).json({ message: errors.array() });

  try {
    let userlist = (await Users.list())?.map((u) => u.data);
    if(!userlist) return res.status(500).json({ message: 'Failed to fetch user list' });

    let userExists = userlist.find((user: User) => user.username == req.body.username || user.email === req.body.email);

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

router.post('/user/login', (req: Request, res: Response) => {

});



export default router;