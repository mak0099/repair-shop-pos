import React from 'react';
import { TextField } from '@mui/material';

export const CompatibilitySelector = () => {
  return (
    <TextField
      fullWidth
      label="Compatible Models"
      placeholder="Search and add compatible models..."
      helperText="Functionality to be added later"
      disabled
    />
  );
};