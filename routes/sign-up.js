import { Router } from 'express';
import { registerUser, renderSignup } from '../controller/signup-controller.js';

const signupRoutes = Router();

signupRoutes.get('/', renderSignup);
signupRoutes.post('/', registerUser);

// Exports to app-routes.js
export default signupRoutes;
