import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';
import {NotificationIcon, PatientProfileImg, profileImg} from '../../Assets';
import {Colors} from '../../Styles';
import {style} from './style';
import { IMG_URL } from '../../Store/Apis';

const index = ({headerRight, title, headerLeft}) => {
  const AuthState = useSelector(state => state.AuthReducer);
  const navigation = useNavigation();
  const [patientImage, setPaitentImage] = useState((AuthState?.user?.user?.profile_pic != null) ? { uri: IMG_URL + AuthState?.user?.user?.profile_pic } : require('../../Assets/Images/avatar.png') )
  const [doctorImage, setDoctorImage] = useState((AuthState?.user?.user?.profile_pic != null) ? { uri: IMG_URL + AuthState?.user?.user?.profile_pic } : require('../../Assets/Images/avatar.png') )

  return (
    <View style={style.headerContainer}>
      {headerLeft ? (
        <View style={style.headerLeftContainer}>
          <TouchableOpacity
            style={style.headerBtn}
            onPress={() => navigation.goBack()}>
            <FontAwesome5 name="arrow-left" color={Colors.BLACK} size={24} />
          </TouchableOpacity>
        </View>
      ) : null}

      <View style={style.titleContainer}>
        <Text style={style.headerTitle}>{title}</Text>
      </View>

      {headerRight ? (
        headerRight
      ) : (
        <View style={style.headerRightContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Notifications')}
            style={style.headerBtn}>
            <Image
              source={NotificationIcon}
              style={{width: 22, height: 22}}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image
              source={
                AuthState.userRole === 'patient'
                  ? patientImage
                  : doctorImage
              }
              style={{width: 30, height: 30, borderRadius: 100}}
              // resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default index;
