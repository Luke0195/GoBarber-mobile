import React, {useCallback, useRef} from 'react';
import {Image, KeyboardAvoidingView, Platform, ScrollView, View, TextInput, Alert} from 'react-native'
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core'
import {useNavigation} from '@react-navigation/native';

import * as Yup from 'yup';
import Icons from 'react-native-vector-icons/Feather'
import Input from '../../components/Input';
import Button from '../../components/Button'
import {Container,Title,BackToSignIn, BackToSignInText} from './styles';
import logoImg from '../../assets/logo.png';
import getValidationErrors from '../../utils/getValidation'


interface SignUpFormData{
  name:string;
  email:string;
  password:string;
}
const SignIn:React.FC  = () =>{
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null)

  const emailInputRef = useRef<TextInput>(null);

  const passwordInputRef = useRef<TextInput>(null);


  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('Email obrigatório')
            .email('Informe um email válido'),
          password: Yup.string().min(6, 'Minimo 6 caracteres'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

     //   await api.post('/users', data);

      // history.push('/dashboard');

      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
          return;
        }
        Alert.alert('Erro no cadastro', 'Ocorreu um erro ao fazer cadastro, tente novamente');      }
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
            <Title> Criar sua Conta </Title>
            <Form onSubmit={handleSignUp} ref={formRef}>
              <Input
                name="name"
                icon="user"
                placeholder="Nome"
                placeholderTextColor="#666360"
                autoCorrect
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => emailInputRef.current?.focus()}
              />

              <Input
                name="email"
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                icon="mail"
                placeholder="E-mail"
                placeholderTextColor="#666360"
                returnKeyType="next"
                ref={emailInputRef}
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />
              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Senha"
                placeholderTextColor="#666360"
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() =>formRef.current?.submitForm()}
              />
              <View>
                <Button onPress={() =>formRef.current?.submitForm()}> Cadastrar </Button>
              </View>
            </Form>
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
