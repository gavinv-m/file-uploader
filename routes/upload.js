import express, { Router } from 'express';
import multer from 'multer';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'url';
import db from '../config/db/queries.js';
import cloudinary from '../config/cloudinary.js';

// Get the current directory of the current module
const __filename = decodeURIComponent(fileURLToPath(import.meta.url));
const __dirname = path.dirname(__filename);

const uploadRouter = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '..', 'uploads'); // Folder at root level

    // Ensure uploads folder exists, create if needed
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext); // Remove the extension
    const timestamp = Date.now(); // Use timestamp for uniqueness
    const filename = `${basename}-${timestamp}${ext}`; // Combine basename, timestamp, and extension
    cb(null, filename);
  },
});

const upload = multer({ storage });

uploadRouter.post('/', upload.single('file'), async (req, res) => {
  if (req.file) {
    const { filename, path } = req.file;
    const folder = Number(req.body.folderId);
    const user = req.user.id;

    // Upload to load cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(path, {
      folder: 'file-uploader',
    });

    // TODO: Save file secure url in db
    await db.addFile({
      name: filename,
      userId: user,
      folderId: folder,
    });
    res.status(200).json({ message: 'File uploaded successfully' });
  } else {
    res.status(400).json({ message: 'No file uploaded' });
  }
});

export default uploadRouter;
