import React from 'react';
import { Box, Typography, CircularProgress, Alert, Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import { fetchCustomers } from '../../api/customersApi';
import { DataTable } from '../../components/common/DataTable';
import type { Column } from '../../components/common/DataTable';
import type { Customer } from '../../types';

const CustomerListPage = () => {
  const { data: customers, isLoading, isError, error } = useQuery<Customer[], Error>({
    queryKey: ['customers'],
    queryFn: fetchCustomers,
  });

  const columns: Column<Customer>[] = [
    { id: 'name', label: 'Name', render: (row) => <Link to={`/people/customers/${row.id}`}>{row.name}</Link> },
    { id: 'phone', label: 'Phone' },
    { id: 'email', label: 'Email' },
  ];

  if (isLoading) return <CircularProgress />;
  if (isError) return <Alert severity="error">Error fetching customers: {error.message}</Alert>;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" gutterBottom>Customers</Typography>
        <Button component={Link} to="/people/customers/new" variant="contained">
          Add New Customer
        </Button>
      </Box>
      <DataTable data={customers || []} columns={columns} defaultSortBy="name" />
    </Box>
  );
};

export default CustomerListPage;