import React from 'react';
import { Box, Typography, CircularProgress, Alert, Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../../api/productsApi';
import { DataTable } from '../../components/common/DataTable';
import type { Column } from '../../components/common/DataTable';
import type { Product } from '../../types';

const ProductListPage = () => {
  const { data: products, isLoading, isError, error } = useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const columns: Column<Product>[] = [
    { id: 'sku', label: 'SKU', render: (row) => <Link to={`/inventory/${row.id}`}>{row.sku}</Link> },
    { id: 'name', label: 'Product Name' },
    { id: 'category', label: 'Category' },
    { id: 'stock', label: 'Stock' },
    { id: 'purchasePrice', label: 'Purchase Price', render: (row) => `€${row.purchasePrice.toFixed(2)}` },
    { id: 'desktopPrice', label: 'Desktop Price', render: (row) => `€${row.desktopPrice.toFixed(2)}` },
  ];

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Alert severity="error">Error fetching products: {error.message}</Alert>;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" gutterBottom>
          Product List
        </Typography>
        <Button component={Link} to="/inventory/new" variant="contained">
          Add New Product
        </Button>
      </Box>
      <DataTable data={products || []} columns={columns} defaultSortBy="name" />
    </Box>
  );
};

export default ProductListPage;