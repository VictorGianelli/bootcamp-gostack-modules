import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import React, { useCallback, useRef } from 'react'
import { FiLock, FiLogIn, FiMail } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import * as Yup from 'yup'
import logoImg from '../../assets/logo.svg'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { useAuth } from '../../hooks/auth'
import { useToast } from '../../hooks/toast'
import getValidationErros from '../../utils/getValidationErros'
import { AnimationContainer, Background, Container, Content } from './styles'





interface SignInFormData {
  email: string;
  password: string;
}

const SingIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
        password: Yup.string().required('Senha é obrigatória')
      })

      await schema.validate(data, {
        abortEarly: false,
      })

      await signIn({
        email: data.email,
        password: data.password,
      })


    } catch (err) {
      if (err instanceof Yup.ValidationError){
        const erros = getValidationErros(err)

        formRef.current?.setErrors(erros);
      }

      addToast({
        type: 'error',
        title: 'Erro na autenticação',
        description: 'Ocorreu um erro ao realizar a autenticação, tente novamente'
      });

      history.push('/');
    }
  }, [signIn, addToast, history ])

  return (
    <Container>
      <Content>
        <AnimationContainer>
        <img src={logoImg} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça o seu logon</h1>

          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input name="password" icon={FiLock} type="password" placeholder="Senha" />

          <Button type="submit">Entrar</Button>

          <Link to="/forgot-password">Esqueci minha senha</Link>
        </Form>

        <Link to="/signup">
          <FiLogIn />
        Criar conta
      </Link>
      </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
}
export default SingIn
