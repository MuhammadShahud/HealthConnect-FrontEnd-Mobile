import {
    GET_SERVICES,
    // LOGOUT,
    RESET_SERVICES,
} from '../Types/actions_type';

let initialSate = {
    services: null,
    services_list: [],
};

const ServiceReducer = (state = initialSate, action) => {
    switch (action.type) {
        case GET_SERVICES:
            // let services_list_copy = [];
            // services_list_copy = [...state.services_list, ...action.payload.data];
            state = {
                ...state,
                services: action.payload,
                services_list: action.payload.data,
            };
            break;

        case RESET_SERVICES:
            state = {
                services: null,
                services_list: [],
            };
            break;

        // case LOGOUT:
        //     state = {
        //         services: null,
        //         services_list: [],
        //     };
        //     break;
        default:
            break;
    }
    return state;
};

export default ServiceReducer;
