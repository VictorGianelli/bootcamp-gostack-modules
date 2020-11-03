import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProvidersService from './ListProvidersService';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsReposirory: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService

describe('ListProviderMonthAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointmentsReposirory = new FakeAppointmentsRepository();

    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsReposirory
    )

  })

  it('should be able to list the the month avaliability from provider', async () => {

    await fakeAppointmentsReposirory.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 8, 0, 0),
    })

    await fakeAppointmentsReposirory.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 9, 0, 0),
    })

    await fakeAppointmentsReposirory.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 10, 0, 0),
    })

    await fakeAppointmentsReposirory.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 11, 0, 0),
    })

    await fakeAppointmentsReposirory.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 12, 0, 0),
    })

    await fakeAppointmentsReposirory.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 13, 0, 0),
    })

    await fakeAppointmentsReposirory.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 14, 0, 0),
    })

    await fakeAppointmentsReposirory.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 15, 0, 0),
    })

    await fakeAppointmentsReposirory.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 16, 0, 0),
    })

    await fakeAppointmentsReposirory.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 17, 0, 0),
    })

    await fakeAppointmentsReposirory.create({
      provider_id: 'user',
      date: new Date(2020, 4, 21, 17, 0, 0),
    })


    const avaliability = await listProviderMonthAvailability.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
    })

    expect(avaliability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true },
      ])
    )
  });

})