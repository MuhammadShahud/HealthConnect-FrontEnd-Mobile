import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
  ToastAndroid,
  ScrollView,
  StyleSheet
} from 'react-native';
import Slider from '@react-native-community/slider';
import Entypo from 'react-native-vector-icons/Entypo';
import {SubmitButton, TextInput} from '..';
import {MaleDoctorImg} from '../../Assets';
import {Colors} from '../../Styles';
import {style} from './style';
import {useNavigation} from '@react-navigation/native';
import AuthMiddleware from '../../Store/Middleware/AuthMiddleware';
import {useDispatch} from 'react-redux';
import { IMG_URL } from '../../Store/Apis';
import AppMiddleware from '../../Store/Middleware/AppMiddleware';
import { useSelector } from 'react-redux';
import DoctorMiddleware from '../../Store/Middleware/DoctorMiddleware';
import DoctorAction from '../../Store/Actions/DoctorAction';
import SelectDropdown from 'react-native-select-dropdown'
import DateTimePickerModal from "react-native-modal-datetime-picker"
import moment from 'moment';
import SubServicesMiddleware from '../../Store/Middleware/SubServicesMiddleware';
import TeleHealthAction from '../../Store/Actions/TeleHealthAction';
import TeleHealthMiddleware from '../../Store/Middleware/TeleHealthMiddleware';
import Storage from '../../Utils/AsyncStorage';

const timeSlot = [
  15, 20, 25, 30
]

