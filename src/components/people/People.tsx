import { Typography } from "@mui/material";
import { Appbar } from "../common/Appbar";
import { useEffect, useState } from "react";
import { InfluencerPublicDetailsInterface } from "../../helpers/interfaces";
import axios from "axios";
import { BASE_URL } from "../../helpers/strings";
import './people-styles.css'
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from "react-router-dom";
import { PageLevelLoading } from "../common/PageLevelLoading";
export function People() {
    const [influencers, setInfluencers] = useState<InfluencerPublicDetailsInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const fetchInfluencers = async function () {
        setIsLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/influencer/all`);
            const responseData = response.data as { influencers: any[] };
            const influencers = responseData.influencers.map((inf): InfluencerPublicDetailsInterface => {
                return ({
                    id: inf.id as string,
                    fullName: inf.fullName as string,
                    bio: inf.bio as string,
                    imageUrl: inf.imageUrl as string,
                    defaultMessage: inf.defaultMessage as string,
                    slug: inf.slug as string
                })
            })
            setInfluencers(influencers);
        }
        catch (e) {

        }
        setIsLoading(false);
    }
    useEffect(() => {
        fetchInfluencers();
    }, [])
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100%'
        }}>
            <Appbar />
            <div className="influencers-container">
                <Typography fontSize={'1.2em'} fontWeight={500}>Discover Top Voices</Typography>
                <div className="influencer-repeating-group">
                    {isLoading ? <PageLevelLoading />: influencers.map(inf => (<InfluencerCard influencer={inf} />))}
                </div>
            </div>
        </div>
    )
}

function InfluencerCard({ influencer }: { influencer: InfluencerPublicDetailsInterface }) {
    const navigate = useNavigate();
    return (
        <div className="card">
            <div className='card-image'>
                <img src={influencer.imageUrl} />
            </div>
            <div className='card-text'>
                <Typography  noWrap={true} fontWeight={500} >{influencer.fullName}</Typography>
                <Typography  noWrap={true} fontSize={'0.8rem'}>{influencer.bio}</Typography>
            </div>
            <div>
                <SendIcon onClick={
                    ()=>{
                        navigate('../'+influencer.slug)
                        window.location.reload();
                    }                    
                } style={{
                    cursor: 'pointer'
                }} />
            </div>
        </div>
    )
}