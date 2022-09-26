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

class PaymentCardMiddleware {
  static getPaymentCard = () => {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          // dispatch({ type: ShowLoading });
          let headers = await getHeaders();
          let {data} = await axios.get(Apis.SHOW_METHOD, headers);
          // console.log('----',data);
          if (data?.success) {
            dispatch(PaymentCardAction.getPaymentCard(data));
            resolve(data);
          } else {
            alert(data?.message);
            resolve(data);
          }
        } catch (error) {
          // dispatch({ type: HideLoading });
          reject(error);
          alert(error);
          console.warn('err =====', error);
        }
      });
    };
  };

  static addPaymentCard = userData => {
    console.log(userData);
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        dispatch({type: ShowLoading});
        try {
          let headers = await getHeaders();
          let formData = new FormData();
          formData.append('card_number', userData?.card_number);
          formData.append('cvc', userData?.cvc);
          formData.append('exp_date', userData?.exp_date);
          const data = await axios.post(Apis.STORE_CARD, formData, headers);
          if (data?.data?.success) {
            resolve(data);
            dispatch({type: HideLoading});
          } else {
            resolve(data);
            dispatch({type: HideLoading});
          }
        } catch (error) {
          reject(error);

          console.warn('error======>', error);
          dispatch({type: HideLoading});
        }
      });
    };
  };

  static updatePaymentCard = id => {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
      try {
        let headers = await getHeaders();
        const {data} = await axios.post(
          Apis.UPDATE_DEFAULT_CARD + `${id}`,
          {},
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


  static deletepaymentCard = id => {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
      try {
          let headers = await getHeaders();
          let formData = new FormData();
          formData.append('stripe_source_id', id);
          const {data} = await axios.post(
          Apis.DELETE_CARD,
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

export default PaymentCardMiddleware;
