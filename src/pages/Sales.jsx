import { React, useContext, useEffect } from "react";
import MainLayout from "../layout/MainLayoutAdmin";
import MenuCardAdmin from "../components/MenuAdminCard";
import SalesAnalytics from "../components/Sales";
import { UserContext } from "../components/UserContext";
import { useNavigate } from "react-router-dom";

export default function SalesPageAdmin() {
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();
  
    useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      console.log("tes")
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <MainLayout>
      <SalesAnalytics/>
    </MainLayout>
  );
}
