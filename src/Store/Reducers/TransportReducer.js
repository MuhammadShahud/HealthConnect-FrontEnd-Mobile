import {
    GET_TRANSPORT,
    // LOGOUT,
    RESET_TRANSPORT,
} from '../Types/actions_type';

let initialSate = {
    Transport: null,
    Transport_list: [],
    loading: false,
};

const TransportReducer = (state = initialSate, action) => {
    switch (action.type) {
        case GET_TRANSPORT:
            // let Transport_list_copy = [];
            // Transport_list_copy = [...state.Transport_list, ...action.payload.data];
            state = {
                ...state,
                Transport: action.payload,
                Transport_list: action.payload.data,
            };
            break;

        case RESET_TRANSPORT:
            state = {
                Transport: null,
                Transport_list: [],
            };
            break;


        default:
            break;
    }
    return state;
};

export default TransportReducer;
