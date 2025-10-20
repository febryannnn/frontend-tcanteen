import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Order from "./pages/Order";
import AdminDashboard from "./pages/Dashboard";
import { UserProvider } from "./components/UserContext";
import MenuPage from "./pages/MenuAdmin"
import OrderPageAdmin from "./pages/OrderAdmin";
import OrderListPage from "./pages/Order";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/dashboardmenu" element={<MenuPage />} />
          <Route path="/dashboard/order" element={<OrderPageAdmin />} />
          <Route path="/order" element={<OrderListPage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
