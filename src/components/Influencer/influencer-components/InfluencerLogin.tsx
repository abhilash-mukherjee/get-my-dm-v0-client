import { Grid, Typography, TextField, Button } from '@mui/material';
import { Appbar } from '../../common/Appbar';
import { useNavigate } from 'react-router-dom';
export function InfluencerLogin() {
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
                    alignItems='center'
                >
                    <Grid item container padding={'24px'} gap={'16px'}>
                        <Grid item width='100%' paddingBlock={'10px'}>
                            <Typography variant={'h5'} textAlign={'center'} fontWeight={'700'} paddingInline={'20px'}>Welcome Back!</Typography>
                        </Grid>
                        <Grid item width='100%' minHeight={'300'} paddingInline={'20px'}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '20px',
                                alignItems:'center'
                            }}>
                                <TextField required
                                    id="outlined-required"
                                    label="Email"
                                    size='small'
                                    fullWidth
                                    />
                                <TextField required
                                    id="outlined-required"
                                    label="Password"
                                    type='password'
                                    size='small'
                                    fullWidth
                                    />
                                <Button
                                    variant='contained' 
                                    style={{
                                        maxWidth:'80px'
                                    }}
                                >Login</Button>
                                <Typography>Don't have an account? <u><b
                                onClick={()=>{
                                    navigate('../signup')
                                }}
                                style = {{
                                    cursor: 'pointer'
                                }}
                                >Signup</b></u></Typography>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}