import { Router } from 'express';
import { isAuthenticated } from '../utils/auth.js';
import loginRoutes from './login.js';
import dashboardRoutes from './dashboard.js';
import logoutRoute from './logout.js';
import signupRoutes from './sign-up.js';
import uploadRouter from './upload.js';

const appRoutes = Router();

appRoutes.get('/', isAuthenticated, (req, res, next) => {
  res.redirect('/dashboard');
});
appRoutes.use('/login', loginRoutes);
appRoutes.use('/dashboard', dashboardRoutes);
appRoutes.use('/logout', logoutRoute);
appRoutes.use('/signup', signupRoutes);
appRoutes.use('/upload', uploadRouter);

// Exports to app.js
export default appRoutes;
