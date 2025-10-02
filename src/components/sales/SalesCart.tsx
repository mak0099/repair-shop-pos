import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, TextField, Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSalesCartStore } from '../../store/salesCartStore';

export const SalesCart: React.FC = () => {
  const items = useSalesCartStore((state) => state.items);
  const updateItemQuantity = useSalesCartStore((state) => state.updateItemQuantity);
  const removeItem = useSalesCartStore((state) => state.removeItem);

  if (items.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center', mt: 2 }}>
        <Typography>Sales cart is empty.</Typography>
      </Paper>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="right">Subtotal</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.productId}>
              <TableCell>{item.productName}</TableCell>
              <TableCell align="right">€{item.salePrice.toFixed(2)}</TableCell>
              <TableCell align="center">
                <TextField
                  type="number"
                  size="small"
                  value={item.quantity}
                  onChange={(e) => updateItemQuantity(item.productId, parseInt(e.target.value, 10) || 1)}
                  inputProps={{ min: 1, style: { textAlign: 'center', width: '60px' } }}
                />
              </TableCell>
              <TableCell align="right">€{(item.salePrice * item.quantity).toFixed(2)}</TableCell>
              <TableCell align="center">
                <IconButton color="error" onClick={() => removeItem(item.productId)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};