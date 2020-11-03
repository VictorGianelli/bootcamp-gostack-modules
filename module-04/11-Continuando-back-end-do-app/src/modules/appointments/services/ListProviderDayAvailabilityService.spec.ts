import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProvidersService from './ListProvidersService';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentsReposirory: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService

describe('ListProviderDayAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointmentsReposirory = new FakeAppointmentsRepository();

    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsReposirory
    )

  })

  it('should be able to list the monrh avaliability from provider', async () => {

    await fakeAppointmentsReposirory.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 8, 0, 0),
    })

    await fakeAppointmentsReposirory.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 10, 0, 0),
    })

    const avaliability = await listProviderDayAvailability.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
      day: 20,
    })

    expect(avaliability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: true },
        { hour: 10, available: false },
        { hour: 11, available: true },
      ])
    )
  });

})