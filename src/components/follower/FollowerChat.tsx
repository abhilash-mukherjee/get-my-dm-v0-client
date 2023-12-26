import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { influencerPublicDetailsState } from '../../store/atoms/follower/influencerPublicDetailsAtom';
import './follower-styles/chats.css'
import { useEffect, useRef } from 'react';
import axios from 'axios';
import { followerMessagesState } from '../../store/atoms/follower/followerMessagesAtom';
import { MessageInterface } from '../../helpers/interfaces';
import { IncomingMessage } from '../common/IncomingMessage';
import { OutgoingMessage } from '../common/OutgoingMessage';
import { BASE_URL, FOLLOWER_TOKEN } from '../../helpers/strings';
var isMessagesFetchedOnce = false;
export function FollowerChat() {
    console.log('rerender');
    const { defaultMessage, id } = useRecoilValue(influencerPublicDetailsState);
    const [messages, setMessages] = useRecoilState(followerMessagesState);
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const setFollowerMessages = useSetRecoilState(followerMessagesState);

    useEffect(() => {
        if (messagesContainerRef.current) {
            const scrollHeight = messagesContainerRef.current.scrollHeight;
            const height = messagesContainerRef.current.clientHeight;
            const maxScrollTop = scrollHeight - height;
            messagesContainerRef.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
        }
    }, [messages.length]);
    const fetchMessages = async () => {
        if(!localStorage.getItem(FOLLOWER_TOKEN)) return;
        try {
            const response = await axios.get(`${BASE_URL}/follower/conversation/${id}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem(FOLLOWER_TOKEN)
                }
            });
            const responseData = response.data as { messages: any[] };
            const messages: MessageInterface[] = responseData.messages.map(message => {
                return ({
                    content: message.content,
                    timestamp: new Date(message.timestamp),
                    messageStatus: message.messageStatus,
                    senderId: message.sender
                })
            });
            setFollowerMessages(messages);
        }
        catch (e) {
        }
    }
    useEffect(() => {
        if (id === '') return;
        if (messages.length === 0) {
            const newMessage: MessageInterface = {
                content: defaultMessage,
                senderId: id,
                messageStatus: 'seen',
                timestamp: new Date()
            }
            setMessages([...messages, newMessage])
        }
        if(!isMessagesFetchedOnce){
            console.log('messages are not fetched')
            fetchMessages();
        }
        isMessagesFetchedOnce=true;
        setInterval(fetchMessages,5000);
    }, [id])
    return (
        <div className="follower-chat" ref={messagesContainerRef}>
            {messages.map((message) => {
                return (
                    <>
                        {message.senderId === id ? <IncomingMessage message={message} /> : <OutgoingMessage message={message} />}
                    </>
                )
            })}
        </div>
    )
}