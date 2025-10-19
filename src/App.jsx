import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Order from "./pages/Order";
import AdminDashboard from "./pages/Dashboard";
import Dashboard2 from "./pages/Dashboard2";
import { UserProvider } from "./components/UserContext";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard2 />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
