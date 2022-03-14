import React from "react";
import { Switch, FormControl, FormControlLabel, Grid } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import style from "./Navbar.module.css";
import { setEditable } from "../../ducks";

export default function Navbar() {
  const dispatch = useDispatch();
  const editable = useSelector(state => state.editable);

  const handleChange = (event) => {
    dispatch(setEditable(event.target.checked));
  };

  return (
    <Grid container className={style.root}>
      <Grid item xs={10}>
        <h3>DocIt main page</h3>
      </Grid>
      <Grid item xs={2}>
        <FormControl>
          <FormControlLabel
            control={
              <Switch
                checked={editable}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label="Edit Document"
          />
        </FormControl>
      </Grid>
    </Grid>
  );
}
