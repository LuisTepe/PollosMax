import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/LoginPage";
import MenuPage from "./pages/menuPage";
import { UserProvider } from "./UserProvider";
import ProductAdminPage from "./pages/admin/AdminProductPage";
import TransactionsPage from "./pages/admin/TransactionsPage";
import InventoryPage from "./pages/admin/InventoryPage";
import ReportsPage from "./pages/admin/ReportsPage";
import ProductPage from "./pages/user/ProductPage";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <>
            {/* Para todos */}
            <Route path="/menu" element={<MenuPage />} />

            {/* Solo para usuarios */}
            <Route path="/productos" element={<ProductPage />} />

            {/* Solo para admin */}
            <Route path="/admin-productos" element={<ProductAdminPage />} />
            <Route path="/transacciones" element={<TransactionsPage />} />
            <Route path="/inventario" element={<InventoryPage />} />
            <Route path="/reportes" element={<ReportsPage />} />

            <Route path="/" element={<Login />} />
          </>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
