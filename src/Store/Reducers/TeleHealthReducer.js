import {
    GET_TELE_HEALTH,
    // LOGOUT,
    RESET_TELE_HEALTH,
} from '../Types/actions_type';

let initialSate = {
    TeleHealth: null,
    TeleHealth_list: [],
    loading: false,
};

const TeleHealthReducer = (state = initialSate, action) => {
    switch (action.type) {
        case GET_TELE_HEALTH:
            let TeleHealth_list_copy = [];
            TeleHealth_list_copy = [...state.TeleHealth_list, ...action.payload.data];
            state = {
                ...state,
                TeleHealth: action.payload,
                TeleHealth_list: TeleHealth_list_copy,
            };
            break;

        case RESET_TELE_HEALTH:
            state = {
                TeleHealth: null,
                TeleHealth_list: [],
            };
            break;


        default:
            break;
    }
    return state;
};

export default TeleHealthReducer;
