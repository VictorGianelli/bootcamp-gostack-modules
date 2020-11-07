import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProvidersMonthAvailability from '../controllers/ProvidersMonthAvailability';
import ProvidersDayAvailability from '../controllers/ProvidersDayAvailability';
import { celebrate, Joi, Segments } from 'celebrate';

const providersRouter = Router();

const providersController = new ProvidersController;
const providersMonthAvailability = new ProvidersMonthAvailability;
const providersDayAvailability = new ProvidersDayAvailability;

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);
providersRouter.get('/:provider_id/month-availability',
 celebrate({
  [Segments.PARAMS]: {
   provider_id: Joi.string().uuid().required(),
  },
 }), providersMonthAvailability.index);
providersRouter.get('/:provider_id/day-availability',
 celebrate({
  [Segments.PARAMS]: {
   provider_id: Joi.string().uuid().required(),
  },
 }), providersDayAvailability.index);

export default providersRouter;
