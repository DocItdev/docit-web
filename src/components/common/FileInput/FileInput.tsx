import React from 'react';
import FormControl from '@mui/material/FormControl';

export interface FileInputProps {
  label: string;
  accept: string;
  onChange: (event: FileList) => void;
  dataTestId?: string;
}

export default function FileInput({ accept, onChange, dataTestId }: FileInputProps) {
  return (
    <FormControl>
      <input
        type="file"
        accept={accept}
        onChange={(e) => onChange(e.target.files)}
        data-test-id={dataTestId}
      />
    </FormControl>
  )
}