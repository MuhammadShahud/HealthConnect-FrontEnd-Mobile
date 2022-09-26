import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert, Linking } from 'react-native';
import { FemaleDoctorImg, MessageIcon, PhoneIcon, videoIcon } from '../../../Assets';
import { Header, SubmitButton } from '../../../Components';
import { IMG_URL } from '../../../Store/Apis';
import { Colors } from '../../../Styles';
import { style } from '../style';
import { useDispatch, useSelector } from 'react-redux';
import DoctorAppointmentMiddleware from '../../../Store/Middleware/DoctorAppointmentMiddleware';
import { ChatMiddleware } from '../../../Store/Middleware/ChatMiddleware';
import moment from 'moment';
import VideoMiddleware from '../../../Store/Middleware/VideoMiddleware';

const AppointmentRequestDetail = props => {

  const navigation = useNavigation()
  const isAppointmentAccepted = props.route?.params?.isAppointmentAccepted
  const item = props.route?.params?.item
  const dispatch = useDispatch();
  const AuthState = useSelector(state => state.AuthReducer);

  console.log('---item---', isAppointmentAccepted);

  const onPressAcceptAppointment = (id) => {
    console.log(id);
    dispatch(DoctorAppointmentMiddleware.AcceptAppointment(id))
      .then((data) => {
        console.log('----', data);
        if (data?.success) {
          Alert.alert('Note', data?.message);
          navigation.navigate('DoctorMyAppointments')
        }
        else {
          Alert.alert('Note', data?.message);
        }
      })
      .catch(() => setLoader(false))
  }


  const onPressDeclineAppointment = (id) => {
    console.log(id);
    dispatch(DoctorAppointmentMiddleware.DeclineAppointment(id))
      .then((data) => {
        console.log('----', data);
        if (data?.success) {
          Alert.alert('Note', data?.message);
          navigation.navigate('DoctorMyAppointments')
        }
        else {
          Alert.alert('Note', data?.message);
        }
      })
      .catch(() => setLoader(false))
  }


  const onPressCompleteAppointment = (id) => {
    console.log(id);
    dispatch(DoctorAppointmentMiddleware.CompleteAppointment(id))
      .then((data) => {
        console.log('----', data);
        if (data?.success) {
          Alert.alert('Note', data?.message);
          navigation.goBack()
        }
        else {
          Alert.alert('Note', data?.message);
        }
      })
      .catch(() => setLoader(false))
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
  const ChatSession = (item) => {
    console.warn("hello", item);
    dispatch(ChatMiddleware.ChatSession({
      id: item?.user_id,
    }))
      .then(request => {
        console.warn('dataaRequest', request);
        navigation.navigate('ChatDetail', { item: { ...request, fromusername: request.user.username } })
      })

    // this.setState({ chatData: this.props.chatSessionData })
  }
  const renderDetail = (title, value) => {
    return (
      <View>
        <Text style={style.title}>{title}</Text>
        <Text style={styles.titleValue}>{value}</Text>
      </View>
    )
  }
  const OnVideoCallClick = () => {
    console.warn("jeje", AuthState?.user?.user?.id, "hg", props?.route?.params?.item?.user_id);
    let id = props?.route?.params?.item?.user_id
    dispatch(VideoMiddleware.generateToken({
      id,
      callback:(data)=>{
        navigation.navigate('VideoCallTest', { call_token: data?.data[0], channelName: data?.data[1], OpponentID: props?.route?.params?.item?.doctor_id })
      }
    }))

  }

  return (
    <View style={styles.container}>
      <View style={styles.PH22}>
        <Header
          headerLeft={true}
          title={isAppointmentAccepted ? 'Accepted Appointment' : 'Appointment Request'}
        />
      </View>

      <ScrollView>
        <View style={style.topContainer}>
          <Image
            source={item?.user?.profile_pic ? { uri: IMG_URL + item?.user?.profile_pic } : require('../../../Assets/Images/avatar.png')}
            style={styles.userImage}
            resizeMode="contain"
          />
          <Text
            style={[style.name, { paddingVertical: 8, fontSize: 18 }]}>
            {item?.patient_name}
          </Text>

          {item?.is_accepted == 'Yes' ?
            <View style={style.iconContainer}>
              <TouchableOpacity
                onPress={() => callLinking(item?.patient_number)}
                style={style.iconButton}>
                <Image
                  source={PhoneIcon}
                  style={styles.phoneIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={style.iconButton} onPress={() => OnVideoCallClick()}>
                <Image
                  source={videoIcon}
                  style={styles.icon}
                  resizeMode="contain"
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={style.iconButton}
                onPress={() => ChatSession(item)}>
                <Image
                  source={MessageIcon}
                  style={styles.icon}
                  resizeMode="contain"
                />
              </TouchableOpacity>


            </View>
            : null}

        </View>

        <View style={style.lineContainer} />
        <View style={style.bottomContainer}>
          {/* {renderDetail('Appointment Details', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat aliquam lectus, in imperdiet arcu ornare at. Mauris dictum vitae quam ut maximus. Fusce quis viverra libero.')} */}
          {renderDetail('Time', item?.time)}
          {renderDetail('Date', moment(item?.date).format('MM-DD-YYYY'))}
          {renderDetail('Gender', item?.gender)}
          {renderDetail('Contact Number', item?.patient_number)}
        </View>
        {isAppointmentAccepted ?
          <View style={styles.bottomBtnContainer}>
            <SubmitButton
              text={'Complete'}
              onPress={() => onPressCompleteAppointment(item?.id)}
              buttonContainer={styles.buttonContainer}
            />
          </View>
          :
          <View style={styles.bottomBtnContainer}>
            <SubmitButton
              text={'Accept'}
              onPress={() => onPressAcceptAppointment(item?.id)}
              buttonContainer={styles.buttonContainer}
            />
            <SubmitButton
              text={'Decline'}
              onPress={() => onPressDeclineAppointment(item?.id)}
              buttonContainer={[styles.buttonContainer, { backgroundColor: Colors.DARK_BLUE, marginLeft: 5 }]}
            />
          </View>
        }
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: Colors.WHITE,
  },
  PH22: { paddingHorizontal: 22 },
  bottomBtnContainer: {
    flexDirection: 'row', marginHorizontal: 10
  },
  icon: {
    width: 30, height: 25
  },
  userImage: {
    width: 140, height: 140, borderRadius: 12
  },
  phoneIcon: {
    width: 25, height: 25
  },
  titleValue: {
    opacity: 0.5, marginVertical: 10, color: '#000'
  },
  buttonContainer: {
    marginRight: 5,
    flex: 1,
    alignSelf: 'center',
    borderRadius: 12,
    backgroundColor: Colors.LIGHT_GREEN
  }
})

export default AppointmentRequestDetail;
