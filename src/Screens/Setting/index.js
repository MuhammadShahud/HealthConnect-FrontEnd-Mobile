import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import {
  bellIcon,
  dropdown_icon,
  helpIcon,
  inviteIcon,
  language_icon,
  logoutIcon,
  privacyIcon,
  profileImg,
  subscriptionIcon,
  termsIcon,
  userIcon,
} from '../../Assets';
import Feather from 'react-native-vector-icons/Feather';
import { Header } from '../../Components';
import { Colors } from '../../Styles';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { IS_LOGIN } from '../../Store/Types/actions_type';
import Storage from '../../Utils/AsyncStorage';
import { IMG_URL } from '../../Store/Apis';
import NotificationMiddleware from '../../Store/Middleware/NotificationMiddleware';
import AuthMiddleware from '../../Store/Middleware/AuthMiddleware';

const Setting = () => {
  const AuthState = useSelector(state => state.AuthReducer);
  const [isNotification, setIsNotification] = useState(AuthState?.user?.user?.is_notify ? true : false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [patientImage, setPaitentImage] = useState(AuthState?.user?.user?.profile_pic ? { uri: IMG_URL + AuthState?.user?.user?.profile_pic } : require('../../Assets/Images/avatar.png'))
  const [doctorImage, setDoctorImage] = useState(AuthState?.user?.user?.profile_pic ? { uri: IMG_URL + AuthState?.user?.user?.profile_pic } : require('../../Assets/Images/avatar.png'))

  const onPressNotificationOnOff = () => {
    !isNotification ? setIsNotification(true) : setIsNotification(false)
    if (isNotification == false) {
      dispatch(NotificationMiddleware.onoffNotification(1))
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        })
    }
    else {
      dispatch(NotificationMiddleware.onoffNotification(0))
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }
  //   async removeItemValue(key) {
  //     try {
  //         await AsyncStorage.removeItem(key);
  //         return true;
  //     }
  //     catch(exception) {
  //         return false;
  //     }
  // }

  const onPressLogout = () => {
    dispatch(AuthMiddleware.LogOut())
      .then((data) => {
        console.log('Logout=>>>', data?.success);
        dispatch({ type: IS_LOGIN, payload: false });

      })
      .catch((error) => {
        console.log(error)
      })
  }

  const renderPatientMenu = () => {
    return (
      <>
        <TouchableOpacity
          onPress={() => navigation.navigate('Subscription')}
          style={{
            width: '90%',
            alignSelf: 'center',
            flexDirection: 'row',
            paddingVertical: 12,
            alignItems: 'center',
            marginTop: 3,
          }}>
          <Image
            source={subscriptionIcon}
            style={{ width: 30, height: 30 }}
            resizeMode="contain"
          />

          <Text style={{ paddingHorizontal: 12, fontSize: 18, color: '#000' }}>
            Subscription
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('FamilyMembership')}
          style={{
            width: '90%',
            alignSelf: 'center',
            flexDirection: 'row',
            paddingVertical: 12,
            alignItems: 'center',
            marginTop: 3,
          }}>
          <Image
            source={inviteIcon}
            style={{ width: 30, height: 30 }}
            resizeMode="contain"
          />

          <Text style={{ paddingHorizontal: 12, fontSize: 18, color: '#000' }}>
            My Family Members
          </Text>
        </TouchableOpacity>
      </>
    );
  };
  const renderDoctorMenu = () => {
    return (
      <>
        <TouchableOpacity
          onPress={() => navigation.navigate('Reviews')}
          style={{
            width: '90%',
            alignSelf: 'center',
            flexDirection: 'row',
            paddingVertical: 12,
            alignItems: 'center',
            marginTop: 3,
          }}>
          <Image
            source={subscriptionIcon}
            style={{ width: 30, height: 30 }}
            resizeMode="contain"
          />

          <Text style={{ paddingHorizontal: 12, fontSize: 18, color: '#000' }}>Reviews</Text>
        </TouchableOpacity>

        {/* <View
          style={{
            width: '90%',
            alignSelf: 'center',
            flexDirection: 'row',
            paddingVertical: 12,
            alignItems: 'center',
            marginTop: 3,
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={language_icon}
              style={{width: 30, height: 30}}
              resizeMode="contain"
            />
            <Text style={{paddingHorizontal: 12, fontSize: 18}}>Language</Text>
          </View>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text> English</Text>
            <Image
              source={dropdown_icon}
              style={{height: 10}}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        </View> */}
      </>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      <View style={{ paddingHorizontal: 22 }}>
        <Header title={'Settings'} />
      </View>

      <ScrollView>
        <View
          style={{
            flex: 0.5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={
              AuthState.userRole === 'patient'
                ? patientImage
                : doctorImage
            }
            style={{ width: 120, height: 120 }}
          />
          <Text style={{ fontSize: 18, paddingTop: 8, color: Colors.BLACK }}>
            {AuthState?.user?.user?.username}
          </Text>
          <Text style={{ color: 'grey' }}>
            {AuthState?.user?.user?.email}
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            style={{
              width: '90%',
              alignSelf: 'center',
              flexDirection: 'row',
              paddingVertical: 12,
              alignItems: 'center',
              marginTop: 3,
            }}>
            <Image
              source={userIcon}
              style={{ width: 30, height: 30 }}
              resizeMode="contain"
            />

            <Text style={{ paddingHorizontal: 12, fontSize: 18, color: '#000' }}>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Notifications')}
            style={{
              width: '90%',
              alignSelf: 'center',
              flexDirection: 'row',
              paddingVertical: 12,
              alignItems: 'center',
              marginTop: 3,
            }}>
            <Image
              source={bellIcon}
              style={{ width: 30, height: 30 }}
              resizeMode="contain"
            />

            <Text style={{ paddingHorizontal: 12, fontSize: 18, color: '#000' }}>
              Notifications
            </Text>

            <TouchableOpacity
              onPress={onPressNotificationOnOff}
              style={{ flex: 1, alignItems: 'flex-end' }}>
              <Feather
                size={32}
                name={!isNotification ? 'toggle-left' : 'toggle-right'}
                color={!isNotification ? Colors.LIGHT_GRAY : Colors.LIGHT_GREEN}
              />
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('InfoPages', { title: 'Help' })}
            style={{
              width: '90%',
              alignSelf: 'center',
              flexDirection: 'row',
              paddingVertical: 12,
              alignItems: 'center',
              marginTop: 3,
            }}>
            <Image
              source={helpIcon}
              style={{ width: 30, height: 30 }}
              resizeMode="contain"
            />

            <Text style={{ paddingHorizontal: 12, fontSize: 18, color: '#000' }}>Help</Text>
          </TouchableOpacity>

          {AuthState.userRole === 'patient'
            ? renderPatientMenu()
            : renderDoctorMenu()}

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('InfoPages', { title: 'Terms of Services' })
            }
            style={{
              width: '90%',
              alignSelf: 'center',
              flexDirection: 'row',
              paddingVertical: 12,
              alignItems: 'center',
              marginTop: 3,
            }}>
            <Image
              source={termsIcon}
              style={{ width: 30, height: 30 }}
              resizeMode="contain"
            />

            <Text style={{ paddingHorizontal: 12, fontSize: 18, color: '#000' }}>
              Terms of Services
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('InfoPages', { title: 'Privacy Policy' })
            }
            style={{
              width: '90%',
              alignSelf: 'center',
              flexDirection: 'row',
              paddingVertical: 12,
              alignItems: 'center',
              marginTop: 3,
            }}>
            <Image
              source={privacyIcon}
              style={{ width: 30, height: 30 }}
              resizeMode="contain"
            />

            <Text style={{ paddingHorizontal: 12, fontSize: 18, color: '#000' }}>
              Privacy Policy
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onPressLogout()}
            style={{
              width: '90%',
              alignSelf: 'center',
              flexDirection: 'row',
              paddingVertical: 12,
              alignItems: 'center',
              marginTop: 3,
            }}>
            <Image
              source={logoutIcon}
              style={{ width: 30, height: 30 }}
              resizeMode="contain"
            />

            <Text style={{ paddingHorizontal: 12, fontSize: 18, color: '#000' }}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Setting;
