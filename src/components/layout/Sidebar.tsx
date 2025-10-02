import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { List, ListItemButton, ListItemIcon, ListItemText, Collapse, Divider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import BuildIcon from '@mui/icons-material/Build';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SettingsIcon from '@mui/icons-material/Settings';
import InventoryIcon from '@mui/icons-material/Inventory';
import GroupIcon from '@mui/icons-material/Group';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StoreIcon from '@mui/icons-material/Store';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';

const NavItem = ({ to, icon, text }: { to: string; icon: React.ReactNode; text: string }) => (
  <ListItemButton component={NavLink} to={to} sx={{ pl: 4 }}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={text} />
  </ListItemButton>
);

export const Sidebar = () => {
  const [repairsOpen, setRepairsOpen] = useState(false);
  const [salesOpen, setSalesOpen] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [peopleOpen, setPeopleOpen] = useState(false);
  const [expensesOpen, setExpensesOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleClick = (setter: React.Dispatch<React.SetStateAction<boolean>>, state: boolean) => {
    setter(!state);
  };

  return (
    <List component="nav">
      <NavItem to="/dashboard" icon={<HomeIcon />} text="Dashboard" />
      <Divider sx={{ my: 1 }} />

      <ListItemButton onClick={() => handleClick(setRepairsOpen, repairsOpen)}>
        <ListItemIcon><BuildIcon /></ListItemIcon>
        <ListItemText primary="Repair Management" />
        {repairsOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={repairsOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <NavItem to="/repairs/new" icon={<AddCircleOutlineIcon />} text="Add New Repair" />
          <NavItem to="/repairs" icon={<SearchIcon />} text="Search Repairs" />
        </List>
      </Collapse>

      <ListItemButton onClick={() => handleClick(setSalesOpen, salesOpen)}>
        <ListItemIcon><PointOfSaleIcon /></ListItemIcon>
        <ListItemText primary="Sales" />
        {salesOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={salesOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <NavItem to="/sales/new" icon={<ShoppingCartIcon />} text="New Inventory Sale" />
          <NavItem to="/sales/general" icon={<StoreIcon />} text="New General Sale" />
          <NavItem to="/sales" icon={<ListAltIcon />} text="Sales History" />
        </List>
      </Collapse>
      
      <ListItemButton onClick={() => handleClick(setInventoryOpen, inventoryOpen)}>
        <ListItemIcon><InventoryIcon /></ListItemIcon>
        <ListItemText primary="Inventory" />
        {inventoryOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={inventoryOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <NavItem to="/inventory/new" icon={<AddCircleOutlineIcon />} text="Add New Product" />
          <NavItem to="/inventory" icon={<ListAltIcon />} text="Product List" />
        </List>
      </Collapse>
      
      <ListItemButton onClick={() => handleClick(setExpensesOpen, expensesOpen)}>
        <ListItemIcon><ReceiptIcon /></ListItemIcon>
        <ListItemText primary="Expenses" />
        {expensesOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={expensesOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <NavItem to="/expenses/new" icon={<AddCircleOutlineIcon />} text="Add Expense" />
          <NavItem to="/expenses" icon={<ListAltIcon />} text="Expense List" />
        </List>
      </Collapse>

      <Divider sx={{ my: 1 }} />
      
      <ListItemButton onClick={() => handleClick(setPeopleOpen, peopleOpen)}>
        <ListItemIcon><GroupIcon /></ListItemIcon>
        <ListItemText primary="People" />
        {peopleOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={peopleOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <NavItem to="/people/customers" icon={<PeopleIcon />} text="Customers" />
          <NavItem to="/people/suppliers" icon={<BusinessIcon />} text="Suppliers" />
          <NavItem to="/people/users" icon={<GroupIcon />} text="Users" />
        </List>
      </Collapse>
      
      <ListItemButton onClick={() => handleClick(setSettingsOpen, settingsOpen)}>
        <ListItemIcon><SettingsIcon /></ListItemIcon>
        <ListItemText primary="Settings" />
        {settingsOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={settingsOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <NavItem to="/settings/branches" icon={<BusinessIcon />} text="Branches" />
        </List>
      </Collapse>
    </List>
  );
};