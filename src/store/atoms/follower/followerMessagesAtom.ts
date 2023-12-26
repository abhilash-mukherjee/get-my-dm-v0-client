import { atom } from "recoil";
import { MessageInterface } from "../../../helpers/interfaces";

export const followerMessagesState = atom<MessageInterface[]>({
    key: 'FollowerMessagesState',
    default: []
})