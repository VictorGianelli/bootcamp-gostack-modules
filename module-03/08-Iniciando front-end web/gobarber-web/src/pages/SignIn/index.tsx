import React from 'react'
import { FiLogIn} from 'react-icons/fi'
import logoImg from '../../assets/logo.svg';

import { Container, Content, Background } from './styles'

const SingIn: React.FC = () => {

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber" />

        <form>
          <h1>Faça o seu logon</h1>

          <input name="email" placeholder="E-mail" />
          <input type="password" placeholder="Senha" />

          <button type="submit">Entrar</button>

          <a href="forgot">Esqueci minha senha</a>
        </form>

        <a href="login">
          <FiLogIn />
        Criar conta
      </a>
      </Content>
      <Background />
    </Container>
  );
}
export default SingIn
