import React, { SyntheticEvent } from 'react';
import Alert from '@mui/material/Alert';
import LoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton';

export interface Props extends LoadingButtonProps {
  error?: string;
  onErrorClose?: (event: SyntheticEvent<Element, Event>) => void;
  children?: any;
}

export default function AsyncButton({
  loading,
  error,
  onErrorClose,
  children,
  ...props
}: Props) {
  return (
    <>
      {error && (
        <Alert severity="error" variant="outlined" onClose={onErrorClose}>
          {error}
        </Alert>
      )}
      <LoadingButton loading={loading} {...props}>
        {children}
      </LoadingButton>
    </>
  );
}
