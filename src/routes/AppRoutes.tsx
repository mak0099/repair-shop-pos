import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import DashboardPage from '../pages/dashboard/DashboardPage';
import RepairListPage from '../pages/repairs/RepairListPage';
import AddRepairPage from '../pages/repairs/AddRepairPage';
import EditRepairPage from '../pages/repairs/EditRepairPage';
import NewSalePage from '../pages/sales/NewSalePage';
import GeneralSalePage from '../pages/sales/GeneralSalePage';
import SalesHistoryPage from '../pages/sales/SalesHistoryPage';
import ProductListPage from '../pages/inventory/ProductListPage';
import AddProductPage from '../pages/inventory/AddProductPage';
import EditProductPage from '../pages/inventory/EditProductPage';
import CustomerListPage from '../pages/people/CustomerListPage';
import SupplierListPage from '../pages/people/SupplierListPage';
import UserListPage from '../pages/people/UserListPage';
import AddExpensePage from '../pages/expenses/AddExpensePage';
import ExpenseListPage from '../pages/expenses/ExpenseListPage';
import SettingsPage from '../pages/settings/SettingsPage';
import BranchesPage from '../pages/settings/BranchesPage';
import DeviceModelsPage from '../pages/settings/DeviceModelsPage';

const Placeholder = ({ title }: { title: string }) => <h2>{title} Page</h2>;

export const AppRoutes = () => {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        {/* Dashboard */}
        <Route path="/" element={<DashboardPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* Repairs */}
        <Route path="/repairs" element={<RepairListPage />} />
        <Route path="/repairs/new" element={<AddRepairPage />} />
        <Route path="/repairs/:id" element={<EditRepairPage />} />

        {/* Sales */}
        <Route path="/sales" element={<SalesHistoryPage />} />
        <Route path="/sales/new" element={<NewSalePage />} />
        <Route path="/sales/general" element={<GeneralSalePage />} />

        {/* Inventory */}
        <Route path="/inventory" element={<ProductListPage />} />
        <Route path="/inventory/new" element={<AddProductPage />} />
        <Route path="/inventory/:id" element={<EditProductPage />} />
        
        {/* People */}
        <Route path="/people/customers" element={<CustomerListPage />} />
        <Route path="/people/suppliers" element={<SupplierListPage />} />
        <Route path="/people/users" element={<UserListPage />} />

        {/* Expenses */}
        <Route path="/expenses" element={<ExpenseListPage />} />
        <Route path="/expenses/new" element={<AddExpensePage />} />

        {/* Settings */}
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/settings/branches" element={<BranchesPage />} />
        <Route path="/settings/device-models" element={<DeviceModelsPage />} />
        
        {/* Fallback Route */}
        <Route path="*" element={<Placeholder title="404 Not Found" />} />
      </Routes>
    </>
  );
};