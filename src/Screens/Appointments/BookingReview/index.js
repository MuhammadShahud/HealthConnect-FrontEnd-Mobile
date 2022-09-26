import React, {useState} from 'react';
import {View, Text, Image, ScrollView, ActivityIndicator, Alert} from 'react-native';
import {style} from '../style';
import {Header, Popup, SubmitButton} from '../../../Components';
import {Colors} from '../../../Styles';
import {AirbnbRating} from 'react-native-ratings';
import {MaleDoctorImg} from '../../../Assets';
import { IMG_URL } from '../../../Store/Apis';
import {useDispatch} from 'react-redux';
import BookAppointmentMiddleware from '../../../Store/Middleware/BookAppointmentMiddleware';
import { NavigationContainer } from '@react-navigation/native';
import moment from 'moment';

const BookingReview = props => {

  const [isVisible, setIsVisible] = useState(false);
  const [loader, setLoader] = useState(false)
  const data = props?.route?.params?.review
  const payment_method_id = props?.route?.params?.payment_method_id
  const dispatch = useDispatch();

  console.log('------',data, '----', payment_method_id);


  const bookAppointment = () => {
    setLoader(true)
    let userData = {
      date: data?.date,
      time: data?.time,
      patient_name: data?.name,
      patient_number: data?.number,
      patient_age: data?.age,
      gender: data?.gender
    };
    dispatch(BookAppointmentMiddleware.bookAppointment(userData, data?.docInfo?.id))
      .then(data => {
        console.log(data?.data);
        if(data?.data?.success){
          setIsVisible(true)
          setLoader(false)
        }
        else{
          Alert.alert('Note',data?.data?.message)
          setLoader(false)
        }        
      })
      .catch(err => { console.log(err);});
  }


  const bookSpecialistAppointment = () => {
    setLoader(true)
    let userData = {
      date: data?.date,
      time: data?.time,
      patient_name: data?.name,
      patient_number: data?.number,
      patient_age: data?.age,
      gender: data?.gender,
      payment_method_id: payment_method_id,
      doctor_id: data?.docInfo?.id

    };
    dispatch(BookAppointmentMiddleware.bookSpecialistAppointment(userData))
      .then(data => {
        console.log(data?.data);
        if(data?.data?.success){
          setIsVisible(true)
          setLoader(false)
        }
        else{
          Alert.alert('Note',data?.data?.message)
          setLoader(false)
        }        
      })
      .catch(err => { console.log(err);});
  }
  
  if(loader == true){
    return(

      <View
    style={{flex: 1, backgroundColor: Colors.WHITE, alignItems: 'center', justifyContent: 'center'}}
    >
      <ActivityIndicator
      size='large'
      color={Colors.LIGHT_GREEN}
      />
    </View>

    )
  }
  else{

    return (
      <View style={style.container}>
        <View style={{paddingHorizontal: 22}}>
          <Header headerLeft={true} title={'Booking Review'} />
        </View>
  
        <ScrollView>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              marginVertical: 12,
              paddingVertical: 10,
              paddingHorizontal: 14,
              backgroundColor: Colors.BG_GRAY,
              borderRadius: 12,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={
                data?.docInfo?.profile_pic
                  ? { uri: IMG_URL + data?.docInfo?.profile_pic }
                  : require('../../../Assets/Images/avatar.png')
              }
              style={{width: 55, height: 55, borderRadius: 100, paddingLeft: 12}}
            />
            <View style={{paddingHorizontal: 10}}>
              <Text
                style={{fontSize: 16, fontWeight: 'bold', color: Colors.BLACK}}>
                {data?.docInfo?.username}
              </Text>
              <Text>{data?.docInfo?.type}</Text>
  
              <View style={{alignItems: 'flex-start'}}>
                <AirbnbRating
                  showRating={false}
                  count={5}
                  defaultRating={data?.docInfo?.average_rating ? data?.docInfo?.average_rating : 0}
                  size={10}
                />
              </View>
            </View>
          </View>
  
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              marginVertical: 14,
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: Colors.BLACK,
              }}>
              Visit Time
            </Text>
            {/* <Text>Morning</Text> */}
            <Text style={{color: '#000'}}>{moment(data?.date).format('MM-DD-YYYY')}</Text>
            <Text style={{color: '#000'}}>{data?.time}</Text>
            <Text
              style={{
                paddingTop: 14,
                fontSize: 18,
                fontWeight: 'bold',
                color: Colors.BLACK,
              }}>
              Patient Information
            </Text>
            <Text style={{color: '#000'}}>Name: {data?.name}</Text>
            <Text style={{color: '#000'}}>Age: {data?.age}</Text>
            <Text style={{color: '#000'}}>Phone: {data?.number}</Text>
            <Text
              style={{
                paddingTop: 14,
                fontSize: 18,
                fontWeight: 'bold',
                color: Colors.BLACK,
              }}>
              Payment
            </Text>
            <Text style={{color: '#000'}}>Family Plan</Text>
            {data?.docInfo?.specialist == 'Yes' ? (
              <>
                <Text
                  style={{
                    paddingTop: 14,
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: Colors.BLACK,
                  }}>
                  Specialist Service Charges Applicable
                </Text>
                <Text style={{color: '#000'}}>$15.00</Text>
              </>
            ) : null}
          </View>
        </ScrollView>
        
        {payment_method_id ? 
        <SubmitButton
        onPress={bookSpecialistAppointment}
        text={'Book Appointment'}
        textStyle={style.textStyle}
        buttonContainer={style.bookButton}
        />
        :<SubmitButton
          onPress={bookAppointment}
          text={'Book Appointment'}
          textStyle={style.textStyle}
          buttonContainer={style.bookButton}
        />}
  
        <Popup
          isVisible={isVisible}
          type={'bookAppointment'}
          title={'Please wait until your request is accepted from doctor'}
          docImage={data?.docInfo?.profile_pic}
          docName={data?.docInfo?.username}
          date={data?.date}
          time={data?.time}
          onPress={'Home'}
        />
      </View>
    );

  }
};

export default BookingReview;
