import type { Customer } from '../types';

export const fetchCustomers = async (): Promise<Customer[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const dummyCustomers: Customer[] = [
    { id: '1', name: 'RAFAELLA', phone: '12345' },
    { id: '2', name: 'GIULIANO PALESTRA', phone: '67890' },
    { id: '3', name: 'DANIELA', phone: '54321' },
  ];

  return dummyCustomers;
};