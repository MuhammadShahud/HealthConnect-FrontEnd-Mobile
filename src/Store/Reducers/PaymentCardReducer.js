import { DELETE_PAYMENT_CARD, GET_PAYMENT_CARD, UPDATE_DEFAULT_CARD } from '../Types/actions_type';

let initialSate = {
  paymentcard: null,
  paymentcard_list: [],
  loading: false,
};

const PaymentCardReducer = (state = initialSate, action) => {
  switch (action.type) {
    case GET_PAYMENT_CARD:
      // let paymentcard_list_copy = [];
      // paymentcard_list_copy = [...state.paymentcard_list, ...action.payload.data];
      state = {
        ...state,
        paymentcard: action.payload,
        paymentcard_list: action.payload.data,
      };
      break;

    case UPDATE_DEFAULT_CARD:
      let paymentcard_list_copy = [...state.paymentcard_list];
      paymentcard_list_copy.forEach((card) => {
        card.default_card = 0;
      })
      paymentcard_list_copy[action.payload].default_card = 1;
      state = {
        ...state,
        paymentcard_list: paymentcard_list_copy,
      };
      break;

    case DELETE_PAYMENT_CARD:
      let paymentcardlist_copy = [...state.paymentcard_list];
      paymentcardlist_copy.splice(action.payload, 1)
      state = {
        ...state,
        paymentcard_list: paymentcardlist_copy,
      };
      break;

    default:
      break;
  }
  return state;
};

export default PaymentCardReducer;
