import express from 'express';
import dotenv from 'dotenv';
import { Database } from 'dsc.db';

import api from './routes/api';
import { User } from './utils/types';

const app = express();
const port = 3000;

dotenv.config();

const Users = new Database<User>({
  uri: process.env.MONGO_URI as string,
  collection: 'test',
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', api);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export { Users };