import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {style} from './style';

const SubmitButton = props => {
  return (
    <TouchableOpacity onPress={props.onPress} style={[style.buttonContainer, props.buttonContainer]}>
      <View style={props.style}>
        <Text style={[style.text, props.textStyle]}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SubmitButton;
