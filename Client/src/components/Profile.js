import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import { useStore } from 'store/hooks';

export const Profile = ({ openProfile, setOpenProfile }) => {
  const [_, dispatch] = useStore();

  const onClose = () => {
    setOpenProfile(false);
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <Dialog open={openProfile} maxWidth="xs" fullWidth onClose={() => {}}>
      <DialogTitle>
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 1,
          mb: 3,
          ml: 5,
          mr: 5,
        }}
      >
        <Typography sx={{ fontSize: '20px', color: '#fff', fontWeight: 500 }}>
          Name: Nguyen Quang Long
        </Typography>
        <Typography sx={{ color: '#ccc' }}>Phone: 0123456789</Typography>

        <Button variant="contained" size="large" sx={{ mt: 4, mb: 2 }}>
          Change your password
        </Button>
        <Button variant="contained" size="large" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </DialogContent>
    </Dialog>
  );
};
