import type { Sale, Product } from '../types';

export interface GeneralSaleData {
  client?: string;
  product: string;
  branch: string;
  paidAmount: number;
  purchasePrice: number;
  paymentMethod: string;
}

// Represents a sale record in the database
export interface SaleRecord extends Sale {
  id: string;
  date: string;
}

export const createSale = async (saleData: Sale): Promise<{ success: boolean; saleId: string }> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('Submitting Inventory Sale Data to API:', saleData);
  return { success: true, saleId: `SALE-${Date.now()}` };
};

export const createGeneralSale = async (saleData: GeneralSaleData): Promise<{ success: boolean; saleId: string }> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('Submitting General Sale Data to API:', saleData);
  return { success: true, saleId: `GSALE-${Date.now()}` };
};

export const fetchSales = async (): Promise<SaleRecord[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const dummySales: SaleRecord[] = [
    {
      id: `SALE-12345`,
      date: '2025-09-30 10:30',
      customerId: '1',
      items: [{ productId: 'prod_001', productName: 'iPhone 14 Screen', quantity: 1, salePrice: 120 }],
      totalAmount: 120,
      paidAmount: 120,
      paymentMethod: 'Card',
    },
    {
      id: `SALE-67890`,
      date: '2025-09-30 11:45',
      customerId: '2',
      items: [{ productId: 'prod_002', productName: 'Samsung S22 Battery', quantity: 2, salePrice: 70 }],
      totalAmount: 140,
      paidAmount: 140,
      paymentMethod: 'Cash',
    },
  ];
  return dummySales;
};