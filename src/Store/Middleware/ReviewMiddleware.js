import Axios from 'axios';
import { getHeaders } from '../../Utils';
import AppAction from '../Actions/AppAction';
import ReviewAction from '../Actions/ReviewAction';
import Apis from '../Apis';
import { HideLoading, ShowLoading, IS_LOGIN, USER_ROLE } from '../Types/actions_type';
import {Alert} from 'react-native';


class ReviewMiddleware {

  static getReviews = () => {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          const { data } = await Axios.get(
              Apis.GET_DOCTOR_RATING,
              await getHeaders()
              );
          dispatch(ReviewAction.getDoctorRating(data));
          resolve(data)
        } catch (error) {
          reject(error);
          alert('Network Error');
        }
      });
    };
  };


  static writeReviews = userData => {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
      dispatch({ type: ShowLoading });
      try {
        let formData = new FormData();
        formData.append('comments', userData.comments);
        formData.append('rating', userData.rating);
        formData.append('doctor_id', userData.doctor_id);
        formData.append('appointment_id', userData.appointment_id);
        console.warn('formData:', formData);
        const response = await Axios.post(
          Apis.SUBMIT_REVIEW,
          formData,
          await getHeaders(),
        );
        console.warn('DATA123===>', response?.data?.success);
            // Alert.alert('Note',response?.data?.message)
            resolve(response?.data)
          dispatch({ type: HideLoading });        
      } catch (error) {
        dispatch({ type: HideLoading });
        reject(response?.data)
        // console.log('error======>', error.response);
      }
    });
    };
  };

}

export default ReviewMiddleware;