import React from 'react';
import {View, Text, StatusBar} from 'react-native';

const App:React.FC = () =>{
  return(
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff"/>
      <View> 
        <Text> Elixir 3.4 </Text>
      </View>
    </>
  )
}

export default App;