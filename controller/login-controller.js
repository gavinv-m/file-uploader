import { body, validationResult } from 'express-validator';
import passport from '../config/passport.js';

const validateLogInRequest = [
  body('username').trim().notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

// Exported to routes/login.js
export const authenticateUser = [
  validateLogInRequest,
  (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty() === false) {
      req.flash('errors', errors.array());
      return res.redirect('/login');
    }

    // Execute passport auth if no errors
    return passport.authenticate('local', {
      failureRedirect: '/login',
      failureFlash: true,
      failureMessage: 'Invalid username or password',
      successRedirect: '/',
    })(req, res, next);
  },
];

// Exported to routes/login.js
export const renderLogin = (req, res) => {
  const errors = req.flash('errors');
  const authErrors = req.flash('error');
  res.render('login', { errors: [...errors, ...authErrors] });
};
