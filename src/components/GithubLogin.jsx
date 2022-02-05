import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import getVar from '../config/envConfig';


export default function GithubLogin() {
  const authUrl = getVar('GITHUB_AUTH_URL');
  const clientId = getVar('GITHUB_CLIENT_ID')
  const clientSecret = getVar('GITHUB_CLIENT_SECRET')
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  
  useEffect(() => {
    if (code) {
      // TODO: logic to send code to backend
      console.log(code)
    }
  }, [code])

  return (
    <div>
      <Button href={`${authUrl}&client_id=${clientId}&client_secret=${clientSecret}`}>
        <i className="bi bi-github"></i>
        <span>Login with GitHub</span>
      </Button>
    </div>
  )
}