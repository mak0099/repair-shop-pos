import React from 'react';
import { Box, Typography, Paper, Grid, TextField, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';

import { SearchableDropdown } from '../../components/common/SearchableDropdown';
import { createGeneralSale } from '../../api/salesApi';
import type { GeneralSaleData } from '../../api/salesApi';

const GeneralSalePage = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, reset } = useForm<GeneralSaleData>({
    defaultValues: {
      client: '',
      product: '',
      branch: 'SPR.SRL',
      paidAmount: 0,
      purchasePrice: 0,
      paymentMethod: '',
    },
  });

  const { mutate, isPending: isSaving } = useMutation({
    mutationFn: createGeneralSale,
    onSuccess: (data) => {
      toast.success(`General Sale #${data.saleId} created successfully!`);
      reset();
      navigate('/sales');
    },
    onError: (error: Error) => {
      toast.error(`Error creating sale: ${error.message}`);
    },
  });

  const onSubmit: SubmitHandler<GeneralSaleData> = (data) => {
    mutate(data);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Add General Sale</Typography>
      <Paper sx={{ p: 3, maxWidth: '800px', mx: 'auto' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                name="client"
                control={control}
                render={({ field }) => <TextField {...field} label="Client" fullWidth />}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="product"
                control={control}
                rules={{ required: 'Product name is required' }}
                render={({ field, fieldState: { error } }) => (
                  <TextField {...field} label="Product" fullWidth required error={!!error} helperText={error?.message} />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="branch"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <SearchableDropdown
                    label="Branch"
                    options={[{ id: 'SPR.SRL', label: 'SPR.SRL' }]} // Add more branches later
                    value={field.value ? { id: field.value, label: field.value } : null}
                    onChange={(_, value) => field.onChange(value?.id || '')}
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="paidAmount"
                control={control}
                rules={{ required: 'Paid amount is required', min: { value: 0, message: 'Must be a positive number' } }}
                render={({ field, fieldState: { error } }) => (
                  <TextField {...field} label="Paid Amount (Sale Price)" type="number" fullWidth required error={!!error} helperText={error?.message} />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="purchasePrice"
                control={control}
                rules={{ required: 'Purchase price is required', min: { value: 0, message: 'Must be a positive number' } }}
                render={({ field, fieldState: { error } }) => (
                  <TextField {...field} label="Purchase Price (Cost)" type="number" fullWidth required error={!!error} helperText={error?.message} />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="paymentMethod"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <SearchableDropdown
                    label="Payment Method"
                    options={[{id: 'cash', label: 'Cash'}, {id: 'card', label: 'Card'}]}
                    value={field.value ? { id: field.value, label: field.value } : null}
                    onChange={(_, value) => field.onChange(value?.id || '')}
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} display="flex" gap={2}>
              <Button type="submit" variant="contained" disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
              <Button variant="outlined" onClick={() => reset()}>Reset</Button>
              <Button component={Link} to="/dashboard" variant="contained" color="secondary">Khata</Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default GeneralSalePage;