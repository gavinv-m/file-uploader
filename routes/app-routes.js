import { Router } from 'express';
import { isAuthenticated } from '../utils/auth.js';
import loginRoutes from './login.js';

const appRoutes = Router();

appRoutes.get('/', isAuthenticated, (req, res, next) => {
  // TODO: Render dashboard
  res.send('Welcome to login page');
});
appRoutes.use('/login', loginRoutes);

// Exports to app.js
export default appRoutes;
