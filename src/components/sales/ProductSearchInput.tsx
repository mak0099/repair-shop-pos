import React from 'react';
import { Autocomplete, TextField, CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../../api/productsApi';
import type { Product } from '../../types';

interface ProductSearchInputProps {
  onProductSelect: (product: Product) => void;
}

export const ProductSearchInput: React.FC<ProductSearchInputProps> = ({ onProductSelect }) => {
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  return (
    <Autocomplete
      options={products}
      getOptionLabel={(option) => `${option.name} (SKU: ${option.sku}) - Stock: ${option.stock}`}
      loading={isLoading}
      onChange={(event, value) => {
        if (value) {
          onProductSelect(value);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Product by Name or SKU"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};