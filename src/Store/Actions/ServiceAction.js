import { GET_SERVICES, RESET_SERVICES, } from '../Types/actions_type';

const ServiceAction = {
  getService: data => {
    return {
      type: GET_SERVICES,
      payload: data,
    };
  },

  resetService: () => {
    return {
      type: RESET_SERVICES,
    };
  },
};

export default ServiceAction;
