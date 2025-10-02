import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import {
  Box,
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
} from '@mui/material';
import { SearchableDropdown } from '../common/SearchableDropdown';
import type { RepairFormData } from '../../types';
import { SparePartsManager } from './SparePartsManager';

interface RepairFormProps {
  initialData?: RepairFormData;
  onSubmit: SubmitHandler<RepairFormData>;
  isSaving?: boolean;
}

export const RepairForm: React.FC<RepairFormProps> = ({ initialData, onSubmit, isSaving = false }) => {
  const { control, handleSubmit, reset, watch } = useForm<RepairFormData>({
    defaultValues: {
      isPinUnlock: 'no',
      isUrgent: 'no',
      sparePartsUsed: [],
      ...initialData,
    },
  });

  const isPinUnlockValue = watch('isPinUnlock');
  const isUrgentValue = watch('isUrgent');

  useEffect(() => {
    reset({
      isPinUnlock: 'no',
      isUrgent: 'no',
      sparePartsUsed: [],
      ...initialData,
    });
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Grid container spacing={3} direction="column">
              <Grid item>
                <Controller
                  name="customer"
                  control={control}
                  rules={{ required: 'Customer is required' }}
                  render={({ field }) => (
                    <SearchableDropdown
                      label="Customer Name"
                      options={[{ id: '1', label: 'GIULIANO PALESTRA (3471039809)' }]}
                      value={field.value ? { id: field.value.id, label: field.value.name } : null}
                      onChange={(_, value) => field.onChange({ id: value?.id, name: value?.label })}
                      onAddNew={() => console.log('Add new customer')}
                      required
                    />
                  )}
                />
              </Grid>
              <Grid item><TextField fullWidth label="Estimated Price" /></Grid>
              <Grid item><TextField fullWidth label="Brand" required /></Grid>
              <Grid item><TextField fullWidth label="Model" required /></Grid>
              <Grid item><TextField fullWidth label="Color" required /></Grid>
              <Grid item><TextField fullWidth label="Accessories" /></Grid>
              <Grid item><TextField fullWidth label="Device Type" required /></Grid>
              <Grid item><TextField fullWidth label="Current Status" required defaultValue="IN REPAIR" /></Grid>
              <Grid item><TextField fullWidth label="Defect Description" multiline rows={4} /></Grid>
              <Grid item><TextField fullWidth label="Notes" multiline rows={4} /></Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Middle Column */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Grid container spacing={3} direction="column">
              <Grid item><TextField fullWidth label="Created Date" required defaultValue={new Date().toLocaleString()} InputProps={{ readOnly: true }} /></Grid>
              <Grid item><TextField fullWidth label="IMEI / Serial No" required /></Grid>
              <Grid item><TextField fullWidth label="Secondary IMEI" /></Grid>
              <Grid item><TextField fullWidth label="Technician" required /></Grid>
              <Grid item><TextField fullWidth label="Warranty" /></Grid>
              <Grid item><TextField fullWidth label="Replacement Device" /></Grid>
              <Grid item><TextField fullWidth label="Dealer" /></Grid>
              <Grid item><TextField fullWidth label="Price Offered" /></Grid>
              <Grid item><TextField fullWidth label="Reserved Notes" multiline rows={4} /></Grid>
              <Grid item>
                  <SparePartsManager control={control} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        
        {/* Right Column */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: 'center', mb: 2 }}>
            <Typography variant="subtitle1">Acceptance Number</Typography>
            <Typography variant="h4" color="primary">{initialData?.acceptanceNumber || 'N/A'}</Typography>
            <Typography variant="caption">Created By: {initialData?.createdBy?.name || 'N/A'}</Typography>
          </Paper>

          <Paper sx={{ p: 2 }}>
             <Controller
                name="isPinUnlock"
                control={control}
                render={({ field }) => (
                  <RadioGroup {...field} row>
                    <Typography sx={{ mr: 2, alignSelf: 'center' }}>Pin Unlock*:</Typography>
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                  </RadioGroup>
                )}
              />
              {isPinUnlockValue === 'yes' && <TextField fullWidth label="Pin Unlock Number" sx={{mt: 1}}/>}
              <Divider sx={{ my: 2 }} />
              <Controller
                name="isUrgent"
                control={control}
                render={({ field }) => (
                  <RadioGroup {...field} row>
                    <Typography sx={{ mr: 2, alignSelf: 'center' }}>Urgent*:</Typography>
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                  </RadioGroup>
                )}
              />
              {isUrgentValue === 'yes' && <TextField fullWidth label="Urgent Date" sx={{mt: 1}}/>}
          </Paper>
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button type="submit" variant="contained" color="primary" disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save'}
        </Button>
        <Button variant="outlined" onClick={() => reset(initialData)}>Reset</Button>
         {initialData && <Button variant="contained" color="info">Print Acceptance</Button>}
         {initialData && <Button variant="contained" color="secondary">E-Mail Client</Button>}
         {initialData && <Button variant="outlined" color="error">Remove</Button>}
      </Box>
    </form>
  );
};