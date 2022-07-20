import env from "../../config/envConfig";
import GoogleLoggingButton, { GoogleLoginResponse } from "react-google-login";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken, setTokenExpire, setUser, setWorkspace } from "../../ducks";
import React from "react";
import { WorkspaceType } from "../../@types/Workspace";

export default function GoogleLogin() {
  const dispatch = useDispatch();
  const clientId = env.GOOGLE_CLIENT_ID;

  const handleSuccess = async (response: GoogleLoginResponse) => {
    if (response.tokenId) {
      const apiResponse = await axios.post(
        `${env.API_HOST}/api/auth/google`,
        {
          token: response.tokenId,
        },
        {
          withCredentials: true,
        }
      );
      const {
        data: { token, user, expiresIn },
      } = apiResponse;
      dispatch(setToken(token));
      dispatch(setTokenExpire(expiresIn));
      dispatch(setUser(user));
      dispatch(
        setWorkspace(
          user?.Workspaces?.find(
            (workspace: WorkspaceType) => workspace.personal === true
          )
        )
      );
    }
  };

  const handleFailure = (error: any) => {
    if (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <GoogleLoggingButton
        clientId={clientId}
        buttonText="Log in with Google"
        onSuccess={handleSuccess}
        onFailure={handleFailure}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}
