import { Router } from 'express';
import { isAuthenticated } from '../utils/auth.js';
import loginRoutes from './login.js';
import dashboardRoutes from './dashboard.js';

const appRoutes = Router();

appRoutes.get('/', isAuthenticated, (req, res, next) => {
  res.redirect('/dashboard');
});
appRoutes.use('/login', loginRoutes);
appRoutes.use('/dashboard', dashboardRoutes);

// Exports to app.js
export default appRoutes;
