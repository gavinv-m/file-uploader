import { Router } from 'express';
import { isAuthenticated } from '../utils/auth.js';
import db from '../config/db/queries.js';
import fs from 'node:fs';
import path from 'node:path';

const downloadRouter = Router();

downloadRouter.post('/', isAuthenticated, async (req, res) => {
  const fileId = Number(req.body.fileId);
  const fileUserId = await db.getUserIdByFileId(fileId);
  const currentUser = req.user.id;

  if (fileUserId === currentUser) {
    const file = await db.getFileName(fileId);
    const filePath = path.join(process.cwd(), 'uploads', file);

    // Check if the file exists
    if (fs.existsSync(filePath)) {
      res.download(filePath, file, (err) => {
        if (err) {
          console.error('Error sending file:', err);
          res.status(500).send('Internal Server Error');
        }
      });
    } else {
      res.status(404).send('File not found');
    }
  } else {
    res.status(403).send('Forbidden');
  }
});

// Exports to app-routes.js
export default downloadRouter;
