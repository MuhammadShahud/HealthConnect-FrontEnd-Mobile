import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import Spinner from 'react-native-spinkit';
import { Image, SafeAreaView, Modal, ActivityIndicator, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { useSelector, useDispatch } from 'react-redux';

import { ChatIcon, HomeIcon, MenuIcon, SettingIcon } from '../Assets';
import {
  AddCard,
  AddReview,
  AppointmentDetail,
  AppointmentRequestDetail,
  Appointments,
  BookAppointment,
  BookingReview,
  CategoryDetail,
  CategoryListing,
  Chat,
  ChatDetail,
  DoctorDashboard,
  DoctorMyAppointments,
  DoctorProfile,
  DoctorsListing,
  EditProfile,
  FamilyMembership,
  InfoPages,
  Login,
  Map,
  MedicalProvidersListing,
  Notifications,
  PatientDashboard,
  PaymentCards,
  Pharmacies,
  Transportation,
  Profile,
  Reviews,
  Setting,
  Signup,
  Subscription,
  Telehealth,
  VideoCall,
  VisitingNurses,
  Clinic,
  Laboratory,
  NurseDetail,
  // ChatB,
  ChatListB,
  VideoCallTest,
  IncomingCall,
} from '../Screens';
import AddLabReport from '../Screens/CategoryListing/AddLabReport';
import { Colors } from '../Styles';
import Storage from '../Utils/AsyncStorage';
import AuthMiddleware from '../Store/Middleware/AuthMiddleware';
import MedicalAssistant from '../Screens/MedicalProvidersListing/MedicalAssistant';
import notifee from "@notifee/react-native";
import messaging from '@react-native-firebase/messaging';
import Ringing from '../Screens/VideoCallTest/Ringing';


const AppNavigation = (props) => {

  const [appLoading, SetAppLoading] = useState(true)

  const createChannel = async () => {
    let channelId = await notifee.createChannel({
      id: 'healthconet',
      name: 'HT Channel',
      sound: "default",
      vibration: true,
      badge: true,
      importance: 4,
      visibility: 1,
      bypassDnd: true
    });


  }

  async function onMessageReceived(message) {
    // Do something
    console.warn("===============>", message)

    let channelId = await notifee.createChannel({
      id: 'healthconet',
      name: 'HT Channel',
      sound: "default",
      vibration: true,
      badge: true,
      importance: 4,
      visibility: 1,
      bypassDnd: true
    });
    // Display a notification
    await notifee.displayNotification({
      title: message.notification.title,
      body: message.notification.body,
      android: {
        channelId: channelId,
        importance: 4,
        sound: "default",
      },
    });
  }

  async function checkPermission() {
    const enabled = await messaging().hasPermission();
    // If Premission granted proceed towards token fetch
    if (enabled != messaging.AuthorizationStatus.AUTHORIZED) {
      requestPermission();
    }
  }

  async function requestPermission() {
    try {
      await messaging().requestPermission();
      // User has authorised
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }


  useEffect(() => {
    createChannel();
    checkPermission();
    messaging().registerDeviceForRemoteMessages();
    console.warn("werwerwere")
    messaging().onMessage(onMessageReceived);

    Storage.getToken().then(async (token) => {
      // console.warn('TOKEN---->', token)        
      if (token != null) {
        dispatch(AuthMiddleware.GetuserInfo(token))
        setTimeout(() => {
          SetAppLoading(false)
        }, 1000);
      }
      else {
        setTimeout(() => {
          SetAppLoading(false)
        }, 1000);
      }
    })

  }, []);
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 0);
  }, []);
  //console.warn('props',props);
  const dispatch = useDispatch();
  const AuthState = useSelector(state => state.AuthReducer);
  const GeneralState = useSelector(state => state.GeneralReducer);

  //console.warn('stateee ==', AuthState);
  // console.warn('GeneralState ==', GeneralState);
  const AuthStack = createNativeStackNavigator();
  const HomeStack = createNativeStackNavigator();
  const BottomTabs = createMaterialBottomTabNavigator();

  // const onMessageReceived(message) {
  //   // Do something
  //   console.warn(message)


  const BottomTab = () => {
    const dashboard =
      AuthState.userRole === 'patient' ? PatientDashboard : DoctorDashboard;
    const doctorAppointment =
      AuthState.userRole === 'patient' ? Appointments : DoctorMyAppointments;
    return (
      <BottomTabs.Navigator
        barStyle={{ backgroundColor: Colors.DARK_BLUE }}
        labeled={true}
        activeColor={Colors.LIGHT_GREEN}
        inactiveColor={Colors.WHITE}
        screenOptions={{
          headerShown: false,
        }}>
        <BottomTabs.Screen
          name="Home"
          component={dashboard}
          options={{
            tabBarIcon: activeColor => (
              <Image
                source={HomeIcon}
                style={{ width: 30, height: 30, tintColor: activeColor.color }}
                resizeMode="contain"
              />
            ),
          }}
        />
        <BottomTabs.Screen
          name="Chat"
          component={Chat}
          options={{
            tabBarIcon: activeColor => (
              <Image
                source={ChatIcon}
                style={{ width: 25, height: 25, tintColor: activeColor.color }}
                resizeMode="contain"
              />
            ),
          }}
        />
        <BottomTabs.Screen
          name="Appointments"
          component={doctorAppointment}
          options={{
            tabBarIcon: activeColor => (
              <Image
                source={MenuIcon}
                style={{ width: 25, height: 25, tintColor: activeColor.color }}
                resizeMode="contain"
              />
            ),
          }}
        />
        <BottomTabs.Screen
          name="Settings"
          component={Setting}
          options={{
            tabBarIcon: activeColor => (
              <Image
                source={SettingIcon}
                style={{ width: 25, height: 25, tintColor: activeColor.color }}
                resizeMode="contain"
              />
            ),
          }}
        />
      </BottomTabs.Navigator>
    );
  };

  const Auth = () => {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }}
        />
      </AuthStack.Navigator>
    );
  };

  const Home = () => {
    return (
      <HomeStack.Navigator initialRouteName={'Dashboard'}>
        <HomeStack.Screen
          name="Dashboard"
          component={BottomTab}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="PatientDashboard"
          component={PatientDashboard}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="DoctorDashboard"
          component={DoctorDashboard}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Notifications"
          component={Notifications}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="AppointmentDetail"
          component={AppointmentDetail}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="DoctorMyAppointments"
          component={DoctorMyAppointments}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="AppointmentRequestDetail"
          component={AppointmentRequestDetail}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="CategoryListing"
          component={CategoryListing}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Pharmacies"
          component={Pharmacies}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Transportation"
          component={Transportation}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Clinic"
          component={Clinic}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Laboratory"
          component={Laboratory}
          options={{ headerShown: false }}
        />

        <HomeStack.Screen
          name="Subscription"
          component={Subscription}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="CategoryDetail"
          component={CategoryDetail}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="InfoPages"
          component={InfoPages}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Reviews"
          component={Reviews}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="ChatDetail"
          component={ChatDetail}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="ChatStack"
          component={Chat}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="VideoCall"
          component={VideoCall}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="PaymentCards"
          component={PaymentCards}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="AddCard"
          component={AddCard}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="AddReport"
          component={AddLabReport}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="AddReview"
          component={AddReview}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Telehealth"
          component={Telehealth}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="VisitingNurses"
          component={VisitingNurses}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="MedicalProviders"
          component={MedicalProvidersListing}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Doctors"
          component={DoctorsListing}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="MedicalAssistant"
          component={MedicalAssistant}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="DoctorProfile"
          component={DoctorProfile}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Map"
          component={Map}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="FamilyMembership"
          component={FamilyMembership}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="BookAppointment"
          component={BookAppointment}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="BookingReview"
          component={BookingReview}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="NurseDetail"
          component={NurseDetail}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="VideoCallTest"
          component={VideoCallTest}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="IncomingCall"
          component={IncomingCall}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Ringing"
          component={Ringing}
          options={{ headerShown: false }}
        />

      </HomeStack.Navigator>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {/* <NativeBaseProvider theme={theme}> */}
      {
        appLoading ? <View style={{ flex: 1, backgroundColor: Colors.DARK_BLUE, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator color={"#fff"} size={'large'} />
        </View> :
          !AuthState.isLogin ? <Auth /> : <SafeAreaView style={{ flex: 1 }}>
            {/* <ActivityIndicator color={'blue'} size={'large'} /> */}
            <Home />
          </SafeAreaView>}

      {/* 
      {appLoading ? <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={Colors.PRIMRATY_BLUE} size={'large'} />
      </View> : this.state.token || this.props.logged_in ? <MainStack /> : <AuthStack />} */}
      {/* {props.logged_in ? <BottomNavigation /> :  <BottomNavigation />} */}
      {/* </NativeBaseProvider> */}



      <Modal visible={GeneralState.loading} transparent>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.3)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Spinner
            isVisible={GeneralState.loading}
            type="ThreeBounce"
            color="#1872ea"
            size={80}
          />
        </View>
      </Modal>
    </View>
  );

  //return !AuthState.isLogin ? <Auth /> : <SafeAreaView style={{ flex: 1 }}><Home /></SafeAreaView>;
  // {/* <AppStack.Navigator initialRouteName={'Home'}>
  //     <AppStack.Screen name="Home" component={Home} />
  //     <AppStack.Screen
  //       name="PostDetail"
  //       component={PostDetail}
  //       options={{headerTitle: 'Post Detail'}}
  //     />
  //   </AppStack.Navigator> */}
};
export default AppNavigation;
