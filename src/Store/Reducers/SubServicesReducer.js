import {
    GET_SUB_SERVICES,
    RESET_SUB_SERVICES,
} from '../Types/actions_type';

let initialSate = {
    subservices: null,
    subservices_list: [],
    loading: false,
};

const SubServicesReducer = (state = initialSate, action) => {
    switch (action.type) {
        case GET_SUB_SERVICES:
            // let subservices_list_copy = [];
            // subservices_list_copy = [...state.subservices_list, ...action.payload.data];
            state = {
                ...state,
                subservices: action.payload,
                subservices_list: action.payload.data,
            };
            break;

        case RESET_SUB_SERVICES:
            state = {
                ...state,
                subservices: null,
                subservices_list: [],
            };
            break;

        default:
            break;
    }
    return state;
};

export default SubServicesReducer;
