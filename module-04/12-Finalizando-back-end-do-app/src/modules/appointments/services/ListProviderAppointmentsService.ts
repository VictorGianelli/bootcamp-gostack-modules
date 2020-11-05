import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import Appointment from '../infra/typeorm/entities/Appointment';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) { }

  public async execute({
    provider_id,
    day,
    month,
    year
  }: IRequest): Promise<Appointment[]> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider({
      provider_id,
      day,
      month,
      year
    });

    // const numberOfDaysInMonth = getDaysInMonth(new Date(year,month -1))

    // const eachDayArray = Array.from(
    //   { length: numberOfDaysInMonth },
    //   (_, index) => index +1,
    // );

    // const availability = eachDayArray.map(day => {
    //   const appointmentsInDay = appointments.filter(appointment => {
    //     return getDate(appointment.date) === day;
    //   })
    //   return {
    //     day,
    //     available: appointmentsInDay.length < 10
    //   };
    // })

    return appointments;
  }
}

export default ListProviderAppointmentsService;
