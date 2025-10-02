import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import toast from 'react-hot-toast';
import type { SubmitHandler } from 'react-hook-form';

import { fetchProductById, updateProduct } from '../../api/productsApi';
import { ProductForm } from '../../components/inventory/ProductForm';
import type { Product } from '../../types';

const EditProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: product, isLoading: isQueryLoading, isError, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id || ''),
    enabled: !!id,
  });

  const { mutate, isPending: isMutationPending } = useMutation({
    mutationFn: (data: Partial<Product>) => updateProduct(id || '', data),
    onSuccess: (data) => {
      toast.success(`Product "${data.name}" updated successfully!`);
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', id] });
      navigate('/inventory');
    },
    onError: (error: Error) => {
      toast.error(`Error updating product: ${error.message}`);
    },
  });
  
  const handleSubmit: SubmitHandler<Partial<Product>> = (data) => {
    mutate(data);
  };

  if (isQueryLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Alert severity="error">Error fetching product data: {(error as Error).message}</Alert>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Edit Product: {product?.name}
      </Typography>
      <ProductForm initialData={product} onSubmit={handleSubmit} isSaving={isMutationPending} />
    </Box>
  );
};

export default EditProductPage;