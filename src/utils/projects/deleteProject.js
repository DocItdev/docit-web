import axios from "axios";
import env from "../../config/envConfig";

export default async function deleteProject(projectId, userToken) {
  if(projectId) {
    const opts = {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    };
    const response = await axios.delete(`${env.API_HOST}/api/projects/${projectId}`, opts);
    return response.data;
  }
  throw new Error('Missing project id');
}