import { Router } from 'express';
import {
  authenticateUser,
  renderLogin,
} from '../controller/login-controller.js';

const loginRoutes = Router();

loginRoutes.get('/', renderLogin);
loginRoutes.post('/', authenticateUser);

// Exports to app-routes.js
export default loginRoutes;
