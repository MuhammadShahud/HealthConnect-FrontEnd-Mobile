import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Colors} from '../../../Styles';
import {style} from '../style';
import { IMG_URL } from '../../../Store/Apis';
import { useDispatch, useSelector } from 'react-redux';
import ChatIndexMiddleware from '../../../Store/Middleware/ChatIndexMiddleware';

const ChatlistItem = props => {

  return (
    <TouchableOpacity style={style.chatListButton} onPress={props.onPress}>
      <Image source={props.image ? {uri : IMG_URL + props.image} : require('../../../Assets/Images/avatar.png')} style={style.image} />

      <View style={{paddingHorizontal: 12}}>
        <Text style={style.name}>{props.name}</Text>

        <Text style={{color: '#000'}}>{props.time}</Text>
      </View>

      {/* <View style={style.countContainer}>
        <Text style={{color: Colors.WHITE}}>{props.msgCount}</Text>
      </View> */}
    </TouchableOpacity>
  );
};

export default ChatlistItem;
