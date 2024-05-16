import { Close, Send } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useValue } from '../../context/ContextProvider';
import GoogleOneTapLogin from './GoogleOneTapLogin';
import PasswordField from './PasswordField';
import { login, register } from '../../actions/user';
import Profile from './Profile';

const Login = () => {
  const {
    state: { openLogin },
    dispatch,
  } = useValue();

  const [title, setTitle] = useState('Login');
  const [userType, setUserType] = useState('customer');
  const [isRegister, setIsRegister] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleClose = () => {
    dispatch({ type: 'CLOSE_LOGIN' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (!isRegister) return login({ email, password }, dispatch);
    const name = nameRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    if (password !== confirmPassword)
      return dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          open: true,
          severity: 'error',
          message: "Passwords don't match",
        },
      });
    register({ name, email, password }, dispatch);
  };

  useEffect(() => {
    if (isRegister) {
      setTitle(userType === 'vendor' ? 'Register Your Business' : 'Sign Up');
    } else {
      setTitle('Login to Your Account');
    }
  }, [isRegister, userType]);

  return (
    <Dialog open={openLogin} onClose={handleClose}>
      <DialogTitle>
        {title}
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
            Please fill your information in the fields below:
          </DialogContentText>
          {isRegister && (
            <>
              <FormControl fullWidth margin="normal">
                <InputLabel id="user-type-label">User Type</InputLabel>
                <Select
                  labelId="user-type-label"
                  id="userType"
                  value={userType}
                  label="User Type"
                  onChange={(e) => setUserType(e.target.value)}
                  required
                >
                  <MenuItem value="customer">Customer</MenuItem>
                  <MenuItem value="vendor">Vendor</MenuItem>
                </Select>
              </FormControl>
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
              />
            </>
          )}
          <TextField
            autoFocus={!isRegister}
            margin="normal"
            variant="standard"
            id="email"
            label={userType === 'vendor' ? 'Business Email' : 'Email'}
            type="email"
            fullWidth
            inputRef={emailRef}
            required
          />
          <PasswordField {...{ passwordRef }} />
          {isRegister && (
            <PasswordField
              passwordRef={confirmPasswordRef}
              id="confirmPassword"
              label="Confirm Password"
            />
          )}
        </DialogContent>
        <DialogActions sx={{ px: '19px' }}>
          <Button type="submit" variant="contained" endIcon={<Send />}>
            Submit
          </Button>
        </DialogActions>
      </form>
      <DialogActions sx={{ justifyContent: 'left', p: '5px 24px' }}>
        {isRegister
          ? 'Have an account? Sign in now '
          : "Don't have an account? Create one now "}
        <Button onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? 'Login' : 'Register'}
        </Button>
      </DialogActions>
      <DialogActions sx={{ justifyContent: 'center', py: '40px' }}>
        <GoogleOneTapLogin />
      </DialogActions>
      <Profile userType={userType} />
    </Dialog>
  );
};

export default Login;
