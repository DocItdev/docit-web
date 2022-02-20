import axios from "axios";
import getVar from "../config/envConfig";

export default async function postProject(userToken, project) {
  if (userToken) {
    const opts = {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    };
    const response = await axios.post(`${getVar('API_HOST')}/api/projects`,project, opts);
    return response.data;
  }
}
