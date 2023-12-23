import { useRecoilValue } from "recoil"
import { influencerPublicDetailsState } from "../../store/atoms/influencerPublicDetailsAtom"
import { Typography } from "@mui/material";
import './follower-styles/chat-header.css'
export function ChatHeader() {
    const { fullName, bio} = useRecoilValue(influencerPublicDetailsState);
    return (
        <div className="public-chat-header">
            <Typography  className="name-text" fontWeight={'bold'} fontSize={'1.5em'} textAlign={'center'}>{fullName}</Typography>
            <Typography className="bio-text" textAlign={'center'}>{bio}</Typography>
        </div>
    )
}