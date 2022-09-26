import Axios from 'axios';
import { getHeaders } from '../../Utils';
import DoctorAction from '../Actions/DoctorAction';
import Apis from '../Apis';

class DoctorMiddleware {

    static getDoctor = ({ next_page_url, name }, id) => {
      console.log('====>', id);
        return dispatch => {
            return new Promise(async (resolve, reject) => {
                try {
                    if (next_page_url == undefined || name) {
                        dispatch(DoctorAction.resetDoctor());
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
                        // console.warn('dtaaaaSuccesssss', data?.data?.data);
                        // console.log('data', data?.data);
                        dispatch(DoctorAction.getDoctor(data?.data));
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


    static getPopularDoctor = () => {
        return dispatch => {
          return new Promise(async (resolve, reject) => {
            try {
              const { data } = await Axios.get(
                  Apis.POPULAR_DOCTOR,
                  await getHeaders()
                  );
                  console.log('------------', data);
            resolve(data?.message)
            } catch (error) {
              reject(error);
              alert('Network Error');
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
                  if(data?.success){
                    dispatch(DoctorAction.getDoctor(data));
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



    static getDoctorAppointment = ({ next_page_url, name }) => {
      console.log('nameeeMiddlewaree',name);
      console.log('next_page_urlMiddlewaree',next_page_url);
      return dispatch => {
          return new Promise(async (resolve, reject) => {
              try {
                  let formData = new FormData();
                  formData.append('search', name);
                  let { data } = await Axios.post(
                      Apis.GET_DOCTOR_APPOINTMENT(next_page_url),
                       formData ,
                      await getHeaders(),
                  );
                  if (data?.success) {
                       console.warn('dtaaaaSuccesssss', data);
                      if(name == 'loadmore'){
                        dispatch(DoctorAction.LoadMoreDoctorAppointment(data?.data));
                      }
                      else{
                        dispatch(DoctorAction.getDoctorAppointment(data?.data));
                      }
                      
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

  static getLatestAppoinmentRequest = () => {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          const { data } = await Axios.post(
              Apis.GET_LATEST_APPOINTMENT_REQUEST,
              {},
              await getHeaders()
              );
              // console.log('---',data);
        resolve(data)
        } catch (error) {
          reject(error);
          console.log(error);
          alert('Network Error');
        }
      });
    };
  };

}

export default DoctorMiddleware;
