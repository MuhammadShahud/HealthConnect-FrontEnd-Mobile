import { GET_CHAT_INDEX, RESET_CHAT_INDEX, } from '../Types/actions_type';

const ChatIndexAction = {
  getChatIndex: data => {
    return {
      type: GET_CHAT_INDEX,
      payload: data,
    };
  },

  resetChatIndex: () => {
    return {
      type: RESET_CHAT_INDEX,
    };
  },
};

export default ChatIndexAction;
