import axios from "axios";
import { ProjectType } from "../../@types/Project";
import env from "../../config/envConfig";

export default async function updateProject(
  userToken: string,
  projectId: string,
  projectData: ProjectType
) {
  if (userToken) {
    const opts = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    const response = await axios.put(
      `${env.API_HOST}/api/projects/${projectId}`,
      projectData,
      opts
    );
    return response.data;
  }
  throw new Error("Invalid or Missing user token");
}
