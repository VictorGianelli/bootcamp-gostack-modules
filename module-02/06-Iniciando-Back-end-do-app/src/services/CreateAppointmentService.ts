import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ provider, date }: Request): Promise<Appointment> {
    const appoitmentsRepository = getCustomRepository(AppointmentRepository);

    const appointmentDate = startOfHour(date);

    const findAppoimtmentInTheSameDate = await appoitmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppoimtmentInTheSameDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = appoitmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    await appoitmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
