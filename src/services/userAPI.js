import axios from 'axios';
import getVar from '../config/envConfig';

export async function authenticateGitHubUser() {
  const response = axios.post(`${getVar('API_HOST')}/1/api/auth/authenticate`);
  return response;
}