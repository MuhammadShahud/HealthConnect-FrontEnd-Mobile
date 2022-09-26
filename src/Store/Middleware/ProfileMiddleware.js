import Axios from 'axios';
import AppAction from '../Actions/AppAction';
import Apis, { post } from '../Apis';
import BASE_URL from '../Apis'
import { Alert } from 'react-native';
import { HideLoading, ShowLoading } from '../Types/actions_type';
import RNFetchBlob from 'rn-fetch-blob';
import { getHeaders } from '../../Utils';
import ActionTypes from '../Types/actions_type'
import AuthActions from '../Actions/AuthActions';
import axios from 'axios';

class ProfileMiddleware {

  static updateProfile = userData => {
    // console.warn("shehehe", userData);
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
      try {
        let headers = await getHeaders();
        let formData = new FormData();
        formData.append('username', userData?.username);
        formData.append('phone_number', userData?.phone_number);
        formData.append('address', userData?.address);
        formData.append('gender', userData?.gender);
        formData.append('profile_pic', userData?.profile_pic)
        // console.warn('formData', formData);
        const request = await axios.post(
          Apis.UPDATE_PROFILE,
          formData,
          headers,
        );
        if (request?.data?.success) {
          dispatch(AuthActions.UpdateUser(request?.data?.data));
          resolve(request?.data);
        }
        else{            
          resolve(request?.data);
        }
      } catch (error){
        console.log('Error===>',error);
        reject(error)
      }
    });
    };
  }



  static updateDoctorProfile = userData => {
    console.log("shehehe", userData.TimeSlots);
    console.log("JSON:",JSON.stringify(userData.TimeSlots))
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
      try {
        let headers = await getHeaders();
        let formData = new FormData();
        formData.append('username', userData?.username);
        formData.append('type', userData?.DocProfession);
        formData.append('gender', userData?.gender);
        formData.append('phone_number', userData?.phone_number);
        formData.append('experience', userData?.DocExperience);
        formData.append('address', userData?.address);        
        formData.append('profile_pic', userData?.profile_pic)
        formData.append('city', userData?.city)
        formData.append('state', userData?.state)
        formData.append('zip', userData?.zip)
        formData.append('country', userData?.country)
        formData.append('days',JSON.stringify(userData?.TimeSlots));
        // console.warn('formData', formData);
        const request = await axios.post(
          Apis.UPDATE_DOCTOR_PROFILE,
          formData,
          headers,
        );
        if (request?.data?.success) {
           dispatch(AuthActions.UpdateUser(request?.data?.data));
          resolve(request?.data);
        }
        else{
          resolve(request?.data);
        }
      } catch (error) { 
        console.log('Error===>',error);
        reject(error)
      }
    });
    };
  }
  
  // static updateProfile = userData => {

  //   return async dispatch => {
  //     dispatch({ type: ShowLoading });
  //     let headers = await getHeaders()
  //     await RNFetchBlob
  //       .config({ timeout: 60 * 60 })
  //       .fetch("POST", Apis.UPDATE_PROFILE,
  //         headers.documentheaders,
  //         [
  //           {
  //             name: "gender",
  //             data: userData?.gender,
  //           },
  //           {
  //             name: 'username',
  //             data: userData?.username,
  //           },
  //           {
  //             name: "phone_number",
  //             data: userData?.phone_number,
  //           },
  //           {
  //             name: "address",
  //             data: userData?.address,
  //           },
  //           userData?.profile_pic ? {
  //             name: "profile_pic",
  //             filename: userData?.profile_pic?.name,
  //             data: RNFetchBlob.wrap(userData?.profile_pic?.uri),
  //             type: userData?.profile_pic?.type,

  //           } : null,
  //         ],

  //       )
  //       .then((response) => {
  //         let data1 = JSON.parse(response?.data)
  //         console.log('+++>', data1?.data);
  //         if (JSON.parse(response.data).success) {
  //           console.log('====================================', data1);
  //           console.log("data1", data1);
  //           //Alert.alert("Note", JSON.parse(response.data).message);
  //           dispatch({ type: AuthActions.UpdateUser, data: data1?.data });
  //           dispatch({ type: HideLoading });
  //         }
  //         else {
  //           Alert.alert("Note", JSON.parse(response.data).message);
  //           dispatch({ type: HideLoading });
  //         }
  //       }).catch((err) => {
  //         console.log('++++', err);
  //         dispatch({ type: HideLoading });
  //       })
  //   };

  // };

}

export default ProfileMiddleware;