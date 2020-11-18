import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import React, { useCallback, useRef } from 'react'
import { FiLock } from 'react-icons/fi'
import { useHistory, useLocation } from 'react-router-dom'
import * as Yup from 'yup'
import logoImg from '../../assets/logo.svg'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { useAuth } from '../../hooks/auth'
import { useToast } from '../../hooks/toast'
import api from '../../services/api'
import getValidationErros from '../../utils/getValidationErros'
import { AnimationContainer, Background, Container, Content } from './styles'

interface ResetPasswwordFormData {
  password: string;
  password_confirmation: string;
}

const SingIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();

  const { addToast } = useToast();

  const history = useHistory();
  const location = useLocation();

  const handleSubmit = useCallback(
    async (data: ResetPasswwordFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          password: Yup.string().required('Senha é obrigatória'),
          password_confirmation: Yup.string()
            .oneOf([Yup.ref('password')], 'Confirmação incorreta')
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        const { password, password_confirmation } = data;
        const token = location.search.replace('?token=', '');

        if(!token) {
          throw new Error();
        }

        await api.post('/password/reset', {
          password,
          password_confirmation,
          token,
        })

        history.push('/')

      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const erros = getValidationErros(err)

          formRef.current?.setErrors(erros);
        }

        addToast({
          type: 'error',
          title: 'Erro ao resetar senha',
          description: 'Ocorreu um erro ao resetar a sua senha, tente novamente.'
        });

        history.push('/');
      }
    }, [addToast, history, location.search])

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Resetar senha</h1>

            <Input name="password" icon={FiLock} type="password" placeholder="Nova senha" />
            <Input name="password_confirmation" icon={FiLock} type="password" placeholder="Confirmar senha" />

            <Button type="submit">Alterar senha</Button>

          </Form>

          {/* <Link to="/signup">
          <FiLogIn />
        Criar conta
      </Link> */}
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
}
export default SingIn
