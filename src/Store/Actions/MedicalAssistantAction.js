import { GET_MEDICAL_ASSISTANT, RESET_MEDICAL_ASSISTANT, } from '../Types/actions_type';

const MedicalAssistantAction = {
  getMedicalAssistant: data => {
    return {
      type: GET_MEDICAL_ASSISTANT,
      payload: data,
    };
  },

  resetMedicalAssistant: () => {
    return {
      type: RESET_MEDICAL_ASSISTANT,
    };
  },
};

export default MedicalAssistantAction;
