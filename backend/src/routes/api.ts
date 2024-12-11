import { Router, Request, Response } from 'express';

import multer from 'multer';
import path from 'path';

import { fileHandle, XLSXparseData } from '../utils/dataHandle';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// TEST ROUTE
router.get('/test', (req: Request, res: Response) => {
  res.sendFile('index.html', { root: 'test' });
});


/*  Data upload, parse, validation
    (Data storage and user authentication not implemented yet)
*/
router.post('/upload', upload.single('flightData'), async (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ message: 'No file uploaded' });
  } else {
    
    const fileBuffer = req.file.buffer;
    const ext = path.extname(req.file.originalname).toLowerCase().trim();
    const data = await fileHandle(ext, fileBuffer);

    if (data) {
      res.status(200).json(data);
    } else {
      res.status(400).json({ message: 'Invalid file format' });
    }
  }
});




export default router;