import { Typography } from "@mui/material";
import './common-styles/page-level-loading.css'
export function PageLevelLoading(){
    return (
        <div className='loading-container'>
            <Typography fontSize={'1.5em'} fontWeight={'bold'}>Loading...</Typography>
        </div>
    )
}