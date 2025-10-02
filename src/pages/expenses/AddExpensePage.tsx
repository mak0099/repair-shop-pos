import React from 'react';
import { Box, Typography, Paper, Grid, TextField, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { createExpense } from '../../api/expensesApi';
import type { Expense } from '../../types';

type ExpenseFormData = Omit<Expense, 'id'>;

const AddExpensePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { control, handleSubmit, reset } = useForm<ExpenseFormData>({
    defaultValues: {
      date: new Date().toISOString().split('T')[0], // Today's date
      description: '',
      category: '',
      amount: 0,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createExpense,
    onSuccess: (data) => {
      toast.success(`Expense "${data.description}" created successfully!`);
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      navigate('/expenses');
    },
    onError: (error: Error) => {
      toast.error(`Error creating expense: ${error.message}`);
    },
  });

  const onSubmit: SubmitHandler<ExpenseFormData> = (data) => {
    mutate({ ...data, amount: Number(data.amount) }); // Ensure amount is a number
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Add General Expense</Typography>
      <Paper sx={{ p: 3, maxWidth: '600px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                rules={{ required: 'Description is required' }}
                render={({ field, fieldState: { error } }) => (
                  <TextField {...field} label="Description" fullWidth required error={!!error} helperText={error?.message} />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="category"
                control={control}
                rules={{ required: 'Category is required' }}
                render={({ field, fieldState: { error } }) => (
                  <TextField {...field} label="Category" fullWidth required error={!!error} helperText={error?.message} />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="amount"
                control={control}
                rules={{ required: 'Amount is required', min: { value: 0.01, message: 'Amount must be positive' } }}
                render={({ field, fieldState: { error } }) => (
                  <TextField {...field} label="Amount (€)" type="number" fullWidth required error={!!error} helperText={error?.message} />
                )}
              />
            </Grid>
             <Grid item xs={12}>
              <Controller
                name="date"
                control={control}
                rules={{ required: 'Date is required' }}
                render={({ field, fieldState: { error } }) => (
                  <TextField {...field} label="Date" type="date" fullWidth required error={!!error} helperText={error?.message} InputLabelProps={{ shrink: true }} />
                )}
              />
            </Grid>
            <Grid item xs={12} display="flex" gap={2}>
              <Button type="submit" variant="contained" disabled={isPending}>
                {isPending ? 'Saving...' : 'Save Expense'}
              </Button>
              <Button variant="outlined" onClick={() => reset()}>Reset</Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default AddExpensePage;