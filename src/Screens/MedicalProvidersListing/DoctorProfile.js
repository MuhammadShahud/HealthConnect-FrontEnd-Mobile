import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Linking,
  Platform,
  Alert
} from 'react-native';
import { style } from './style';
import { Header, SubmitButton } from '../../Components';
import { AirbnbRating } from 'react-native-ratings';
import { Colors } from '../../Styles';
import { FemaleDoctorImg, MaleDoctorImg, MessageIcon, PhoneIcon, videoIcon } from '../../Assets';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { IMG_URL } from '../../Store/Apis';
import AllUserRatingMiddleware from '../../Store/Middleware/AllUserRatingMidleware';
import { useDispatch, useSelector } from 'react-redux';
import { ChatMiddleware } from '../../Store/Middleware/ChatMiddleware';
import moment from 'moment';

const DoctorProfile = props => {

  useEffect(() => {
    dispatch(AllUserRatingMiddleware.getAllUserRating(props?.route?.params?.item?.id))
      .then((data) => {
        setdoctors(data?.data)
      })
      .catch((err) => {
        ///  console.log('----', err)
      })
  }, [])

  const AuthState = useSelector(state => state.AuthReducer);
  const dispatch = useDispatch();
  const [doctors, setdoctors] = useState([])
  const [phone, SetPhone] = useState(props?.route?.params?.item?.phone_number)
  const navigation = useNavigation();
  let { item } = props?.route?.params;

  console.log('++++++',item?.time_slot);


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


  const showAlert = () => {
    Alert.alert(
        'Note',
        'Please subscribe to the package',
        [{
            text: 'Cancel',
        },
        {
            text: 'Ok',
            onPress: () => navigation.navigate('Subscription'),
            style: 'cancel'
        }],
    );
};

  const renderReviewList = ({ item }) => {
    return (
      <View style={style.userContainer}>
        <Image source={
          item.profile_pic
            ? { uri: IMG_URL + item.profile_pic }
            : require('../../Assets/Images/avatar.png')
        } style={style.userimage} />

        <View style={{ flex: 1 }}>
          <View style={style.userSubContainer}>
            <Text style={style.name}>{item?.username}</Text>
            <AirbnbRating showRating={false}
              count={5}
              isDisabled={true}
              defaultRating={item?.rating ? item.rating : 0}
              size={10}
            />
          </View>

          <Text style={{ paddingHorizontal: 10, fontSize: 12, color: '#000' }}>{item.comments}</Text>
        </View>
      </View>
    );
  };
  const ChatSession = (item) => {
    console.warn("hello", item?.id);
    dispatch(ChatMiddleware.ChatSession({
      id: item?.id,
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

  return (
    <View style={style.container}>
      <View style={{ paddingHorizontal: 22 }}>
        <Header headerLeft={true} title={'Doctor Profile'} />
      </View>

      <ScrollView>
        <View style={style.topContainer}>
          <Image
            source={
              item.profile_pic
                ? { uri: IMG_URL + item.profile_pic }
                : require('../../Assets/Images/avatar.png')
            }
            style={{ width: 140, height: 140, borderRadius: 12 }}
            resizeMode="contain"
          />
          <Text
            style={[
              style.name,
              {
                paddingVertical: 8,
                fontSize: 18,
              },
            ]}>
            {item.username}{' '}
            {item?.specialist == 'Yes' ? (
              <Text
                style={{
                  fontSize: 14,
                  color: Colors.LIGHT_GREEN,
                }}>
                (Specialist)
              </Text>
            ) : null}
          </Text>

          <Text
            style={{
              fontSize: 16,
              color: '#000'
            }}>
            {item.speciality}
          </Text>

          { item?.experience ? <Text style={style.expText}>
            {item?.experience} <Text style={{ fontWeight: 'normal', color: '#000' }}>Years Exp.</Text>
          </Text> : null}

          {/* <View style={style.iconContainer}>
            <TouchableOpacity style={style.iconButton}
              onPress={() => onPressCall(item?.phone_number)}>
              <Image
                source={PhoneIcon}
                style={{ width: 25, height: 25 }}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('VideoCallTest')}
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
          </View> */}
        </View>

        <View style={style.lineContainer} />

        <View style={style.bottomContainer}>
          <Text style={style.title}>About Doctor</Text>

          <Text style={{ color: '#000' }}>{item.about}</Text>

          <Text
            style={[
              style.title,
              {
                paddingTop: 10,
              },
            ]}>
            Visiting Days & Time
          </Text>

          {item?.doctor_timing.length != 0 ?
              item?.doctor_timing.map((item, index) => {
                return(
                  <View>
                  { item?.start_time ? <Text style={{color: '#000',fontWeight:'bold',fontSize:14}}>{item?.day}: <Text style={{color: '#000',fontWeight:'normal',fontSize:13}}>{moment("1 jan 1970 "+item?.start_time).format("hh:mm A")} to {moment("1 jan 1970 "+item?.end_time).format("hh:mm A")}</Text></Text> : null }
                  </View>
                )
              })
           : 
           <Text
            style={{alignSelf: 'center', color: '#000', paddingTop: 10}}
            >
            Doctor Timing Unavailable
          </Text>           
           }

          {item?.specialist == 'Yes' ? (
            <>
              <Text
                style={[
                  style.title,
                  {
                    paddingTop: 10,
                  },
                ]}>
                Specialist Service Charges Applicable
              </Text>
              <Text style={{ color: '#000' }}>$15.00</Text>
            </>
          ) : null}

          <Text
            style={[
              style.title,
              {
                paddingTop: 10,
              },
            ]}>
            Directions
          </Text>

          <MapView
            style={style.mapView}
            onPress={() => navigation.navigate('Map', {
              lat: (item?.lat !== null) ? parseFloat(item?.lat) : 40.7075694,
              lng: (item?.lng !== null) ? parseFloat(item?.lng) : -74.0050887,
            })}
            initialRegion={{
              latitude: (item?.lat !== null) ? parseFloat(item?.lat) : 40.7075694,
              longitude: (item?.lng !== null) ? parseFloat(item?.lng) : -74.0050887,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {
              (item?.lat !== null && item?.lng !== null)
                ?
                <Marker
                  coordinate={{ latitude: (item?.lat !== null) ? parseFloat(item?.lat) : 40.7075694, longitude: (item?.lng !== null) ? parseFloat(item?.lng) : -74.0050887 }}
                />
                :
                null
            }
          </MapView>

          <Text
            style={[
              style.title,
              {
                paddingTop: 10,
              },
            ]}>
            Reviews
          </Text>

         { doctors.length != 0 ? 
            <FlatList data={doctors}
            renderItem={renderReviewList} /> 
            :
            <Text
            style={{alignSelf: 'center', color: '#000', paddingTop: 10}}
            >
            No Reviews
          </Text>
            }
        </View>
      </ScrollView>

      {AuthState?.user?.user?.subscription.length != 0 ? 
      <>
      {item?.doctor_timing.length != 0 ? <SubmitButton
        onPress={() => { 
            navigation.navigate('BookAppointment',{ docInfo : item });
        }}
        text={'Book an Appointment'}
        textStyle={style.textStyle}
        buttonContainer={style.buttonContainer}
      />: null}
      </>
       :
      <SubmitButton
        onPress={() => showAlert()}
        text={'Book an Appointment'}
        textStyle={style.textStyle}
        buttonContainer={style.buttonContainer}
      />
      }
    </View>
  );
};

export default DoctorProfile;
