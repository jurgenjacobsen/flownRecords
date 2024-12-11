import express from 'express';

import api from './routes/api';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', api);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});