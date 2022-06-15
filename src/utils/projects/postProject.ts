import axios from "axios";
import { ProjectType } from "../../@types/Project";
import env from "../../config/envConfig";

export default async function postProject(userToken: string, project: ProjectType) {
  if (userToken) {
    const opts = {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    };
    const response = await axios.post(`${env.API_HOST}/api/projects`,project, opts);
    return response.data;
  }
}
