import db from '../config/db/queries.js';

// Exports to routes/dashboard.js
export const renderDashboard = async (req, res) => {
  const folderId = Number(req.params.folderId) || 1;

  try {
    const data = await db.getFoldersAndFiles(folderId);
    console.log(data);
    res.render('dashboard', { data });
  } catch (error) {
    console.error(`Error fetching folders and files ${file.name}:`, error);
  }
};
