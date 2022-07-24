import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useState } from 'react';

export const AddDevice = ({ openAddDevice, setOpenAddDevice }) => {
  const [item, setItem] = useState();

  const handleChange = (event) => {
    setItem(event.target.value);
  };

  const onClose = () => {
    setOpenAddDevice(false);
  };

  return (
    <Dialog open={openAddDevice} maxWidth="xs" fullWidth onClose={() => {}}>
      <DialogTitle>
        Add a new device
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
        <FormControl fullWidth>
          <InputLabel id="select-item">Select an item</InputLabel>
          <Select labelId="select-item" value={item} label="Select an item" onChange={handleChange}>
            <MenuItem value={1}>Item 1</MenuItem>
            <MenuItem value={2}>Item 2</MenuItem>
            <MenuItem value={3}>Item 3</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button variant="contained" onClick={onClose}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
