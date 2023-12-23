import DoneAllIcon from '@mui/icons-material/DoneAll';
import DoneIcon from '@mui/icons-material/Done';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
export function MessageStatusGraphic({ messageStatus }: {messageStatus: string}) {
    if (messageStatus === 'delivered')
        return (<DoneIcon style={{color:'#7D8BAA'}}sx={{fontSize: 17}}/>)
    if (messageStatus === 'received')
        return (<DoneAllIcon style={{color:'#7D8BAA'}}sx={{fontSize: 17}}/>)
    if (messageStatus === 'seen')
        return (<DoneAllIcon fontSize="small" sx={{fontSize: 17}}/>)
    return <QueryBuilderIcon style={{color:'#7D8BAA'}}sx={{fontSize: 17}}/>
}