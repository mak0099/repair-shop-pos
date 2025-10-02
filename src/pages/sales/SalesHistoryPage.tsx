import React from 'react';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { fetchSales } from '../../api/salesApi';
import type { SaleRecord } from '../../api/salesApi';
import { DataTable } from '../../components/common/DataTable';
import type { Column } from '../../components/common/DataTable';

const SalesHistoryPage = () => {
  const { data: sales, isLoading, isError, error } = useQuery<SaleRecord[], Error>({
    queryKey: ['salesHistory'],
    queryFn: fetchSales,
  });

  const columns: Column<SaleRecord>[] = [
    { id: 'id', label: 'Sale ID' },
    { id: 'date', label: 'Date' },
    { id: 'customerId', label: 'Customer ID' },
    { id: 'items', label: 'Items', render: (row) => row.items.length },
    { id: 'totalAmount', label: 'Total Amount', render: (row) => `€${row.totalAmount.toFixed(2)}` },
    { id: 'paymentMethod', label: 'Payment Method' },
  ];

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return <Alert severity="error">Error fetching sales data: {error.message}</Alert>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Sales History
      </Typography>
      <DataTable data={sales || []} columns={columns} defaultSortBy="date" />
    </Box>
  );
};

export default SalesHistoryPage;