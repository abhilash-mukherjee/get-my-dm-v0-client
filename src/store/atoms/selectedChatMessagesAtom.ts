import { atom } from "recoil";
import { MessageInterface } from "../../helpers/interfaces";

export const selectedChatMessagesState = atom<MessageInterface[]>({
    key: 'SelectedChatMessages',
    default: [],
})