import { useRecoilValue} from "recoil";
import { ChatHeader } from "./ChatHeader";
import { PROMOTION_URL } from "../../../helpers/strings";
import { Button, Typography } from "@mui/material";
import { influencerDetailsState } from "../../../store/atoms/influencer/influencerDetailsAtom";
import '../../common/common-styles/containers.css'
import '../influencer-styles/no-dms-yet.css'
import { handleCopy } from "../../../helpers/helperMethods";
import { ChatDisplay } from "./ChatDisplay";
import { isChatsFetchedOnceState } from "../../../store/atoms/influencer/isChatsFetchedOnceAtom";
import { chatsExistState } from "../../../store/atoms/influencer/chatsExistAtom";
import { useFetchChats } from "../../../hooks/influencer-hooks/useFetchChats";

export function Chats() {
    useFetchChats();
    const isFetchedOnce = useRecoilValue(isChatsFetchedOnceState);
    const chatsExist = useRecoilValue(chatsExistState);
    return (
        <div>
            <ChatHeader />
            <div className="parent-container">
                {!isFetchedOnce ? <LoadingText /> : <></>}
                {isFetchedOnce && !chatsExist ? <NoDMsYet /> : <></>}
                {isFetchedOnce && chatsExist ? <ChatDisplay /> : <></>}
            </div>
        </div>
    )
}

function LoadingText() {
    return (
        <div>
            <Typography fontWeight={700} fontSize={'1.1em'} textAlign={'center'}>Loading...</Typography>
        </div>
    )
}


function NoDMsYet() {
    const influencerDetails = useRecoilValue(influencerDetailsState)
    return (
        <div className="no-dms-yet">
            <Typography className="text" fontSize={'1.5em'}>Wow! No Messages Yet</Typography>
            <Typography className="plain-text" fontSize={'1em'}>Share your dm url in your socials to start receiving dms</Typography>
            <Typography className="text" fontSize={'0.85em'}>{PROMOTION_URL}{influencerDetails.slug}</Typography>
            <Button variant='contained' onClick={() => handleCopy(PROMOTION_URL + influencerDetails.slug)}>Copy Link</Button>

        </div>
    )
}