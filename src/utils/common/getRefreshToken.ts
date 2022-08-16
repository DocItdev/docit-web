import env from "../../config/envConfig";
import axios from "axios";

export default async function refreshToken() {
  const response = await axios.get(`${env.API_HOST}/api/auth/refresh`, {
    withCredentials: true,
    timeout: 2000
  });
  const { data } = response;

  return data;
}
