import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { PageLevelLoading } from "../common/PageLevelLoading";
import { useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { influencerPublicDetailsState } from "../../store/atoms/influencerPublicDetailsAtom";
import axios from "axios";
import { BASE_URL } from "../../helpers/strings";
import { Error404 } from "../common/404";
import { ChatHeader } from "./ChatHeader";
import './follower-styles/chat-header.css'
import { FollowerChat } from "./FollowerChat";

export function ChatPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [isErrorInLoading, setIsErrorInLoading] = useState(false);
    const slug = useParams().influencerSlug;
    const setInfluencerPublicDetails = useSetRecoilState(influencerPublicDetailsState);

    const fetchDetails = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/influencer/${slug}`);
            const {fullName, bio, defaultMessage, id} = response.data as {fullName: string, bio: string, defaultMessage: string, id: string}
            setInfluencerPublicDetails({fullName,bio, defaultMessage, id});
            setIsErrorInLoading(false)
        }
        catch (e) {
            setIsErrorInLoading(true);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetchDetails();
    }, []);
    if (isLoading)
        return (
            <PageLevelLoading />
        )
        
    if (isErrorInLoading)
        return (
            <Error404/>
        )

    return (
        <div className='follower-chat-container'>
            <ChatHeader/>
            <FollowerChat/>
        </div>
    )
}