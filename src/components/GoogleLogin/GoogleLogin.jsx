import React from 'react';
import env from '../../config/envConfig';
import GoogleLoggingButton from 'react-google-login';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../../ducks';

export default function GoogleLogin() {
  const dispatch = useDispatch();
  const clientId =env.GOOGLE_CLIENT_ID;

  const handleSuccess = async (response) => {
    if (response.tokenId) {
      const apiResponse = await axios.post(`${env.API_HOST}/api/auth/google`, {token: response.tokenId});
      const { data: { token, user } } = apiResponse;
      dispatch(setToken(token));
      dispatch(setUser(user));
    }
  }

  const handleFailure = (response) => {
    if (response.error) {
      console.log(error);
    }
  }

  return (
    <div>
        <GoogleLoggingButton
            clientId={clientId}
            buttonText="Log in with Google"
            onSuccess={handleSuccess}
            onFailure={handleFailure}
            cookiePolicy={'single_host_origin'}
        />
    </div>
  )
}
