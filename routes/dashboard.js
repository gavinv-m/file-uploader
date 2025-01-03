import { Router } from 'express';
import { isAuthenticated } from '../utils/auth.js';
import { renderDashboard } from '../controller/dashboard-controller.js';

const dashboardRoutes = Router();

dashboardRoutes.get('/', isAuthenticated, renderDashboard);

export default dashboardRoutes;
