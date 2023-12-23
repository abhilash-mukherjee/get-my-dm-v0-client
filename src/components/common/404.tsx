import { Typography } from "@mui/material";
import './common-styles/404.css'
export function Error404(){
    return(
        <div className='container'>
            <Typography fontSize={'2.5em'} fontWeight='bold'>404</Typography>
            <Typography fontSize={'1.5em'} fontWeight='bold'>Page Not Found</Typography>
        </div>
    )
}