import Axios from 'axios';
import AppAction from '../Actions/AppAction';
import Apis from '../Apis';
import { HideLoading, ShowLoading, IS_LOGIN, USER_ROLE } from '../Types/actions_type';
import { Alert } from 'react-native'
import { getHeaders } from '../../Utils';


class AppMiddleware {

  static getUsers = () => {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          const { data } = await Axios.get(Apis.getUsers);
          dispatch(AppAction.getUsers(data));
        } catch (error) {
          reject(error);
          alert('Network Error');
          console.log(error);
        }
      });
    };
  };

  static getPosts = () => {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          const { data } = await Axios.get(Apis.getPosts);
          dispatch(AppAction.getPosts(data));
        } catch (error) {
          reject(error);
          alert('Network Error');
        }
      });
    };
  };

  static getComments = () => {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          const { data } = await Axios.get(Apis.getComments);
          dispatch(AppAction.getComments(data));
        } catch (error) {
          reject(error);
          alert('Network Error');
        }
      });
    };
  };

  static changePassword = (userData) => {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        dispatch({ type: ShowLoading });
        try {
          let headers = await getHeaders();
          let formData = new FormData();
          formData.append('old_password', userData?.oldPassword);
          formData.append('new_password', userData?.password);
          formData.append('confirm_password', userData?.reTypePassword);

          const { data } = await Axios.post(
            Apis.CHANGE_PASSWORD + `${userData?.userID}`,
            formData,
            headers,
          );
          if (data) {
            // Alert.alert('Note', data?.message);
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
  static UpcomingAppointments = () => {

    return dispatch => {

      return new Promise(async (resolve, reject) => {

        try {
          const { data } = await Axios.get(Apis.UPCOMING_APPOINTMENTS, await getHeaders());
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

  static PastAppointments = () => {

    return dispatch => {

      return new Promise(async (resolve, reject) => {

        try {
          const { data } = await Axios.get(Apis.PAST_APPOINTMENTS, await getHeaders());
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

  static CancelAppointments = (id) => {

    return dispatch => {

      return new Promise(async (resolve, reject) => {

        try {
          const { data } = await Axios.post(
            Apis.CANCEL_APPOINTMENT + `${id}`, 
            {}, 
            await getHeaders());
          if (data) {
            resolve(data)
          }

        } catch (error) {
          reject(error);
          console.log("Hello2", error.response);
        }
      });
    };
  };


  static getNotification = () => {

    return dispatch => {

      return new Promise(async (resolve, reject) => {

        try {
          const { data } = await Axios.get(Apis.USER_NOTIFICATIONS, await getHeaders());
          if (data) {
            console.warn("DATA:", data);
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

}

export default AppMiddleware;