import React, {useState} from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { style } from './style';
import Feather from 'react-native-vector-icons/Feather';

export const Input = props => {

  const [hide, setHide] = useState(props.secure)

  return(
  <View style={[style.inputContainer, props.inputContainerStyle]}>
    <TextInput
      value={props.value}
      placeholder={props.placeholder}
      placeholderTextColor={props.placeholderTextColor}
      onChangeText={props.onChangeText}
      style={props.style}
      keyboardType={props.keyboardType ? props.keyboardType : 'default'}
      secureTextEntry={hide}
      multiline={props.line}
      maxLength={props.length}
    />
    {props.eye ?
      <TouchableOpacity 
      onPress={()=>setHide(!hide)}
      style={{right:25}}>
      {hide ? <Feather name='eye-off' color={'#000'} size={15}/> : <Feather name='eye' color={'#000'} size={15}/>}
    </TouchableOpacity>
    :null}
   
  </View>
  )
}

export default Input;
