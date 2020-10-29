import { Router } from 'express';
import ResetPasswordController from '../controllers/ReserPassword';
import ForgotPasswordController from '../controllers/ReserPassword';

const forgotPasswordController = new ForgotPasswordController;
const resetPasswordController = new ResetPasswordController;
const passwordRouter = Router();

passwordRouter.post('/forfot', forgotPasswordController.create);
passwordRouter.post('/reset', resetPasswordController.create);

export default passwordRouter;
