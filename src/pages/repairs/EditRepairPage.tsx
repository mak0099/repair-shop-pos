import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import toast from 'react-hot-toast';

import { fetchRepairById, updateRepair } from '../../api/repairsApi';
import { RepairForm } from '../../components/repairs/RepairForm';
import type { RepairFormData } from '../../types';

const EditRepairPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: job, isLoading: isQueryLoading, isError, error } = useQuery({
    queryKey: ['repair', id],
    queryFn: () => fetchRepairById(id || ''),
    enabled: !!id,
  });

  // Transform the fetched API data into the format the form expects
  const formInitialData = useMemo((): RepairFormData | undefined => {
    if (!job) return undefined;

    // The API data (Job) is missing UI-specific fields like isPinUnlock.
    // We add them here with default values before passing to the form.
    return {
      ...job,
      isPinUnlock: 'no', // Default value
      isUrgent: 'no',    // Default value
    };
  }, [job]);

  const { mutate, isPending: isMutationPending } = useMutation({
    mutationFn: (data: RepairFormData) => updateRepair(id || '', data),
    onSuccess: (data) => {
      toast.success(`Repair job #${data.acceptanceNumber} updated successfully!`);
      queryClient.invalidateQueries({ queryKey: ['acceptances'] });
      queryClient.invalidateQueries({ queryKey: ['myAcceptances'] });
      queryClient.invalidateQueries({ queryKey: ['repair', id] });
      navigate('/repairs');
    },
    onError: (error: Error) => {
      toast.error(`Error updating repair: ${error.message}`);
    },
  });

  const handleSubmit = (data: RepairFormData) => {
    mutate(data);
  };

  if (isQueryLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return <Alert severity="error">Error fetching repair data: {(error as Error).message}</Alert>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Edit Acceptance #{job?.acceptanceNumber}
      </Typography>
      <RepairForm initialData={formInitialData} onSubmit={handleSubmit} isSaving={isMutationPending} />
    </Box>
  );
};

export default EditRepairPage;