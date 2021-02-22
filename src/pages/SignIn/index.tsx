import React, { useCallback, useRef} from 'react';
import {Image, KeyboardAvoidingView, Platform, ScrollView, View, TextInput, Alert} from 'react-native'
import {useNavigation} from '@react-navigation/native';
import {Form} from '@unform/mobile'
import {FormHandles} from '@unform/core';
import Icons from 'react-native-vector-icons/Feather'
import * as Yup from 'yup'

import Input from '../../components/Input';
import Button from '../../components/Button'
import {Container,Title,ForgotPassword,ForgotPasswordText,CreateAccountButton,CreateAccountButtonText} from './styles';
import logoImg from '../../assets/logo.png';
import getValidationErrors from '../../utils/getValidation';



interface SignInFormData{
  email:string;
  password: string;
}

const SignIn:React.FC  = () =>{
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);



  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email obrigatório')
            .email('Informe um email válido'),
          password: Yup.string().required('Senha obrigatória'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
      /*
        await signIn({
          email: data.email,
          password: data.password,
        });

        addToast({
          type: 'sucess',
          title: 'Autenticado com Sucesso',
          description: 'Seja bem-vindo ao GoBarber',
        });
        */
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
        }
        console.log(error);
        Alert.alert('Erro na autenticação', 'Ocorreu um erro ao fazer login, verique as credencials');

      }
    },
    [],
  );

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
            <Form onSubmit={handleSignIn} ref={formRef}>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder="E-mail"
                placeholderTextColor="#666360"
                returnKeyType="next"
                onSubmitEditing={() =>{
                  passwordInputRef.current?.focus()
                }}

              />
              <Input
                ref={passwordInputRef}
                name="password"
                secureTextEntry
                icon="lock"
                placeholder="Senha"
                placeholderTextColor="#666360"
                returnKeyType="send"
                onSubmitEditing={() =>{ formRef.current?.submitForm()}}
              />
              <View>
                <Button onPress={() =>{ formRef.current?.submitForm()}}> Entrar </Button>
              </View>
            </Form>
            <ForgotPassword onPress={() =>{ console.log('Deu certo')}}>
              <ForgotPasswordText> Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </Container>
          <CreateAccountButton onPress={() => { navigation.navigate('SignUp')}}>
            <Icons name="log-in" size={20} color="#ff9000" />
            <CreateAccountButtonText> Criar Conta</CreateAccountButtonText>
          </CreateAccountButton>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  )
}


export default SignIn;
