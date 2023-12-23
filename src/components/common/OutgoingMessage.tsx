import { Typography } from "@mui/material";
import { MessageInterface } from "../../helpers/interfaces";
import { formatTime } from "../../helpers/helperMethods";
import './common-styles/messages.css'
import { MessageStatusGraphic } from "./MessageStatusGraphic";

export function OutgoingMessage({ message }: {message: MessageInterface}) {
    return (
        <div className="outgoing-msg-container">
            <div className="outgoing-msg-contents">
                <Typography flex={1}>{message.content}</Typography>
                <div className='chat-footer'>
                    <Typography fontSize={'0.8em'}>{formatTime(message.timestamp)}</Typography>
                    <MessageStatusGraphic messageStatus={message.messageStatus} />
                </div>
            </div>
        </div>
    )
}
