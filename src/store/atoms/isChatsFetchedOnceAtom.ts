import { atom } from "recoil";

export const isChatsFetchedOnceState = atom({
    key: 'IsChatsFetchedOnce',
    default: false
})