import { useNavigate, useParams } from "react-router-dom"
import { Typography, TextField } from "@mui/material";
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { selectedChatState } from "../../../store/atoms/selectedChatAtom";
import CloseIcon from '@mui/icons-material/Close';
import '../influencer-styles/individual-chat.css'
import { ChatInterface, MessageInterface, defaultChat } from "../../../helpers/interfaces";
import { useEffect, useRef, useState } from "react";
import { influencerChatsState } from "../../../store/atoms/chatsAtom";
import { useFetchChats } from "../../../hooks/influencer-hooks/useFetchChats";
import axios from "axios";
import { BASE_URL, TOKEN } from "../../../helpers/strings";
import { MessageStatusGraphic } from "./ChatDisplay";
import { formatTime } from "../../../helpers/helperMethods";
import { TextInput } from "../../common/FormInput";
import SendIcon from '@mui/icons-material/Send';
import { selectedChatMessagesState } from "../../../store/atoms/selectedChatMessagesAtom";
import { shouldReloadChatsState } from "../../../store/atoms/reloadChatsAtom";
export function Chat() {
    useFetchChats();
    const conversationId = useParams().id;
    const [selectedChat, setSelectedChat] = useRecoilState(selectedChatState);
    const chats = useRecoilValue(influencerChatsState);
    const [messages, setMessages] = useRecoilState(selectedChatMessagesState);
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
                                {message.senderId === selectedChat.followerId ? <FollowerMessage message={message} /> : <InfluencerMessageMessage message={message} />}
                            </>
                        )
                    })}
                </div>
                <Footer />
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


function FollowerMessage({ message }: MessageComponentProps) {
    return (
        <div className="follower-msg-container">
            <div className="follower-msg-contents">
                <Typography flex={1}>{message.content}</Typography>
                <div className='chat-footer'>
                    <Typography fontSize={'0.8em'}>{formatTime(message.timestamp)}</Typography>
                </div>
            </div>
        </div>
    )
}

function InfluencerMessageMessage({ message }: MessageComponentProps) {
    return (
        <div className="influencer-msg-container">
            <div className="influencer-msg-contents">
                <Typography flex={1}>{message.content}</Typography>
                <div className='chat-footer'>
                    <Typography fontSize={'0.8em'}>{formatTime(message.timestamp)}</Typography>
                    <MessageStatusGraphic messageStatus={message.messageStatus} />
                </div>
            </div>
        </div>
    )
}

interface MessageComponentProps {
    message: MessageInterface
}


function Header() {
    const [selectedChat, setSelectedChat] = useRecoilState(selectedChatState);
    const setSelectedMessages = useSetRecoilState(selectedChatMessagesState);
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

function Footer() {
    const [textInput, setTextInput] = useState('');
    const [selectedMessages, setSelectedMessages] = useRecoilState(selectedChatMessagesState);
    const selectedChat = useRecoilValue(selectedChatState);
    const setShouldReloadChats = useSetRecoilState(shouldReloadChatsState)
    return (
        <div className="footer">

            <textarea className="chat-input" placeholder="Type Message..." rows={1} onChange={
                (e) => {
                    setTextInput(e.target.value);
                }
            } value={textInput}></textarea>
            <SendIcon onClick={async () => {
                if (textInput === '') return;
                const newMessage: MessageInterface = {
                    content: textInput,
                    senderId: selectedChat.influencerId,
                    timestamp: new Date(),
                    messageStatus: 'not-sent'
                }
                setSelectedMessages([...selectedMessages, newMessage]);
                setTextInput('');
                try {
                    await axios.post(`${BASE_URL}/influencer/send`, {
                        followerId: selectedChat.followerId,
                        content: textInput
                    }, {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)
                        }
                    })
                    setShouldReloadChats(true);
                }
                catch (e) {
                }
            }} 
            style={{cursor:'pointer'}}/>
        </div>
    )
}