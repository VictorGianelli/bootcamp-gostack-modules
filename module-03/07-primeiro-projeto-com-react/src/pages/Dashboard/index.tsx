import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositosies } from './styles';

const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore repositórios no Github</Title>

      <Form>
        <input placeholder="Digite o nome do repositório" />
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositosies>
        <a href="teste">
          <img
            src="https://avatars2.githubusercontent.com/u/18005772?s=460&u=17d2733b48e0e47054c5706a64acb48f12068063&v=4"
            alt="Victor"
          />
          <div>
            <strong>VictorGianelli / gobarber</strong>
            <p>A collection of projects</p>
          </div>
          <FiChevronRight size={20} />
        </a>
        <a href="teste">
          <img
            src="https://avatars2.githubusercontent.com/u/18005772?s=460&u=17d2733b48e0e47054c5706a64acb48f12068063&v=4"
            alt="Victor"
          />
          <div>
            <strong>VictorGianelli / gobarber</strong>
            <p>A collection of projects</p>
          </div>
          <FiChevronRight size={20} />
        </a>
        <a href="teste">
          <img
            src="https://avatars2.githubusercontent.com/u/18005772?s=460&u=17d2733b48e0e47054c5706a64acb48f12068063&v=4"
            alt="Victor"
          />
          <div>
            <strong>VictorGianelli / gobarber</strong>
            <p>A collection of projects</p>
          </div>
          <FiChevronRight size={20} />
        </a>
      </Repositosies>
    </>
  );
};

export default Dashboard;
