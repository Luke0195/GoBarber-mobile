import React from 'react';
import {Image, KeyboardAvoidingView, Platform, ScrollView} from 'react-native'
import Icons from 'react-native-vector-icons/Feather'
import Input from '../../components/Input';
import Button from '../../components/Button'
import {Container,Title,ForgotPassword,ForgotPasswordText,CreateAccountButton,CreateAccountButtonText} from './styles';
import logoImg from '../../assets/logo.png';

const SignIn:React.FC  = () =>{
  return(
    <>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding': undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flex:1}}
        >


          <Container>
            <Image source={logoImg} />
            <Title> Faça seu logon</Title>
            <Input name="email" icon="mail" placeholder="E-mail" placeholderTextColor="#666360" />
            <Input name="password" icon="lock" placeholder="Senha" placeholderTextColor="#666360" />
            <Button onPress={() =>{console.log('Deu')}}> Entrar </Button>
            <ForgotPassword onPress={() =>{ console.log('Deu certo')}}>
              <ForgotPasswordText> Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </Container>
          <CreateAccountButton onPress={() => {console.log('Deu')}}>
            <Icons name="log-in" size={20} color="#ff9000" />
            <CreateAccountButtonText> Criar Conta</CreateAccountButtonText>
          </CreateAccountButton>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  )
}


export default SignIn;
