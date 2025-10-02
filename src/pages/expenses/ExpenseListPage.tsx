import React from 'react';
import { Box, Typography, CircularProgress, Alert, Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import { fetchExpenses } from '../../api/expensesApi';
import { DataTable } from '../../components/common/DataTable';
import type { Column } from '../../components/common/DataTable';
import type { Expense } from '../../types';

const ExpenseListPage = () => {
  const { data: expenses, isLoading, isError, error } = useQuery<Expense[], Error>({
    queryKey: ['expenses'],
    queryFn: fetchExpenses,
  });

  const columns: Column<Expense>[] = [
    { id: 'date', label: 'Date' },
    { id: 'description', label: 'Description', render: (row) => <Link to={`/expenses/${row.id}`}>{row.description}</Link> },
    { id: 'category', label: 'Category' },
    { id: 'amount', label: 'Amount', render: (row) => `€${row.amount.toFixed(2)}` },
  ];

  if (isLoading) return <CircularProgress />;
  if (isError) return <Alert severity="error">Error fetching expenses: {error.message}</Alert>;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" gutterBottom>Expenses</Typography>
        <Button component={Link} to="/expenses/new" variant="contained">
          Add New Expense
        </Button>
      </Box>
      <DataTable data={expenses || []} columns={columns} defaultSortBy="date" />
    </Box>
  );
};

export default ExpenseListPage;