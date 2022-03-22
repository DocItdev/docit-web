import axios from "axios";
import getVar from "../../config/envConfig";

export default async function updateProject(userToken, projectId, projectData) {
  if (userToken) {
    const opts = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    const response = await axios.put(
      `${getVar("API_HOST")}/api/projects/${projectId}`,
      projectData,
      opts
    );
    return response.data;
  }
  throw new Error('Invalid or Missing user token');
}
