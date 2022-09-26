import {
    GET_LABORATORY,
    // LOGOUT,
    RESET_LABORATORY,
} from '../Types/actions_type';

let initialSate = {
    Laboratory: null,
    Laboratory_list: [],
    loading: false,
};

const LaboratoryReducer = (state = initialSate, action) => {
    switch (action.type) {
        case GET_LABORATORY:
            // let Laboratory_list_copy = [];
            // Laboratory_list_copy = [...state.Laboratory_list, ...action.payload.data];
            state = {
                ...state,
                Laboratory: action.payload,
                Laboratory_list: action.payload.data,
            };
            break;

        case RESET_LABORATORY:
            state = {
                Laboratory: null,
                Laboratory_list: [],
            };
            break;


        default:
            break;
    }
    return state;
};

export default LaboratoryReducer;
