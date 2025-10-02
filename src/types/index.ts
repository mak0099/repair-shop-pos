export interface Job {
  id: string;
  acceptanceNumber: string;
  customer: Customer;
  createdDate: string;
  deviceType: string;
  brand: string;
  model: string;
  currentStatus: string;
  technician: User;
  createdBy: User;
  deliveryDate: string | null;
  estimatedPrice: number;
  workProgressNotes?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
}

export interface User {
  id: string;
  name: string;
  branch: string;
  roles?: string[];
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson?: string;
  phone: string;
  email?: string;
}

export interface Branch {
    id: string;
    name: string;
    address: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  brand?: string;
  model?: string;
  condition?: string;
  purchasePrice: number;
  desktopPrice: number;
  onlinePrice: number;
  stock: number;
}

export interface SaleItem {
  productId: string;
  productName: string;
  quantity: number;
  salePrice: number;
}

export interface Sale {
  customerId: string;
  items: SaleItem[];
  totalAmount: number;
  paidAmount: number;
  paymentMethod: string;
}

export interface Expense {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
}

export interface SparePart {
  id?: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface RepairFormData extends Partial<Omit<Job, 'sparePartsUsed'>> {
  isPinUnlock: 'yes' | 'no';
  pinUnlockNumber?: string;
  isUrgent: 'yes' | 'no';
  urgentDate?: string;
  sparePartsUsed?: SparePart[];
}