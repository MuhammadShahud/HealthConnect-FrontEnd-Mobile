import {
    GET_NURSE,
    // LOGOUT,
    RESET_NURSE,
} from '../Types/actions_type';

let initialSate = {
    Nurse: null,
    Nurse_list: [],
    loading: false,
};

const NurseReducer = (state = initialSate, action) => {
    switch (action.type) {
        case GET_NURSE:
            // let Nurse_list_copy = [];
            // Nurse_list_copy = [...state.Nurse_list, ...action.payload.data];
            state = {
                ...state,
                Nurse: action.payload,
                Nurse_list: action.payload.data,
            };
            break;

        case RESET_NURSE:
            state = {
                Nurse: null,
                Nurse_list: [],
            };
            break;


        default:
            break;
    }
    return state;
};

export default NurseReducer;
