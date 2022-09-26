import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown'
import { useNavigation } from '@react-navigation/native';
import { Logo } from '../../Assets';
import { style } from './style';
import { Colors } from '../../Styles';
import { SubmitButton, TextInput } from '../../Components';
import { useDispatch } from 'react-redux';
import AuthMiddleware from '../../Store/Middleware/AuthMiddleware';
import messaging from '@react-native-firebase/messaging';

const radioButtonsArray = [
  {
    isActive: true,
    label: 'Guardian/Patient',
  },
  {
    isActive: false,
    label: 'Medical Provider',
  },
];

const pickerList = [
  'Male',
  'Female',
];

export const Signup = () => {

  const dispatch = useDispatch();

  const [radioButtons, setRadioButton] = useState(radioButtonsArray);
  const [pickerData, setPicker] = useState(pickerList)
  const [isRadioBtnActive, setRadioBtnActive] = useState(0);
  const [userType, setUserType] = useState('patient');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')
  const navigation = useNavigation();
  const [hidePassword, sethidePassword] = useState(true)
  const [hideConfirmPassword, sethideConfirmPassword] = useState(true)

  // const onPressRadioButton = (item, index) => {
  //   if (!item.isActive) {
  //     setRadioBtnActive(1);
  //     setUserType(item.label);
  //   } else {
  //     setRadioBtnActive(0);
  //     setUserType(item.label);
  //   }
  // };

  const onPressSignup = async () => {
    let token = await messaging().getToken();
    // console.warn('sdasdasd', userType);
    if (username == '' || email == '' || password == '' || confirmPassword == '' || gender == '' || phoneNumber == '' || address == '') {
      Alert.alert("Note", "Please fill all fields..")
    }
    else if (password !== confirmPassword) {
      Alert.alert("Note", "Confirm password did not match..")
    }
    else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) == false) {
      Alert.alert("Note", "Email format is not valid..")
    }
    else {
      console.log('done');
      // console.warn(
      //   "UserName:", username,
      //   "Email:", email,
      //   "Password:", password,
      //   "confrim password: ", confirmPassword,
      //   "gender: ", gender,
      //   "phoneNumber:", phoneNumber,
      // );
      let userData = {
        token,
        username: username,
        email: email,
        password: password,
        confirm_password: confirmPassword,
        gender: gender,
        phone: phoneNumber,
        address: address
      }
      dispatch(AuthMiddleware.register(userData))

    }
  };

  return (
    <View style={style.container}>
      <View style={style.imageContainer}>
        <Image source={Logo} style={style.logo} />
      </View>

      <ScrollView style={{ flex: 1 }}>
        <View style={style.secureTextContainer}>
          <Text style={style.containerTitle}>Register</Text>
        </View>

        <View style={style.bottomContainer}>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              marginVertical: 12,
            }}>


            {/* <Text style={style.text}>Register as</Text> */}

            {/* <View style={style.radioButtonContainer}>
              {radioButtons.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => onPressRadioButton(item)}
                    style={style.radioButton}>
                    <MaterialIcons
                      name={
                        isRadioBtnActive === index
                          ? 'radio-button-checked'
                          : 'radio-button-off'
                      }
                      size={20}
                      color={
                        isRadioBtnActive === index
                          ? Colors.LIGHT_GREEN
                          : Colors.DARK_GRAY
                      }
                    />
                    <Text style={style.radioButtonText}>{item.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View> */}
          </View>

          <View style={style.inputContainer}>
            <TextInput
              value={username}
              placeholder={'Username'}
              placeholderTextColor={Colors.GRAY}
              onChangeText={text => setUsername(text)}
              style={style.input}
            />
            <TextInput
              value={email}
              placeholder={'Email Address'}
              placeholderTextColor={Colors.GRAY}
              onChangeText={text => setEmail(text)}
              style={style.input}
            />
            <TextInput
              eye={true}
              secure={hidePassword}
              value={password}
              placeholder={'Password'}
              placeholderTextColor={Colors.GRAY}
              onChangeText={text => setPassword(text)}
              style={style.input}
            />
            <TextInput
              eye={true}
              secure={hideConfirmPassword}
              value={confirmPassword}
              placeholder={'Confirm Password'}
              placeholderTextColor={Colors.GRAY}
              onChangeText={text => setConfirmPassword(text)}
              style={style.input}
            />

            <View style={style.pickerContainer}>

              <SelectDropdown
                buttonStyle={{ width: '100%', backgroundColor: 'transparent', }}
                buttonTextStyle={style.dropDownBtnText}
                defaultButtonText="Select Gender"
                defaultValue={'Gender'}
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
              value={phoneNumber}
              placeholder={'Phone Number'}
              placeholderTextColor={Colors.GRAY}
              onChangeText={text => setPhoneNumber(text)}
              length={14}
              keyboardType={'phone-pad'}
              style={style.input}
            />

            <TextInput
              value={address}
              placeholder={'Address'}
              placeholderTextColor={Colors.GRAY}
              onChangeText={text => setAddress(text)}
              inputContainerStyle={{ height: 120, justifyContent: 'flex-start', padding: 12 }}
              style={{ textAlignVertical: 'top', padding: 12, color: '#000' }}
            />
          </View>

          <SubmitButton
            text={'Signup'}
            onPress={onPressSignup}
            buttonContainer={{ width: '100%' }}
            style={style.button}
          />

          <View style={style.socialBtnContainer}>
            {/* <Text style={{color: 'grey'}}>Or Signup with</Text>

            <View style={style.buttonsContainer}>
              <TouchableOpacity style={style.socialButton}>
                <FontAwesome
                  name="facebook"
                  color={Colors.FACEBOOK_COLOR}
                  size={22}
                />
              </TouchableOpacity>

              <TouchableOpacity style={style.socialButton}>
                <FontAwesome
                  name="google-plus"
                  color={Colors.GOOGLE_COLOR}
                  size={22}
                />
              </TouchableOpacity>
            </View> */}

            {isRadioBtnActive === 0 && (
              <View style={style.signupContainer}>
                <Text style={{ color: 'grey' }}>Already have an Account? </Text>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{ justifyContent: 'center' }}>
                  <Text style={style.btnText}>Sign In</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Signup;
