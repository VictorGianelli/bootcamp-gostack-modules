import React from 'react';
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
  Calendar
} from './styles';

const Dashboard: React.FC = () => {

  const { signOut, user } = useAuth();
  console.log(user)
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
        </Schedule>
        <Calendar />
      </Content>
    </Container>
  )
};

export default Dashboard;
