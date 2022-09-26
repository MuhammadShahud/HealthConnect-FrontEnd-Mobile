import Axios from 'axios';
import { getHeaders } from '../../Utils';
import TransportActions from '../Actions/TransportActions';
import Apis from '../Apis';
import { HideLoading, ShowLoading } from '../Types/actions_type';

class TransportMiddleware {

    static getTransport = ({ next_page_url, name }) => {
        console.log('nameeeMiddlewaree', name);
        console.log('next_page_urlMiddlewaree', next_page_url);
        return dispatch => {
            return new Promise(async (resolve, reject) => {
                try {
                    // dispatch({ type: ShowLoading });
                    if (next_page_url == undefined || name) {
                        dispatch(TransportActions.resetTransport());
                    }
                    let formData = new FormData();
                    formData.append('search', name);
                    let { data } = await Axios.post(
                        Apis.GET_TRANSPORT(next_page_url),
                        name ? formData : {},
                        await getHeaders(),
                    );
                    if (data?.success) {
                        console.warn('dtaaaaSuccesssss', data);
                        dispatch(TransportActions.getTransport(data.data));
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

export default TransportMiddleware;
