import { Box, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { RepairForm } from '../../components/repairs/RepairForm';
import { createRepair } from '../../api/repairsApi';
import type { RepairFormData } from '../../types';

const AddRepairPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createRepair,
    onSuccess: (data) => {
      toast.success(`Repair job #${data.acceptanceNumber} created successfully!`);
      // Invalidate queries to refetch the list after a new entry is created
      queryClient.invalidateQueries({ queryKey: ['acceptances'] });
      queryClient.invalidateQueries({ queryKey: ['myAcceptances'] });
      navigate('/repairs');
    },
    onError: (error: Error) => {
      toast.error(`Error creating repair: ${error.message}`);
    },
  });

  const handleSubmit = (data: RepairFormData) => {
    mutate(data);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Add New Acceptance
      </Typography>
      <RepairForm onSubmit={handleSubmit} isSaving={isPending} />
    </Box>
  );
};

export default AddRepairPage;