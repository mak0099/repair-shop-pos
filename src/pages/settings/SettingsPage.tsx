import { Box, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import BusinessIcon from '@mui/icons-material/Business';
import DevicesIcon from '@mui/icons-material/Devices';

const SettingsPage = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        System Settings
      </Typography>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/settings/branches">
            <ListItemIcon><BusinessIcon /></ListItemIcon>
            <ListItemText primary="Manage Branches" secondary="Add or edit shop locations" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/settings/device-models">
            <ListItemIcon><DevicesIcon /></ListItemIcon>
            <ListItemText primary="Manage Device Models" secondary="Add or edit brands and models" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default SettingsPage;