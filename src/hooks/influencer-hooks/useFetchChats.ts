import { useNavigate } from "react-router-dom";
import { BASE_URL, TOKEN } from "../../helpers/strings";
import axios from "axios";
import { ChatInterface } from "../../helpers/interfaces";
import { useRecoilState, useSetRecoilState } from "recoil";
import { influencerChatsState } from "../../store/atoms/chatsAtom";
import { isChatsFetchedOnceState } from "../../store/atoms/isChatsFetchedOnceAtom";
import { useEffect, useState } from "react";
import { handleHTTPError } from "../../helpers/errorHandler";
import { chatsExistState } from "../../store/atoms/chatsExistAtom";

export function useFetchChats() : [ChatInterface[],boolean]{
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [chats,setChats] = useRecoilState(influencerChatsState);
    const setIsChatsFetchedOnce = useSetRecoilState(isChatsFetchedOnceState);
    const setChatsExist = useSetRecoilState(chatsExistState);
    async function fetchChats() {
        setIsLoading(true);
        console.log('loading...');
        const token = localStorage.getItem(TOKEN);
        if (!token || token === '') {
            localStorage.removeItem(TOKEN);
            return navigate('../')
        }
        try {
            const authorization = 'Bearer ' + token;
            const response = await axios.get(`${BASE_URL}/influencer/conversations/`, {
                headers: {
                    'Authorization': authorization
                }
            });
            interface ApiResponse {
                conversations: any[];
            }
            const responseData = response.data as ApiResponse;
            const fetchedChats = responseData.conversations;
            const chats = fetchedChats.map((chat): ChatInterface => {
                return {
                    conversationId: chat.conversation._id,
                    followerName: chat.follower.fullName,
                    followerId: chat.conversation.follower,
                    influencerId: chat.conversation.influencer,
                    lastMessageSenderId: chat.latestMessage.sender,
                    latestMessageContent: chat.latestMessage.content,
                    latestMessageStatus: chat.latestMessage.messageStatus,
                    latestMessageTimestamp: new Date(chat.latestMessage.timestamp),
                    updatedAt: new Date(chat.conversation.updated_at),
                }
            });
            chats.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
            setChats(chats);
            setChatsExist(true);
        }
        catch (e) {
            navigate('/influencer')
            console.log('no conversations')
        }
        setIsChatsFetchedOnce(true);
        setIsLoading(false);
        console.log('loaded');
    }
    useEffect(() => {
        fetchChats();
    },[])
    return [chats,isLoading];
}