# Create root directory structure
$directories = @(
    "src/api",
    "src/assets",
    "src/components/common",
    "src/components/layout",
    "src/components/dashboard",
    "src/components/repairs",
    "src/components/sales",
    "src/hooks",
    "src/pages/auth",
    "src/pages/dashboard",
    "src/pages/repairs",
    "src/pages/sales",
    "src/pages/inventory",
    "src/pages/people",
    "src/pages/expenses",
    "src/pages/settings",
    "src/routes",
    "src/store",
    "src/types",
    "src/utils"
)

foreach ($dir in $directories) {
    New-Item -Path "my-shop-app/$dir" -ItemType Directory -Force
}

# Create empty files
$files = @(
    "src/api/apiClient.ts",
    "src/api/authApi.ts",
    "src/api/customersApi.ts",
    "src/api/productsApi.ts",
    "src/api/repairsApi.ts",
    "src/api/salesApi.ts",
    "src/components/common/ConfirmDialog.tsx",
    "src/components/common/DataTable.tsx",
    "src/components/common/DatePicker.tsx",
    "src/components/common/SearchableDropdown.tsx",
    "src/components/layout/AppLayout.tsx",
    "src/components/layout/Sidebar.tsx",
    "src/components/layout/Topbar.tsx",
    "src/components/dashboard/MetricCard.tsx",
    "src/components/dashboard/MyJobsTable.tsx",
    "src/components/repairs/RepairForm.tsx",
    "src/components/repairs/SparePartsManager.tsx",
    "src/components/sales/ProductSearchInput.tsx",
    "src/components/sales/SalesCart.tsx",
    "src/components/sales/OrderSummary.tsx",
    "src/hooks/useAuth.ts",
    "src/pages/auth/LoginPage.tsx",
    "src/pages/dashboard/DashboardPage.tsx",
    "src/pages/repairs/AddRepairPage.tsx",
    "src/pages/repairs/EditRepairPage.tsx",
    "src/pages/repairs/RepairListPage.tsx",
    "src/pages/sales/GeneralSalePage.tsx",
    "src/pages/sales/NewSalePage.tsx",
    "src/pages/sales/SalesHistoryPage.tsx",
    "src/pages/inventory/AddProductPage.tsx",
    "src/pages/inventory/EditProductPage.tsx",
    "src/pages/inventory/ProductListPage.tsx",
    "src/pages/inventory/CategoriesPage.tsx",
    "src/pages/people/CustomerListPage.tsx",
    "src/pages/people/SupplierListPage.tsx",
    "src/pages/people/UserListPage.tsx",
    "src/pages/expenses/AddExpensePage.tsx",
    "src/pages/expenses/ExpenseListPage.tsx",
    "src/pages/settings/BranchesPage.tsx",
    "src/pages/settings/DeviceModelsPage.tsx",
    "src/pages/settings/SettingsPage.tsx",
    "src/routes/AppRoutes.tsx",
    "src/store/authStore.ts",
    "src/store/salesCartStore.ts",
    "src/types/index.ts",
    "src/utils/formatters.ts",
    "src/App.tsx",
    "src/main.tsx",
    "src/index.css"
)

foreach ($file in $files) {
    New-Item -Path "my-shop-app/$file" -ItemType File -Force
}