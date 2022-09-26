import Axios from 'axios';
import { getHeaders } from '../../Utils';
import ChatIndexAction from '../Actions/ChatIndexAction';
import PharmaciesActions from '../Actions/PharmaciesActions';
import SubServicesAction from '../Actions/SubServicesAction';
import Apis from '../Apis';
import { HideLoading, ShowLoading } from '../Types/actions_type';

class SubServicesMiddleware {

    static getSubServices = ({ next_page_url, name }) => {
        console.log('nameeeMiddlewaree',name);
        console.log('next_page_urlMiddlewaree',next_page_url);
        return dispatch => {
            return new Promise(async (resolve, reject) => {
                try {
                    // dispatch({ type: ShowLoading });
                    if (next_page_url == undefined || name) {
                        dispatch(SubServicesAction.resetSubServices());
                    }
                    let formData = new FormData();
                    formData.append('search', name);
                    let { data } = await Axios.post(
                        Apis.GET_SUB_SERVICES(next_page_url),
                        name ? formData : {},
                        await getHeaders(),
                    );
                    if (data?.success) {
                        dispatch(SubServicesAction.getSubServices(data.data));
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

export default SubServicesMiddleware;
