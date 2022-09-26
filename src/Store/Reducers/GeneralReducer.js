import { HideLoading, ShowLoading } from '../Types/actions_type';

const initialstate = {
  loading: false,
};

const GeneralReducer = (state = initialstate, action) => {
  switch (action.type) {
    case ShowLoading:
      state = { loading: true };
      break;
    case HideLoading:
      state = { loading: false };
      break;
    default:
      break;
  }
  return state;
};
export default GeneralReducer;

