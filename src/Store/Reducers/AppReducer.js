import { GET_COMMENTS, GET_POSTS, GET_USERS } from '../Types/actions_type';

let initialSate = {
    users: null,
    posts: null,
    comments: null
};

const AppReducer = (state = initialSate, action) => {
    switch (action.type) {
        case GET_USERS:
            state = {...state, users: action.payload };
            break;
        case GET_POSTS:
            state = {...state, posts: action.payload };
            break;
        case GET_COMMENTS:
            state = {...state, comments: action.payload };
            break;
        default:
            break;
    }
    return state;
};

export default AppReducer;