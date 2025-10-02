import React from 'react';
import { Box, Typography, CircularProgress, Alert, Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import { fetchSuppliers } from '../../api/suppliersApi';
import { DataTable } from '../../components/common/DataTable';
import type { Column } from '../../components/common/DataTable';
import type { Supplier } from '../../types';

const SupplierListPage = () => {
  const { data: suppliers, isLoading, isError, error } = useQuery<Supplier[], Error>({
    queryKey: ['suppliers'],
    queryFn: fetchSuppliers,
  });

  const columns: Column<Supplier>[] = [
    { id: 'name', label: 'Supplier Name', render: (row) => <Link to={`/people/suppliers/${row.id}`}>{row.name}</Link> },
    { id: 'contactPerson', label: 'Contact Person' },
    { id: 'phone', label: 'Phone' },
    { id: 'email', label: 'Email' },
  ];

  if (isLoading) return <CircularProgress />;
  if (isError) return <Alert severity="error">Error fetching suppliers: {error.message}</Alert>;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" gutterBottom>Suppliers</Typography>
        <Button component={Link} to="/people/suppliers/new" variant="contained">
          Add New Supplier
        </Button>
      </Box>
      <DataTable data={suppliers || []} columns={columns} defaultSortBy="name" />
    </Box>
  );
};

export default SupplierListPage;