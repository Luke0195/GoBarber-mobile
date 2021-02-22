import React, {useEffect, useRef, useImperativeHandle, forwardRef,useCallback, useState} from 'react';
import {useField} from '@unform/core'
import {TextInputProps} from 'react-native'
import {Container,TextInput, Icon} from './styles'

interface InputProps extends TextInputProps{
  name: string;
  icon: string;
}


interface InputValueReferences {
  value: string;
}

interface InputRef {
  focus():void
}
const Input:React.RefForwardingComponent<InputRef,InputProps> = ({name, icon, ...rest},ref) =>{
  const inputElementRef = useRef<any>(null);


  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);


  const handleInputFocused = useCallback(() =>{
    setIsFocused((prevState) => !prevState)
  },[]);

  const handleInputBlur = useCallback(() =>{
    setIsFilled((prevState) => !prevState)

    setIsFilled(!!inputValueRef.current.value)
  },[])

  const{registerField,fieldName,defaultValue='',error} = useField(name);
  const inputValueRef= useRef<InputValueReferences>({value: defaultValue});
  useImperativeHandle(ref, () => ({
   focus(){
     inputElementRef.current.focus()
   }
  }))

  useEffect(() =>{
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value) {
        inputValueRef.current.value =value;
        inputElementRef.current.setNativeProps({ text: value});
    },
      clearValue(){
        inputValueRef.current.value = ''
        inputElementRef.current.clear();
      },
    })
  },[fieldName,registerField])
  return(
    <Container isFocused={isFocused}>
      <Icon name={icon} size={20} color={isFocused || isFilled ? '#ff9000': "#666360"} />
      <TextInput
        {...rest}
        placeholderTextColor="#666360"
        defaultValue={defaultValue}
        onChangeText={value => { inputValueRef.current.value = value}}
        ref={inputElementRef}
        onFocus={handleInputFocused}
        onBlur={handleInputBlur}
      />
    </Container>
  )
}

export default forwardRef(Input) ;
