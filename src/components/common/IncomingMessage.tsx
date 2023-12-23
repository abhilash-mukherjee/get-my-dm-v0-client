import { Typography } from "@mui/material";
import { MessageInterface } from "../../helpers/interfaces";
import { formatTime } from "../../helpers/helperMethods";
import './common-styles/messages.css'

export function IncomingMessage({ message }: {message: MessageInterface}) {
    return (
        <div className="incoming-msg-container">
            <div className="incoming-msg-contents">
                <Typography flex={1}>{message.content}</Typography>
                <div className='chat-footer'>
                    <Typography fontSize={'0.8em'}>{formatTime(message.timestamp)}</Typography>
                </div>
            </div>
        </div>
    )
}
