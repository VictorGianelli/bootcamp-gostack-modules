import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmrntsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmrntsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmrntsRepository
    )
  })

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      user_id: '123123',
      provider_id: '123123123'
    })

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123123');
  });

  it('should not be able to create two appointment to the same time', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      user_id: '123123',
      provider_id: '123123'
    })

    await expect(createAppointment.execute({
      date: appointmentDate,
      user_id: '123123',
      provider_id: '123123'
    })).rejects.toBeInstanceOf(AppError);
  });
})