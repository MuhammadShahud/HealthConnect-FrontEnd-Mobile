import { GET_FAMILY_MEMBER, DELETE_FAMILY_MEMBER } from '../Types/actions_type';

const FamilyMemberAction = {
  getFamilyMember: data => {
    return {
      type: GET_FAMILY_MEMBER,
      payload: data,
    };
  },

  deleteFamilyMember: data => {
    return {
      type: DELETE_FAMILY_MEMBER,
      payload: data,
    };
  },

};

export default FamilyMemberAction;
