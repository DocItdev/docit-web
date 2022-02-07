import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setToken } from '../ducks/users';
import getVar from '../config/envConfig';
import { authenticateGitHubUser } from '../services/userRequests';



export default function GithubLogin() {
  const dispatch = useDispatch();
  const authUrl = getVar('GITHUB_AUTH_URL');
  const clientId = getVar('GITHUB_CLIENT_ID');
  const clientSecret = getVar('GITHUB_CLIENT_SECRET');
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  
  useEffect(() => {
    const authenticateGitHubUser = async () => {
      if (code) {
        const response = await axios.post(`${getVar('API_HOST')}/api/auth/authenticate`);
        const { data: { token } } = response;
        dispatch(setToken(token));
      }
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