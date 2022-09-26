import Axios from 'axios';
import { getHeaders } from '../../Utils';
import ServiceAction from '../Actions/ServiceAction';
import Apis from '../Apis';

class ServiceMiddleware {

  static getServices = ({ next_page_url, name }) => {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          if (next_page_url == undefined || name) {
            dispatch(ServiceAction.resetService());
          }
          let formData = new FormData();
          formData.append('search', name);
          let { data } = await Axios.post(
            Apis.GET_SERVICES(next_page_url),
            name ? formData : {},
            await getHeaders(),
          );
          if (data?.success) {
            // console.warn('dtaaaaSuccesssss', data);
            dispatch(ServiceAction.getService(data.data));
            resolve(data);
          } else {
            alert(data?.message);
            reject(data);
          }
        } catch (error) {
          reject(error);
          alert('Network Error');
          console.warn('err =====', error);
        }
      });
    };
  };

}

export default ServiceMiddleware;
