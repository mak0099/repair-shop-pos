import { Box, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import type { SubmitHandler } from 'react-hook-form';

import { ProductForm } from '../../components/inventory/ProductForm';
import { createProduct } from '../../api/productsApi';
import type { Product } from '../../types';

const AddProductPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createProduct,
    onSuccess: (data) => {
      toast.success(`Product "${data.name}" created successfully!`);
      queryClient.invalidateQueries({ queryKey: ['products'] });
      navigate('/inventory');
    },
    onError: (error: Error) => {
      toast.error(`Error creating product: ${error.message}`);
    },
  });

  const handleSubmit: SubmitHandler<Partial<Product>> = (data) => {
    mutate(data);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Add New Product
      </Typography>
      <ProductForm onSubmit={handleSubmit} isSaving={isPending} />
    </Box>
  );
};

export default AddProductPage;