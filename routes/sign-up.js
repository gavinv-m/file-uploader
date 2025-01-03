import { Router } from 'express';
import { renderSignup } from '../controller/signup-controller.js';

const signupRoutes = Router();

signupRoutes.get('/', renderSignup);

// Exports to app-routes.js
export default signupRoutes;
