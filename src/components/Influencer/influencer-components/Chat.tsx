import { useNavigate, useParams } from "react-router-dom"
import { Typography, TextField } from "@mui/material";
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { selectedChatState } from "../../../store/atoms/selectedChatAtom";
import CloseIcon from '@mui/icons-material/Close';
import '../influencer-styles/individual-chat.css'
import { ChatInterface, MessageInterface, defaultChat } from "../../../helpers/interfaces";
import { useEffect, useRef } from "react";
import { influencerChatsState } from "../../../store/atoms/chatsAtom";
import { useFetchChats } from "../../../hooks/influencer-hooks/useFetchChats";
import axios from "axios";
import { BASE_URL, TOKEN } from "../../../helpers/strings";
import { selectedMessagesState } from "../../../store/atoms/selectedMessagesAtom";
import { shouldReloadChatsState } from "../../../store/atoms/reloadChatsAtom";
import { MessageBar } from "../../common/MessageBar";
import { IncomingMessage } from "../../common/IncomingMessage";
import { OutgoingMessage } from "../../common/OutgoingMessage";
export function Chat() {
    useFetchChats();
    const conversationId = useParams().id;
    const [selectedChat, setSelectedChat] = useRecoilState(selectedChatState);
    const chats = useRecoilValue(influencerChatsState);
    const [messages, setMessages] = useRecoilState(selectedMessagesState);
    const [shouldReloadChats, setShouldReloadChats] = useRecoilState(shouldReloadChatsState)
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messagesContainerRef.current) {
            const scrollHeight = messagesContainerRef.current.scrollHeight;
            const height = messagesContainerRef.current.clientHeight;
            const maxScrollTop = scrollHeight - height;
            messagesContainerRef.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
        }
    }, [messages]);
    useEffect(() => {
        const chat = chats.find(chat => chat.conversationId === conversationId);
        if (!chat) return;
        fetchMessages(chat, setMessages);
        if (chat !== selectedChat) setSelectedChat(chat);
        setShouldReloadChats(false);
    }, [chats, shouldReloadChats === true])
    return (
        <>
            <div className="individual-chat-container">
                <Header />
                <div className="messages-container" ref={messagesContainerRef}>
                    {messages.map((message) => {
                        console.log('mapping messages')
                        return (
                            <>
                                {message.senderId === selectedChat.followerId ? <IncomingMessage message={message} /> : <OutgoingMessage message={message} />}
                            </>
                        )
                    })}
                </div>
                <MessageBar />
            </div>
        </>
    )
}

const fetchMessages = async (chat: ChatInterface, setMessages: React.Dispatch<React.SetStateAction<MessageInterface[]>>) => {
    var messages: MessageInterface[] = [];
    try {
        const response = await axios.get(`${BASE_URL}/influencer/conversations/${chat.followerId}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)
            }
        });
        const responseData = response.data as { messages: any[] };
        const fetchedMessages = responseData.messages;
        messages = fetchedMessages.map((message): MessageInterface => {
            return {
                content: message.content,
                senderId: message.sender,
                timestamp: new Date(message.timestamp),
                messageStatus: message.messageStatus
            }
        })
        messages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    }
    catch (e) {
        alert('couldnt fetch messages');
    }
    console.log('messags inside fn', messages)
    setMessages(messages);
}





function Header() {
    const [selectedChat, setSelectedChat] = useRecoilState(selectedChatState);
    const setSelectedMessages = useSetRecoilState(selectedMessagesState);
    const navigate = useNavigate();
    return (
        <div className="header">
            <Typography noWrap={true} flex={1} fontWeight='bold'>{selectedChat.followerName} </Typography>
            <CloseIcon fontSize="medium" fontWeight='black'
                onClick={
                    () => {
                        setSelectedChat(defaultChat);
                        setSelectedMessages([]);
                        navigate('../');
                    }
                }
            style={{
                cursor:'pointer'
            }} />
        </div>
    )
}
