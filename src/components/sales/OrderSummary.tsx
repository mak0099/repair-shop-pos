import React from 'react';
import { Controller } from 'react-hook-form';
import type { Control } from 'react-hook-form';
import { Paper, Typography, TextField, Box, Divider } from '@mui/material';
import { SearchableDropdown } from '../common/SearchableDropdown';
import { useSalesCartStore } from '../../store/salesCartStore';
import type { Sale } from '../../types';

interface OrderSummaryProps {
  control: Control<Sale>;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ control }) => {
  const totalAmount = useSalesCartStore((state) => state.getTotalAmount());
  const options = [{ id: 'walk-in', label: 'Walk-in Customer' }];

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Order Summary</Typography>
      <Controller
        name="customerId"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <SearchableDropdown
            label="Customer Name"
            options={options}
            value={options.find(opt => opt.id === field.value) || null}
            onChange={(_, value) => field.onChange(value?.id || '')}
            required
          />
        )}
      />
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 1 }}>
        <Typography>Order Total</Typography>
        <Typography>€{totalAmount.toFixed(2)}</Typography>
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 1 }}>
        <Typography variant="h6">To Pay</Typography>
        <Typography variant="h6">€{totalAmount.toFixed(2)}</Typography>
      </Box>
      
      <Controller
        name="paidAmount"
        control={control}
        rules={{ required: true }}
        render={({ field }) => <TextField {...field} type="number" label="Paid Amount" fullWidth margin="normal" />}
      />

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
      <TextField fullWidth label="Payment Receipt Number" margin="normal" />
      <TextField fullWidth label="Order Note" multiline rows={3} margin="normal" />
    </Paper>
  );
};