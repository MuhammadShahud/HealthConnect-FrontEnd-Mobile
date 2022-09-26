import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { TextInput } from '..';
import { Colors } from '../../Styles';
import { style } from './style';
import { SearchIcon } from '../../Assets';

const Searchbar = props => {
  return (
    <View style={style.inputContainerStyle}>
      <TextInput
        value={props.value}
        placeholder={'Search...'}
        placeholderTextColor={Colors.GRAY}
        onChangeText={text => props.onChangeText(text)}
        inputContainerStyle={style.inputContainer}
        style={style.inputStyle}
      />

      <View style={style.searchContainer}>
        <Image source={SearchIcon} style={{ width: 20, height: 20 }} />
      </View>
    </View>
  );
};

export default Searchbar;
