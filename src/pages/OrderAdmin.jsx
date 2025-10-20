import { React, useContext, useEffect } from "react";
import MainLayout from "../layout/MainLayoutAdmin";
import MenuCardAdmin from "../components/MenuAdminCard";
import Dashboard from "../components/OrderDetailsAdmin";
import { UserContext } from "../components/UserContext";
import { useNavigate } from "react-router-dom";

export default function OrderPageAdmin() {
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();
  
    useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      console.log("tes")
      setUser(JSON.parse(storedUser));
    }
  }, []);

  
//   useEffect(() => {
//     console.log(user);
  
//     if (!user) {
//       navigate("/login");
//       return;
//     }

//     if (user.role !== "admin") {
//       navigate("/");
//     }
//   }, [user, navigate]);

  return (
    <MainLayout>
      <Dashboard/>
    </MainLayout>
  );
}
