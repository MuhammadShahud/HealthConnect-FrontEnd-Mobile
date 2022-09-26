import { GET_SUB_SERVICES, RESET_SUB_SERVICES, } from '../Types/actions_type';

const SubServicesAction = {
  getSubServices: data => {
    return {
      type: GET_SUB_SERVICES,
      payload: data,
    };
  },

  resetSubServices: () => {
    return {
      type: RESET_SUB_SERVICES,
    };
  },
};

export default SubServicesAction;
