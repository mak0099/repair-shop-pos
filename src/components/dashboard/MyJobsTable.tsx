import React from 'react';
import { Typography, Box, CircularProgress, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchMyAcceptances } from '../../api/repairsApi';
import type { Job } from '../../types';
import { DataTable } from '../common/DataTable';
import type { Column } from '../common/DataTable';

export const MyJobsTable: React.FC = () => {
  const { data: jobs, isLoading, isError, error } = useQuery<Job[], Error>({
    queryKey: ['myAcceptances'], 
    queryFn: fetchMyAcceptances,
  });

  const columns: Column<Job>[] = [
    {
      id: 'acceptanceNumber',
      label: 'Number',
      render: (row) => <Link to={`/repairs/${row.id}`}>{row.acceptanceNumber}</Link>,
    },
    { id: 'customerName', label: 'Customer', render: (row) => <Link to="#">{row.customer.name}</Link> },
    { id: 'createdDate', label: 'Created Date' },
    { id: 'deviceType', label: 'Device Type' },
    { id: 'brand', label: 'Brand' },
    { id: 'model', label: 'Model' },
    { id: 'currentStatus', label: 'Current Status' },
  ];

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return <Alert severity="error">Error fetching jobs: {error.message}</Alert>;
  }

  return <DataTable data={jobs || []} columns={columns} defaultSortBy="createdDate" />;
};