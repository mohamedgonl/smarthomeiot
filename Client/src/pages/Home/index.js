import { Box } from '@mui/material';
import { Devices } from './Devices';
import { Rooms } from './Rooms';
import { useEffect, useState } from 'react';
import { getHome } from 'api/homeApi';
import Header from 'components/Header';

export const Home = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    getHome('62bb14f4981a9649a3814e72').then((res) => setRooms(res.home.rooms));
  }, []);

  return (
    <>
      <Header />
      <Box sx={{ bgcolor: '#dadada' }}>
        <Rooms rooms={rooms} />
        <Devices />
      </Box>
    </>
  );
};
