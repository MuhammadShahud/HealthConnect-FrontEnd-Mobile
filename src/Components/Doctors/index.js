import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {Colors} from '../../Styles';
import { style } from './style';

const DoctorItem = props => {
  return (
    <TouchableOpacity
    onPress={() => props.onPress()}
      style={style.doctorButton}>
      <Image
        source={props.image}
        style={{width: 65, height: 65, borderRadius: 33}}
        resizeMode="contain"
      />
      <View>
        <Text style={style.name}>
              {props.name}{' '}
              {props.speciality == 'Yes' ? (
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: 'bold',
                    color: Colors.LIGHT_GREEN,
                  }}>
                  Specialist
                </Text>
              ) : null}
        </Text>
        <Text
          style={style.speciality}>
          {props.type}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default DoctorItem;
