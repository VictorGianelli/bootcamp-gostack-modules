import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appoitmentsRepository: AppointmentRepository;

  constructor(appoitmentsRepository: AppointmentRepository) {
    this.appoitmentsRepository = appoitmentsRepository;
  }

  public execute({ provider, date }: Request): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppoimtmentInTheSameDate = this.appoitmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppoimtmentInTheSameDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = this.appoitmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
