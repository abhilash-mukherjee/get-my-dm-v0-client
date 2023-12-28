import { Button, Grid, Typography } from "@mui/material"
import { Appbar } from "./Appbar"
import { useNavigate } from "react-router-dom"
import { PUBLIC_URL } from "../../helpers/strings";

export function LandingPage() {
    const navigate = useNavigate();
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
                            <Typography variant={'h5'} textAlign={'center'} fontWeight={'700'} paddingInline={'20px'}>A Better Way to Send & Receive DMs</Typography>
                            <br></br>
                            <div style={{
                                maxWidth: '100%'
                            }}>
                                <img src={PUBLIC_URL + '/dist/assets/display-image.png'} />
                            </div>
                        </Grid>
                        <Grid item width='100%' minHeight={'300'}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                gap: '20px',
                                alignItems: 'center'
                            }
                            }>
                                <Button
                                    variant={'contained'}
                                    color='primary'
                                    onClick={() => {
                                        navigate('./influencer/')
                                    }}
                                    fullWidth={true}
                                    style={{
                                        maxWidth: '250px'
                                    }}
                                >I am an Influencer
                                </Button>

                                <Button
                                    variant={'contained'}
                                    color='secondary'
                                    fullWidth={true}

                                    onClick={() => {
                                        navigate('./people')
                                    }}
                                    style={{
                                        maxWidth: '250px'
                                    }}
                                >Discover Top Voices
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}