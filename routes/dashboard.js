import { Router } from 'express';
import { isAuthenticated } from '../utils/auth.js';
import { renderDashboard } from '../controller/dashboard-controller.js';

const dashboardRoutes = Router();

dashboardRoutes.get('/', isAuthenticated, renderDashboard);
dashboardRoutes.get('/folders/:folderId', isAuthenticated, renderDashboard);

export default dashboardRoutes;
