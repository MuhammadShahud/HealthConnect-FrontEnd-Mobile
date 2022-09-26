import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  StyleSheet,
  PermissionsAndroid,
  ToastAndroid,
   ActivityIndicator,
   Alert
} from 'react-native';
import { Header, SubmitButton, TextInput, Text, Popup } from '../../Components';
import { Colors } from '../../Styles';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown'
import { profileImg } from '../../Assets';
import { useSelector } from 'react-redux';
import { IMG_URL } from '../../Store/Apis';
import DocumentPicker, { types } from "react-native-document-picker";
import { useDispatch } from 'react-redux';
import ProfileMiddleware from '../../Store/Middleware/ProfileMiddleware';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import { OpenImagePicker } from '../../config';
import SubServicesMiddleware from '../../Store/Middleware/SubServicesMiddleware';


const timeSlot = [
  'Interval Slots', 'Interval Slots 2', 'Interval Slots 3', 'Interval Slots 4'
]

const pickerList = [
  'Gender',
  'male',
  'female',
];

const EditProfile = props => {
  const AuthState = useSelector(state => state.AuthReducer);
  const [pickerData, setPicker] = useState(pickerList)
  const [slots, setSlots] = useState(timeSlot)
  const [selectedSlot, setselectedSlot] = useState('')
  const [profileImage, setprofileImage] = useState(AuthState?.user?.user?.profile_pic ? { uri: IMG_URL + AuthState?.user?.user?.profile_pic } : require('../../Assets/Images/avatar.png'))
  const [selectedImage, setSelectedImage] = useState(null)
  const [gender, setGender] = useState(AuthState?.user?.user?.gender ? AuthState?.user?.user?.gender : '');
  const [userName, setUserName] = useState(AuthState?.user?.user?.username ? AuthState?.user?.user?.username : '')
  const [contactNumber, setContactNumber] = useState(AuthState?.user?.user?.phone_number ? AuthState?.user?.user?.phone_number : '')
  const [address, setAddress] = useState(AuthState?.user?.user?.address ? AuthState?.user?.user?.address : '')
  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [startTime, setStartTime] = useState('Start Time')
  const [endTime, setEndTime] = useState('End Time')
  const [NewProfile_Image, setNewProfile_Image] = useState('')
  const [popupType, setPopupType] = useState('timeSlots');
  const [popupTitle, setPopupTitle] = useState('Time Slots');
  const [isVisible, setIsVisible] = useState(false);
  const [loader, setloader] = useState(false)


  ///////////////for doctor//////////////
  const [DocProfession, setDocProfession] = useState(AuthState?.user?.user?.type ? AuthState?.user?.user?.type : '')
  const [DocExperience, setDocExperience] = useState(AuthState?.user?.user?.experience ? AuthState?.user?.user?.experience : '')
  const [TimeSlots, setTimeSlots] = useState([])
  const [Category, setCategory] = useState([])

  const [City, setCity] = useState(AuthState?.user?.user?.city ? AuthState?.user?.user?.city : '')
  const [State, setState] = useState(AuthState?.user?.user?.state ? AuthState?.user?.user?.state : '')
  const [Country, setCountry] = useState(AuthState?.user?.user?.country ? AuthState?.user?.user?.country : '')
  const [Zip, setZip] = useState(AuthState?.user?.user?.zip ? AuthState?.user?.user?.zip : '')

  const navigation = useNavigation();
  const dispatch = useDispatch();

  console.log('+++',AuthState?.user?.user?.type);


  useEffect(() => {
    onSetDoctorTiming()
    dispatch(SubServicesMiddleware.getSubServices({ name: '' }))
      .then((data) =>{
        let array = []
        for(let i = 0 ; i < data?.data?.data.length ; i++){
          array.push(data?.data?.data[i].sub_service_name)
        }
        setCategory(array)
      } )
      .catch((err) => {        
        console.log(err);
      })
  }, [])


  const onSetDoctorTiming = () => {
    let array = []
      for(let j = 0 ; j < AuthState?.user?.user?.doctor_timing.length ; j++ ){
          array.push({day : AuthState?.user?.user?.doctor_timing[j].day , start_time : AuthState?.user?.user?.doctor_timing[j].start_time , end_time : AuthState?.user?.user?.doctor_timing[j].end_time , interval : AuthState?.user?.user?.doctor_timing[j].interval})
      }
      setTimeSlots(array)
  }


  const showStartDatePicker = () => {
    setStartDatePickerVisibility(true);
  };

  const hideStartDatePicker = () => {
    setStartDatePickerVisibility(false);
  };

  const handleStartConfirm = (date) => {
    // console.warn("A date has been picked: ", date);
    setStartTime(moment(date).format('hh:mm A'))
    hideStartDatePicker();
  };


  const showEndDatePicker = () => {
    setEndDatePickerVisibility(true);
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisibility(false);
  };

  const handleEndConfirm = (date) => {
    // console.warn("A date has been picked: ", date);
    setEndTime(moment(date).format('hh:mm A'))
    hideEndDatePicker();
  };

  const onPressEdit = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Storage Permission",
          message:
            "HealthConet needs access to your storage ",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        onPressSelectImage()
      } else {
        Alert.alert("Note", "Storage permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }

  const onPressSelectImage = async () => {
    // try {
    //   const response = await DocumentPicker.pick({
    //     presentationStyle: 'fullScreen',
    //     type: [types.images]
    //   });
    //   let image = response[0]
    //   let imgObj = {
    //     name: image.name,
    //     uri: image.path,
    //     size: image.size,
    //     type: image.mime,
    //   };

    //   setSelectedImage(imgObj)

    //   setprofileImage(imgObj)


    //   console.log('==>', image);
    // } catch (err) {
    //   console.warn(err);
    // }

    // uploadImage = () => {
    OpenImagePicker(img => {
      let uri_script = img.path.split('/');
      let name = uri_script[uri_script.length - 1];

      let imgObj = {
        name,
        uri: img.path,
        size: img.size,
        type: img.mime,
      };

      // this.setState({ Profile_Image: imgObj, NewProfile_Image: imgObj });
      setSelectedImage(imgObj)

      setprofileImage(imgObj)
    });
    // };
  }

  const onPressUpdate = () => {

    if(AuthState?.user?.user?.role == 'doctor'){
      if (DocProfession == '') {
        ToastAndroid.showWithGravityAndOffset(
          "Enter profession..",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      }
      else if (gender == '' || gender == 'Gender') {
        ToastAndroid.showWithGravityAndOffset(
          "Select gender..",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      }
      else if (contactNumber == '') {
        ToastAndroid.showWithGravityAndOffset(
          "Enter contact number..",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      }
      else if (DocExperience == '') {
        ToastAndroid.showWithGravityAndOffset(
          "Enter experience..",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      }
      else if (TimeSlots.length == 0) {
        ToastAndroid.showWithGravityAndOffset(
          "Enter time slots..",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      }
      else if (address == '') {
        ToastAndroid.showWithGravityAndOffset(
          "Enter address..",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      }
      else {
        setloader(true)
        let userData = {
          username : AuthState?.user?.user?.username,
          DocProfession : DocProfession,
          gender: gender,
          phone_number: contactNumber,
          DocExperience : DocExperience,
          TimeSlots: TimeSlots,
          address: address,
          city:City,
          state:State,
          country:Country,
          zip:Zip,
          ...selectedImage == '' ?
            {} : { profile_pic: selectedImage }
  
        };
        dispatch(ProfileMiddleware.updateDoctorProfile(userData))
          .then(data => {
            if(data?.success){
              Alert.alert('Note', 'Profile has been updated', [
                { text: "OK", onPress: () => navigation.goBack() }
              ]);
              setloader(false)              
            }
            else{
              Alert.alert('Note', data?.message)
              setloader(false)
            }
          })
          .catch(err => { 
            console.log(err)
            setloader(false)
          
          });
        }
    }
    else{
    if (userName == '') {
      ToastAndroid.showWithGravityAndOffset(
        "Enter user name..",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    }
    else if (gender == '' || gender == 'Gender') {
      ToastAndroid.showWithGravityAndOffset(
        "Select gender..",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    }
    else if (contactNumber == '') {
      ToastAndroid.showWithGravityAndOffset(
        "Enter contact number..",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    }
    else if (address == '') {
      ToastAndroid.showWithGravityAndOffset(
        "Enter address..",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    }
    else {
      setloader(true)
        let userData = {
          gender: gender,
          username: userName,
          phone_number: contactNumber,
          address: address,
          ...selectedImage == '' ?
            {} : { profile_pic: selectedImage }
  
        };
        dispatch(ProfileMiddleware.updateProfile(userData))
          .then((data) => {
            if(data?.success){
              Alert.alert('Note', 'Profile has been updated', [
                { text: "OK", onPress: () => navigation.goBack() }
              ]);
              setloader(false)              
            }
            else{
              Alert.alert('Note', data?.message)
              setloader(false)
            }
          })
          .catch((err) => { 
            console.log(err)
            setloader(false)          
          });
      }
    }
  }

  const renderDoctorProfileItems = () => {
    return (
      <View>
        <View style={styles.inputContainer}>
          <View style={styles.pickerContainer}>
            <SelectDropdown
              buttonStyle={{ width: '100%', backgroundColor: 'transparent', }}
              buttonTextStyle={{ color: Colors.GRAY }}
              defaultButtonText={'Profession'}
              defaultValue={DocProfession}
              data={Category}
              onSelect={(selectedItem, index) => {
                setDocProfession(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                return item
              }}
            />
          </View>

          <View style={styles.pickerContainer}>
            <SelectDropdown
              buttonStyle={{ width: '100%', backgroundColor: 'transparent', }}
              buttonTextStyle={{ color: Colors.GRAY }}
              defaultValue={gender}
              data={pickerData}
              onSelect={(selectedItem, index) => {
                setGender(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                return item
              }}
            />
          </View>
          <TextInput
            placeholder={'Contact Number'}
            placeholderTextColor={Colors.GRAY}
            keyboardType={'phone-pad'}
            length={14}
            style={styles.input}
            value={contactNumber}
            onChangeText={txt => setContactNumber(txt)}
            
          />
          <TextInput
            placeholder={'Experience'}
            placeholderTextColor={Colors.GRAY}
            keyboardType={'number-pad'}
            style={styles.input}
            value={DocExperience}
            onChangeText={txt => setDocExperience(txt)}
          />
          <TouchableOpacity 
          onPress={()=>setIsVisible(true)}
          style={styles.pickerContainer}>
            <Text style={{color: 'grey', padding: 12, alignSelf: 'center'}}>Enter Time Slots</Text>
          </TouchableOpacity>

           <TextInput
            placeholder={'City'}
            placeholderTextColor={Colors.GRAY}
            style={styles.input}
            value={City}
            onChangeText={txt => setCity(txt)}
          />
           <TextInput
            placeholder={'State'}
            placeholderTextColor={Colors.GRAY}
            style={styles.input}
            value={State}
            onChangeText={txt => setState(txt)}
          />
           <TextInput
            placeholder={'Country'}
            placeholderTextColor={Colors.GRAY}
            style={styles.input}
            value={Country}
            onChangeText={txt => setCountry(txt)}
          />
          <TextInput
            placeholder={'Zip code'}
            placeholderTextColor={Colors.GRAY}
            keyboardType={'number-pad'}
            style={styles.input}
            value={Zip}
            onChangeText={txt => setZip(txt)}
            length={5}
          />

          
              

          <TextInput
            placeholder={'Address'}
            placeholderTextColor={Colors.GRAY}
            inputContainerStyle={{ height: 120, justifyContent: 'flex-start', padding: 12 }}
            style={{ textAlignVertical: 'top', padding: 12, color: '#000' }}
            value={address}
            onChangeText={txt => setAddress(txt)}
          />
        </View>
      </View>
    );
  };

  const renderPatientProfileItems = () => {
    return (
      <View>
        <View style={styles.inputContainer}>

          <TextInput
            placeholder={'User Name'}
            placeholderTextColor={Colors.GRAY}
            style={styles.input}
            value={userName}
            onChangeText={txt => setUserName(txt)}
          />

          <View style={styles.pickerContainer}>

            <SelectDropdown
              buttonStyle={{ width: '100%', backgroundColor: 'transparent', }}
              buttonTextStyle={{ color: Colors.GRAY }}
              defaultValue={gender}
              data={pickerData}
              onSelect={(selectedItem, index) => {
                setGender(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                return item
              }}
            />
          </View>

          <TextInput
            placeholder={'Contact Number'}
            placeholderTextColor={Colors.GRAY}
            keyboardType='phone-pad'
            length={14}
            style={styles.input}
            value={contactNumber}
            onChangeText={txt => setContactNumber(txt)}
          />

          <TextInput
            placeholder={'Address'}
            placeholderTextColor={Colors.GRAY}
            inputContainerStyle={{ height: 120, padding: 12, justifyContent: 'flex-start' }}
            style={{ textAlignVertical: 'top', color: '#000' }}
            value={address}
            onChangeText={txt => setAddress(txt)}
          />
        </View>
      </View>
    );
  };


  if(loader == true){
    return(
      <View style={{height :'100%', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator
        size={'large'}
        color={Colors.LIGHT_GREEN}
        />
      </View>
    )
  }
  else{
  return (

    <View style={styles.container}>
      <Header headerLeft={true} title={'Edit Profile'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.bodyContainer}>
          <TouchableOpacity
            onPress={onPressEdit}
          >
            <ImageBackground
              source={profileImage}
              style={styles.BGImage}>
            </ImageBackground>
          </TouchableOpacity>
          {/* <Text style={styles.doctorName}>
          {AuthState?.user?.user?.username}
          </Text> */}
          <Text style={{color: Colors.BLACK, fontWeight: 'bold', paddingTop: 5}}>{AuthState?.user?.user?.username}</Text>
          <Text style={styles.doctorEmail}>{AuthState?.user?.user?.email}</Text>
        </View>

        {AuthState.userRole !== 'patient'
          ? renderDoctorProfileItems()
          : renderPatientProfileItems()}

        <SubmitButton
          buttonContainer={styles.button}
          text={'Update'}
          onPress={onPressUpdate}
        />

        <Popup
          isVisible={isVisible}
          type={popupType}
          title={popupTitle}
          data={val=>setTimeSlots(val)}
          onPress={value => setIsVisible(value)}
        />

      </ScrollView>
    </View>
  );
  }
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
    color: '#000',
    width: '100%'
  },
  pickerContainer: {
    width: '90%',
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Colors.LIGHT_GREEN,
    marginVertical: 6,
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
export default EditProfile;
