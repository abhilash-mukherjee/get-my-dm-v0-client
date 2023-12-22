import { Button, Grid, Typography } from '@mui/material';
import { Appbar } from '../../common/Appbar';
import { useNavigate } from 'react-router-dom';
import { useAuthRedirect } from '../../../hooks/influencer-hooks/useAuthRedirect';
export function InfluencerLandingPage() {
    console.log('inside landing page')
    const {isAuthChecked} = useAuthRedirect('./chats');
    const navigate = useNavigate();
    if (!isAuthChecked) {
        return (
            <>
            </>
        ) 
    }
    return (
        <>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100%'
            }}>
                <Appbar >
                </Appbar>
                <Grid
                    container flex={1}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    <Grid item container padding={'24px'} gap={'16px'}>
                        <Grid item width='100%'>
                            <Typography variant={'h5'} textAlign={'center'} fontWeight={'700'} paddingInline={'20px'}>Manage All Your DMs at One Place</Typography>
                        </Grid>
                        <Grid item width='100%' minHeight={'300'}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                gap: '20px'
                            }
                            }>
                                <Button
                                    variant={'contained'}
                                    color='secondary'
                                    onClick={()=>{
                                        navigate('./login')
                                    }}
                                >Login
                                </Button>

                                <Button
                                    variant={'contained'}
                                    color='primary'
                                    onClick={()=>{
                                        navigate('./signup')
                                    }}
                                >Signup
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}