import React from "react";
import GithubLogin from "../components/GithubLogin";
import GoogleLogin from "../components/GoogleLogin";
import useAuthEffect from "../hooks/useAuthEffect";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import wave from "./waveSvgComponent.svg";
import ship from "./ship.png";
import yatch from "./yatch.png";

export default function Login() {
  useAuthEffect();
  return (

    <div style={{ backgroundColor: "#FFEDDA" }}>
      <div style={{ marginTop: "50px", marginBottom: "-11%" }}>
        <Grid justify="center" container spacing={0}>
          <Grid align="center" item xs={6}>
            <Card alignItems="center"
              justify="center" style={{ backgroundColor: "#FFB830", width: "50%", height: "50%", marginTop: "15%" }}>
              <CardContent >
                <Typography gutterBottom variant="h4" component="div">
                  <span style={{ fontFamily: 'Nunito', fontWeight: "900", color: '#FFF' }}>Welcome to DocIt </span>
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  <span style={{ fontFamily: 'Nunito', fontWeight: "300", color: '#FFF' }}>Login or Register Below</span>
                </Typography>
                <div style={{ margin: "10px" }}>
                  <GithubLogin />
                </div>

                <GoogleLogin />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <img src={yatch} />
          </Grid>
        </Grid>
      </div>


      <img src={wave} />

    </div>
  );
}
