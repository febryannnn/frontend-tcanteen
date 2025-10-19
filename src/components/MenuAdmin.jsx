import { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Box,
  Paper,
  Avatar,
  LinearProgress,
  IconButton,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function MenuAdminComponent() {
  const [dashboardData, setDashboardData] = useState({
    stats: {
      todayRevenue: 0,
      todayOrders: 0,
      totalCustomers: 0,
      totalMenus: 0,
    },
    recentOrders: [],
    popularMenus: [],
    orderStatus: {
      pending: 0,
      processing: 0,
      completed: 0,
    },
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get("/dashboard");
        setDashboardData(response.data.data || response.data);
      } catch (err) {
        console.error("Error fetching dashboard:", err);
      }
    };
    fetchDashboardData();

    const interval = setInterval(fetchDashboardData, 10000);
    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price) => {
    return `Rp ${price?.toLocaleString("id-ID") || 0}`;
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const quickStats = [
    {
      title: "Pendapatan Hari Ini",
      value: formatPrice(dashboardData.stats?.todayRevenue),
      icon: <AttachMoneyIcon />,
      color: "#4caf50",
      bgColor: "#e8f5e9",
    },
    {
      title: "Pesanan Hari Ini",
      value: dashboardData.stats?.todayOrders,
      icon: <ShoppingCartIcon />,
      color: "#2196f3",
      bgColor: "#e3f2fd",
    },
    {
      title: "Total Pelanggan",
      value: dashboardData.stats?.totalCustomers,
      icon: <PeopleIcon />,
      color: "#ff9800",
      bgColor: "#fff3e0",
    },
    {
      title: "Total Menu",
      value: dashboardData.stats?.totalMenus,
      icon: <RestaurantMenuIcon />,
      color: "#9c27b0",
      bgColor: "#f3e5f5",
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ mt: 8, mb: 8, width:"100vw" }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Selamat datang kembali! Berikut ringkasan bisnis Anda hari ini.
        </Typography>
      </Box>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {quickStats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              elevation={2}
              sx={{
                background: `linear-gradient(135deg, ${stat.bgColor} 0%, #ffffff 100%)`,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 4,
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
                      {stat.value}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: stat.color,
                      color: "white",
                    }}
                  >
                    {stat.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Recent Orders */}
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 3, height: "100%" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Pesanan Terbaru
              </Typography>
              <IconButton size="small">
                <MoreVertIcon />
              </IconButton>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {dashboardData.recentOrders?.map((order) => (
                <Box
                  key={order.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: "#f9f9f9",
                    transition: "all 0.2s",
                    "&:hover": {
                      backgroundColor: "#f0f0f0",
                      transform: "translateX(4px)",
                    },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar
                      sx={{
                        backgroundColor:
                          order.status === "Completed" ? "#4caf50" : "#ff9800",
                        width: 48,
                        height: 48,
                      }}
                    >
                      {order.status === "Completed" ? (
                        <CheckCircleIcon />
                      ) : (
                        <PendingIcon />
                      )}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        #{order.order_number || order.id}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {order.customer_name} • {order.items_count} items
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ textAlign: "right" }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {formatPrice(order.total)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formatTime(order.created_at)}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>

            {dashboardData.recentOrders?.length === 0 && (
              <Box sx={{ textAlign: "center", py: 4 }}>
                <ReceiptIcon sx={{ fontSize: 48, color: "text.secondary", mb: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Belum ada pesanan hari ini
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Order Status & Popular Menu */}
        <Grid item xs={12} md={4}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Order Status */}
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Status Pesanan
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="body2">Pending</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {dashboardData.orderStatus?.pending || 0}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(dashboardData.orderStatus?.pending / 100) * 100 || 0}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: "#fff3e0",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "#ff9800",
                      },
                    }}
                  />
                </Box>

                <Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="body2">Processing</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {dashboardData.orderStatus?.processing || 0}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(dashboardData.orderStatus?.processing / 100) * 100 || 0}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: "#e3f2fd",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "#2196f3",
                      },
                    }}
                  />
                </Box>

                <Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="body2">Completed</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {dashboardData.orderStatus?.completed || 0}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(dashboardData.orderStatus?.completed / 100) * 100 || 0}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: "#e8f5e9",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "#4caf50",
                      },
                    }}
                  />
                </Box>
              </Box>
            </Paper>

            {/* Popular Menu */}
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Menu Populer
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {dashboardData.popularMenus?.map((menu, index) => (
                  <Box
                    key={menu.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      p: 1.5,
                      borderRadius: 2,
                      backgroundColor: index === 0 ? "#fff3e0" : "#f9f9f9",
                    }}
                  >
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: index === 0 ? "#ff9800" : "#e0e0e0",
                        color: index === 0 ? "#fff" : "#000",
                        fontWeight: 700,
                        fontSize: "0.875rem",
                      }}
                    >
                      {index + 1}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {menu.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {menu.sold} terjual
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: "primary.main" }}>
                      {formatPrice(menu.revenue)}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}