// src/components/MetricCard.tsx

import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon, title, value }) => {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          {icon}
          <Typography variant="h6" component="div" sx={{ ml: 1 }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" component="p" sx={{ textAlign: 'center' }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MetricCard;