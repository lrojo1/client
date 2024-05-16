import {
    Avatar,
    Dialog,
    DialogTitle,
    IconButton,
    TextField,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
  } from '@mui/material';
  import { Close, Send } from '@mui/icons-material';
  import React, { useRef } from 'react';
  import { useValue } from '../../context/ContextProvider';
  import { updateProfile } from '../../actions/user';

  
  const Profile = ({ userType }) => {
    const { state: { profile, currentUser }, dispatch } = useValue();
    const nameRef = useRef();
  
    const handleClose = () => {
      dispatch({ type: 'UPDATE_PROFILE', payload: { ...profile, open: false } });
    };
  
    const handleChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const photoURL = URL.createObjectURL(file);
        dispatch({ type: 'UPDATE_PROFILE', payload: { ...profile, file, photoURL } });
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const name = nameRef.current.value;
      // TODO:pass username and photo file to new function in user actions
      updateProfile(currentUser, {name, file:profile.file}, dispatch)
    };
  
    return (
      <Dialog open={profile.open} onClose={handleClose}>
        <DialogTitle>
          Profile
          <IconButton
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              color: (theme) => theme.palette.grey[500],
            }}
            onClick={handleClose}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <form onSubmit={handleSubmit}>
            <DialogContent dividers>

            <DialogContentText>
            Update your {userType} profile below:
            </DialogContentText>

            
            <TextField
              autoFocus
              margin="normal"
              variant="standard"
              id="name"
              label={userType === 'vendor' ? 'Business Name' : 'Full Name'}
              type="text"
              fullWidth
              inputRef={nameRef}
              inputProps={{ minLength: 2 }}
              required
              defaultValue={currentUser?.name}
            />
            <label htmlFor='profilePhoto'>
              <input
                accept='image/*'
                id='profilePhoto'
                type='file'
                style={{ display: 'none' }}
                onChange={handleChange}
              />
              <Avatar
  src={currentUser?.photoURL || profile.photoURL}
  sx={{ width: 75, height: 75, cursor: 'pointer' }}
              />
            </label>
          </DialogContent>
          <DialogActions sx={{ px: '19px' }}>
            <Button type="submit" variant="contained" endIcon={<Send />}>
              Submit Changes
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  };
  
  export default Profile;
  