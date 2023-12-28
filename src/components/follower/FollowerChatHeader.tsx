import { useRecoilValue } from "recoil"
import { influencerPublicDetailsState } from "../../store/atoms/follower/influencerPublicDetailsAtom"
import { Typography } from "@mui/material";
import './follower-styles/chat-header.css'
export function FollowerChatHeader() {
    const { fullName, bio, imageUrl} = useRecoilValue(influencerPublicDetailsState);
    return (
        <div className="public-chat-header">
            <div className="image-container">
            <img src={imageUrl}/>
            </div>
            <Typography  className="name-text" fontWeight={'bold'} fontSize={'1.5em'} textAlign={'center'}>{fullName}</Typography>
            <Typography className="bio-text" textAlign={'center'}>{bio}</Typography>
        </div>
    )
}