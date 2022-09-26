import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView, Alert, ToastAndroid } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { Logo } from '../../Assets';
import { Popup, SubmitButton, TextInput } from '../../Components';
import { Colors } from '../../Styles';
import { style } from './style';
import { useDispatch } from 'react-redux';
import { IS_LOGIN, USER_ROLE } from '../../Store/Types/actions_type';
import AuthMiddleware from '../../Store/Middleware/AuthMiddleware';
import Storage from '../../Utils/AsyncStorage';
import SplashScreen from 'react-native-splash-screen';
import messaging from '@react-native-firebase/messaging';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Settings } from 'react-native-fbsdk-next';
import { LoginManager, AccessToken, AuthenticationToken, Profile } from "react-native-fbsdk-next";

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

const Login = ({ params }) => {
  const [radioButtons, setRadioButton] = useState(radioButtonsArray);
  const [isRadioBtnActive, setRadioBtnActive] = useState(0);
  const [userType, setUserType] = useState('patient');
  // const [email, setEmail] = useState('doctor123@gmail.com');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [popupType, setPopupType] = useState('forgotPassword');
  const [popupTitle, setPopupTitle] = useState('Forgot Password');
  const [hidePassword, sethidePassword] = useState(true)

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onPressFBLogin = async () => {
    try {
      const result = await LoginManager.logInWithPermissions(
        ['email', 'public_profile'],
        'limited',
        'my_nonce'
      );
      console.log(result);

      if (Platform.OS === 'ios') {
        const result = await AuthenticationToken.getAuthenticationTokenIOS();
        console.log(result?.authenticationToken);
      } else {
        const result = await AccessToken.getCurrentAccessToken();
        console.log(result?.accessToken);
      }
      Profile.getCurrentProfile().then(
        async function (currentProfile) {
          if (currentProfile?.email) {
            console.log('currentProfile.email' + currentProfile.email);
            let token = await messaging().getToken();
            let userData = {
              name: currentProfile?.name,
              email: currentProfile.email,
              token,
            }
            dispatch(AuthMiddleware.socialLogin(userData))
          }
          else {
            alert("There was some error while loging in with facebook")
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  const onPressRadioButton = (item, index) => {
    if (!item.isActive) {
      setRadioBtnActive(1);
      setUserType(item.label);
    } else {
      setRadioBtnActive(0);
      setUserType(item.label);
    }
  };
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '',
    });

    Settings.setAppID('439497624673645');
    Settings.initializeSDK();



  }, []);
  const onPressLogin = async () => {
    if (email == '' || password == '') {
      ToastAndroid.showWithGravityAndOffset(
        'Please enter both fields..',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }
    else {
      let token = await messaging().getToken();
      console.warn("asdasdasd", token)
      let userData = {
        email: email,
        password: password,
        token,
      }
      dispatch(AuthMiddleware.login(userData))
    }
  };

  const onPressGoogleSignIn = async () => {
    console.warn("Google RESponse helllo");
    let token = await messaging().getToken();
    // Get the users ID token
    const gRes = await GoogleSignin.signIn()
    console.warn("Google RESponse", gRes);
    // let New_User = {
    //   name: gRes?.user?.name,
    //   email: gRes?.user?.email,
    //   familyName: gRes?.user?.familyName
    // }

    let userData = {
      name: gRes?.user?.name,
      email: gRes?.user?.email,
      token,
    }
    dispatch(AuthMiddleware.socialLogin(userData))

  }
  const onPressFacebookSignIn = async () => {
    console.warn("Google RESponse helllo");
    let token = await messaging().getToken();
    // Get the users ID token
    const gRes = await GoogleSignin.signIn()
    console.warn("Google RESponse", gRes);
    // let New_User = {
    //   name: gRes?.user?.name,
    //   email: gRes?.user?.email,
    //   familyName: gRes?.user?.familyName
    // }

    let userData = {
      email: gRes?.user?.email,
      token,
    }
    dispatch(AuthMiddleware.socialLogin(userData))

  }





  return (
    <View style={style.container}>
      <View style={style.imageContainer}>
        <Image source={Logo} style={style.logo} />
      </View>

      <ScrollView style={{ flex: 1 }}>
        <View style={style.secureTextContainer}>
          <Text style={style.containerTitle}>Secure Login</Text>
        </View>

        <View style={style.bottomContainer}>
          {/* <View
            style={{
              width: '90%',
              alignSelf: 'center',
              marginVertical: 12,
            }}>
            <Text style={style.text}>Login as</Text>

            <View style={style.radioButtonContainer}>
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
            </View>
          </View> */}

          <View style={style.inputContainer}>
            <TextInput
              value={email}
              placeholder={'Your Email'}
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
          </View>

          <SubmitButton
            text={'Login'}
            onPress={onPressLogin}
            buttonContainer={{
              width: '100%',
              marginVertical: 0,
              paddingVertical: 0,
            }}
            style={style.button}
          />

          <View style={style.forgotContainer}>
            <TouchableOpacity onPress={() => setIsVisible(true)}>
              <Text style={{ color: '#000' }}>Forgot your Password?</Text>
            </TouchableOpacity>
          </View>

          <View style={style.socialBtnContainer}>
            <Text style={{ color: '#000' }}>Or login with</Text>

            <View style={style.buttonsContainer}>
              <TouchableOpacity
                onPress={() => onPressFBLogin()}
                style={style.socialButton}>
                <FontAwesome
                  name="facebook"
                  color={Colors.FACEBOOK_COLOR}
                  size={25}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => onPressGoogleSignIn()}
                style={style.socialButton}>
                <FontAwesome
                  name="google-plus"
                  color={Colors.GOOGLE_COLOR}
                  size={25}
                />
              </TouchableOpacity>
            </View>

            {isRadioBtnActive === 0 && (
              <View style={style.signupContainer}>
                <Text style={{ color: '#000' }}>Don't have an Account? </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Signup')}
                  style={{ justifyContent: 'center' }}>
                  <Text style={style.btnText}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        <Popup
          isVisible={isVisible}
          type={popupType}
          title={popupTitle}
          setPopupTitle={setPopupTitle}
          setPopupType={setPopupType}
          onPress={value => setIsVisible(value)}
        />
      </ScrollView>
    </View>
  );
};

export default Login;
