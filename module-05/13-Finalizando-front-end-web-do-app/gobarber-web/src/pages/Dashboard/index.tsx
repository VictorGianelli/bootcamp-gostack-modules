import React, { useCallback, useEffect, useMemo, useState } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { FiClock, FiPower } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import {
  Appointment,
  Calendar, Container,



  Content, Header,
  HeaderContent,



  NextAppointment, Profile,

  Schedule,

  Section
} from './styles';


interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}


const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth()
  const [selectedDate, setSelectedDate] = useState(new Date)
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [monthAvailability, setMonthAvailability] = useState<MonthAvailabilityItem[]>([]);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  useEffect(() => {
    api.get(`/providers/${user.id}/month-availability`, {
      params: {
        year: currentMonth.getFullYear,
        month: currentMonth.getMonth() + 1,
      }
    }).then(response => {
      setMonthAvailability(response.data)
    })
  }, [currentMonth, user.id]);

  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter(monthDay => monthDay.available === false)
      .map(monthDay => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        return new Date(year, month, monthDay.day);
      });

    console.log(dates)
    return dates;
  }, [currentMonth, monthAvailability]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />

          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem-vindo,</span>
              <strong>Victor Gianelli</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut} >
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horàrios</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 20</span>
            <span>Sexta-feira</span>
          </p>
          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img src="https://avatars2.githubusercontent.com/u/18005772?s=460&u=17d2733b48e0e47054c5706a64acb48f12068063&v=4" alt={user.name} />

              <strong>Victor Gianelli</strong>
              <span>
                <FiClock />
                09:00
              </span>
            </div>
          </NextAppointment>

          <Section>
            <strong>Manhã</strong>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img src="https://avatars2.githubusercontent.com/u/18005772?s=460&u=17d2733b48e0e47054c5706a64acb48f12068063&v=4" alt={user.name} />

                <strong>Victor Gianelli</strong>

              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock />
                10:00
              </span>

              <div>
                <img src="https://avatars2.githubusercontent.com/u/18005772?s=460&u=17d2733b48e0e47054c5706a64acb48f12068063&v=4" alt={user.name} />

                <strong>Victor Gianelli</strong>

              </div>
            </Appointment>

          </Section>

          <Section>
            <strong>Tarde</strong>

            <Appointment>
              <span>
                <FiClock />
                15:00
              </span>

              <div>
                <img src="https://avatars2.githubusercontent.com/u/18005772?s=460&u=17d2733b48e0e47054c5706a64acb48f12068063&v=4" alt={user.name} />

                <strong>Victor Gianelli</strong>

              </div>
            </Appointment>

          </Section>

        </Schedule>
        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6],
              before: new Date() ,
              ...disabledDays }]}
            modifiers={{
            available: { daysOfWeek: [1, 2, 3, 4, 5] },
          }}
            selectedDays={selectedDate}
            onDayClick={handleDateChange}
            onMonthChange={handleMonthChange}
          months={[
            'Janeiro',
            'Fevereiro',
            'Março',
            'Abril',
            'Maio',
            'Junho',
            'Julho',
            'Agosto',
            'Setembro',
            'Outubro',
            'Novembro',
            'Dezembro',
          ]}
          />
        </Calendar>
      </Content>
    </Container>
  )
};

export default Dashboard;
