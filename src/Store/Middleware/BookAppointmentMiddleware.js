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

class BookAppointmentMiddleware {  

  static bookAppointment = (userData, id) => {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        //dispatch({ type: ShowLoading });
        // console.log(userData);
        try {
          let headers = await getHeaders();
          let formData = new FormData();
          formData.append('date', userData?.date);
          formData.append('time', userData?.time);
          formData.append('patient_name', userData?.patient_name);
          formData.append('patient_number', userData?.patient_number);
          formData.append('patient_age', userData?.patient_age);
          formData.append('gender', userData?.gender);
          const data = await axios.post(
            Apis.BOOK_APPOINTMENT + `${id}`,
            formData,
            headers,
          );
          if (data) {
            // console.log('DATA===>', data?.data);
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


  static bookSpecialistAppointment = (userData) => {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        //dispatch({ type: ShowLoading });
        // console.log(userData);
        try {
          let headers = await getHeaders();
          let formData = new FormData();
          formData.append('date', userData?.date);
          formData.append('time', userData?.time);
          formData.append('patient_name', userData?.patient_name);
          formData.append('patient_number', userData?.patient_number);
          formData.append('patient_age', userData?.patient_age);
          formData.append('gender', userData?.gender);
          formData.append('source_id', userData?.payment_method_id);
          formData.append('doctor_id', userData?.doctor_id);
          const data = await axios.post(
            Apis.CHARGE_AMOUNT,
            formData,
            headers,
          );
          if (data) {
            // console.log('DATA===>', data?.data);
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

}

export default BookAppointmentMiddleware;
