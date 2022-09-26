import Axios from 'axios';
import AppAction from '../Actions/AppAction';
import Apis, { post } from '../Apis';
import { getHeaders } from '../../Utils';
import { Alert, ToastAndroid } from 'react-native';
import axios, { AxiosRequestConfig } from 'axios';
import { HideLoading, ShowLoading, IS_LOGIN, USER_ROLE } from '../Types/actions_type';
import AuthActions from '../Actions/AuthActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from '../../Utils/AsyncStorage';

const BearerHeader = (token, More: AxiosRequestConfig = {}) => {
  return {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      ...More,
    },
  };
};

class AuthMiddleware {
  static register = userData => {
    // console.log('====>',userData);
    return async dispatch => {
      dispatch({ type: ShowLoading });
      try {
        let formData = new FormData();
        formData.append('device_id', userData.token);
        formData.append('username', userData.username);
        formData.append('email', userData.email);
        formData.append('password', userData.password);
        formData.append('confirm_password', userData.confirm_password);
        formData.append('role', 'patient');
        formData.append('phone_number', userData.phone);
        formData.append('gender', userData.gender);
        formData.append('address', userData.address);
        console.log('formData:=>', formData);
        const response = await axios.post(
          Apis.REGISTER,
          formData,
          await getHeaders(),
        );
        // console.warn("Response==>", response?.data?.message);
        if (response?.data?.success) {
          await Storage.setToken(response.data?.data?.token)
          if (response.data?.data?.user.role == 'patient') {
            dispatch({ type: IS_LOGIN, payload: true });
            dispatch({ type: USER_ROLE, payload: 'patient' });
          }
          else {
            dispatch({ type: IS_LOGIN, payload: true });
            dispatch({ type: USER_ROLE, payload: 'doctor' });
          }
          dispatch(AuthActions.Login(response?.data?.data));
          dispatch({ type: HideLoading });
        }
        else {
          Alert.alert('Note', 'Email already exist.')
          dispatch({ type: HideLoading });
        }
      } catch (error) {
        dispatch({ type: HideLoading });
        // console.log('error======>', error.response);
      }
    };
  };

