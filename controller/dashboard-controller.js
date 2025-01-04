import db from '../config/db/queries.js';

// Exports to routes/dashboard.js
export const renderDashboard = async (req, res) => {
  const fullPath = req.params[0] || '';
  try {
    const renderObject = await db.getFoldersAndFiles(fullPath);
  } catch (error) {
    console.error(`Error fetching folders and files ${file.name}:`, error);
  }
};
