import { Button, Grid, TextField, Typography } from '@mui/material';
import { Appbar } from '../../common/Appbar';
import { useNavigate } from 'react-router-dom';
export function InfluencerSignup() {
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
                            <Typography variant={'h5'} textAlign={'center'} fontWeight={'700'} paddingInline={'20px'}>Create an Account to Get Started</Typography>
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
                                    label="Full Name"
                                    size='small'
                                    fullWidth
                                />
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
                                <TextField required
                                    multiline
                                    id="outlined-required"
                                    label="Bio"
                                    size='small'
                                    fullWidth
                                    />
                                <TextField required
                                    multiline
                                    rows={4}
                                    id="outlined-required"
                                    label="Default Message"
                                    size='small'
                                    fullWidth
                                />
                                <Button
                                    variant='contained' 
                                    style={{
                                        maxWidth:'80px'
                                    }}
                                >Signup</Button>
                                <Typography>Already have an account? <u><b
                                onClick={()=>{
                                    navigate('../login')
                                }}
                                style = {{
                                    cursor: 'pointer'
                                }}
                                >Login</b></u></Typography>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}