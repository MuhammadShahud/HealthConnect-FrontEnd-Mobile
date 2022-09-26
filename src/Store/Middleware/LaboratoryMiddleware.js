import Axios from 'axios';
import { getHeaders } from '../../Utils';
import LaboratoryAction from '../Actions/LaboratoryAction';
import Apis from '../Apis';
import { HideLoading, ShowLoading } from '../Types/actions_type';

class LaboratoryMiddleware {

    static getLaboratory = ({ next_page_url, name }) => {
        console.log('nameeeMiddlewaree', name);
        console.log('next_page_urlMiddlewaree', next_page_url);
        return dispatch => {
            return new Promise(async (resolve, reject) => {
                try {
                    // dispatch({ type: ShowLoading });
                    if (next_page_url == undefined || name) {
                        dispatch(LaboratoryAction.resetLaboratory());
                    }
                    let formData = new FormData();
                    formData.append('search', name);
                    let { data } = await Axios.post(
                        Apis.GET_LABORSTORIES(next_page_url),
                        name ? formData : {},
                        await getHeaders(),
                    );
                    if (data?.success) {
                        // console.warn('-----------', data);
                        dispatch(LaboratoryAction.getLaboratory(data.data));
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

}

export default LaboratoryMiddleware;
