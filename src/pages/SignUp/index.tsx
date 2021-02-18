import React from 'react';
import {Image, KeyboardAvoidingView, Platform, ScrollView} from 'react-native'
import {useNavigation} from '@react-navigation/native';
import Icons from 'react-native-vector-icons/Feather'
import Input from '../../components/Input';
import Button from '../../components/Button'
import {Container,Title,BackToSignIn, BackToSignInText} from './styles';
import logoImg from '../../assets/logo.png';

const SignIn:React.FC  = () =>{
  const navigation = useNavigation();
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
            <Title> Criar sua Conta </Title>
            <Input name="name" icon="user" placeholder="Nome" placeholderTextColor="#666360" />
            <Input name="email" icon="mail" placeholder="E-mail" placeholderTextColor="#666360" />
            <Input name="password" icon="lock" placeholder="Senha" placeholderTextColor="#666360" />
            <Button onPress={() =>{console.log('Deu')}}> Cadastrar </Button>
          </Container>
          <BackToSignIn onPress={() => { navigation.goBack()}}>
            <Icons name="arrow-left" size={20} color="#fff" />
            <BackToSignInText> Voltar  para logon</BackToSignInText>
          </BackToSignIn>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  )
}


export default SignIn;
