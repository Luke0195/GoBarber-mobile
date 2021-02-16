import React from 'react';

import {Image} from 'react-native'

import Input from '../../components/Input';
import Button from '../../components/Button'

import {Container,Title} from './styles';
import logoImg from '../../assets/logo.png';

const SignIn:React.FC  = () =>{
  return(
    <>
      <Container>
        <Image source={logoImg} />
        <Title> Faça seu logon</Title>
        <Input name="email" icon="mail" placeholder="E-mail" placeholderTextColor="#666360" />
        <Input name="password" icon="lock" placeholder="Senha" placeholderTextColor="#666360" />
        <Button onPress={() =>{console.log('Deu')}}> Entrar </Button>
      </Container>
    </>
  )
}


export default SignIn;
