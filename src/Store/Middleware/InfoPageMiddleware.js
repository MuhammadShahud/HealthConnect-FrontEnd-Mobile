import Axios from 'axios';
import Apis, { post } from '../Apis';
import { getHeaders } from '../../Utils';

class InfoPageMiddleware {


    static getInfo = () => {
        return dispatch => {
          return new Promise(async (resolve, reject) => {
            // dispatch({ type: ShowLoading });
            try {
              let headers = await getHeaders();
              const { data } = await Axios.get(
                  Apis.GET_INFO_PAGE,
                  headers,
                  );
              if(data){
                  console.log('==>',data);
                  resolve(data)
                //   dispatch({ type: HideLoading });
              }
            } catch (error) {
              console.log('==>',error);
              reject(error);
              alert('Network Error');
            //   dispatch({ type: HideLoading });
            }
          });
        };
      };

}

export default InfoPageMiddleware;