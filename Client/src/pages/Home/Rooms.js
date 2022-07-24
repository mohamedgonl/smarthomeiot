import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/material';
import { useState } from 'react';
import { AddRoom } from './AddRoom';

export const Rooms = ({ rooms }) => {
  const [openAddRoom, setOpenAddRoom] = useState(false);

  return (
    <Box
      sx={{
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
        gap: 3,
        ml: 2,
        mr: 2,
        mb: 4,
      }}
    >
      {rooms.map((room, index) => (
        <Box key={room._id} sx={{ cursor: 'pointer', p: 1 }}>
          {room.name}
        </Box>
      ))}
      <Box onClick={() => setOpenAddRoom(true)} sx={{ cursor: 'pointer', p: 1 }}>
        <AddIcon sx={{ width: 30, height: 30 }} />
      </Box>
      <AddRoom openAddRoom={openAddRoom} setOpenAddRoom={setOpenAddRoom} />
    </Box>
  );
};
