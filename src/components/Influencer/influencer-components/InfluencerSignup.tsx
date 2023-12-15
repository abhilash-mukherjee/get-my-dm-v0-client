import { Grid, Typography } from '@mui/material';
import { Appbar } from '../../common/Appbar';
export function InfluencerSignup() {
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
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}