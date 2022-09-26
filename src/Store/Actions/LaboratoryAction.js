import { GET_LABORATORY, RESET_LABORATORY, } from '../Types/actions_type';

const LaboratoryAction = {
    getLaboratory: data => {
        return {
            type: GET_LABORATORY,
            payload: data,
        };
    },

    resetLaboratory: () => {
        return {
            type: RESET_LABORATORY,
        };
    },
};

export default LaboratoryAction;
