import { IS_LOGIN, USER_ROLE, REGISTER, LOGIN, UPDATE_USER, LOGOUT, NAVIGATE_TO_AUTH } from '../Types/actions_type';

const initialstate = {
  isLogin: false,
  userRole: '',
  user: {},
};

const AuthReducer = (state = initialstate, action) => {

  // console.warn("Action", action);
  switch (action.type) {


    case NAVIGATE_TO_AUTH:
      state = {
        ...state,
        isLogin: action.data,
      };
      break;
    case IS_LOGIN:
      state = { ...state, isLogin: action.payload };
      break;
    case USER_ROLE:
      state = { ...state, userRole: action.payload };
      break;

    case REGISTER:
      state = {
        ...state,
        user: action.data,
      };
      break;
    case LOGIN:
      state = {
        ...state,
        user: action.data,
      };
      break;
    case UPDATE_USER:
      // console.warn('Reducer', action.data);
      state = {
        ...state,
        user: { ...state.user, user: action.data },
      };
      break;
    case LOGOUT:
      state = {
        ...state,
        user: {},
      };
      break;

    default:
      break;
  }

  return state;
};

export default AuthReducer;
