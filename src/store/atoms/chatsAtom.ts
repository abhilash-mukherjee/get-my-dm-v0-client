import { atom } from "recoil";
import { ChatInterface } from "../../helpers/interfaces";

export const influencerChatsState = atom<ChatInterface[]>({
    key: 'InfuencerChats',
    default: [],
  });
