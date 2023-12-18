import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { BASE_URL, TOKEN } from '../../helpers/strings';
import axios from 'axios';
import { influencerDetailsState } from '../../store/atoms/influencerAtoms';
import { influencerDetailsSchema } from '../../helpers/zodSchemas';

export function useFetchInfluencerDetails() {
    const [isDetailsFetched, setIsDetailsFetched] = useState(false);
    const setInfluencerDetails = useSetRecoilState(influencerDetailsState);
    const navigate = useNavigate();
    const getDeatils = async () => {
        try {
            const authorization = "Bearer " + localStorage.getItem(TOKEN)
            const response = await axios.get(`${BASE_URL}/influencer/me`,
                {
                    headers: {
                        'Authorization': authorization
                    }
                }
            );
            const parsedInput = influencerDetailsSchema.safeParse(response.data)
            if(!parsedInput.success){
                return navigate('../')
            }
            setInfluencerDetails({...parsedInput.data});
            setIsDetailsFetched(true);
        }
        catch (e) {
            navigate('../');
        }
    }
    useEffect(() => { getDeatils() }, [])
    return {isDetailsFetched};
}