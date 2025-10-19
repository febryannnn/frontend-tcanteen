import { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Box,
  Paper,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function SalesComponent() {
  const [salesData, setSalesData] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    averageOrder: 0,
    growthRate: 0,
    topProducts: [],
    recentSales: [],
  });
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState("today");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await api.get(`/sales?period=${selectedPeriod}`);
        setSalesData(response.data.data || response.data);
      } catch (err) {
        console.error("Error fetching sales:", err);
      }
    };
    fetchSalesData();

    const interval = setInterval(fetchSalesData, 10000);
    return () => clearInterval(interval);
  }, [selectedPeriod]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handlePeriodChange = (event) => {
    setSelectedPeriod(event.target.value);
  };

  const formatPrice = (price) => {
    return `Rp ${price?.toLocaleString("id-ID") || 0}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const statCards = [
    {
      title: "Total Pendapatan",
      value: formatPrice(salesData.totalRevenue),
      icon: <AttachMoneyIcon sx={{ fontSize: 40 }} />,
      color: "#4caf50",
      growth: salesData.growthRate,
    },
    {
      title: "Total Pesanan",
      value: salesData.totalOrders,
      icon: <ReceiptIcon sx={{ fontSize: 40 }} />,
      color: "#2196f3",
      growth: 12,
    },
    {
      title: "Total Pelanggan",
      value: salesData.totalCustomers,
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      color: "#ff9800",
      growth: 8,
    },
    {
      title: "Rata-rata Order",
      value: formatPrice(salesData.averageOrder),
      icon: <ShoppingCartIcon sx={{ fontSize: 40 }} />,
      color: "#9c27b0",
      growth: 5,
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ mb: 8, width:"100vw" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Laporan Penjualan
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Monitor performa penjualan Anda
          </Typography>
        </Box>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Periode</InputLabel>
          <Select value={selectedPeriod} onChange={handlePeriodChange} label="Periode">
            <MenuItem value="today">Hari Ini</MenuItem>
            <MenuItem value="week">Minggu Ini</MenuItem>
            <MenuItem value="month">Bulan Ini</MenuItem>
            <MenuItem value="year">Tahun Ini</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statCards.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              elevation={2}
              sx={{
                height: "100%",
                background: `linear-gradient(135deg, ${stat.color}15 0%, ${stat.color}05 100%)`,
                border: `1px solid ${stat.color}30`,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 4,
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {stat.title}
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      {stat.value}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: `${stat.color}20`,
                      color: stat.color,
                    }}
                  >
                    {stat.icon}
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {stat.growth >= 0 ? (
                    <TrendingUpIcon sx={{ color: "#4caf50", fontSize: 20 }} />
                  ) : (
                    <TrendingDownIcon sx={{ color: "#f44336", fontSize: 20 }} />
                  )}
                  <Typography
                    variant="body2"
                    sx={{
                      color: stat.growth >= 0 ? "#4caf50" : "#f44336",
                      fontWeight: 600,
                    }}
                  >
                    {stat.growth >= 0 ? "+" : ""}
                    {stat.growth}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    dari periode sebelumnya
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          sx={{
            "& .MuiTab-root": {
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 500,
            },
          }}
        >
          <Tab label="Produk Terlaris" />
          <Tab label="Transaksi Terbaru" />
        </Tabs>
      </Box>

      {/* Top Products Table */}
      {selectedTab === 0 && (
        <TableContainer component={Paper} elevation={2}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell sx={{ fontWeight: 700 }}>Rank</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Nama Produk</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="center">
                  Terjual
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="right">
                  Pendapatan
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="center">
                  Kategori
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {salesData.topProducts?.map((product, index) => (
                <TableRow
                  key={product.id}
                  sx={{
                    "&:hover": { backgroundColor: "#f9f9f9" },
                    transition: "background-color 0.2s",
                  }}
                >
                  <TableCell>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor:
                          index === 0
                            ? "#ffd700"
                            : index === 1
                            ? "#c0c0c0"
                            : index === 2
                            ? "#cd7f32"
                            : "#e0e0e0",
                        fontWeight: 700,
                        color: index < 3 ? "#fff" : "#000",
                      }}
                    >
                      {index + 1}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{product.name}</TableCell>
                  <TableCell align="center">{product.sold} unit</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600, color: "primary.main" }}>
                    {formatPrice(product.revenue)}
                  </TableCell>
                  <TableCell align="center">
                    <Box
                      sx={{
                        display: "inline-block",
                        px: 2,
                        py: 0.5,
                        borderRadius: 1,
                        backgroundColor: "#e3f2fd",
                        color: "#1976d2",
                        fontSize: "0.875rem",
                        fontWeight: 600,
                      }}
                    >
                      {product.category}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Recent Sales Table */}
      {selectedTab === 1 && (
        <TableContainer component={Paper} elevation={2}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell sx={{ fontWeight: 700 }}>ID Transaksi</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Tanggal</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Pelanggan</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="center">
                  Items
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="right">
                  Total
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="center">
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {salesData.recentSales?.map((sale) => (
                <TableRow
                  key={sale.id}
                  sx={{
                    "&:hover": { backgroundColor: "#f9f9f9" },
                    transition: "background-color 0.2s",
                  }}
                >
                  <TableCell sx={{ fontWeight: 500 }}>
                    #{sale.order_number || sale.id}
                  </TableCell>
                  <TableCell>{formatDate(sale.date)}</TableCell>
                  <TableCell>{sale.customer_name}</TableCell>
                  <TableCell align="center">{sale.items_count}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600, color: "primary.main" }}>
                    {formatPrice(sale.total)}
                  </TableCell>
                  <TableCell align="center">
                    <Box
                      sx={{
                        display: "inline-block",
                        px: 2,
                        py: 0.5,
                        borderRadius: 1,
                        backgroundColor:
                          sale.status === "Completed"
                            ? "#e8f5e9"
                            : sale.status === "Processing"
                            ? "#e3f2fd"
                            : "#fff3e0",
                        color:
                          sale.status === "Completed"
                            ? "#2e7d32"
                            : sale.status === "Processing"
                            ? "#1976d2"
                            : "#f57c00",
                        fontSize: "0.875rem",
                        fontWeight: 600,
                      }}
                    >
                      {sale.status}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Empty State */}
      {((selectedTab === 0 && salesData.topProducts?.length === 0) ||
        (selectedTab === 1 && salesData.recentSales?.length === 0)) && (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <ReceiptIcon sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            Tidak ada data penjualan
          </Typography>
        </Box>
      )}
    </Container>
  );
}