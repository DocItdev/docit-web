import React, { useEffect } from 'react';
import getVar from '../config/envConfig';
import GoogleLogginButton from 'react-google-login';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../ducks/users';

export default function GoogleLogin() {
  const dispatch = useDispatch();
  const clientId = getVar('GOOGLE_CLIENT_ID');

  const handleLogin = async (response) => {

    if (response.tokenId) {
      const apiResponse = await axios.post(`${getVar('API_HOST')}/api/auth/google`, {token: response.tokenId});
      const { data: { token } } = apiResponse;
      dispatch(setToken(token));
    }
  }

  return (
    <div>
        <GoogleLogginButton
            clientId={clientId}
            buttonText="Log in with Google"
            onSuccess={handleLogin}
            onFailure={handleLogin}
            cookiePolicy={'single_host_origin'}
        />
    </div>
  )
}