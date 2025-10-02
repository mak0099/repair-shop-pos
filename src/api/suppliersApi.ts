import type { Supplier } from '../types';

export const fetchSuppliers = async (): Promise<Supplier[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const dummySuppliers: Supplier[] = [
    { id: 'sup1', name: 'Global Parts Inc.', contactPerson: 'John Doe', phone: '111-222-3333', email: 'john@global.com' },
    { id: 'sup2', name: 'EU Screens', contactPerson: 'Jane Smith', phone: '444-555-6666', email: 'jane@euscreens.com' },
  ];

  return dummySuppliers;
};