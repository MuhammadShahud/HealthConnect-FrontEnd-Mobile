import { DELETE_PAYMENT_CARD, GET_PAYMENT_CARD, UPDATE_DEFAULT_CARD } from '../Types/actions_type';

const PaymentCardAction = {
  getPaymentCard: data => {
    return {
      type: GET_PAYMENT_CARD,
      payload: data,
    };
  },

  updateDefaultCard: data => {
    return {
      type: UPDATE_DEFAULT_CARD,
      payload: data,
    };
  },

  deletePaymentCard: data => {
    return {
      type: DELETE_PAYMENT_CARD,
      payload: data,
    };
  },

};

export default PaymentCardAction;
