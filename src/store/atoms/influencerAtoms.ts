import { atom } from "recoil";

type influencerDetails = {
    fullName: string,
    id: string,
    slug: string
}

export const defaultInfluencerDetails : influencerDetails = {
    fullName:'',
    id:'',
    slug:''
}
export const influencerDetailsState = atom({
    key: 'InfluencerDetails',
    default: defaultInfluencerDetails,
  });
