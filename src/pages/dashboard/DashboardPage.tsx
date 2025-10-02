import { Box, Grid, Typography } from '@mui/material';
import { MetricCard } from '../../components/dashboard/MetricCard';
import { MyJobsTable } from '../../components/dashboard/MyJobsTable';

import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PaymentsIcon from '@mui/icons-material/Payments';

const DashboardPage = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard 
            icon={<MonetizationOnIcon color="success" />} 
            title="Today's Income" 
            value="€ 2" 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard 
            icon={<PaymentsIcon color="error" />} 
            title="Today's Expense" 
            value="€ 0" 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard 
            icon={<ReceiptIcon color="info" />} 
            title="Today's Acceptances" 
            value="0" 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard 
            icon={<ShoppingCartIcon color="warning" />} 
            title="Today's Orders" 
            value="0" 
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          My Acceptances
        </Typography>
        <MyJobsTable />
      </Box>
    </Box>
  );
};

export default DashboardPage;