import {
    GET_PHARMACIES,
    // LOGOUT,
    RESET_PHARMACIES,
} from '../Types/actions_type';

let initialSate = {
    pharmacies: null,
    pharmacies_list: [],
    loading: false,
};

const PharmaciesReducer = (state = initialSate, action) => {
    switch (action.type) {
        case GET_PHARMACIES:
            let pharmacies_list_copy = [];
            pharmacies_list_copy = [...state.pharmacies_list, ...action.payload.data];
            state = {
                ...state,
                pharmacies: action.payload,
                pharmacies_list: pharmacies_list_copy,
            };
            break;

        case RESET_PHARMACIES:
            state = {
                pharmacies: null,
                pharmacies_list: [],
            };
            break;

        // case LOGOUT:
        //     state = {
        //         pharmacies: null,
        //         pharmacies_list: [],
        //     };
        //     break;
        default:
            break;
    }
    return state;
};

export default PharmaciesReducer;
