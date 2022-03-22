import axios from "axios";
import getVar from "../../config/envConfig";

export default async function deleteProject(projectId, userToken) {
  if(projectId) {
    const opts = {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    };
    const response = await axios.delete(`${getVar('API_HOST')}/api/projects/${projectId}`, opts);
    return response.data;
  }
  throw new Error('Missing project id');
}