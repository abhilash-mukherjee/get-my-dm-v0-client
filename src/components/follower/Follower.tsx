import { Typography } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { FollowerSignup } from "./FollowerSignup";
import { FollowerLogin } from "./FollowerLogin";

export function Follower() {
    return (<>
        <Routes>
            <Route path='/' element={<Typography>You can't access this page</Typography>} />
            <Route path='signup' element={<FollowerSignup />} />
            <Route path='login' element={<FollowerLogin />} />
        </Routes>
    </>)
}