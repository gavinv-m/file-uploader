import { Router } from 'express';
import { isAuthenticated } from '../utils/auth.js';
import db from '../config/db/queries.js';
import https from 'https';

const downloadRouter = Router();

downloadRouter.post('/', isAuthenticated, async (req, res) => {
  const fileId = Number(req.body.fileId);
  const fileUserId = await db.getUserIdByFileId(fileId);
  const currentUser = req.user.id;

  if (fileUserId === currentUser) {
    const url = await db.getFileUrl(fileId);
    const filename = await db.getFileName(fileId);

    https
      .get(url, (fileRes) => {
        res.setHeader(
          'Content-Disposition',
          `attachment; filename="${filename}"`
        );
        res.setHeader('Content-Type', fileRes.headers['content-type']);

        fileRes.pipe(res);
      })
      .on('error', (err) => {
        res.status(500).send('Error downloading file');
      });
  } else {
    res.status(403).send('Forbidden');
  }
});

// Exports to app-routes.js
export default downloadRouter;
