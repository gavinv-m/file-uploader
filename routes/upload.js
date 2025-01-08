import express, { Router } from 'express';
import multer from 'multer';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'url';
import db from '../config/db/queries.js';
import cloudinary from '../config/cloudinary.js';
import formateFileSize from '../utils/format-size.js';

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
    // TODO: Save the public_id to destroy or update the file
    const cloudinaryResponse = await cloudinary.uploader.upload(path, {
      folder: 'file-uploader',
    });

    // Delete file
    fs.unlink(path, (err) => {
      if (err) {
        console.error('Error deleting file from server:', err);
      }
    });

    await db.addFile({
      name: filename,
      userId: user,
      folderId: folder,
      url: cloudinaryResponse.secure_url,
      size: formateFileSize(req.file.size),
    });
    res.status(200).json({ message: 'File uploaded successfully' });
  } else {
    res.status(400).json({ message: 'No file uploaded' });
  }
});

export default uploadRouter;
