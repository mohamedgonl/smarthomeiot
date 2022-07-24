import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import InsertChartOutlinedSharpIcon from '@mui/icons-material/InsertChartOutlinedSharp';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import { useState } from 'react';
import { Profile } from './Profile';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const [openProfile, setOpenProfile] = useState(false);
  const navigate = useNavigate();

  const handleNavBar = (index) => {
    if (index === 0) {
      navigate('/');
    } else if (index === 1) {
      navigate('/statistic');
    } else if (index === 2) {
      setOpenProfile(true);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        bgcolor: '#272727',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box sx={{ width: '100px', height: '100px', '& img': { width: '100%' } }}>
        <img src={process.env.PUBLIC_URL + 'logo.png'} alt="logo" />
      </Box>
      <Box sx={{ display: 'flex', gap: '5px' }}>
        {navItems.map((item, index) => (
          <Box
            key={item.name}
            sx={{
              bgcolor: '#fff',
              borderRadius: '12px',
              display: 'flex',
              gap: '15px',
              justifyContent: 'center',
              alignItems: 'center',
              height: 60,
              width: 160,
              cursor: 'pointer',
            }}
            onClick={() => handleNavBar(index)}
          >
            {item.icon}
            <Box sx={{ fontSize: '20px', fontWeight: 500 }}>{item.name}</Box>
          </Box>
        ))}
      </Box>

      <Box>
        <OutlinedInput
          size="small"
          placeholder="Search"
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          }
        />
        <IconButton sx={{ ml: 2, mr: 4 }}>
          <NotificationsIcon />
        </IconButton>
      </Box>

      <Profile openProfile={openProfile} setOpenProfile={setOpenProfile} />
    </Box>
  );
}

const navItems = [
  {
    name: 'Home',
    icon: <HomeOutlinedIcon fontSize="large" />,
  },
  {
    name: 'Statistics',
    icon: <InsertChartOutlinedSharpIcon fontSize="large" />,
  },
  {
    name: 'Profile',
    icon: <PersonOutlineIcon fontSize="large" />,
  },
];
