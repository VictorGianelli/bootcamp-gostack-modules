import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import React, { useCallback, useRef } from 'react'
import { FiLogIn, FiMail } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import logoImg from '../../assets/logo.svg'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { useToast } from '../../hooks/toast'
import getValidationErros from '../../utils/getValidationErros'
import { AnimationContainer, Background, Container, Content } from './styles'

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword
: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
      })

      await schema.validate(data, {
        abortEarly: false,
      })

      //recuperar senha

    } catch (err) {
      if (err instanceof Yup.ValidationError){
        const erros = getValidationErros(err)

        formRef.current?.setErrors(erros);
      }

      addToast({
        type: 'error',
          title: 'Erro na recuperação de senha',
          description:
            'Ocorreu um erro ao tentar realizar a recuperação de senha, tente novamente.',
      });

    }
  }, [addToast])

  return (
    <Container>
      <Content>
        <AnimationContainer>
        <img src={logoImg} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Recuperar senha</h1>

          <Input name="email" icon={FiMail} placeholder="E-mail" />

          <Button type="submit">Recuperar</Button>
        </Form>

        <Link to="">
          <FiLogIn />
        Voltar ao login
      </Link>
      </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
}
export default ForgotPassword


