import React, { useState } from "react";
import { Toolbar, IconButton, Box, CssBaseline } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DocumentContainer from "../../components/DocumentContainer";
import Sidebar from "../../components/Sidebar";
import useAuthEffect from "../../hooks/useAuthEffect";
import { AppBar, Main } from "./styles";

export default function DocIt() {
  useAuthEffect();
  const [drawerIsOpened, setDrawerIsOpened] = useState(true);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={drawerIsOpened}
        color="transparent"
        variant="outlined"
      >
        <Toolbar variant="dense">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setDrawerIsOpened(true)}
            edge="start"
            sx={{
              marginRight: 5,
              ...(drawerIsOpened && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Sidebar
        drawerIsOpened={drawerIsOpened}
        onClose={() => setDrawerIsOpened(false)}
      />
      <Main open={drawerIsOpened}>
        <DocumentContainer />
      </Main>
    </Box>
  );
}
