import { atom } from "recoil";
import { MessageInterface } from "../../../helpers/interfaces";

export const selectedMessagesState = atom<MessageInterface[]>({
    key: 'SelectedMessages',
    default: [],
})