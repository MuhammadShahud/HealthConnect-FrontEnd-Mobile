import { GET_DOCTOR_RATING } from '../Types/actions_type';

const ReviewAction = {
  getDoctorRating: data => {
    return {
      type: GET_DOCTOR_RATING,
      payload: data,
    };
  },
};

export default ReviewAction;
