import React from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { ProductSearchInput } from '../../components/sales/ProductSearchInput';
import { SalesCart } from '../../components/sales/SalesCart';
import { OrderSummary } from '../../components/sales/OrderSummary';
import { useSalesCartStore } from '../../store/salesCartStore';
import { createSale } from '../../api/salesApi';
import type { Product, Sale } from '../../types';

const NewSalePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const { addItem, clearCart, items, getTotalAmount } = useSalesCartStore();
  
  const { handleSubmit, control } = useForm<Sale>({
    defaultValues: {
      customerId: 'walk-in' // Default to walk-in customer
    }
  });
  
  const { mutate, isPending: isSaving } = useMutation({
    mutationFn: createSale,
    onSuccess: (data) => {
      toast.success(`Sale #${data.saleId} created successfully!`);
      clearCart();
      queryClient.invalidateQueries({ queryKey: ['products'] });
      navigate('/sales');
    },
    onError: (error: Error) => {
      toast.error(`Error creating sale: ${error.message}`);
    },
  });

  const onProductSelect = (product: Product) => {
    if (product.stock > 0) {
      addItem({
        productId: product.id,
        productName: product.name, // Added this field
        quantity: 1,
        salePrice: product.desktopPrice,
      });
    } else {
      toast.error('Product is out of stock!');
    }
  };

  const onFinalSubmit: SubmitHandler<Sale> = (formData) => {
    const saleData: Sale = {
      ...formData,
      items: items,
      totalAmount: getTotalAmount(),
    };
    mutate(saleData);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>New Inventory Sale</Typography>
      <form onSubmit={handleSubmit(onFinalSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <ProductSearchInput onProductSelect={onProductSelect} />
            <SalesCart />
          </Grid>
          <Grid item xs={12} md={4}>
            <OrderSummary control={control} />
          </Grid>
        </Grid>
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button type="submit" variant="contained" size="large" disabled={isSaving || items.length === 0}>
            {isSaving ? 'Processing...' : 'Complete Sale'}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default NewSalePage;