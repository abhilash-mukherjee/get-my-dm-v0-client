import { Route,  Routes } from "react-router-dom";
import { InfluencerLandingPage } from "./influencer-components/InfluencerLandingPage";
import { InfluencerSignup } from "./influencer-components/InfluencerSignup";
import { InfluencerLogin } from "./influencer-components/InfluencerLogin";

export function Influencer() {
    return (
        <>
            <Routes>
                <Route path='/' element={<InfluencerLandingPage/>} />
                <Route path='signup' element={<InfluencerSignup/>} />
                <Route path='login' element={<InfluencerLogin/>} />
            </Routes>
        </>
    )
}