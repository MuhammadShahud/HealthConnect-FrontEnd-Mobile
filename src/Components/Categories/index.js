import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {style} from './style';

const CategoryItem = props => {
  return (
    <TouchableOpacity onPress={props.onPress} style={[style.categoryButton, props.style]}>
      <Image
        source={props.image}
        style={style.categoryImage}
        resizeMode="contain"
      />
      <Text style={style.categoryTitle}>{props.name}</Text>
    </TouchableOpacity>
  );
};

export default CategoryItem;
