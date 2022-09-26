import { GET_ALL_USER_RATING } from '../Types/actions_type';

const ALLUserRatingAction = {
  getAllUserRating: data => {
    return {
      type: GET_ALL_USER_RATING,
      payload: data,
    };
  },
};

export default ALLUserRatingAction;
