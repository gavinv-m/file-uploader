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
    const fileType = {
      csv: '/public/svgs/csv.svg',
      xls: '/public/svgs/excel.svg',
      xlsx: '/public/svgs/excel.svg',
      jpeg: '/public/svgs/img.svg',
      jpg: '/public/svgs/img.svg',
      png: '/public/svgs/img.svg',
      pdf: '/public/svgs/pdf.svg',
      txt: '/public/svgs/txt.svg',
      doc: '/public/svgs/word.svg',
      docx: '/public/svgs/word.svg',
      default: '/public/svgs/default.svg',
    };

    const filesWithIcons = data.files.map((file) => {
      const extension = file.name.split('.').pop();
      const svg = fileType[extension] || fileType.default;
      return { ...file, svg };
    });
    res.render('dashboard', {
      data: {
        ...data,
        files: filesWithIcons,
        uploadfile: '/public/svgs/uploadfile.svg',
        newFolder: '/public/svgs/folder.svg',
        folderIcon: '/public/svgs/folder-icon.svg',
      },
    });
  } catch (error) {
    console.error(`Error fetching folders and files ${file.name}:`, error);
  }
};
