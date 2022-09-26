import {
    GET_LAB_REPORTS,
    // LOGOUT,
    RESET_LAB_REPORTS,
} from '../Types/actions_type';

let initialSate = {
    labreport: null,
    labreport_list: [],
    loading: false,
};

const LabReportsReducer = (state = initialSate, action) => {
    switch (action.type) {
        case GET_LAB_REPORTS:
            let labreport_list_copy = [];
            labreport_list_copy = [...state.labreport_list, ...action.payload.data];
            state = {
                ...state,
                labreport: action.payload,
                labreport_list: labreport_list_copy,
            };
            break;

        case RESET_LAB_REPORTS:
            state = {
                labreport: null,
                labreport_list: [],
            };
            break;
        default:
            break;
    }
    return state;
};

export default LabReportsReducer;
