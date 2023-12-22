import { useRecoilValue } from "recoil"
import { influencerChatsState } from "../../../store/atoms/chatsAtom"
import { Typography } from "@mui/material"
import '../influencer-styles/chat-display.css'
import { influencerDetailsState } from "../../../store/atoms/influencerDetailsAtom"
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DoneIcon from '@mui/icons-material/Done';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useNavigate } from "react-router-dom"
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

interface MessageStatusGraphicProps {
    messageStatus: string
}

export function MessageStatusGraphic({ messageStatus }: MessageStatusGraphicProps) {
    if (messageStatus === 'delivered')
        return (<DoneIcon style={{color:'#7D8BAA'}}sx={{fontSize: 17}}/>)
    if (messageStatus === 'received')
        return (<DoneAllIcon style={{color:'#7D8BAA'}}sx={{fontSize: 17}}/>)
    if (messageStatus === 'seen')
        return (<DoneAllIcon fontSize="small" sx={{fontSize: 17}}/>)
    return <QueryBuilderIcon style={{color:'#7D8BAA'}}sx={{fontSize: 17}}/>
}