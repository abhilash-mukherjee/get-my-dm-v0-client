import { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { selectedChatState } from "../../store/atoms/selectedChatAtom";
import { selectedMessagesState } from "../../store/atoms/selectedMessagesAtom";
import { shouldReloadChatsState } from "../../store/atoms/reloadChatsAtom";
import SendIcon from '@mui/icons-material/Send';
import { MessageInterface } from "../../helpers/interfaces";
import { BASE_URL, TOKEN } from "../../helpers/strings";
import axios from "axios";
import './common-styles/messages-bar.css'
export function MessageBar() {
    const [textInput, setTextInput] = useState('');
    const [selectedMessages, setSelectedMessages] = useRecoilState(selectedMessagesState);
    const selectedChat = useRecoilValue(selectedChatState);
    const setShouldReloadChats = useSetRecoilState(shouldReloadChatsState)
    return (
        <div className="message-bar">

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