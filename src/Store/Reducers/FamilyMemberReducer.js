import { GET_FAMILY_MEMBER, DELETE_FAMILY_MEMBER } from '../Types/actions_type';

let initialSate = {
  familymember: null,
  familymember_list: [],
  loading: false,
};

const FamilyMemberReducer = (state = initialSate, action) => {
  switch (action.type) {
    case GET_FAMILY_MEMBER: 
    state = {
        ...state,
        familymember_list: action.payload,
      };
      break;

    case DELETE_FAMILY_MEMBER:
      let familymember_list_copy = [...state.familymember_list];
      familymember_list_copy.splice(action.payload, 1)
      state = {
        ...state,
        familymember_list: familymember_list_copy,
      };
      break;

    default:
      break;
  }
  return state;
};

export default FamilyMemberReducer;
