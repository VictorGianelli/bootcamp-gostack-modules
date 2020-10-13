import React from 'react'
import { FiArrowLeft, FiMail, FiUser, FiLock, FiYoutube } from 'react-icons/fi'

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles'

const SingUp: React.FC = () => (
  <Container>
    <Background />
    <Content>
      <img src={logoImg} alt="GoBarber" />

      <form>
        <h1>Faça o seu cadastro</h1>

        <Input name="name" icon={FiUser} placeholder="Nome" />
        <Input name="email" icon={FiMail} placeholder="E-Mail" />
        <Input name="password" icon={FiLock} type="password" placeholder="Senha" />

        <Button type="submit">Cadastrar</Button>
      </form>

      <a href="create">
        <FiArrowLeft />
      Voltar para logon
    </a>
    </Content>
  </Container>
);

export default SingUp