const Popup = props => {

  // console.log('-----', props);
  const AuthState = useSelector(state => state.AuthReducer);
  // const userID = AuthState?.user?.user?.id
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [reTypePassword, setReTypePassword] = useState('');
  const [code, setCode] = useState('')
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [distance, setDistance] = useState(null)
  const [rating, setRating] = useState(null)
  const [experience, setExperience] = useState(null)
  const [slots, setSlots] = useState(timeSlot)
  const [selectedSlot, setselectedSlot] = useState('')
  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [days, setDays] = useState(
    [
    {day : 'Monday', start_time : null, end_time : null, interval : 15},
    {day : 'Tuesday', start_time : null, end_time : null, interval : 15},
    {day : 'Wednesday', start_time : null, end_time : null, interval : 15},
    {day : 'Thursday', start_time : null, end_time : null, interval : 15},
    {day : 'Friday', start_time : null, end_time : null, interval : 15},
    {day : 'Saturday', start_time : null, end_time : null, interval : 15},
    {day : 'Sunday', start_time : null, end_time : null, interval : 15}
    ]
    )
  const [selectedIndex, setselectedIndex] = useState(null)
  const [Category, setCategory] = useState([])
  const [CategoryID, setCategoryID] = useState([])
  const [selectedCategory, setselectedCategory] = useState(null)
  const [selectedCategoryID, setselectedCategoryID] = useState(null)


  useEffect(() => {
    Storage.getToken().then((token) => {    
      // console.warn('===>', token);    
      if (token !=null) {
        dispatch(SubServicesMiddleware.getSubServices({ name: '' }))
      .then((data) =>{
        // console.log('--',data?.data?.data);
        setCategoryID(data?.data?.data)
        let array = []
        for(let i = 0 ; i < data?.data?.data.length ; i++){
          array.push(data?.data?.data[i].sub_service_name)
        }
        setCategory(array)
      } )
      .catch((err) => {        
        console.log(err);
      })
      }
    })
  }, [])


  const showStartDatePicker = (index) => {
    setStartDatePickerVisibility(true);
    setselectedIndex(index)
  };

  const hideStartDatePicker = () => {
    setStartDatePickerVisibility(false);
  };

  const handleStartConfirm = (date) => {
    // console.warn("A date has been picked: ", date);
    console.log('====>',moment(date).format('HH:mm '))
    days[selectedIndex].start_time = moment(date).format('HH:mm')
    hideStartDatePicker();
  };


  const showEndDatePicker = (index) => {
    setEndDatePickerVisibility(true);
    setselectedIndex(index)
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisibility(false);
  };

  const handleEndConfirm = (date) => {
    // console.warn("A date has been picked: ", date);
    // console.log(moment(date).format('hh:mm A'))
    if(days[selectedIndex].start_time == null){
      Alert.alert('Note','Select start time first.')
      hideEndDatePicker();
    }
    else if(days[selectedIndex].start_time > moment(date).format('HH:mm')){
      Alert.alert('Note','End time must be greater than start time.')
      hideEndDatePicker();
    }
    else{
      days[selectedIndex].end_time = moment(date).format('HH:mm')
      hideEndDatePicker();
    }
  };

  const onPressForgotPassword = () => {
    if (email == '') {
      ToastAndroid.showWithGravityAndOffset(
        'Please enter email..',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else {
      props.setPopupType('resetPassword');
      props.setPopupTitle('Verification Code');

      console.warn('Email:', email);

      let userData = {
        email: email,
      };
      dispatch(AuthMiddleware.forgotPassword(userData))
        .then(data => {
          // console.log('data forgotPassword:', data.data.data.confirmation_code);
          setCode(data.data.data.confirmation_code)
          // setEmail('');
        })
        .catch(err => {});
    }
  };


  const onPressVerificationCode = () => {
    if(verificationCode == ''){
      ToastAndroid.showWithGravityAndOffset(
        'Please enter code..',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }
    else if(verificationCode !== code){
      ToastAndroid.showWithGravityAndOffset(
        'Invalid code..',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }
    else{
      setVerificationCode('')
      props.setPopupType('newPassword');
      props.setPopupTitle('Create New Password');
    }
  }


  const onPressNewPassword = () => {
    if(password == ''){
      ToastAndroid.showWithGravityAndOffset(
        'Enter new password..',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }
    else if(reTypePassword == ''){
      ToastAndroid.showWithGravityAndOffset(
        'Re type new password..',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }
    else if(password !== reTypePassword){
      ToastAndroid.showWithGravityAndOffset(
        'password did not match..',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      )
    }
    else{
      // console.log('reset email ===>', email);
      let userData = {
        email: email,
        password: password
      };
      dispatch(AuthMiddleware.resetPassword(userData))
        .then(data => {   
           setEmail('');
           props.onPress(false);
           props.setPopupType('forgotPassword');
           props.setPopupTitle('Forgot Password');
        })
        .catch(err => {props.onPress(false)});
    }
  }

  const onPressChangePassword = () =>{
    if(oldPassword == ''){
      ToastAndroid.showWithGravityAndOffset(
        'Enter old password..',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      )
    }
    else if(password == ''){
      ToastAndroid.showWithGravityAndOffset(
        'Enter new password..',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      )
    }
    else if(reTypePassword == ''){
      ToastAndroid.showWithGravityAndOffset(
        'Re type new password..',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      )
    }
    else if(password !== reTypePassword){
      ToastAndroid.showWithGravityAndOffset(
        'password did not match..',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      )
    }
    else{
      let userData = {
        oldPassword: oldPassword,
        password: password,
        reTypePassword: reTypePassword,
        userID: AuthState?.user?.user?.id
      };
      dispatch(AppMiddleware.changePassword(userData))
        .then(data => {   
          // console.log('===>',data);
          if(data?.success){
           setOldPassword('')
           setPassword('')
           setReTypePassword('')
           props.onPress(false)
           Alert.alert('Note',data?.message)
          }
          else{
            Alert.alert('Note',data?.message)
          }
        })
        .catch(err => {props.onPress(false)});
    }
  }

  const onPressApplyFilter = (id) => {    
      let filterData = {
        rating: rating,
        experience: experience,
        distance: distance,
        serviceid: id
      };
      dispatch(DoctorAction.resetDoctor())
      dispatch(DoctorMiddleware.getFilterDoctor(filterData))
        .then(data => { 
          props.onPress(false)
          setDistance(null)
          setRating(null)
          setExperience(null)
          //  console.log(data.data.length);
        })
        .catch(err => console.log(err));
     
  }


  const onPressSingleFilter = () => {    
    let filterData = {
      rating: rating,
      experience: experience,
      distance: distance,
      serviceid: selectedCategoryID
    };
    dispatch(TeleHealthAction.resetTeleHealth())
    dispatch(TeleHealthMiddleware.getFilterDoctor(filterData))
      .then(data => { 
        props.onPress(false)
        setDistance(null)
        setRating(null)
        setExperience(null)
        //  console.log(data.data.length);
      })
      .catch(err => console.log(err));
   
}


const onPressCategoryFilter = () => {
  if(selectedCategoryID == null){
    ToastAndroid.showWithGravityAndOffset(
      'Select category..',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  }
  else{
    dispatch(TeleHealthMiddleware.getCategoryFilter({ name: '' }, selectedCategoryID))
    .then(data => { 
      // console.log('------',data?.data?.data);
      props.onPress(false)
      setDistance(null)
      setRating(null)
      setExperience(null)
      //  console.log(data.data.length);
    })
  }
}


  return (
    <Modal visible={props?.isVisible} animationType="fade" transparent>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
        }}>
        {props.type === 'forgotPassword' ? (
          <View style={[style.modalContainer, {height: 220}]}>
            <TouchableOpacity
              onPress={() => {
                setEmail('');
                props.onPress(false);
              }}
              style={{
                paddingRight: 4,
                paddingVertical: 6,
                alignSelf: 'flex-end',
              }}>
              <Entypo name="cross" size={25} color={Colors.BLACK} />
            </TouchableOpacity>

            <Text style={style.modalTitle}>{props?.title}</Text>

            <View style={style.inputContainer}>
              <TextInput
                value={email}
                placeholder={'Enter Registered Email Address'}
                placeholderTextColor={Colors.GRAY}
                onChangeText={text => setEmail(text)}
                style={style.input}
              />
            </View>

            <SubmitButton
              text={'Reset Password'}
              onPress={onPressForgotPassword}
              buttonContainer={{
                width: '100%',
                flex: 0,
                paddingVertical: 0,
                marginVertical: 0,
                alignSelf: 'center',
                borderRadius: 12,
              }}
              style={style.button}
            />
          </View>
        ) : 
        //////////////Verification code modal/////////////////

        props.type === 'resetPassword' ? (
          <View style={[style.modalContainer, {height: 220}]}>
            <TouchableOpacity
              onPress={() => {
                setVerificationCode('');
                props.onPress(false);
                props.setPopupType('forgotPassword');
                props.setPopupTitle('Forgot Password');
              }}
              style={{
                paddingRight: 4,
                paddingVertical: 6,
                alignSelf: 'flex-end',
              }}>
              <Entypo name="cross" size={25} color={Colors.BLACK} />
            </TouchableOpacity>

            <Text style={style.modalTitle}>{props?.title}</Text>

            <View style={style.inputContainer}>
              <TextInput
                value={verificationCode}
                placeholder={'Enter Code'}
                placeholderTextColor={Colors.GRAY}
                length={4}
                onChangeText={text => setVerificationCode(text)}
                style={style.input}
              />
            </View>

            <SubmitButton
              text={'Next'}
              onPress={onPressVerificationCode}
              buttonContainer={{
                width: '100%',
                flex: 0,
                paddingVertical: 0,
                marginVertical: 0,
                alignSelf: 'center',
                borderRadius: 12,
              }}
              style={style.button}
            />
          </View>
        ) : 
        /////////////Verification code modal//////////////////

        ////////////////New password modal//////////////////

        props.type === 'newPassword' ? (
          <View style={[style.modalContainer, {height: 275}]}>
            <TouchableOpacity
              onPress={() => {
                setVerificationCode('');
                props.onPress(false);
                props.setPopupType('forgotPassword');
                props.setPopupTitle('Forgot Password');
              }}
              style={{
                paddingRight: 4,
                paddingVertical: 6,
                alignSelf: 'flex-end',
              }}>
              <Entypo name="cross" size={25} color={Colors.BLACK} />
            </TouchableOpacity>

            <Text style={style.modalTitle}>{props?.title}</Text>

            <View style={style.inputContainer}>
              <TextInput
                value={password}
                placeholder={'Enter New Password'}
                placeholderTextColor={Colors.GRAY}
                onChangeText={text => setPassword(text)}
                style={style.input}
              />
              <TextInput
                value={reTypePassword}
                placeholder={'Re Type New Password'}
                placeholderTextColor={Colors.GRAY}
                onChangeText={text => setReTypePassword(text)}
                style={style.input}
              />
            </View>

            <SubmitButton
              text={'Change Password'}
              onPress={onPressNewPassword}
              buttonContainer={{
                width: '100%',
                flex: 0,
                paddingVertical: 0,
                marginVertical: 0,
                alignSelf: 'center',
                borderRadius: 12,
              }}
              style={style.button}
            />
          </View>
        ) :

        //////////////New password modal///////////////////



        ////////////Change password modal////////////////


        props.type === 'changePassword' ? (
          <View style={[style.modalContainer, {height: 325}]}>
            <TouchableOpacity
              onPress={() => props.onPress(false)}
              style={{
                paddingRight: 4,
                paddingVertical: 6,
                alignSelf: 'flex-end',
              }}>
              <Entypo name="cross" size={25} color={Colors.BLACK} />
            </TouchableOpacity>

            <Text style={style.modalTitle}>{props?.title}</Text>

            <View style={style.inputContainer}>
            <TextInput
                value={oldPassword}
                placeholder={'Enter Old Password'}
                placeholderTextColor={Colors.GRAY}
                onChangeText={text => setOldPassword(text)}
                style={style.input}
              />
              <TextInput
                value={password}
                placeholder={'Enter New Password'}
                placeholderTextColor={Colors.GRAY}
                onChangeText={text => setPassword(text)}
                style={style.input}
              />
              <TextInput
                value={reTypePassword}
                placeholder={'Re Type New Password'}
                placeholderTextColor={Colors.GRAY}
                onChangeText={text => setReTypePassword(text)}
                style={style.input}
              />
            </View>

            <SubmitButton
              text={'Change Password'}
              onPress={onPressChangePassword}
              buttonContainer={{
                width: '100%',
                flex: 0,
                paddingVertical: 0,
                marginVertical: 0,
                alignSelf: 'center',
                borderRadius: 12,
              }}
              style={style.button}
            />
          </View>
        ) :

        ////////////Change password modal////////////////


        ////////////Change password modal////////////////


        props.type === 'timeSlots' ? (
          <View style={[style.modalContainer, {height: '80%'}]}>
            <TouchableOpacity
              onPress={() => props.onPress(false)}
              style={{
                paddingRight: 4,
                paddingVertical: 6,
                alignSelf: 'flex-end',
              }}>
              <Entypo name="cross" size={25} color={Colors.BLACK} />
            </TouchableOpacity>

            <Text style={style.modalTitle}>{props?.title}</Text>

            <ScrollView>

            {/* Days */}
            {days.map((item, index) => {
              return (
            <View style={{marginLeft: 10, marginRight: 10, marginTop: 10, alignItems: 'center'}}>
              
              <View
              style={{borderRadius : 12, borderColor: Colors.LIGHT_GREEN, borderWidth: 1, width: '100%' }}>
                <Text style={{padding: 12, color: 'grey', alignSelf: 'center'}}>{item?.day}</Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 7 }}>
              <TouchableOpacity
              onPress={()=>showStartDatePicker(index)}
                style={styles.startendtime}
              >
                <Text style={{ color: Colors.GRAY, paddingLeft: 5 }}>{item?.start_time ? moment("1 jan 1970 "+item?.start_time).format("hh:mm A") : 'Start Time'}</Text>
              </TouchableOpacity>

              <TouchableOpacity
              onPress={()=>showEndDatePicker(index)}
                style={styles.startendtime}
              >
                <Text style={{ color: Colors.GRAY, paddingLeft: 5 }}>{item.end_time ?moment("1 jan 1970 "+item?.end_time).format("hh:mm A") : 'End Time'}</Text>
              </TouchableOpacity>
              </View>

              <View style={styles.pickerContainer}>
              <SelectDropdown
                buttonStyle={{ width: '90%', backgroundColor: 'transparent', alignSelf: 'center' }}
                defaultButtonText={'Select Interval Time'}
                buttonTextStyle={{ color: Colors.GRAY }}
                // defaultValue={15}
                data={slots}
                onSelect={(selectedItem, ind) => {
                  days[index].interval = selectedItem
                  setselectedSlot(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                  return item
                }}
              />
             </View>
            </View>
            );
          })}
          {/* Days */}

            </ScrollView>

            <DateTimePickerModal
            isVisible={isStartDatePickerVisible}
            mode="time"
            onConfirm={handleStartConfirm}
            onCancel={hideStartDatePicker}
          />

          <DateTimePickerModal
            isVisible={isEndDatePickerVisible}
            mode="time"
            onConfirm={handleEndConfirm}
            onCancel={hideEndDatePicker}
          />

            <SubmitButton
              text={'Done'}
              onPress={() =>{
                props.onPress(false)
                let data = []
                // for(let i = 0 ; i < days.length ; i++){
                //   if( (days[i].start_time !== null) && (days[i].end_time !== null)){
                //     data.push(days[i]);
                //   }
                // }
                props.data(days)
              }}
              buttonContainer={{
                width: '100%',
                flex: 0,
                paddingVertical: 0,
                marginVertical: 0,
                alignSelf: 'center',
                borderRadius: 12,
                marginBottom : 15
              }}
              style={style.button}
            />
          </View>
        ) :

        ////////////Change password modal////////////////


        props.type === 'bookAppointment' ? (
          <View style={style.modalContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate(props?.onPress)}
              style={{
                paddingRight: 4,
                paddingVertical: 6,
                alignSelf: 'flex-end',
              }}>
              <Entypo name="cross" size={25} color={Colors.BLACK} />
            </TouchableOpacity>
            <Text style={style.modalTitle}>{props?.title}</Text>

            <View style={style.inputContainer}>
              <Image
                source={props?.docImage ? {uri : IMG_URL + props?.docImage} : require('../../Assets/Images/avatar.png')}
                style={{
                  width: 65,
                  height: 65,
                  borderRadius: 100,
                  marginVertical: 12,
                }}
              />

              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: Colors.BLACK,
                }}>
                {props?.docName}
              </Text>
              <Text style={{color: Colors.BLACK}}>{moment(props?.date).format('MM-DD-YYYY')}</Text>
              <Text style={{color: Colors.BLACK}}>{props?.time}</Text>
            </View>
          </View>
        ) : 


        ////////////////medical assistant////////////

        props.type === 'medicalAssistant' ? (
          <View style={style.modalContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate(props?.onPress)}
              style={{
                paddingRight: 4,
                paddingVertical: 6,
                alignSelf: 'flex-end',
              }}>
              <Entypo name="cross" size={25} color={Colors.BLACK} />
            </TouchableOpacity>
            

            <View style={style.inputContainer}>
              <Image
                source={props?.docImage ? {uri : IMG_URL + props?.docImage} : require('../../Assets/Images/avatar.png')}
                style={{
                  width: 65,
                  height: 65,
                  borderRadius: 100,
                  marginVertical: 12,
                }}
              />

              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: Colors.BLACK,
                }}>
                {props?.docName}
              </Text>
            </View>
            <Text style={style.modalTitle}>{props?.wait}</Text>
            <Text style={{color: '#000', textAlign: 'center', alignSelf: 'center', paddingTop: 5}}>{props?.title}</Text>
          </View>
        ) : 
        
        ////////////Multiple Filter////////////////
        
        props.type === 'filter' ? (
          <View style={[style.modalContainer, {height: 250}]}>
            <TouchableOpacity
              onPress={() => props.onPress(false)}
              style={{
                paddingRight: 4,
                paddingVertical: 6,
                alignSelf: 'flex-end',
              }}>
              <Entypo name="cross" size={25} color={Colors.BLACK} />
            </TouchableOpacity>

            {/* <View>
            <Text
              style={{
                paddingHorizontal: 12,
                fontSize: 16,
                color: Colors.BLACK,
              }}>
              Distance
            </Text>

            <Text
              style={{alignSelf: 'center', position: 'absolute', color: '#000'}}>
              {distance ? distance : null}
            </Text>
            </View> */}

            {/* <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                paddingHorizontal: 12,
              }}>
              <Text style={{color: '#000'}}>0 miles</Text>

              <Slider
                style={{width: 200, height: 40}}
                minimumValue={0}
                maximumValue={10}
                minimumTrackTintColor={Colors.LIGHT_GREEN}
                maximumTrackTintColor="#000000"
                onValueChange={val=>setDistance(parseInt(val))}
              />

              <Text style={{color: '#000'}}>10+ miles</Text>
            </View> */}

            <View>
            <Text
              style={{
                paddingHorizontal: 12,
                fontSize: 16,
                color: Colors.BLACK,
              }}>
              Rating
            </Text>

            <Text
              style={{alignSelf: 'center', position: 'absolute', color: '#000'}}>
              {rating ? rating : null}
            </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                paddingHorizontal: 12,
              }}>
              <Text style={{color: '#000'}}>0 Star</Text>

              <Slider
                style={{width: 200, height: 40}}
                minimumValue={0}
                maximumValue={5}
                minimumTrackTintColor={Colors.LIGHT_GREEN}
                maximumTrackTintColor="#000000"
                onValueChange={val=>setRating(parseInt(val))}
              />

              <Text style={{color: '#000'}}>5 Star</Text>
            </View>

            <View>
            <Text
              style={{
                paddingHorizontal: 12,
                fontSize: 16,
                color: Colors.BLACK,
              }}>
              Experience
            </Text>

            <Text
              style={{alignSelf: 'center', position: 'absolute', color: '#000'}}>
              {experience ? experience : null}
            </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                paddingHorizontal: 12,
              }}>
              <Text style={{color: '#000'}}>0 Yrs</Text>

              <Slider
                style={{width: 200, height: 40}}
                minimumValue={0}
                maximumValue={10}
                minimumTrackTintColor={Colors.LIGHT_GREEN}
                maximumTrackTintColor="#000000"
                onValueChange={val=>setExperience(parseInt(val))}
              />

              <Text style={{color: '#000'}}>10+ Yrs</Text>
            </View>

            <SubmitButton
              text={'Apply Filter'}
              onPress={()=>onPressApplyFilter(props.id)}
              buttonContainer={{
                width: '100%',
                flex: 0,
                paddingVertical: 0,
                marginVertical: 0,
                alignSelf: 'center',
                borderRadius: 12,
              }}
              style={style.button}
            />
          </View>
        ) : 
        
        ////////////Single distance Filter////////////////

        props.type === 'Distance' ? (
          <View style={[style.modalContainer, {height: 200}]}>
            <TouchableOpacity
              onPress={() => props.onPress(false)}
              style={{
                paddingRight: 4,
                paddingVertical: 6,
                alignSelf: 'flex-end',
              }}>
              <Entypo name="cross" size={25} color={Colors.BLACK} />
            </TouchableOpacity>

            <View>
            <Text
              style={{
                paddingHorizontal: 12,
                fontSize: 16,
                color: Colors.BLACK,
              }}>
              Distance
            </Text>

            <Text
              style={{alignSelf: 'center', position: 'absolute', color: '#000'}}>
              {distance ? distance : null}
            </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                paddingHorizontal: 12,
              }}>
              <Text style={{color: '#000'}}>0 miles</Text>

              <Slider
                style={{width: 200, height: 40}}
                minimumValue={0}
                maximumValue={10}
                minimumTrackTintColor={Colors.LIGHT_GREEN}
                maximumTrackTintColor="#000000"
                onValueChange={val=>setDistance(parseInt(val))}
              />

              <Text style={{color: '#000'}}>10+ miles</Text>
            </View>            

            <SubmitButton
              text={'Apply Filter'}
              buttonContainer={{
                width: '100%',
                flex: 0,
                paddingVertical: 0,
                marginVertical: 0,
                alignSelf: 'center',
                borderRadius: 12,
              }}
              style={style.button}
            />
          </View>
        ) :


        ////////////Category Filter/////////////

        props.type === 'Category' ? (
          <View style={[style.modalContainer, {height: 200}]}>
            <TouchableOpacity
              onPress={() => props.onPress(false)}
              style={{
                paddingRight: 4,
                paddingVertical: 6,
                alignSelf: 'flex-end',
              }}>
              <Entypo name="cross" size={25} color={Colors.BLACK} />
            </TouchableOpacity>

            <View>
            <Text
              style={{
                paddingHorizontal: 12,
                fontSize: 16,
                color: Colors.BLACK,
              }}>
              Category
            </Text>
            </View> 

            <View style={styles.pickerContainer}>
              <SelectDropdown
                buttonStyle={{ width: '90%', backgroundColor: 'transparent', alignSelf: 'center' }}
                buttonTextStyle={{ color: Colors.GRAY }}
                defaultValue={15}
                data={Category}
                onSelect={(selectedItem, ind) => {
                  setselectedCategory(selectedItem);
                  for(let i = 0 ; i < CategoryID.length ; i++){
                    if(selectedItem == CategoryID[i].sub_service_name){
                      setselectedCategoryID(CategoryID[i].service_id)
                    }
                  }
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                  return item
                }}
              />
             </View>        

            <SubmitButton
              text={'Apply Filter'}
              onPress={()=>onPressCategoryFilter()}
              buttonContainer={{
                width: '100%',
                flex: 0,
                paddingVertical: 0,
                marginVertical: 0,
                alignSelf: 'center',
                borderRadius: 12,
              }}
              style={style.button}
            />
          </View>
        ) :


        ////////////Single Rating Filter////////////////


        props.type === 'Rating' ? (
          <View style={[style.modalContainer, {height: 200}]}>
            <TouchableOpacity
              onPress={() => props.onPress(false)}
              style={{
                paddingRight: 4,
                paddingVertical: 6,
                alignSelf: 'flex-end',
              }}>
              <Entypo name="cross" size={25} color={Colors.BLACK} />
            </TouchableOpacity>            

            <View>
            <Text
              style={{
                paddingHorizontal: 12,
                fontSize: 16,
                color: Colors.BLACK,
              }}>
              Rating
            </Text>

            <Text
              style={{alignSelf: 'center', position: 'absolute', color: '#000'}}>
              {rating ? rating : null}
            </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                paddingHorizontal: 12,
              }}>
              <Text style={{color: '#000'}}>0 Star</Text>

              <Slider
                style={{width: 200, height: 40}}
                minimumValue={0}
                maximumValue={5}
                minimumTrackTintColor={Colors.LIGHT_GREEN}
                maximumTrackTintColor="#000000"
                onValueChange={val=>setRating(parseInt(val))}
              />

              <Text style={{color: '#000'}}>5 Star</Text>
            </View>

            <SubmitButton
              text={'Apply Filter'}
              onPress={()=>onPressSingleFilter()}
              buttonContainer={{
                width: '100%',
                flex: 0,
                paddingVertical: 0,
                marginVertical: 0,
                alignSelf: 'center',
                borderRadius: 12,
              }}
              style={style.button}
            />
          </View>
        ) :


        ////////////Single Experience Filter////////////////


        props.type === 'Experience' ? (
          <View style={[style.modalContainer, {height: 200}]}>
            <TouchableOpacity
              onPress={() => props.onPress(false)}
              style={{
                paddingRight: 4,
                paddingVertical: 6,
                alignSelf: 'flex-end',
              }}>
              <Entypo name="cross" size={25} color={Colors.BLACK} />
            </TouchableOpacity>

            <View>
            <Text
              style={{
                paddingHorizontal: 12,
                fontSize: 16,
                color: Colors.BLACK,
              }}>
              Experience
            </Text>

            <Text
              style={{alignSelf: 'center', position: 'absolute', color: '#000'}}>
              {experience ? experience : null}
            </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                paddingHorizontal: 12,
              }}>
              <Text style={{color: '#000'}}>0 Yrs</Text>

              <Slider
                style={{width: 200, height: 40}}
                minimumValue={0}
                maximumValue={10}
                minimumTrackTintColor={Colors.LIGHT_GREEN}
                maximumTrackTintColor="#000000"
                onValueChange={val=>setExperience(parseInt(val))}
              />

              <Text style={{color: '#000'}}>10+ Yrs</Text>
            </View>

            <SubmitButton
              text={'Apply Filter'}
              onPress={()=>onPressSingleFilter()}
              buttonContainer={{
                width: '100%',
                flex: 0,
                paddingVertical: 0,
                marginVertical: 0,
                alignSelf: 'center',
                borderRadius: 12,
              }}
              style={style.button}
            />
          </View>
        ) : 
        
        props.type === 'videoCall' ? (
          <View style={style.modalContainer}>
            <TouchableOpacity
              onPress={() => props.onPress(false)}
              style={{
                paddingRight: 4,
                paddingVertical: 6,
                alignSelf: 'flex-end',
              }}>
              <Entypo name="cross" size={25} color={Colors.BLACK} />
            </TouchableOpacity>
            <Text style={style.modalTitle}>{props?.title}</Text>

            <View style={style.inputContainer}>
              <Text style={{color: Colors.BLACK, paddingTop: 6}}>01:30</Text>
              <Image
                source={MaleDoctorImg}
                style={{
                  width: 65,
                  height: 65,
                  borderRadius: 100,
                  marginVertical: 12,
                }}
              />

              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: Colors.BLACK,
                }}>
                Dr. John Doe
              </Text>
            </View>

            <SubmitButton
              text={'Write Review'}
              onPress={() => {
                navigation.navigate('AddReview'), props.onPress(false);
              }}
              buttonContainer={{
                width: '100%',
                flex: 0,
                paddingVertical: 0,
                marginTop: 6,
                alignSelf: 'center',
                borderRadius: 12,
              }}
              style={style.button}
            />
          </View>
        ) : props.type === 'doctor_detail' ? (
          <View style={style.modalContainer}>
            <TouchableOpacity
              onPress={() => props.onPress(false)}
              style={{
                paddingRight: 4,
                paddingVertical: 6,
                alignSelf: 'flex-end',
              }}>
              <Entypo name="cross" size={25} color={Colors.BLACK} />
            </TouchableOpacity>

            <View style={style.inputContainer}>
              <Image
                source={MaleDoctorImg}
                style={{
                  width: 65,
                  height: 65,
                  borderRadius: 100,
                  marginVertical: 12,
                }}
              />

              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: Colors.BLACK,
                }}>
                Dr. John Doe
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: Colors.BLACK,
                  marginTop: 20,
                }}>
                Please wait
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  //  color: Colors.BLACK,
                  paddingHorizontal: 20,
                  textAlign: 'center',
                }}>
                Your request has been sent to the admin for the medical
                Assistant service.
              </Text>
            </View>
          </View>
        ) : null}
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Colors.WHITE,
  },
  bodyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  MH5: { marginHorizontal: 5 },
  BGImage: {
    width: 150,
    height: 150,
    borderRadius: 15,
    overflow: 'hidden',
  },
  editText: {
    fontSize: 12,
  },
  doctorName: {
    color: Colors.BLACK,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  FS14: {
    fontSize: 14,
  },
  doctorEmail: {
    paddingTop: 5,
    paddingBottom: 10,
    fontSize: 12,
    color: 'grey'
  },
  editContainer: {
    backgroundColor: Colors.WHITE,
    position: 'absolute',
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderRadius: 3,
    alignItems: 'center',
  },
  inputContainer: {
    alignItems: 'center',
  },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    color: '#000'
  },
  pickerContainer: {
    width: '90%',
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Colors.LIGHT_GREEN,
    marginVertical: 6,
    alignSelf: 'center'
  },
  button: {
    width: '90%',
    paddingVertical: 18,
    marginVertical: 6,
    backgroundColor: Colors.LIGHT_GREEN,
    alignSelf: 'center',
    borderRadius: 12,
  },
  startendtime: {
    width: '47%',
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Colors.LIGHT_GREEN,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 7,
    height: 45,
  },
});

export default Popup;
