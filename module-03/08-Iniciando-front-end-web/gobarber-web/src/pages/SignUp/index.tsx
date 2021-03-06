import React, { useCallback, useRef} from 'react'
import { FiArrowLeft, FiMail, FiUser, FiLock} from 'react-icons/fi'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import { Link, useHistory } from 'react-router-dom'

import getValidationErros from '../../utils/getValidationErros'

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background, AnimationContainer } from './styles'
import api from '../../services/api'
import { useToast } from '../../hooks/toast'

const SingUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'Mínimo 6 digitos')
      })

      await schema.validate(data,{
        abortEarly: false,
      })

      await api.post('/users', data);

      history.push('/');

      addToast({
        type: 'success',
        title: 'Cadastro realizado',
        description: 'Você já pode fazer logon no GoBarber!'
      });

    } catch (err) {
      if (err instanceof Yup.ValidationError){
        const erros = getValidationErros(err)

        formRef.current?.setErrors(erros);
      }

      addToast({
        type: 'error',
        title: 'Erro no cadastro',
        description: 'Ocorreu um erro ao realizar o cadastro'
      });
    }
  },[addToast,history])

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
        <img src={logoImg} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça o seu cadastro</h1>

          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="E-Mail" />
          <Input name="password" icon={FiLock} type="password" placeholder="Senha" />

          <Button type="submit">Cadastrar</Button>
        </Form>

        <Link to="">
          <FiArrowLeft />
          Voltar para logon
        </Link>
      </AnimationContainer>
      </Content>
    </Container>
  )
};

export default SingUp
