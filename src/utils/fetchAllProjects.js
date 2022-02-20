import axios from "axios";
import getVar from "../config/envConfig";

export default async function fetchAllProjects(userToken) {
  if (userToken) {
    const opts = {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    };
    const response = await axios.get(`${getVar('API_HOST')}/api/projects/all`, opts);
    return response.data;
  }
}