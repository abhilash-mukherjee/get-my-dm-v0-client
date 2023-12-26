import { atom } from "recoil";
import { InfluencerPublicDetailsInterface } from "../../../helpers/interfaces";

export const influencerPublicDetailsState = atom<InfluencerPublicDetailsInterface>({
    key:'InfluencerPunlicDetails',
    default: {
        fullName:'',
        id: '',
        bio: '',
        defaultMessage: ''
    }
})