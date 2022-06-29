import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../../ducks';
import env from '../../config/envConfig';
import axios from 'axios';



export default function GithubLogin() {
  const dispatch = useDispatch();
  const authUrl = env.GITHUB_AUTH_URL;
  const clientId = env.GITHUB_CLIENT_ID;
  const clientSecret = env.GITHUB_CLIENT_SECRET;
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  
  useEffect(() => {
    
    const authenticateGitHubUser = async () => {
      try {
        if (code) {
          const response = await axios.post(`${env.API_HOST}/api/auth/github`, {code});
          const { data: { token, user } } = response;
          console.log(token);
          dispatch(setToken(token));
          dispatch(setUser(user));
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
