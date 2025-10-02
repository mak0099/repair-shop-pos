import React, { useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import type { Control } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { Box, Typography, Autocomplete, TextField, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchProducts } from '../../api/productsApi';
import type { Product, RepairFormData, SparePart } from '../../types';

interface SparePartsManagerProps {
  control: Control<RepairFormData>;
}

export const SparePartsManager: React.FC<SparePartsManagerProps> = ({ control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'sparePartsUsed',
  });

  const { data: products = [], isLoading: isLoadingProducts } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  const handleAddPart = () => {
    if (selectedProduct && quantity > 0) {
      const newPart: SparePart = {
        productId: selectedProduct.id,
        productName: selectedProduct.name,
        quantity: quantity,
        price: selectedProduct.desktopPrice,
      };
      append(newPart);
      setSelectedProduct(null);
      setQuantity(1);
    }
  };
  
  const typedFields = fields as SparePart[];
  const totalPartsCost = typedFields.reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Spare Parts Used</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Autocomplete
          fullWidth
          options={products}
          getOptionLabel={(option) => `${option.name} (Stock: ${option.stock})`}
          value={selectedProduct}
          onChange={(event, newValue) => setSelectedProduct(newValue)}
          loading={isLoadingProducts}
          renderInput={(params) => <TextField {...params} label="Search Spare Part" />}
        />
        <TextField
          type="number"
          label="Qty"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          sx={{ width: '100px' }}
          inputProps={{ min: 1 }}
        />
        <IconButton color="primary" onClick={handleAddPart}>
          <AddCircleIcon />
        </IconButton>
      </Box>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Qty</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {typedFields.map((field, index) => (
              <TableRow key={field.id}>
                <TableCell>{field.productName}</TableCell>
                <TableCell align="right">{field.quantity}</TableCell>
                <TableCell align="right">€{field.price?.toFixed(2)}</TableCell>
                <TableCell align="right">€{( (field.price || 0) * (field.quantity || 0) ).toFixed(2)}</TableCell>
                <TableCell align="center">
                  <IconButton size="small" color="error" onClick={() => remove(index)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3} align="right"><Typography fontWeight="bold">Total</Typography></TableCell>
              <TableCell align="right"><Typography fontWeight="bold">€{totalPartsCost.toFixed(2)}</Typography></TableCell>
              <TableCell />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};