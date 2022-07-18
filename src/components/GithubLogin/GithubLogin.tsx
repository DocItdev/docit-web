import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { setToken, setUser, setWorkspace } from "../../ducks";
import env from "../../config/envConfig";
import axios from "axios";
import { WorkspaceType } from "../../@types/Workspace.";

export default function GithubLogin() {
  const dispatch = useDispatch();
  const authUrl = env.GITHUB_AUTH_URL;
  const clientId = env.GITHUB_CLIENT_ID;
  const clientSecret = env.GITHUB_CLIENT_SECRET;
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");

  useEffect(() => {
    (async () => {
      try {
        if (code) {
          const response = await axios.post(`${env.API_HOST}/api/auth/github`, {
            code,
          });
          const {
            data: { token, user },
          } = response;
          dispatch(setToken(token));
          dispatch(setUser(user));
          dispatch(
            setWorkspace(
              user?.Workspaces?.find(
                (workspace: WorkspaceType) => workspace.personal === true
              )
            )
          );
        }
      } catch (error) {
        console.log("OAuth Github error:", error);
      }
    })();
  }, [code]);

  return (
    <div>
      <Button
        style={{
          backgroundColor: "black",
          borderWidth: "0px",
          width: "177px",
          height: "42px",
        }}
        href={`${authUrl}&client_id=${clientId}&client_secret=${clientSecret}`}
      >
        <i className="bi bi-github"></i>
        <span>&nbsp;Login with GitHub</span>
      </Button>
    </div>
  );
}
