import Axios from 'axios';
import { getHeaders } from '../../Utils';
import TeleHealthAction from '../Actions/TeleHealthAction';
import Apis from '../Apis';
import { HideLoading, ShowLoading } from '../Types/actions_type';

class TeleHealthMiddleware {

    static getTeleHealth = ({ next_page_url, name }) => {
        console.log('nameeeMiddlewaree', name);
        console.log('next_page_urlMiddlewaree', next_page_url);
        return dispatch => {
            return new Promise(async (resolve, reject) => {
                try {
                    // dispatch({ type: ShowLoading });
                    if (next_page_url == undefined || name) {
                        dispatch(TeleHealthAction.resetTeleHealth());
                    }
                    let formData = new FormData();
                    formData.append('search', name);
                    let { data } = await Axios.post(
                        Apis.GET_DOCTOR(next_page_url),
                        name ? formData : {},
                        await getHeaders(),
                    );
                    if (data?.success) {
                        // console.warn('dtaaaaSuccesssss', data);
                        dispatch(TeleHealthAction.getTeleHealth(data.data));
                        resolve(data);
                    } else {
                        alert(data?.message);
                        reject(data);
                    }
                } catch (error) {
                    // dispatch({ type: HideLoading });
                    reject(error);
                    alert('Network Error');
                    console.warn('err =====', error);
                }
            });
        };
    };


    static getCategoryFilter = ({ next_page_url, name }, id) => {
        console.log('====>', id);
          return dispatch => {
              return new Promise(async (resolve, reject) => {
                  try {
                      if (next_page_url == undefined || name) {
                        dispatch(TeleHealthAction.resetTeleHealth());
                      }
                      let formData = new FormData();
                      formData.append('search', name);
                      let { data } = await Axios.post(
                          next_page_url == undefined ?
                          Apis.PROVIDER_SERVICES(next_page_url)+ `${id}`
                          : 
                          Apis.PROVIDER_SERVICES(next_page_url),
                          name ? formData : {},
                          await getHeaders()
                      );
                      if (data?.success) {
                          // console.warn('dtaaaaSuccesssss', data?.data);
                          // console.log('data', data?.data);
                          dispatch(TeleHealthAction.getTeleHealth(data?.data));
                          resolve(data);
                      } else {
                          alert(data?.message);
                          reject(data);
                      }
                  } catch (error) {
                      // dispatch({ type: HideLoading });
                      reject(error);
                      alert('Network Error');
                      console.warn('err =====', error);
                  }
              });
          };
      };


    static getFilterDoctor = (filterData) => {
        console.log('======',filterData);
      return dispatch => {
        return new Promise(async (resolve, reject) => {
          try {
              let formData = new FormData();
              filterData?.rating ? formData.append('rating', filterData?.rating) : null;
              filterData?.experience ? formData.append('experience', filterData?.experience) : null;
              filterData?.distance ? formData.append('distance', filterData?.distance) : null;
              filterData?.serviceid ? formData.append('service_id', filterData?.serviceid) : null;
              const { data } = await Axios.post(
                Apis.PROVIDER_SERVICES_BY_ID,
                formData,
                await getHeaders()
                );
                // console.log('=======>',data);
                if(data?.success){
                    dispatch(TeleHealthAction.getTeleHealth(data))
                  resolve(data)
                }
                else {
                  reject(data);
              }
              
          } catch (error) {
            reject(error);
            console.log(error);
            alert('Network Error');
          }
        });
      };
    };

}

export default TeleHealthMiddleware;
