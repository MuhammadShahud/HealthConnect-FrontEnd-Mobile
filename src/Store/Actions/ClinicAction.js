import { GET_CLINIC, RESET_CLINIC, } from '../Types/actions_type';

const ClinicAction = {
    getClinic: data => {
        return {
            type: GET_CLINIC,
            payload: data,
        };
    },

    resetClinic: () => {
        return {
            type: RESET_CLINIC,
        };
    },
};

export default ClinicAction;
