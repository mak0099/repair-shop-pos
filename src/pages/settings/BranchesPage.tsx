import React from 'react';
import { Box, Typography, CircularProgress, Alert, Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import { fetchBranches } from '../../api/settingsApi';
import { DataTable } from '../../components/common/DataTable';
import type { Column } from '../../components/common/DataTable';
import type { Branch } from '../../types';

const BranchesPage = () => {
  const { data: branches, isLoading, isError, error } = useQuery<Branch[], Error>({
    queryKey: ['branches'],
    queryFn: fetchBranches,
  });

  const columns: Column<Branch>[] = [
    { id: 'name', label: 'Branch Name', render: (row) => <Link to={`/settings/branches/${row.id}`}>{row.name}</Link> },
    { id: 'address', label: 'Address' },
  ];

  if (isLoading) return <CircularProgress />;
  if (isError) return <Alert severity="error">Error fetching branches: {error.message}</Alert>;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" gutterBottom>Branches</Typography>
        <Button variant="contained">Add New Branch</Button>
      </Box>
      <DataTable data={branches || []} columns={columns} defaultSortBy="name" />
    </Box>
  );
};

export default BranchesPage;