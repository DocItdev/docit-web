import React, { useEffect, useState } from "react";
import GithubLogin from "../../components/GithubLogin";
import GoogleLogin from "../../components/GoogleLogin";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import wave from "./waveSvgComponent.svg";
import yacht from "./yatch.png";
import { useLocation, Location, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../config/reduxConfig";
import { WorkspaceType } from "../../@types/Workspace";

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const userToken: string = useSelector((state: RootState) => state.userToken);
  const [workspace, setWorkspace] = useState<WorkspaceType>();

  useEffect(() => {
    if (userToken && workspace) {
      const locState = location.state as { from: Location };
      const fromUrl = locState?.from.pathname || `/${workspace.id}`;
      navigate(fromUrl, { replace: true });
    }
  }, [userToken, workspace])

  return (
    <div
      style={{
        backgroundColor: "#FFEDDA",
        marginTop: "0px",
        marginBottom: "-11%",
        height: "100vh",
        paddingRight: "5%",
        backgroundImage: `url(${wave}), url(${yacht})`,
        backgroundPosition: "left bottom, 80% top",
        backgroundRepeat: "no-repeat, no-repeat",
        backgroundSize: "100vw 70%, auto 50%",
      }}
    >
      <Grid container spacing={0}>
        <Grid
          sx={{ display: "flex", justifyContent: 'center' }}
          item
          xs={12}
          sm={12}
          md={6}
        >
          <Card
            component={Paper}
            elevation={3}
            sx={{
              backgroundColor: "#FFB830",
              width: "50%",
              marginTop: "15%",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                <span
                  style={{
                    fontFamily: "Nunito",
                    fontWeight: "900",
                    color: "#FFF",
                  }}
                >
                  Welcome to DocIt{" "}
                </span>
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                <span
                  style={{
                    fontFamily: "Nunito",
                    fontWeight: "300",
                    color: "#FFF",
                  }}
                >
                  Login or Register Below
                </span>
              </Typography>
              <div style={{ margin: "10px" }}>
                <GithubLogin setWorkspace={setWorkspace} />
              </div>
              <GoogleLogin setWorkspace={setWorkspace} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
