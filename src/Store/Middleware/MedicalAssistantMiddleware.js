import Axios from 'axios';
import { Alert } from 'react-native'
import { getHeaders } from '../../Utils';
import MedicalAssistantAction from '../Actions/MedicalAssistantAction';
import PharmaciesActions from '../Actions/PharmaciesActions';
import Apis from '../Apis';
import { HideLoading, ShowLoading } from '../Types/actions_type';

class MedicalAssistantMiddleware {

    static getMedicalAssistant = ({ next_page_url, name }) => {
        console.log('nameeeMiddlewaree',name);
        // console.log('next_page_urlMiddlewaree',next_page_url);
        return dispatch => {
            return new Promise(async (resolve, reject) => {
                try {
                    // dispatch({ type: ShowLoading });
                    if (next_page_url == undefined || name) {
                        dispatch(MedicalAssistantAction.resetMedicalAssistant());
                    }
                    let formData = new FormData();
                    formData.append('search', name);
                    let { data } = await Axios.post(
                        Apis.GET_MEDICAL_ASSISTANT(next_page_url),
                        name ? formData : {},
                        await getHeaders(),
                    );
                    console.warn('dtaaaaSuccesssss', data)
                    if (data?.success) {
                        // console.warn('dtaaaaSuccesssss', data?.data?.data);
                        dispatch(MedicalAssistantAction.getMedicalAssistant(data));
                        resolve(data);
                    } else {
                        Alert.alert('Note',data?.message);
                        resolve(data);
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


    static requestMedicalAssistant = (id) => {
        return dispatch => {
            return new Promise(async (resolve, reject) => {
                try {
                    let formData = new FormData();
                    formData.append('medical_assistant_id', id);
                    let { data } = await Axios.post(
                        Apis.REQUEST_TO_ASSISTANT,
                        formData,
                        await getHeaders(),
                    );
                    if (data?.success) {
                        console.warn('dtaaaaSuccesssss', data);
                        // Alert.alert('Note', data?.message)
                        resolve(data);
                    } else {
                        // Alert.alert('Note', data?.message)
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

export default MedicalAssistantMiddleware;
