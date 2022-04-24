import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setToken } from '../../ducks';
import getVar from '../../config/envConfig';
import axios from 'axios';



export default function GithubLogin() {
  const dispatch = useDispatch();
  const authUrl = getVar('GITHUB_AUTH_URL');
  const clientId = getVar('GITHUB_CLIENT_ID');
  const clientSecret = getVar('GITHUB_CLIENT_SECRET');
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  
  useEffect(() => {
    
    const authenticateGitHubUser = async () => {
      try {
        if (code) {
          const response = await axios.post(`${getVar('API_HOST')}/api/auth/github`, {code});
          const { data: { token } } = response;
          dispatch(setToken(token));
        }
      } catch (error) {
        console.log("OAuth Github error:", error);
      }
    }
    authenticateGitHubUser();
  }, [code])

  return (
    <div>
      <Button style={{backgroundColor:"black", borderWidth:"0px", width: "177px", height: "42px"}} href={`${authUrl}&client_id=${clientId}&client_secret=${clientSecret}`}>
        <i className="bi bi-github"></i>
        <span>&nbsp;Login with GitHub</span>
      </Button>
    </div>
  )
}
