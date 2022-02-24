import React from "react";
import { Button, Alert } from "@mui/material";
import { Spinner } from "react-bootstrap";

export default function AsyncButton({ loading, error, onErrorClose, children, ...props }) {
  return (
    <>
      { error && (
        <Alert severity="error" variant="outlined" onClose={onErrorClose}>
          {error}
        </Alert>
      )}
      <Button {...props}>
        {loading ? <Spinner animation="border" /> : children}
      </Button>
    </>
  );
}
