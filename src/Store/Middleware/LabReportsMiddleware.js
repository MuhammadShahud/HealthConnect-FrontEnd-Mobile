import Axios from 'axios';
import AppAction from '../Actions/AppAction';
import Apis from '../Apis';
import BASE_URL from '../Apis'
import {Alert} from 'react-native';
import { HideLoading, ShowLoading } from '../Types/actions_type';
import RNFetchBlob from 'rn-fetch-blob';
import { getHeaders } from '../../Utils';
import LabReportsAction from '../Actions/LabReportsAction';


class LabReportsMiddleware {


  static getLabReports = ({ next_page_url, name }) => {
    let headers = getHeaders()
    return dispatch => {
        return new Promise(async (resolve, reject) => {
            try {
                // dispatch({ type: ShowLoading });
                if (next_page_url == undefined || name) {
                    dispatch(LabReportsAction.resetLabReport());
                }
                let { data } = await Axios.get(
                    Apis.GET_USER_REPORTS(next_page_url),
                    await getHeaders(),
                );
                if (data?.success) {
                    dispatch(LabReportsAction.getLabReport(data.data));
                    resolve(data);
                } else {
                    alert(data?.message);
                    reject(data);
                }
            } catch (error) {
                // dispatch({ type: HideLoading });
                reject(error);
                alert(error);
                console.warn('err =====', error);
            }
        });
    };
};
  
  static uploadDocument = userData => {
    return async dispatch => {
      dispatch({ type: ShowLoading });
      let headers = await getHeaders()
      await RNFetchBlob
        .config({ timeout: 60 * 60 })
        .fetch("POST", Apis.UPLOAD_REPORT,
        headers.documentheaders,
          [
          {
            name:"report_title",
            data:userData?.reportTitle,
          },
          {
            name:"report_id",
            data: userData?.reportID,
          },
          {
            name: "file",
            filename: userData?.selectedDocument?.name,
            data: RNFetchBlob.wrap(userData?.selectedDocument?.uri),
            type: userData?.selectedDocument?.type,

          },
        ],

        )
        .then((response) => {
          if(JSON.parse(response.data).success){
            Alert.alert("Note",JSON.parse(response.data).message);
            dispatch({ type: HideLoading });
          }
          else{
            Alert.alert("Note",JSON.parse(response.data).message);
            dispatch({ type: HideLoading });
          }
        }).catch((err) => {
          dispatch({ type: HideLoading });
        })
    };
  };

}

export default LabReportsMiddleware;