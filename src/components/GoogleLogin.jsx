import React, { useEffect } from 'react';
import getVar from '../config/envConfig';
import GoogleLoggingButton from 'react-google-login';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../ducks';

export default function GoogleLogin() {
  const dispatch = useDispatch();
  const clientId = getVar('GOOGLE_CLIENT_ID');

  const handleSuccess = async (response) => {
    if (response.tokenId) {
      const apiResponse = await axios.post(`${getVar('API_HOST')}/api/auth/google`, {token: response.tokenId});
      const { data: { token } } = apiResponse;
      dispatch(setToken(token));
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
