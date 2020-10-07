import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import AppointmentsRepositoriy from '../repositories/AppoitmentsRepository';

const appointmentsRouter = Router();
const appointmentsRepositoriy = new AppointmentsRepositoriy();

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepositoriy.all();

  return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parseDate = startOfHour(parseISO(date));

  const findAppoimtmentInTheSameDate = appointmentsRepositoriy.findByDate(
    parseDate,
  );

  if (findAppoimtmentInTheSameDate) {
    return response
      .status(400)
      .json({ menssage: 'This appointment is already booked' });
  }

  const appointment = appointmentsRepositoriy.create({ provider, date });

  return response.json(appointment);
});

export default appointmentsRouter;
