import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { Box, Grid, Paper, TextField, Button, Typography, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import { SearchableDropdown } from '../common/SearchableDropdown';
import type { Product } from '../../types';

interface ProductFormProps {
  initialData?: Partial<Product>;
  onSubmit: SubmitHandler<Partial<Product>>;
  isSaving?: boolean;
}

export const ProductForm: React.FC<ProductFormProps> = ({ initialData, onSubmit, isSaving = false }) => {
  const { control, handleSubmit, reset } = useForm<Partial<Product>>({
    defaultValues: initialData || {},
  });

  useEffect(() => {
    reset(initialData);
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller name="name" control={control} rules={{ required: true }} render={({ field }) => <TextField {...field} label="Product Name" fullWidth required />} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller name="sku" control={control} render={({ field }) => <TextField {...field} label="SKU" fullWidth InputProps={{ readOnly: true }} helperText="Will be auto-generated when the form is saved." />} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller name="category" control={control} rules={{ required: true }} render={({ field }) => (
                  <SearchableDropdown label="Product Category" options={[{id: 'spare-parts', label: 'Spare Parts'}]} value={field.value ? {id: field.value, label: field.value} : null} onChange={(_, val) => field.onChange(val?.id || '')} required />
                )} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller name="purchasePrice" control={control} rules={{ required: true }} render={({ field }) => <TextField {...field} label="Purchase Price (€)" type="number" fullWidth required />} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller name="desktopPrice" control={control} rules={{ required: true }} render={({ field }) => <TextField {...field} label="Desktop Price (€)" type="number" fullWidth required />} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller name="onlinePrice" control={control} rules={{ required: true }} render={({ field }) => <TextField {...field} label="Online Price (€)" type="number" fullWidth required />} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller name="stock" control={control} rules={{ required: true }} render={({ field }) => <TextField {...field} label="Stock" type="number" fullWidth required />} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
             <Controller name="brand" control={control} render={({ field }) => (
                <SearchableDropdown label="Product Brand" options={[{id: 'apple', label: 'Apple'}]} value={field.value ? {id: field.value, label: field.value} : null} onChange={(_, val) => field.onChange(val?.id || '')} />
              )} />
              <Box mt={2}>
                 <Controller name="model" control={control} render={({ field }) => (
                  <SearchableDropdown label="Product Model" options={[{id: 'iphone14', label: 'iPhone 14'}]} value={field.value ? {id: field.value, label: field.value} : null} onChange={(_, val) => field.onChange(val?.id || '')} />
                )} />
              </Box>
               <Box mt={2}>
                 <Controller name="condition" control={control} render={({ field }) => (
                  <SearchableDropdown label="Product Condition" options={[{id: 'new', label: 'New'}, {id: 'used', label: 'Used'}]} value={field.value ? {id: field.value, label: field.value} : null} onChange={(_, val) => field.onChange(val?.id || '')} />
                )} />
              </Box>
              <Box mt={2}>
                <Typography variant="subtitle2">Product Meta</Typography>
                <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="Latest Product" />
                  <FormControlLabel control={<Checkbox />} label="Top Selling Product" />
                  <FormControlLabel control={<Checkbox />} label="Offer" />
                </FormGroup>
              </Box>
          </Paper>
        </Grid>
      </Grid>
      <Box sx={{ mt: 3 }}>
        <Button type="submit" variant="contained" disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Product'}
        </Button>
      </Box>
    </form>
  );
};