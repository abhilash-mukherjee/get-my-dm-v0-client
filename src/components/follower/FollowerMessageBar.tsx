import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { followerMessagesState } from "../../store/atoms/follower/followerMessagesAtom";
import SendIcon from '@mui/icons-material/Send';
import { MessageInterface } from "../../helpers/interfaces";
import { BASE_URL, FOLLOWER_TOKEN, IS_FOLLOWER_SIGNED_UP_ONCE } from "../../helpers/strings";
import axios from "axios";
import '../common/common-styles/messages-bar.css'
import { Button } from "@mui/material";
import { influencerPublicDetailsState } from "../../store/atoms/follower/influencerPublicDetailsAtom";
import { useNavigate, useParams } from "react-router-dom";
export function FollowerMessageBar() {
    const slug = useParams().influencerSlug;
    const [textInput, setTextInput] = useState('');
    const [followerMessages, setFollowerMessages] = useRecoilState(followerMessagesState);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const influencerDetails = useRecoilValue(influencerPublicDetailsState);
    const [followerId, setFollowerId] = useState('');
    const navigate = useNavigate();
    const verifyLogin = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/follower/me`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem(FOLLOWER_TOKEN)
                }
            });
            const responseData = response.data as { message: string, followerId: string };
            setFollowerId(responseData.followerId);
            setIsLoggedIn(true);
        }
        catch (e) {
            setIsLoggedIn(false);
        }
    }
    useEffect(() => {
        verifyLogin();
    }, [])
    const onSendClicked = async () => {
        if (textInput === '') return;
        const newMessage: MessageInterface = {
            content: textInput,
            senderId: followerId,
            timestamp: new Date(),
            messageStatus: 'not-sent'
        }
        setFollowerMessages([...followerMessages, newMessage]);
        setTextInput('');
        try {
            const response = await axios.post(`${BASE_URL}/follower/send`, {
                influencerId: influencerDetails.id,
                content: textInput
            }, {
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
    function sendToLogin(){
        const isSignedUpOnce = localStorage.getItem(IS_FOLLOWER_SIGNED_UP_ONCE) === 'true';
        if(isSignedUpOnce){
            navigate(`../follower/login?influencer-slug=${slug}`);
        }
        else{
            navigate(`../follower/signup?influencer-slug=${slug}`);
        }
    }
    return (
        <div className="message-bar">

            <textarea className="chat-input" placeholder="Type Message..." rows={1}
                disabled={!isLoggedIn}
                onChange={
                    (e) => {
                        setTextInput(e.target.value);
                    }
                } value={textInput}></textarea>
            {isLoggedIn ? (<SendIcon onClick={() => onSendClicked()}
                style={{ cursor: 'pointer' }} />) :  <Button variant="contained" 
                onClick={()=>{
                    sendToLogin();
                }}>Login to Send</Button>}
        </div>
    )
}