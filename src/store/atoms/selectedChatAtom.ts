import { atom } from "recoil";
import { ChatInterface, defaultChat } from "../../helpers/interfaces";

export const selectedChatState = atom<ChatInterface>({
    key: 'SelectedChat',
    default: defaultChat,
  });