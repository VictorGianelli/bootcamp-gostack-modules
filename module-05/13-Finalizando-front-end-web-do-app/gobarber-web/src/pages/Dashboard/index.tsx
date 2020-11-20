import React, { useCallback, useState } from 'react';
import DayPicker, {  DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { FiClock, FiPower } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Section,
  Appointment,
  Calendar
} from './styles';


const Dashboard: React.FC = () => {
  const [selectedDate , setSelectedDate] = useState(new Date)

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
    }
  }, []);

  const { signOut, user } = useAuth();

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
          disabledDays={[{ daysOfWeek: [0, 6] }]}
          modifiers={{
            available: { daysOfWeek: [1, 2, 3, 4, 5] },
          }}
          selectedDays={selectedDate}
          onDayClick={handleDateChange}
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
