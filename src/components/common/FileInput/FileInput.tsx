import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

export interface FileInputProps {
  label: string;
  accept: string;
  onChange: (event: FileList) => void;
  dataTestId?: string;
}

export default function FileInput({ label, accept, onChange, dataTestId }: FileInputProps) {
  return (
    <FormControl>
      <InputLabel className="Input__label">{label}</InputLabel>
      <input
        type="file"
        accept={accept}
        onChange={(e) => onChange(e.target.files)}
        data-test-id={dataTestId}
      />
    </FormControl>
  )
}