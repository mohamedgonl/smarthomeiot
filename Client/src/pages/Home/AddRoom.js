import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material';

export const AddRoom = ({ openAddRoom, setOpenAddRoom }) => {
  const onClose = () => {
    setOpenAddRoom(false);
  };

  return (
    <Dialog open={openAddRoom} maxWidth="xs" fullWidth onClose={() => {}}>
      <DialogTitle>
        Add a new room
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
      <DialogContent>
        <TextField sx={{ mb: 3 }} autoFocus margin="dense" label="Device name" fullWidth />
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button variant="contained" onClick={onClose}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
