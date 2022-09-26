import { GET_COMMENTS, GET_POSTS, GET_USERS, HideLoading, ShowLoading } from '../Types/actions_type';

class AuthAction {
    static getUsers = payload => {
        return {
            type: GET_USERS,
            payload: payload,
        };
    };
    static getPosts = payload => {
        return {
            type: GET_POSTS,
            payload: payload,
        };
    };
    static getComments = payload => {
        return {
            type: GET_COMMENTS,
            payload: payload,
        };
    };
    static showLoading = payload => {
        return {
            type: ShowLoading,
            payload: payload,
        };
    };
    static hideLoading = payload => {
        return {
            type: HideLoading,
            payload: payload,
        };
    };

}

export default AuthAction;