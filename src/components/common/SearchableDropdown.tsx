import React from 'react';
import { Autocomplete, TextField, Box, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

interface OptionType {
  id: string | number;
  label: string;
}

interface SearchableDropdownProps {
  label: string;
  options: OptionType[];
  value: OptionType | null;
  onChange: (event: React.SyntheticEvent, value: OptionType | null) => void;
  onAddNew?: () => void;
  required?: boolean;
  loading?: boolean;
  placeholder?: string;
}

export const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  label,
  options,
  value,
  onChange,
  onAddNew,
  required = false,
  loading = false,
  placeholder = `Select ${label}`,
}) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <Autocomplete
        fullWidth
        options={options}
        getOptionLabel={(option) => option.label}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        value={value}
        onChange={onChange}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            required={required}
            placeholder={placeholder}
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <></> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
      {onAddNew && (
        <IconButton onClick={onAddNew} color="primary" sx={{ ml: 1 }}>
          <AddCircleOutlineIcon />
        </IconButton>
      )}
    </Box>
  );
};