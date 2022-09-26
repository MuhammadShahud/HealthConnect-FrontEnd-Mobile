import Axios from 'axios';
import {Alert} from 'react-native'
import { getHeaders } from '../../Utils';
import DoctorAppointmentAction from '../Actions/DoctorAppointmentAction';
import PharmaciesActions from '../Actions/PharmaciesActions';
import Apis from '../Apis';
import { HideLoading, ShowLoading } from '../Types/actions_type';

class DoctorAppointmentMiddleware {

    static getDoctorPastAppointment = ({ next_page_url, name }) => {
        console.log('nameeeMiddlewaree',name);
        console.log('next_page_urlMiddlewaree',next_page_url);
        return dispatch => {
            return new Promise(async (resolve, reject) => {
                try {
                    if (next_page_url == undefined || name) {
                        dispatch(DoctorAppointmentAction.resetDoctorPastAppointment());
                    }
                    let formData = new FormData();
                    formData.append('search', name);
                    let { data } = await Axios.post(
                        Apis.GET_DOCTOR_PAST_APPOINTMENT_REQUEST(next_page_url),
                        name ? formData : {},
                        await getHeaders(),
                    );
                    if (data?.success) {
                        // console.warn('dtaaaaSuccesssss', data?.data);
                        dispatch(DoctorAppointmentAction.getDoctorPastAppointment(data?.data));
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


    static getDoctorUpcomingAppointment = ({ next_page_url, name }) => {
        console.log('nameeeMiddlewaree',name);
        console.log('next_page_urlMiddlewaree',next_page_url);
        return dispatch => {
            return new Promise(async (resolve, reject) => {
                try {
                    if (next_page_url == undefined || name) {
                        dispatch(DoctorAppointmentAction.resetDoctorUpcomingAppointment());
                    }
                    let formData = new FormData();
                  //  formData.append('search', name);
                    let { data } = await Axios.post(
                        Apis.GET_DOCTOR_UPCOMING_APPOINTMENT_REQUEST(next_page_url),
                        name ? formData : {},
                        await getHeaders(),
                    );
                   // console.warn('dtaaaaSuccesssss', data);
                    if (data?.success) {
                        // console.warn('dtaaaaSuccesssss', data?.data);
                        dispatch(DoctorAppointmentAction.getDoctorUpcomingAppointment(data));
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


    static AcceptAppointment = (id) => {
        return dispatch => {
            return new Promise(async (resolve, reject) => {
                try {
                    let formData = new FormData();
                    formData.append('appointment_id', id);
                    let { data } = await Axios.post(
                        Apis.ACCEPT_APPOINTMENT_REQUEST,
                        formData,
                        await getHeaders(),
                    );
                    if (data?.success) {
                        // Alert.alert('Note',data?.message);
                        // dispatch(DoctorAppointmentAction.getDoctorUpcomingAppointment(data?.data));
                        resolve(data);
                    } else {
                        // Alert.alert('Note',data?.message);
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


    static DeclineAppointment = (id) => {
        return dispatch => {
            return new Promise(async (resolve, reject) => {
                try {
                    let formData = new FormData();
                    formData.append('appointment_id', id);
                    let { data } = await Axios.post(
                        Apis.CANCEL_APPOINTMENT_REQUEST,
                        formData,
                        await getHeaders(),
                    );
                    if (data?.success) {
                        // Alert.alert('Note',data?.message);
                        // dispatch(DoctorAppointmentAction.getDoctorUpcomingAppointment(data?.data));
                        resolve(data);
                    } else {
                        // Alert.alert('Note',data?.message);
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


    static CompleteAppointment = (id) => {
        return dispatch => {
            return new Promise(async (resolve, reject) => {
                try {
                    let formData = new FormData();
                    formData.append('appointment_id', id);
                    let { data } = await Axios.post(
                        Apis.COMPLETE_APPOINTMENT,
                        formData,
                        await getHeaders(),
                    );
                    if (data?.success) {
                        // Alert.alert('Note',data?.message);
                        // dispatch(DoctorAppointmentAction.getDoctorUpcomingAppointment(data?.data));
                        resolve(data);
                    } else {
                        // Alert.alert('Note',data?.message);
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

}

export default DoctorAppointmentMiddleware;
