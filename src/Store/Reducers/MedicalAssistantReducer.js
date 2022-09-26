import {
    GET_MEDICAL_ASSISTANT,
    RESET_MEDICAL_ASSISTANT,
} from '../Types/actions_type';

let initialSate = {
    medicalassistant: null,
    medicalassistant_list: [],
    loading: false,
};

const MedicalAssistantReducer = (state = initialSate, action) => {
    switch (action.type) {
        case GET_MEDICAL_ASSISTANT:
            let medicalassistant_list_copy = [];
            medicalassistant_list_copy = [...state.medicalassistant_list, ...action.payload.data];
            state = {
                ...state,
                medicalassistant: action.payload,
                medicalassistant_list: medicalassistant_list_copy,
            };
            break;

        case RESET_MEDICAL_ASSISTANT:
            state = {
                medicalassistant: null,
                medicalassistant_list: [],
            };
            break;

        default:
            break;
    }
    return state;
};

export default MedicalAssistantReducer;
