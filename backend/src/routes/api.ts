import { Router, Request, Response } from 'express';


import multer from 'multer';
import path from 'path';

import { Users } from '../app';
import { fileHandle } from '../utils/dataHandle';

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

export default router;