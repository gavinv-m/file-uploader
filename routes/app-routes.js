import { Router } from 'express';
import { isAuthenticated } from '../utils/auth.js';
import loginRoutes from './login.js';
import dashboardRoutes from './dashboard.js';
import logoutRoute from './logout.js';

const appRoutes = Router();

appRoutes.get('/', isAuthenticated, (req, res, next) => {
  res.redirect('/dashboard');
});
appRoutes.use('/login', loginRoutes);
appRoutes.use('/dashboard', dashboardRoutes);
appRoutes.use('/logout', logoutRoute);

// Exports to app.js
export default appRoutes;
