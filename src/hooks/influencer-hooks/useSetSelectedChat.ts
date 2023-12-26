import { useRecoilState, useRecoilValue } from "recoil";
import { ChatInterface, defaultChat } from "../../helpers/interfaces";
import { selectedChatState } from "../../store/atoms/influencer/selectedChatAtom";
import { useEffect } from "react";
import { influencerChatsState } from "../../store/atoms/influencer/chatsAtom";

export function useSetSelectedChat(convoId : string) : ChatInterface {
    const [selectedChat, setSelectedChat] = useRecoilState(selectedChatState);
    const chats = useRecoilValue(influencerChatsState)
    useEffect(()=>{
        const chat = chats.find(c=> c.conversationId === convoId);
        if(!chat) return setSelectedChat(defaultChat);
        setSelectedChat(chat);
    })
    return selectedChat;
}