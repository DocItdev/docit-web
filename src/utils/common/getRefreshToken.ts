import env from "../../config/envConfig";
import axios from "axios";

export default async function refreshToken() {
  const response = await axios
    .get(`${env.API_HOST}/api/auth/refresh`, { withCredentials: true })
    .catch(function (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        return "retard"
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
    });
    console.log("88888")
  console.log(response);
  const { data } = response;

  return data;
}
