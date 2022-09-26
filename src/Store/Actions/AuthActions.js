import {
  LOGIN,
  LOGOUT,
  // EDIT_PROFILE,
  REGISTER,
  UPDATE_USER,
  NAVIGATE_TO_AUTH,
  // UPDATE_CARD,
  // UPDATE_POINTS,

} from '../Types/actions_type';

export default {
  openLogin: data => {
    return {
      type: NAVIGATE_TO_AUTH,
      data: data,
    };
  },
  Register: data => {
    return {
      type: REGISTER,
      data: data,
    };
  },
  Login: data => {
    // console.warn("Login Action:", data);
    return {
      type: LOGIN,
      data: data,
    };
  },
  Logout: (navigation) => {
    return {
      type: LOGOUT,
    };
  },
  UpdateUser: data => {
    // console.warn("Auth Action Data", data)
    return {
      type: 'UPDATE_USER',
      data: data,
    };
  },

  // UpdateCard: data => {
  //   return {
  //     type: UPDATE_CARD,
  //     data: data,
  //   };
  // },
  // EditProfile: data => {
  //   return {
  //     type: EDIT_PROFILE,
  //     data: data,
  //   };
  // },
  // UpdatePoints: data => {
  //   return {
  //     type: UPDATE_POINTS,
  //     data: data,
  //   };
  // },
};
