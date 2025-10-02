import React from 'react';
import { Box, Typography, CircularProgress, Alert, Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { fetchDeviceModels } from '../../api/devicesApi';
import { DataTable } from '../../components/common/DataTable';
import type { Column } from '../../components/common/DataTable';
import type { DeviceModel } from '../../api/devicesApi';

const DeviceModelsPage = () => {
  const { data: models, isLoading, isError, error } = useQuery<DeviceModel[], Error>({
    queryKey: ['deviceModels'],
    queryFn: fetchDeviceModels,
  });

  const columns: Column<DeviceModel>[] = [
    { id: 'name', label: 'Model Name' },
  ];

  if (isLoading) return <CircularProgress />;
  if (isError) return <Alert severity="error">Error fetching models: {error.message}</Alert>;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" gutterBottom>Device Models</Typography>
        <Button variant="contained">Add New Model</Button>
      </Box>
      <DataTable data={models || []} columns={columns} defaultSortBy="name" />
    </Box>
  );
};

export default DeviceModelsPage;