  static forgotPassword = userData => {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        //dispatch({ type: ShowLoading });
        try {
          let headers = await getHeaders();
          let formData = new FormData();
          formData.append('email', userData?.email);
          const data = await axios.post(
            Apis.FORGOT_PASSWORD,
            formData,
            headers,
          );
          // console.log('DATA123===>', data);
          if (data) {
            console.log('DATA===>', data);
            // Alert.alert('Note', data?.message);
            ToastAndroid.showWithGravityAndOffset(
              data?.data.message,
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50
            );
            resolve(data)
          }
          // dispatch({ type: HideLoading });
        } catch (error) {
          reject(error)
          console.warn('error======>', error);
          // dispatch({ type: HideLoading });
        }
      })
    };
  };


  static resetPassword = userData => {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        dispatch({ type: ShowLoading });
        try {
          let headers = await getHeaders();
          let formData = new FormData();
          formData.append('email', userData?.email);
          formData.append('password', userData?.password);
          console.log('formData->', formData)

          const { data } = await axios.post(
            Apis.RESET_PASSWORD,
            formData,
            headers,
          );
          console.log('DATA123===>', data);
          if (data) {
            console.log('DATA===>', data);
            Alert.alert('Note', data?.message);
            resolve(data)
          }
          dispatch({ type: HideLoading });
        } catch (error) {
          reject(error)
          dispatch({ type: HideLoading });
        }
      })
    };
  };


  static login = userData => {
    return async dispatch => {
      dispatch({ type: ShowLoading });
      try {
        let formData = new FormData();
        formData.append('email', userData.email);
        formData.append('password', userData.password);
        formData.append('device_id', userData.token);
        console.log('formData->', formData)

        let response = await axios.post(
          Apis.LOGIN,
          formData,
          await getHeaders(),
        );
        console.log("response=====>", response.data)
        await Storage.setToken(response.data?.data?.token)
        // AsyncStorage.setItem('token', response.data?.data?.token)
        if (response?.data?.success) {
          if (response.data?.data?.user.role == 'patient') {
            dispatch({ type: IS_LOGIN, payload: true });
            dispatch({ type: USER_ROLE, payload: 'patient' });
            dispatch(AuthActions.Login(response?.data?.data));
            dispatch({ type: HideLoading });
          }
          else {
            dispatch({ type: IS_LOGIN, payload: true });
            dispatch({ type: USER_ROLE, payload: 'doctor' });
            dispatch(AuthActions.Login(response?.data?.data));
            dispatch({ type: HideLoading });
          }

        }
        else {
          Alert.alert('Note', response?.data?.message);
          dispatch({ type: HideLoading });
        }

      } catch (error) {
        console.log("error======>", error);
        dispatch({ type: HideLoading });
      }
    };
  };


  static GetuserInfo = token => {
    return async dispatch => {
      try {

        let BearerHeaders = BearerHeader(token);
        // console.log("BearerHeaders=>", BearerHeaders)
        let response = await axios.get(Apis.USERINFO, BearerHeaders);
        // console.log("Responce 2555555", response.data)
        if (response.data.success) {
          dispatch(AuthActions.Login({ ...response?.data?.data, token: token }));
          if (response.data?.data?.user?.role == 'patient') {
            dispatch({ type: IS_LOGIN, payload: true });
            dispatch({ type: USER_ROLE, payload: 'patient' });
          }
          else {
            dispatch({ type: IS_LOGIN, payload: true });
            dispatch({ type: USER_ROLE, payload: 'doctor' });
          }

        } else {
          //  console.warn("Er res");
        }
      } catch (error) {
        console.log('ERRROOOOOOOO->', error);
      }
    };
  };


  static LogOut = () => {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch({ type: ShowLoading });
          const { data } = await Axios.get(
            Apis.LOGOUT,
            await getHeaders()
          );



          if (data) {
            console.log('---------', data);
            resolve(data)
            await Storage.clearStorage()
            dispatch({ type: HideLoading });
          }
        } catch (error) {
          reject(error);
          dispatch({ type: HideLoading });
          //  Alert.alert('','Network Error');
        }
      });
    };
  };


  // socialLogin: ({email,navigation,callback,}) => {
  //   return async dispatch => {
  //     try {
  //       dispatch({ type: ActionTypes.ShowLoading });
  //       let deviceToken = await AsyncStorage.getItem('fcmToken')
  //       let formData = new FormData();
  //       formData.append('email', email);
  //       console.warn("formData:", formData);
  //       let request = await POST(APIs.SOCIAL_LOGIN, formData);
  //       console.warn("Socail Data:", request.success);
  //       if (request.success) {
  //        // console.warn("H1");
  //         if(request?.data)
  //         {
  //        // console.warn("H2",request);


  //        await Storage.setToken(request?.data?.token);
  //         await Storage.set("@BB-user", JSON.stringify(request?.data))
  //        database().ref("users/" + request?.data?.user?.id).set({
  //          online: true
  //        })
  //        dispatch({ type: ActionTypes.Login, payload: request?.data });
  //       dispatch({ type: ActionTypes.HideLoading });
  //       }
  //       else{
  //        // console.warn("H3",request);
  //         dispatch({ type: ActionTypes.HideLoading });
  //         callback(request)
  //       }

  //      // dispatch({ type: ActionTypes.HideLoading });
  //     }
  //     } catch (error) { 
  //       dispatch({ type: ActionTypes.HideLoading });
  //     }
  //   }
  // }

  static socialLogin = userData => {
    return async dispatch => {
      dispatch({ type: ShowLoading });
      try {
        let formData = new FormData();
        formData.append('email', userData.email);
        formData.append('device_id', userData.token);
        formData.append('username', userData.name);
        console.warn('formData->', formData)

        let response = await axios.post(
          Apis.SOCIAL_LOGIN,
          formData,
          await getHeaders(),
        );
        console.warn("response=====>", response.data)
        await Storage.setToken(response.data?.data?.token)

        if (response?.data?.success) {
          if (response.data?.data?.user.role == 'patient') {
            dispatch({ type: IS_LOGIN, payload: true });
            dispatch({ type: USER_ROLE, payload: 'patient' });
            dispatch(AuthActions.Login(response?.data?.data));
            dispatch({ type: HideLoading });
          }
          else {
            dispatch({ type: IS_LOGIN, payload: true });
            dispatch({ type: USER_ROLE, payload: 'doctor' });
            dispatch(AuthActions.Login(response?.data?.data));
            dispatch({ type: HideLoading });
          }

        }
        else {
          console.warn(response.data)
          Alert.alert('Note', response?.data?.message);
          dispatch({ type: HideLoading });
        }

      } catch (error) {
        console.log("error======>", error);
        dispatch({ type: HideLoading });
      }
    };
  };


}

export default AuthMiddleware;
