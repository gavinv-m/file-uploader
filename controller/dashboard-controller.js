import db from '../config/db/queries.js';
import { body, validationResult } from 'express-validator';

// Exports to routes/dashboard.js
export const addFolder = [
  body('folderName').trim().notEmpty().withMessage('Folder name is required.'),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty() === false) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = req.user.id;
    const parent = Number(req.body.folderId);

    // Add folder to database
    try {
      await db.addFolder({
        name: req.body.folderName,
        parentFolder: parent,
        userId: user,
      });
      return res.status(201).json({ message: 'Folder created successfully.' });
    } catch (error) {
      console.error('Error adding folder:', error);
      return res
        .status(500)
        .json({ error: 'Failed to create folder. Please try again later.' });
    }
  },
];

// Exports to routes/dashboard.js
export const renderDashboard = async (req, res) => {
  const folderId = Number(req.params.folderId) || 1;
  const userId = req.user.id;

  try {
    const data = await db.getFoldersAndFiles(folderId, userId);
    res.render('dashboard', { data });
  } catch (error) {
    console.error(`Error fetching folders and files ${file.name}:`, error);
  }
};
