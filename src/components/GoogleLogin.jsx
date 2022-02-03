import React, { useEffect } from 'react';
import getVar from '../config/envConfig';
import GoogleLogginButton from 'react-google-login';

export default function GoogleLogin() {
  const clientId = getVar('GOOGLE_CLIENT_ID')
  
  const handleLogin = (response) => {
    console.log(response);
  }

  console.log(clientId);

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