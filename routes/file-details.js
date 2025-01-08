import { Router } from 'express';
import { isAuthenticated } from '../utils/auth.js';
import db from '../config/db/queries.js';
import getFileIconPath from '../utils/fileUtils.js';

const fileDetailsRouter = Router();

fileDetailsRouter.get('/:fileId', isAuthenticated, async (req, res) => {
  try {
    const fileId = Number(req.params.fileId);
    const fileUserId = await db.getUserIdByFileId(fileId);
    const userId = req.user.id;

    if (fileUserId !== userId) {
      res.status.json({ message: 'Forbidden' });
      return;
    }

    const fileDetails = await db.getFile(fileId);
    const extension = fileDetails.name.split('.').pop();
    const createdAt = fileDetails.createdAt.toISOString().split('T')[0];
    res.render('file', {
      ...fileDetails,
      createdAt,
      svg: getFileIconPath(extension),
    });
  } catch (error) {
    console.error('Error fetching file details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Exports to app-routes.js
export default fileDetailsRouter;
