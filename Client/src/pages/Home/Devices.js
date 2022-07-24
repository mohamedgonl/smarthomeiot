import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Grid, Switch, Typography } from '@mui/material';
import { useState } from 'react';
import { AddDevice } from './AddDevice';

export const Devices = () => {
  const [openAddDevice, setOpenAddDevice] = useState(false);

  return (
    <Box sx={{ pl: 4, pr: 4, height: 'calc(100vh - 130px)' }}>
      <Grid container spacing={4}>
        {/* {devicesInfo.map((device, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Box sx={{ height: 150 }}>
              <Box>
                <img src={icons[device.deviceType]} alt={device.deviceName} />
              </Box>
              <Box>{device.deviceName}</Box>
            </Box>
          </Grid>
        ))} */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Box
            sx={{
              bgcolor: '#fff',
              borderRadius: '20px',
              p: 2,
              height: '150px',
              boxSizing: 'initial !important',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                '& > .vertical-middle': {
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                },
              }}
            >
              <Box className="vertical-middle">
                <Box
                  component="img"
                  sx={{ width: '80px' }}
                  src={process.env.PUBLIC_URL + '/lamp.png'}
                  alt=""
                />
                <Typography>Lamp</Typography>
              </Box>
              <Box className="vertical-middle">
                <Switch defaultChecked />
                <Typography fontSize={25}>75%</Typography>
              </Box>
            </Box>
            <Box
              sx={{
                mt: 1,
                display: 'flex',
                justifyContent: 'space-around',
                '& button': {
                  color: '#fff',
                  fontSize: '30px',
                  lineHeight: '25px',
                },
              }}
            >
              <Button variant="contained">+</Button>
              <Button variant="contained">-</Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Box
            sx={{
              bgcolor: '#fff',
              borderRadius: '20px',
              p: 2,
              height: '150px',
              boxSizing: 'initial !important',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
              }}
            >
              <Box>
                <Box
                  component="img"
                  sx={{ width: '50px' }}
                  src={process.env.PUBLIC_URL + '/security.png'}
                  alt=""
                />
                <Typography sx={{ mt: 1, mb: 2 }}>Security</Typography>
              </Box>
              <Box>
                <Switch defaultChecked />
              </Box>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Box
                component="img"
                sx={{ width: '50px' }}
                src={process.env.PUBLIC_URL + '/safe.png'}
                alt=""
              />
              <Typography>No gas leaks, the house is in a safe state</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Box
            sx={{
              bgcolor: '#fff',
              borderRadius: '20px',
              p: 2,
              height: '150px',
              boxSizing: 'initial !important',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                '& > .vertical-middle': {
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                },
              }}
            >
              <Box className="vertical-middle">
                <Box
                  component="img"
                  sx={{ width: '80px', height: '80px', objectFit: 'contain' }}
                  src={process.env.PUBLIC_URL + '/ac.png'}
                  alt=""
                />
                <Typography>Air conditioner</Typography>
              </Box>
              <Box className="vertical-middle">
                <Switch defaultChecked />
                <Typography fontSize={25}>24° C</Typography>
              </Box>
            </Box>
            <Box
              sx={{
                mt: 1,
                display: 'flex',
                justifyContent: 'space-around',
                '& button': {
                  color: '#fff',
                  fontSize: '30px',
                  lineHeight: '25px',
                },
              }}
            >
              <Button variant="contained">+</Button>
              <Button variant="contained">-</Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Box
            sx={{
              bgcolor: '#fff',
              borderRadius: '20px',
              p: 2,
              height: '150px',
              boxSizing: 'initial !important',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
              }}
            >
              <Box>
                <Box
                  component="img"
                  sx={{ width: '50px' }}
                  src={process.env.PUBLIC_URL + '/door.png'}
                  alt=""
                />
                <Typography sx={{ mt: 1, mb: 2 }}>Door</Typography>
              </Box>
              <Box>
                <Switch defaultChecked />
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                component="img"
                sx={{ width: '100px' }}
                src={process.env.PUBLIC_URL + '/open.png'}
                alt=""
              />
              <Typography>the door has been opened</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Box
            sx={{
              bgcolor: '#fff',
              borderRadius: '20px',
              p: 2,
              height: '150px',
              boxSizing: 'initial !important',
            }}
          >
            <Typography>Add a device</Typography>
            <Box
              sx={{
                display: 'flex',
                height: '125px',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              onClick={() => setOpenAddDevice(true)}
            >
              <AddIcon sx={{ fontSize: '40px' }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <AddDevice openAddDevice={openAddDevice} setOpenAddDevice={setOpenAddDevice} />
    </Box>
  );
};

// const icons = {
//   'lightbulb-on': process.env.PUBLIC_URL + '/lamp.png',
//   'air-conditioner': process.env.PUBLIC_URL + '/ac.png',
//   'temperature-celsius': process.env.PUBLIC_URL + '/ac.png',
//   'air-humidifier': process.env.PUBLIC_URL + '/ac.png',
// };
