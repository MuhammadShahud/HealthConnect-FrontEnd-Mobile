import {
    GET_CHAT_INDEX,
    RESET_CHAT_INDEX,
} from '../Types/actions_type';

let initialSate = {
    chat_index: null,
    chat_index_list: [],
    loading: false,
};

const ChatIndexReducer = (state = initialSate, action) => {
    switch (action.type) {
        case GET_CHAT_INDEX:
            // let chat_index_list_copy = [];
            // chat_index_list_copy = [...state.chat_index_list, ...action.payload.data];
            state = {
                ...state,
                chat_index: action.payload,
                chat_index_list: action.payload.data,
            };
            break;

        case RESET_CHAT_INDEX:
            state = {
                chat_index: null,
                chat_index_list: [],
            };
            break;

        default:
            break;
    }
    return state;
};

export default ChatIndexReducer;
