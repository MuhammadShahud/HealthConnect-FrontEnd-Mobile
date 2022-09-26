import Axios from 'axios';
import { getHeaders } from '../../Utils';
import ALLUserRatingAction from '../Actions/AllUserRatingAction';
import Apis from '../Apis';


class AllUserRatingMiddleware {

  static getAllUserRating = (id) => {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          const { data } = await Axios.get(
              Apis.GET_ALL_USER_RATING + `${id}`,
              await getHeaders()
              );
          dispatch(ALLUserRatingAction.getAllUserRating(data));
          resolve(data)
        } catch (error) {
          reject(error);
          alert('Network Error');
        }
      });
    };
  };

}

export default AllUserRatingMiddleware;