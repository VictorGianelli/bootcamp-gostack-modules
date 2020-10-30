import { Router } from 'express';
import ResetPasswordController from '../controllers/ReserPassword';
import ForgotPasswordController from '../controllers/ForgotPassword';

const forgotPasswordController = new ForgotPasswordController;
const resetPasswordController = new ResetPasswordController;
const passwordRouter = Router();

passwordRouter.post('/forgot', forgotPasswordController.create);
passwordRouter.post('/reset', resetPasswordController.create);

export default passwordRouter;
