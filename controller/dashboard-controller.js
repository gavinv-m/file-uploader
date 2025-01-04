import db from '../config/db/queries.js';

// Exports to routes/dashboard.js
export const renderDashboard = async (req, res) => {
  const fullPath = req.params[0] || '';
  try {
    const data = await db.getFoldersAndFiles(fullPath);
    res.render('dashboard', { data });
  } catch (error) {
    console.error(`Error fetching folders and files ${file.name}:`, error);
  }
};
