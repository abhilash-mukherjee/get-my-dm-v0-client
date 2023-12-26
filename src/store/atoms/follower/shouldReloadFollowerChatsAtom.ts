import { atom } from "recoil";

export const shouldReloadFollowerChatsAtom = atom({
    default: false,
    key: 'ReloadFollowerChats',
})