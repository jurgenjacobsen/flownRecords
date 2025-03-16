import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import flash from 'connect-flash'

import { Database } from 'dsc.db';
import { User } from './utils/types';
import { UserAuth } from './utils/userAuth';

import api from './routes/api';
import auth from './routes/auth';

const app = express();
const port = 3000;

dotenv.config();

const Users = new Database<User>({
  uri: process.env.MONGO_URI as string,
  collection: 'test', // Change this to 'users' for production
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET as string || 'fallback-secret',
  resave: false,
  saveUninitialized: true, // test false and true conditions
  cookie: { secure: process.env.NODE_ENV === 'production' }  // Secure cookies in production
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(UserAuth.LocalStrategy);
passport.serializeUser((user: any, done): any => {
  return done(null, user.userId);
});

passport.deserializeUser(async (id, done) => {
  try {
      let user = (await Users.schema.findOne({
        $or: [{ 'data.userId': id }, { 'data.username': id }, { 'data.email': id }]
      }))?.data;

      if (!user) return done(null, false);
      
      done(null, user);
  } catch (err) {
      done(err, null);
  }
});

app.use('/api', api);
app.use('/auth', auth);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export { Users };