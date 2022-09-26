import { GET_PHARMACIES, RESET_PHARMACIES, } from '../Types/actions_type';

const PharmaciesAction = {
  getPharmacies: data => {
    return {
      type: GET_PHARMACIES,
      payload: data,
    };
  },

  resetPharmacies: () => {
    return {
      type: RESET_PHARMACIES,
    };
  },
};

export default PharmaciesAction;
