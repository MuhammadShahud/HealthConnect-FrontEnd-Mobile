import AppAction from '../Actions/AppAction';
import Apis from '../Apis';
import BASE_URL from '../Apis';
import {Alert} from 'react-native';
import {HideLoading, ShowLoading} from '../Types/actions_type';
import RNFetchBlob from 'rn-fetch-blob';
import axios, {AxiosRequestConfig} from 'axios';
import {getHeaders} from '../../Utils';
import LabReportsAction from '../Actions/LabReportsAction';
import PaymentCardAction from '../Actions/PaymentCardAction';

class NotificationMiddleware {

  static onoffNotification = val => {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
      try {
          let headers = await getHeaders();
          let formData = new FormData();
          formData.append('is_notify', val);
          const {data} = await axios.post(
          Apis.NOTIFY_STATUS,
          formData,
          headers,
        );
        if (data?.success) {
          Alert.alert('Note', data?.message)
          resolve(data)
        }
        else{
          Alert.alert('Note', data?.message)
          resolve(data)
        }
      } catch (error) {
        reject(error)
        console.warn('error======>', error);
      }
      })
    };
  };


}

export default NotificationMiddleware;
