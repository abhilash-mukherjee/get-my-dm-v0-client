import { Route, Routes } from "react-router-dom";
import { InfluencerLandingPage } from "./influencer-components/InfluencerLandingPage";
import { InfluencerSignup } from "./influencer-components/InfluencerSignup";
import { InfluencerLogin } from "./influencer-components/InfluencerLogin";
import { Chats } from "./influencer-components/Chats";
import { useAuthRedirect } from "../../hooks/influencer-hooks/useAuthRedirect";

export function Influencer() {
    useAuthRedirect();
    return (
        <>
            <Routes>
                <Route path='/' element={<InfluencerLandingPage />} />
                <Route path='signup' element={<InfluencerSignup />} />
                <Route path='login' element={<InfluencerLogin />} />
                <Route path='chats' element={<Chats />} />
            </Routes>
        </>
    )
}