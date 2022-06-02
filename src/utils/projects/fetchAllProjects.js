import axios from "axios";
import env from "../../config/envConfig";

export default async function fetchAllProjects(userToken) {
  if (userToken) {
    const opts = {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    };
    const response = await axios.get(`${env.API_HOST}/api/projects/all`, opts);
    return response.data;
  }
  throw new Error('Missing or incorrect user token')
}