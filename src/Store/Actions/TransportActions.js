import { GET_TRANSPORT, RESET_TRANSPORT, } from '../Types/actions_type';

const TransportAction = {
    getTransport: data => {
        return {
            type: GET_TRANSPORT,
            payload: data,
        };
    },

    resetTransport: () => {
        return {
            type: RESET_TRANSPORT,
        };
    },
};

export default TransportAction;
