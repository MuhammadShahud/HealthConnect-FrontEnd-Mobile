import { GET_TELE_HEALTH, RESET_TELE_HEALTH, } from '../Types/actions_type';

const TeleHealthAction = {
    getTeleHealth: data => {
        return {
            type: GET_TELE_HEALTH,
            payload: data,
        };
    },

    resetTeleHealth: () => {
        return {
            type: RESET_TELE_HEALTH,
        };
    },
};

export default TeleHealthAction;
