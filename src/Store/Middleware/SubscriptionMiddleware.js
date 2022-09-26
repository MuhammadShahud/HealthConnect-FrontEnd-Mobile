import Axios from 'axios';
import Apis from '../Apis';
import {HideLoading, ShowLoading} from '../Types/actions_type';
import { getHeaders } from '../../Utils';
import {Alert} from 'react-native'
import AuthActions from '../Actions/AuthActions';


class SubscriptionMiddleware {


  static getSubscription = () => {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          const { data } = await Axios.get(
              Apis.GET_ALL_PACKAGES,
               await getHeaders()
            );
          if (data) {
            // console.warn("DATA:", data);
            resolve(data)
          }

        } catch (error) {
          reject(error);
          // console.warn("Hello2", error.response);
          // alert('Network Error');
        }
      });
    };
  };


  static getSubscriptionHistory = () => {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          const { data } = await Axios.get(
              Apis.GET_SUB_HISTORY,
               await getHeaders()
            );
          if (data) {
            // console.warn("DATA:", data);
            resolve(data)
          }

        } catch (error) {
          reject(error);
          // console.warn("Hello2", error.response);
          // alert('Network Error');
        }
      });
    };
  };


  static postSubscribe = (userData) => {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
            dispatch({ type: ShowLoading });
            let formData = new FormData();
            formData.append('plan_id', userData?.plan_id);
            formData.append('source_id',userData?.source_id);
            console.log(formData);
            const { data } = await Axios.post(
              Apis.SUBSCRIBE,
              formData,
               await getHeaders()
            );
          if (data?.success) {
            dispatch(AuthActions.UpdateUser(data?.data));
            resolve(data)
            dispatch({ type: HideLoading });
          }
          else{
            dispatch({ type: HideLoading });
            resolve(data)
          }

        } catch (error) {
          reject(error);
          dispatch({ type: HideLoading });
          alert('Network Error');
        }
      });
    };
  };

}

export default SubscriptionMiddleware;