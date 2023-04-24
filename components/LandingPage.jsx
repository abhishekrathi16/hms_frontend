import * as React from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const LandingPage = () => {
    return (
        <Box sx={{
            display: 'inline-flex',
            flexDirection: 'column',
            backgroundColor: '#b00b',
            textAlign: 'center',
            alignItems: 'center',
            maxHeight: '100vh',
            height: '100vh',
            width: '100vw',
            justifyContent: 'center',
            }} >
                <Image src={'/schedule.png'}
                    alt='schedule'
                    width={400}
                    height={400}
                />
                <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                mr: 2,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'white',
                textDecoration: 'none',
                textAlign: 'center',
                alignContent: 'center',
                alignItems: 'center',
                }} >
            Providing all solutions at a single stop
                </Typography>
        </Box>
    )
}

export default LandingPage;