import { atom } from "recoil";

export const shouldReloadChatsState = atom({
    key: 'ShouldReloadChats',
    default:false
})