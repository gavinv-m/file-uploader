import db from '../config/db/queries.js';
import { body, matchedData, validationResult } from 'express-validator';

const validateSignupRequest = [
  // Validate username
  body('username')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long')
    .isAlphanumeric()
    .withMessage('Username must only contain letters and numbers'),

  // Validate password
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/\d/)
    .withMessage('Password must contain at least one number')
    .matches(/[a-zA-Z]/)
    .withMessage('Password must contain at least one letter'),

  // Confirm password
  body('confirmPassword')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords must match'),
];

// Exports to routes/sign-up.ejs
export const registerUser = [
  validateSignupRequest,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty() === false) {
      req.flash('errors', errors.array());
      return res.redirect('signup');
    }

    const data = matchedData(req);
    try {
      await db.addUser(data);
      res.redirect('/login');
    } catch (error) {
      return next(error);
    }
  },
];

// Exports to routes/sign-up.js
export const renderSignup = (req, res) => {
  const errors = req.flash('errors');
  res.render('signup', { errors });
};
