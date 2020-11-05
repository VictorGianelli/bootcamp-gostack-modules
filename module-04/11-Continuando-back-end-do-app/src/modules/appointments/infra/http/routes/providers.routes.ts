import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProvidersMonthAvailability from '../controllers/ProvidersMonthAvailability';
import ProvidersDayAvailability from '../controllers/ProvidersDayAvailability';

const providersRouter = Router();

const providersController = new ProvidersController;
const providersMonthAvailability = new ProvidersMonthAvailability;
const providersDayAvailability = new ProvidersDayAvailability;

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);
providersRouter.get('/:provider_id/month-availability', providersMonthAvailability.index);
providersRouter.get('/:provider_id/day-availability', providersDayAvailability.index);

export default providersRouter;
