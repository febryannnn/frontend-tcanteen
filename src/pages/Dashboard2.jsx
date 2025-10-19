import React, { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import OrderComponent from "../components/OrderDetails";
import MenuAdminComponent from "../components/MenuAdmin";
import SalesComponent from "../components/Sales";

export default function Dashboard2() {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <Sidebar/>
      {/* <OrderComponent/> */}
      <MenuAdminComponent/>
      {/* <SalesComponent /> */}
    </Box>
  );
}