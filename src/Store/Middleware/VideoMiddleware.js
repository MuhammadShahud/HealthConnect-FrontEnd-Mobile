import Axios from 'axios';
import { getHeaders } from '../../Utils';
import TransportActions from '../Actions/TransportActions';
import Apis from '../Apis';
import { HideLoading, ShowLoading } from '../Types/actions_type';

class VideoMiddleware {

    static generateToken = ({ id, callback }) => {
        return async dispatch => {
            dispatch({ type: ShowLoading });
            try {
                let headers = await getHeaders();
                let formData = new FormData();
                formData.append('id', id);
                console.warn("FormDATA:", formData, "ID:", id);
                const { data } = await Axios.post(
                    Apis.GENERATE_TOKEN,
                    formData,
                    headers,
                );
                if (data.success) {
                    callback(data)
                }
                dispatch({ type: HideLoading });
            } catch (error) {
                console.warn(error)
                dispatch({ type: HideLoading });
            }
        };
    };
    static declineCall = (id) => {
        console.warn("jeje", id);
        return async dispatch => {
            return new Promise(async (resolve, reject) => {
                dispatch({ type: ShowLoading });
                try {
                    let headers = await getHeaders();
                    let formData = new FormData();
                    formData.append('id', id);
                    console.warn("FormDATA:", formData, "ID:", id);
                    const data = await Axios.post(
                        Apis.DECELINE_CALL,
                        formData,
                        headers,
                    );
                    console.warn("Request:", data);
                    if (data.success) {
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
}

export default VideoMiddleware;
