import React, { useState } from 'react'; // Import useState here
import GoogleIcon from '@mui/icons-material/Google';
import { Button } from '@mui/material';
import { useValue } from '../../context/ContextProvider';
import {jwtDecode} from 'jwt-decode';

const GoogleOneTapLogin = () => {
  const { dispatch } = useValue();
  const [disabled, setDisabled] = useState(false);

  const handleResponse = (response) => {
    const token = response.credential;
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    const { sub: id, email, name, picture: photoURL } = decodedToken;
    dispatch({ type: 'UPDATE_USER', payload: { id, email, name, photoURL, token, google: true } });
    dispatch({ type: 'CLOSE_LOGIN' });
  };

  const handleGoogleLogin = () => {
    setDisabled(true);
    try {
      // Logic for Google login
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleResponse,
      });
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed()) {
          throw new Error('Unable to display Google prompt: Try to clear your cookies or try again later.');
        }
        if (notification.isSkippedMoment() || notification.isDismissedMoment()) {
          setDisabled(false);
        }
      });
    } catch (error) {
      // Handle error here
      dispatch({ type: 'UPDATE_ALERT', payload: { open: true, severity: 'error', message: error.message } });
      console.log(error);
    }
  };

  // Return statement must be part of the main component function, not inside another function
  return (
    <Button
      variant="outlined"
      startIcon={<GoogleIcon />}
      disabled={disabled}
      onClick={handleGoogleLogin}
    >
      Login with Google
    </Button>
  );
};

export default GoogleOneTapLogin;
