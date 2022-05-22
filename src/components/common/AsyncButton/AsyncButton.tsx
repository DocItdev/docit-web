import React, { SyntheticEvent } from "react";
import { Alert } from "@mui/material";
import LoadingButton, { LoadingButtonProps} from '@mui/lab/LoadingButton';
import { Spinner } from "react-bootstrap";

export interface Props extends LoadingButtonProps {
  error: string;
  onErrorClose: (event: SyntheticEvent<Element, Event>) => void,
  children: typeof React.Children,
}

export default function AsyncButton({ loading, error, onErrorClose, children, ...props }: Props) {
  return (
    <>
      { error && (
        <Alert severity="error" variant="outlined" onClose={onErrorClose}>
          {error}
        </Alert>
      )}
      <LoadingButton
        loading={loading}
        {...props}
      >
        {children}
      </LoadingButton>
    </>
  );
}
