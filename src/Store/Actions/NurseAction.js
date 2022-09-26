import { GET_NURSE, RESET_NURSE, } from '../Types/actions_type';

const NurseAction = {
    getNurse: data => {
        return {
            type: GET_NURSE,
            payload: data,
        };
    },

    resetNurse: () => {
        return {
            type: RESET_NURSE,
        };
    },
};

export default NurseAction;
