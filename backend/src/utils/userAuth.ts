import { NextFunction, Request, Response } from "express";
import { Snowflake } from "./dataHandle";
import { Permission, User } from "./types";
import { Strategy } from 'passport-local';
import { Users } from "../app";
import bcrypt from 'bcrypt';

const UserAuth = {
    LocalStrategy: new Strategy(
        { usernameField: 'userIdentification' },
        async (email: string, password: string, done: any) => {
            try {
                let user = (await Users.schema.findOne({
                    $or: [{ 'data.username': email }, { 'data.email': email }]
                }))?.data as User | null;

                if (!user) {
                    return done(null, false, { message: 'No user with that email or username' });
                }

                let isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return done(null, false, { message: 'Incorrect password' });
                }

                return done(null, user);
            } catch(e) {
                console.error(e);
                return done(e);
            }
        }
    ),
    newUserData: async ({
        username,
        email,
        password
    }: {
        username: string,
        email: string,
        password: string
    }): Promise<User | { message: string }> => { 
        if(typeof username !== 'string' || typeof email !== 'string' || typeof password !== 'string')
            return { message: 'Invalid data type' };

        let hashedPassword = await bcrypt.hash(password, 10);

        let UserData: User = {
            username,
            email,
            password: hashedPassword,
            permissions: [],
            logbook: [],
            userId: new Snowflake().generate(),
            profileId: null,
        };

        return UserData;
    },
    Authenticate: (req: Request | any, res: Response | any, next: NextFunction | any): any => {
        if (!req.isAuthenticated()) return res.status(401).json({ message: 'Unauthorized' });
        return next();
    },
    hasPermissions: (permissions: Permission[]) => {
        return (req: Request | any, res: Response | any, next: NextFunction | any): any => {
            if(!req.isAuthenticated()) return res.status(401).json({ message: 'Unauthorized' });
            
            let userPerms = req.user.permissions.map(
                (perm: Permission) => perm.toUpperCase().trim()
            ) || [];

            let perms = permissions.map(
                (perm: Permission) => perm.toUpperCase().trim()
            ) || [];

            if(!perms.every(permission => userPerms.includes(permission))) 
                return res.status(403).json({ message: 'Forbidden' });

            return next();
        }
    }
}

export { UserAuth };