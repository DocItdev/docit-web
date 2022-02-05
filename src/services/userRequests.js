import axios from 'axios';
import getVar from '../config/envConfig';

export async function authenticateGitHubUser(code) {
  const response = await axios.post(`${getVar('API_HOST')}/api/auth/github`, { code });
  if (response.status === 200) {
    return response.data
  }
  return null;
}