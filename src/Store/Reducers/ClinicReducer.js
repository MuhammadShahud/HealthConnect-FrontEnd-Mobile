import {
    GET_CLINIC,
    // LOGOUT,
    RESET_CLINIC,
} from '../Types/actions_type';

let initialSate = {
    Clinic: null,
    Clinic_list: [],
    loading: false,
};

const ClinicReducer = (state = initialSate, action) => {
    switch (action.type) {
        case GET_CLINIC:
            // let Clinic_list_copy = [];
            // Clinic_list_copy = [...state.Clinic_list, ...action.payload.data];
            state = {
                ...state,
                Clinic: action.payload,
                Clinic_list: action.payload.data,
            };
            break;

        case RESET_CLINIC:
            state = {
                Clinic: null,
                Clinic_list: [],
            };
            break;


        default:
            break;
    }
    return state;
};

export default ClinicReducer;
