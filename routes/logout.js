import { Router } from 'express';
import { isAuthenticated } from '../utils/auth.js';

const logoutRoute = Router();

logoutRoute.post('/', isAuthenticated, (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/login');
  });
});

// Exports to app-routes.js
export default logoutRoute;
