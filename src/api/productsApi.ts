import type { Product } from '../types';

export const fetchProducts = async (): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const dummyProducts: Product[] = [
    { id: 'prod_001', sku: 'SKU001', name: 'iPhone 14 Screen', category: 'Spare Parts', purchasePrice: 50, desktopPrice: 120, onlinePrice: 110, stock: 15 },
    { id: 'prod_002', sku: 'SKU002', name: 'Samsung S22 Battery', category: 'Spare Parts', purchasePrice: 25, desktopPrice: 70, onlinePrice: 65, stock: 30 },
  ];
  return dummyProducts;
};

export const fetchProductById = async (id: string): Promise<Product | undefined> => {
  console.log(`Fetching product with ID: ${id}`);
  await new Promise(resolve => setTimeout(resolve, 500));
  const products = await fetchProducts();
  return products.find(p => p.id === id);
};

export const createProduct = async (data: Partial<Product>): Promise<Product> => {
  console.log('Creating new product with data:', data);
  await new Promise(resolve => setTimeout(resolve, 1000));
  const newProduct: Product = {
    ...data,
    id: `prod_${Date.now()}`,
    sku: `SKU${Date.now()}`,
  } as Product;
  return newProduct;
};

export const updateProduct = async (id: string, data: Partial<Product>): Promise<Product> => {
  console.log(`Updating product ${id} with data:`, data);
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { ...data, id } as Product;
};