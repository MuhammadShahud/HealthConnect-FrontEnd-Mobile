import { GET_LAB_REPORTS, RESET_LAB_REPORTS, } from '../Types/actions_type';

const LabReportsAction = {
  getLabReport: data => {
    return {
      type: GET_LAB_REPORTS,
      payload: data,
    };
  },

  resetLabReport: () => {
    return {
      type: RESET_LAB_REPORTS,
    };
  },
};

export default LabReportsAction;
