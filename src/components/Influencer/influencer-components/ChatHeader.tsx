import { Typography } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import '../influencer-styles/chat-header.css'
import { useRecoilValue } from "recoil";
import { influencerDetailsState } from "../../../store/atoms/influencerDetailsAtom";
import { PROMOTION_URL, TOKEN } from "../../../helpers/strings";
import { useNavigate } from "react-router-dom";
import { useFetchInfluencerDetails } from "../../../hooks/influencer-hooks/useFetchInfluencerDetails";
import { handleCopy } from "../../../helpers/helperMethods";

export function ChatHeader() {
    const navigate = useNavigate();
    const userDetailsState = useRecoilValue(influencerDetailsState);
    const { isDetailsFetched } = useFetchInfluencerDetails();
    const handleLogout = () => {
        localStorage.removeItem(TOKEN);
        navigate('../')
    }
    if (!isDetailsFetched) {
        return (
            <div className='chat-header'>
                <Typography fontWeight={700} fontSize={'1.1em'} textAlign={'center'}>Loading...</Typography>
            </div>
        )
    }
    return (
        <div className='chat-header'>
            <div className="header-top">
                <Typography fontWeight={700} fontSize={'1.1em'}>{userDetailsState.fullName}</Typography>
                <Typography fontWeight={700} fontSize={'1.1em'}
                    style={{
                        cursor: 'pointer'
                    }}
                    onClick={handleLogout}
                >
                    Logout</Typography>
            </div>
            <div className="header-bottom">
                <Typography fontWeight={700} fontSize={'0.9em'}>{PROMOTION_URL}{userDetailsState.slug}</Typography>
                <ContentCopyIcon onClick={() => {
                    handleCopy(PROMOTION_URL + userDetailsState.slug);
                }} fontSize="small" style={{ cursor: 'pointer' }} />
            </div>
        </div>
    )
}

