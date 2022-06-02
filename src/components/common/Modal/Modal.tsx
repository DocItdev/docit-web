import { SyntheticEvent } from 'react';
import Dialog, { DialogProps } from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import { Navbar } from "react-bootstrap";
import "./Modal.css";

export interface ModalProps extends DialogProps {
  title: string;
  onClose: (event: SyntheticEvent) => void;
}

export default function Modal({
  title,
  onClose,
  children,
  ...props
}: ModalProps) {
  return (
    <Dialog {...props} onClose={onClose}>
      <Box className="root">
        <Navbar bg="light" expand="lg">
          <Grid container spacing={2} className="header">
            <Grid item xs={11}>
              <Typography component="span" variant="h5">
                {title}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <IconButton
                aria-label="close"
                onClick={onClose}
                className="iconButton"
              >
                <i className="bi bi-x-circle"></i>
              </IconButton>
            </Grid>
          </Grid>
        </Navbar>
        <div className="container">{children}</div>
      </Box>
    </Dialog>
  );
}
