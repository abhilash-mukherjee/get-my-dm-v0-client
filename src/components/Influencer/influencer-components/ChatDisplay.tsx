import { useRecoilValue } from "recoil"
import { influencerChatsState } from "../../../store/atoms/influencer/chatsAtom"
import { Typography } from "@mui/material"
import '../influencer-styles/chat-display.css'
import { influencerDetailsState } from "../../../store/atoms/influencer/influencerDetailsAtom"
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useNavigate } from "react-router-dom"
import { MessageStatusGraphic } from "../../common/MessageStatusGraphic"
export function ChatDisplay() {
    const navigate = useNavigate();
    const chats = useRecoilValue(influencerChatsState)
    const influencerDetails = useRecoilValue(influencerDetailsState);
    return (
        <div className='chat-display'>
            {chats.map(chat => {
                return (
                    <div className='chat' data-convo-id={chat.conversationId} onClick={()=>{
                        navigate(`./${chat.conversationId}`)
                    }}>
                        <div className="part">
                            <Typography flex={1} fontWeight={'bold'} noWrap={true}>{chat.followerName}</Typography>
                            <Typography flex={0} fontSize={'0.7em'}>{`${chat.latestMessageTimestamp.getHours()}:${chat.latestMessageTimestamp.getMinutes()}`}</Typography>
                        </div>
                        <div className="part">
                            <div className="content">{
                                chat.lastMessageSenderId === influencerDetails.id ? <MessageStatusGraphic messageStatus={chat.latestMessageStatus} /> : <></>
                            }<Typography fontSize={'0.9em'} noWrap={true}>{chat.latestMessageContent}</Typography>
                            </div>
                            {chat.latestMessageStatus !== 'seen' && chat.lastMessageSenderId === chat.followerId ? <FiberManualRecordIcon sx={{
                                fontSize:10
                            }}/> : <></>}
                        </div>
                    </div>
                )
            })}
        </div>)
}

