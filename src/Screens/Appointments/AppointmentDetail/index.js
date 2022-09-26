import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert, Platform, Linking } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { Colors } from '../../../Styles';
import { Header, SubmitButton } from '../../../Components';
import { MessageIcon, PhoneIcon, videoIcon } from '../../../Assets';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { style } from '../style';
import { useNavigation } from '@react-navigation/native';
import { IMG_URL } from '../../../Store/Apis';
import AppMiddleware from '../../../Store/Middleware/AppMiddleware';
import { useDispatch, useSelector } from 'react-redux';
import { ChatMiddleware } from '../../../Store/Middleware/ChatMiddleware';
import VideoMiddleware from '../../../Store/Middleware/VideoMiddleware';

const AppointmentDetail = props => {
  let { screen, item } = props?.route?.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const AuthState = useSelector(state => state.AuthReducer);

  console.log('-------',props?.route?.params?.item?.is_cancelled);


  const onPressCancelAppointment = () => {
    Alert.alert("Note", "Are you sure you want to cancel Appointment?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => CancelledAppointment(props?.route?.params?.item?.id) }
    ]);
  }

  const CancelledAppointment = (id) => {
    dispatch(AppMiddleware.CancelAppointments(id))
      .then((data) => {
        Alert.alert("Note", data?.message, [
          { text: "OK", onPress: () => navigation.navigate('Appointments') }
        ]);
      })
      .catch((err) => console.log(err))
  }
  const ChatSession = (item) => {
    console.warn("hello", item);
    dispatch(ChatMiddleware.ChatSession({
      id: item?.doctor_id,
    }))
      .then(request => {
        console.warn('dataaRequest', request);
        navigation.navigate('ChatDetail', { item: { ...request, fromusername: request.user.username } })
      })
    // this.setState({ chatData: this.props.chatSessionData })
  }
  const callLinking = (phone) => {
    console.warn('heheh', phone);
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${' + phone + '}';
    }
    else {
      phoneNumber = 'telprompt:${' + phone + '}';
    }

    Linking.openURL(phoneNumber);
  };


  const onPressCall = (phone) => {

    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${' + phone + '}';
    }
    else {
      phoneNumber = 'telprompt:${' + phone + '}';
    }

    Linking.openURL(phoneNumber);
  };

  const OnVideoCallClick = () => {
    let id = props?.route?.params?.item?.doctor_id
    // console.log(id);
    dispatch(VideoMiddleware.generateToken({
      id,
      callback:(data)=>{
        navigation.navigate('VideoCallTest', { call_token: data?.data[0], channelName: data?.data[1], OpponentID: props?.route?.params?.item?.user_id })
      }
    }))

  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      <View style={{ paddingHorizontal: 22 }}>
        <Header
          headerLeft={true}
          title={
            screen === 'upcoming' ? 'Upcoming Appointment' : 'Past Appointment'
          }
        />
      </View>

      <ScrollView>
        <View style={style.topContainer}>
          <Image
            source={item?.doctor?.profile_pic ? { uri: IMG_URL + item?.doctor?.profile_pic } : require('../../../Assets/Images/avatar.png')}
            style={{ width: 140, height: 140, borderRadius: 12 }}
            resizeMode="contain"
          />
          <Text
            style={[
              style.name,
              {
                paddingVertical: 8,
                fontSize: 18,
                color: '#000'
              },
            ]}>
            {item?.doctor?.username}
          </Text>

          {item?.doctor?.specialist ? <Text
            style={{
              fontSize: 16,
              color: '#000'
            }}>
            Specialist
          </Text> : null}

          {item?.doctor?.experience ?
            <Text style={style.expText}>
              {item?.doctor?.experience}{' '}
              <Text style={{ fontWeight: 'normal', color: '#000' }}>Years Exp.</Text>
            </Text>
            : null}

          <View style={style.ratingContainer}>
            <AirbnbRating
              showRating={false}
              count={5}
              defaultRating={item?.doctor?.average_rating ? item?.doctor?.average_rating : 0}
              size={15}
              isDisabled={true}
              style={{ backgroundColor: 'red' }}
            />

            <Text style={{ paddingHorizontal: 5, color: '#000' }}>{item?.doctor?.average_rating ? parseFloat(item?.doctor?.average_rating).toFixed(1) : 0} | {item?.doctor?.total_review ? item?.doctor?.total_review : 0} Reviews</Text>
          </View>

          {item?.is_accepted === 'Yes' ? (
            <View style={style.iconContainer}>
              <TouchableOpacity
                onPress={() => onPressCall(item?.doctor?.phone_number)}
                style={style.iconButton}>
                <Image
                  source={PhoneIcon}
                  style={{ width: 25, height: 25 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => OnVideoCallClick()}
                style={style.iconButton}>
                <Image
                  source={videoIcon}
                  style={{ width: 30, height: 25 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => ChatSession(item)}
                style={style.iconButton}>
                <Image
                  source={MessageIcon}
                  style={{ width: 30, height: 25 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>

            </View>
          ) : null}
        </View>

        <View style={style.lineContainer} />

        <View style={style.bottomContainer}>
          <Text style={style.title}>Visit Time</Text>

          {/* <Text>Morning</Text> */}
          <Text style={{ color: '#000' }}>{item?.time} | {item.date}</Text>

          <Text
            style={[
              style.title,
              {
                paddingTop: 10,
              },
            ]}>
            Patient Information
          </Text>

          <Text style={{ color: '#000' }}>Name: {item?.patient_name}</Text>
          <Text style={{ color: '#000' }}>Age: {item?.patient_age}</Text>
          <Text style={{ color: '#000' }}>Phone: +{item?.patient_number}</Text>
        </View>

        {/* <SubmitButton
          text={screen === 'upcoming' ? 'Cancel Appointment' : 'Write Review'}
          onPress={
            screen === 'upcoming'
              ? () => onPressCancelAppointment()
              : () => navigation.navigate('AddReview', item)
          }
          buttonContainer={{
            width: '100%',
            flex: 0,
            paddingVertical: 0,
            marginVertical: 0,
            alignSelf: 'center',
            borderRadius: 12,
          }}
          style={[
            style.appointmentBtn,
            {
              marginVertical: 12,
              backgroundColor:
                screen === 'upcoming' ? Colors.DARK_BLUE : Colors.LIGHT_GREEN,
            },
          ]}
        /> */}

        {
          screen === 'upcoming' ?

          <SubmitButton
          text={'Cancel Appointment'}
          onPress={() => onPressCancelAppointment()}
          buttonContainer={{
            width: '100%',
            flex: 0,
            paddingVertical: 0,
            marginVertical: 0,
            alignSelf: 'center',
            borderRadius: 12,
          }}
          style={[
            style.appointmentBtn,
            {
              marginVertical: 12,
              backgroundColor:Colors.DARK_BLUE,
            },
          ]}
         />

          :
          item?.isAbleToReview ?
          <SubmitButton
          text={'Write Review'}
          onPress={() => navigation.navigate('AddReview', item)}
          buttonContainer={{
            width: '100%',
            flex: 0,
            paddingVertical: 0,
            marginVertical: 0,
            alignSelf: 'center',
            borderRadius: 12,
          }}
          style={[
            style.appointmentBtn,
            {
              marginVertical: 12,
              backgroundColor:Colors.LIGHT_GREEN,
            },
          ]}
         />
         :
         item?.is_cancelled == 1 ?
         <View style={{
          width: '90%',
          paddingVertical: 18,
          marginVertical: 6,
          alignSelf: 'center',
          borderRadius: 12,
          marginVertical: 12,
          backgroundColor:Colors.LIGHT_GREEN
         }}>
           <Text style={{color:'#fff', alignSelf: 'center', textAlign: 'center', fontSize: 16 }}>Cancelled</Text>
        </View>
         :
         <View style={{
          width: '90%',
          paddingVertical: 18,
          marginVertical: 6,
          alignSelf: 'center',
          borderRadius: 12,
          marginVertical: 12,
          backgroundColor:Colors.LIGHT_GREEN
         }}>
           <Text style={{color:'#fff', alignSelf: 'center', textAlign: 'center', fontSize: 16 }}>Completed</Text>
        </View>

        }
      </ScrollView>
    </View>
  );
};

export default AppointmentDetail;
