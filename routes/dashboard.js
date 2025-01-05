import { Router } from 'express';
import { isAuthenticated } from '../utils/auth.js';
import multer from 'multer';
import {
  addFolder,
  renderDashboard,
} from '../controller/dashboard-controller.js';

const upload = multer();
const dashboardRoutes = Router();

dashboardRoutes.get('/', isAuthenticated, renderDashboard);
dashboardRoutes.get('/folders/:folderId', isAuthenticated, renderDashboard);
dashboardRoutes.post(
  ['/', '/folders/:folderId'],
  isAuthenticated,
  upload.none(),
  addFolder
);

export default dashboardRoutes;
