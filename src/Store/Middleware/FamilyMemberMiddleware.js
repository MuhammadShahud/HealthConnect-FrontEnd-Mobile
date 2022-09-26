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
import FamilyMemberAction from '../Actions/FamilyMemberAction';

class FamilyMemberMiddleware {

  static getFamilyMember = () => {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          // dispatch({ type: ShowLoading });
          let headers = await getHeaders();
          let {data} = await axios.get(Apis.LIST_MEMBERS, headers);
          if (data?.success) {
            dispatch(FamilyMemberAction.getFamilyMember(data?.data));
            resolve(data);
          } else {
            alert(data?.message);
            reject(data);
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

  static addFamilyMember = userData => {
    console.log(userData);
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        dispatch({type: ShowLoading});
        try {
          let headers = await getHeaders();
          let formData = new FormData();
          formData.append('member_id', userData?.id);
          formData.append('relation', userData?.relation);
          const data = await axios.post(
              Apis.INVITE_MEMBER, 
              formData, 
              headers
              );
              if (data?.data?.success) {
                Alert.alert('Note', data?.data?.message);
                resolve(data);
                dispatch({type: HideLoading});
              } else {
                Alert.alert('Note', data?.data?.message);
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


  static deleteFamilyMember = id => {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
      try {
          let headers = await getHeaders();
          const {data} = await axios.get(
          Apis.REMOVE_MEMBER + `${id}`,
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


  static getUser = email => {
    console.log(email);
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        dispatch({type: ShowLoading});
        try {
          let headers = await getHeaders();
          let formData = new FormData();
          formData.append('search', email);
          const data = await axios.post(
              Apis.GET_USERS, 
              formData, 
              headers
              );
              if(data){
                if(data?.data?.data.length == 0){
                  dispatch({type: HideLoading});
                }
                resolve(data)
              }
        } catch (error) {
          reject(error);
          dispatch({type: HideLoading});
          console.warn('error======>', error);
        }
      });
    };
  };


}

export default FamilyMemberMiddleware;
