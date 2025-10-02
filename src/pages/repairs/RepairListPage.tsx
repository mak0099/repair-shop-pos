import React, { useState } from 'react';
import { Box, Grid, Paper, Typography, TextField, Button, CircularProgress, Alert } from '@mui/material';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import { searchAcceptances } from '../../api/repairsApi';
import type { RepairSearchFilters } from '../../api/repairsApi';
import { useDebounce } from '../../hooks/useDebounce';
import { DataTable } from '../../components/common/DataTable';
import type { Column } from '../../components/common/DataTable';
import type { Job } from '../../types';

const RepairListPage = () => {
  // State for all filter fields
  const [filters, setFilters] = useState<RepairSearchFilters>({
    customerName: '',
    acceptanceNumber: '',
    imei: '',
    mobile: '',
  });

  // Debounce text inputs to avoid excessive API calls
  const debouncedFilters = useDebounce(filters, 500);

  const { data: jobs, isLoading, isError, error } = useQuery<Job[], Error>({
    queryKey: ['acceptances', debouncedFilters],
    queryFn: () => searchAcceptances(debouncedFilters),
    placeholderData: keepPreviousData, // Correct syntax for TanStack Query v5
  });
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFilters({
      customerName: '',
      acceptanceNumber: '',
      imei: '',
      mobile: '',
    });
  };

  const columns: Column<Job>[] = [
    { id: 'acceptanceNumber', label: 'Number', render: (row) => <Link to={`/repairs/${row.id}`}>{row.acceptanceNumber}</Link> },
    { id: 'customerName', label: 'Customer', render: (row) => <Link to={`/people/customers/${row.customer.id}`}>{row.customer.name}</Link> },
    { id: 'createdDate', label: 'Created Date' },
    { id: 'deviceType', label: 'Device Type' },
    { id: 'brand', label: 'Brand' },
    { id: 'model', label: 'Model' },
    { id: 'currentStatus', label: 'Current Status' },
    { id: 'technician', label: 'Technician', render: (row) => row.technician.name },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Search Repairs</Typography>
      
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={3}><TextField fullWidth label="Acceptance Number" name="acceptanceNumber" value={filters.acceptanceNumber} onChange={handleInputChange} /></Grid>
          <Grid item xs={12} sm={6} md={3}><TextField fullWidth label="Customer Name" name="customerName" value={filters.customerName} onChange={handleInputChange} /></Grid>
          <Grid item xs={12} sm={6} md={3}><TextField fullWidth label="IMEI / Serial No" name="imei" value={filters.imei} onChange={handleInputChange} /></Grid>
          <Grid item xs={12} sm={6} md={3}><TextField fullWidth label="Mobile" name="mobile" value={filters.mobile} onChange={handleInputChange} /></Grid>
          {/* Other dropdown/date filters will be added here */}
          <Grid item xs={12} display="flex" gap={2}>
            <Button variant="contained">Search</Button>
            <Button variant="outlined" onClick={handleReset}>Reset</Button>
          </Grid>
        </Grid>
      </Paper>
      
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      )}
      {isError && <Alert severity="error">Error fetching data: {error.message}</Alert>}
      {!isLoading && !isError && (
        <DataTable data={jobs || []} columns={columns} defaultSortBy="createdDate" />
      )}
    </Box>
  );
};

export default RepairListPage;