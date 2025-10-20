import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Avatar,
  IconButton,
  InputBase,
  Button,
  Menu,
  MenuItem,
  Divider,
  Stack,
  Paper,
  Fade,
  alpha,
} from "@mui/material";
import {
  Search,
  FilterList,
  MoreVert,
  LocalShipping,
  CheckCircle,
  Schedule,
  Close,
  Person,
  Phone,
  LocationOn,
  CalendarToday,
  Payment,
  Receipt,
} from "@mui/icons-material";
import api from "../../services/api";

const OrderListPage = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const savedUser = JSON.parse(localStorage.getItem("user") || "{}");

  const token = localStorage.getItem("token");

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(res.data.data);
        setFilteredOrders(res.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        // Dummy data
      }
    };

    fetchOrders();
  }, []);

  // Filter and search
  useEffect(() => {
    let filtered = orders;

    if (filterStatus !== "all") {
      filtered = filtered.filter((order) => order.status === filterStatus);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (order) =>
          order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.customer.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredOrders(filtered);
  }, [searchQuery, filterStatus, orders]);

  const getStatusConfig = (status) => {
    const configs = {
      pending: {
        label: "Menunggu",
        color: "#ff9800",
        icon: Schedule,
        bgcolor: alpha("#ff9800", 0.1),
      },
      processing: {
        label: "Diproses",
        color: "#2196f3",
        icon: Receipt,
        bgcolor: alpha("#2196f3", 0.1),
      },
      delivering: {
        label: "Dikirim",
        color: "#9c27b0",
        icon: LocalShipping,
        bgcolor: alpha("#9c27b0", 0.1),
      },
      completed: {
        label: "Selesai",
        color: "#4caf50",
        icon: CheckCircle,
        bgcolor: alpha("#4caf50", 0.1),
      },
      cancelled: {
        label: "Dibatalkan",
        color: "#f44336",
        icon: Close,
        bgcolor: alpha("#f44336", 0.1),
      },
    };
    return configs[status] || configs.pending;
  };

  const handleMenuOpen = (event, order) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrder(order);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedOrder(null);
  };

  const handleStatusChange = async (newStatus) => {
    if (!selectedOrder) return;

    try {
      await fetch(`/api/orders/${selectedOrder.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      setOrders(
        orders.map((order) =>
          order.id === selectedOrder.id
            ? { ...order, status: newStatus }
            : order
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }

    handleMenuClose();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  console.log(savedUser);

  const formatDate = (dateString) => {
    const date = new Date(dateString); // buat objek Date
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const OrderCard = ({ order }) => {
    const statusConfig = getStatusConfig(order.status);
    const StatusIcon = statusConfig.icon;
    console.log(order);

    return (
      <Fade in={true}>
        <Card
          sx={{
            mb: 2,
            borderRadius: 3,
            border: "1px solid",
            borderColor: alpha("#000", 0.08),
            transition: "all 0.3s ease",
            maxWidth: "1200px",
            minWidth:"1000px",
            "&:hover": {
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              transform: "translateY(-4px)",
            },
          }}
        >
          <CardContent sx={{ p: 3 }}>
            {/* Header */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                mb: 3,
                // width: "100vw",
              }}
            >
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontFamily: "Inter, sans-serif",
                    mb: 0.5,
                  }}
                >
                  Order ID: {order.id}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CalendarToday
                    sx={{ fontSize: 14, color: "text.secondary" }}
                  />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {formatDate(order.created_at)}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Chip
                  icon={<StatusIcon sx={{ fontSize: 18 }} />}
                  label={statusConfig.label}
                  sx={{
                    bgcolor: statusConfig.bgcolor,
                    color: statusConfig.color,
                    fontWeight: 600,
                    fontFamily: "Inter, sans-serif",
                    border: `1px solid ${alpha(statusConfig.color, 0.3)}`,
                    "& .MuiChip-icon": {
                      color: statusConfig.color,
                    },
                  }}
                />
                <IconButton
                  size="small"
                  onClick={(e) => handleMenuOpen(e, order)}
                  sx={{
                    bgcolor: alpha("#000", 0.04),
                    "&:hover": { bgcolor: alpha("#000", 0.08) },
                  }}
                >
                  <MoreVert fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Customer Info */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}
                >
                  <Avatar
                    sx={{
                      bgcolor: alpha("#2196f3", 0.1),
                      width: 40,
                      height: 40,
                    }}
                  >
                    <Person sx={{ color: "#2196f3" }} />
                  </Avatar>
                  <Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 0.5, fontFamily: "Inter, sans-serif" }}
                    >
                      Customer
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 600, fontFamily: "Inter, sans-serif" }}
                    >
                      {savedUser.name}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        mt: 0.5,
                      }}
                    >
                      <Phone sx={{ fontSize: 14, color: "text.secondary" }} />
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontFamily: "Inter, sans-serif" }}
                      >
                        089506226688
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}
                >
                  <Avatar
                    sx={{
                      bgcolor: alpha("#4caf50", 0.1),
                      width: 40,
                      height: 40,
                    }}
                  >
                    <LocationOn sx={{ color: "#4caf50" }} />
                  </Avatar>
                  <Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 0.5, fontFamily: "Inter, sans-serif" }}
                    >
                      Address
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontFamily: "Inter, sans-serif", lineHeight: 1.6 }}
                    >
                      TCanteen, Informatics Engineeting, ITS
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>

            {/* Order Items */}
            <Box
              sx={{
                bgcolor: alpha("#000", 0.02),
                borderRadius: 2,
                p: 2,
                mb: 2,
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ mb: 2, fontWeight: 600, fontFamily: "Inter, sans-serif" }}
              >
                Items ({order.menus.length})
              </Typography>
              <Stack spacing={1.5}>
                {order.menus.map((item, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      p: 1.5,
                      bgcolor: "white",
                      borderRadius: 2,
                    }}
                  >
                    <Avatar
                      src={item.image_url}
                      variant="rounded"
                      sx={{ width: 50, height: 50 }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {formatCurrency(item.price)} × {item.pivot.quantity}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 700, fontFamily: "Inter, sans-serif" }}
                    >
                      {formatCurrency(item.price * item.pivot.quantity)}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>

            {/* Footer */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 0.5,
                  }}
                >
                  <Payment sx={{ fontSize: 18, color: "text.secondary" }} />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Payment
                  </Typography>
                </Box>
                {order.status === "delivering" && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Estimasi: belum ada
                  </Typography>
                )}
              </Box>
              <Box sx={{ textAlign: "right" }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontFamily: "Inter, sans-serif" }}
                >
                  Total
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: "#2196f3",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {formatCurrency(order.total_price)}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Fade>
    );
  };

  const filterButtons = [
    { value: "all", label: "Semua" },
    { value: "pending", label: "Menunggu" },
    { value: "processing", label: "Diproses" },
    { value: "delivering", label: "Dikirim" },
    { value: "completed", label: "Selesai" },
    { value: "cancelled", label: "Dibatalkan" },
  ];

  return (
    <Box
      sx={{
        bgcolor: "#f8f9fa",
        minHeight: "100vh",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          bgcolor: "white",
          borderBottom: "1px solid",
          borderColor: alpha("#000", 0.08),
          position: "sticky",
          top: 0,
          zIndex: 100,
          backdropFilter: "blur(8px)",
          bgcolor: alpha("#fff", 0.9),
        }}
      >
        <Box
          sx={{
            mx: "auto",
            px: 3,
            py: 3,
            maxWidth: "1200px", // batas lebar
            width: "100%", // biar responsif
            overflowX: "hidden",
          }}
        >
          {/* Search and Filter */}
          <Grid container spacing={2} alignItems="center">
            {/* <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              mb: 2.5,
              fontFamily: "Inter, sans-serif",
              color:"black"
            }}
          >
            Daftar Order
          </Typography> */}
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: "4px 16px",
                  display: "flex",
                  alignItems: "center",
                  boxShadow: "none",
                  border: "1px solid",
                  borderColor: alpha("#000", 0.12),
                  borderRadius: 2,
                  "&:focus-within": {
                    borderColor: "#2196f3",
                    boxShadow: `0 0 0 3px ${alpha("#2196f3", 0.1)}`,
                  },
                }}
              >
                <Search sx={{ color: "text.secondary", mr: 1 }} />
                <InputBase
                  placeholder="Cari order atau customer..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  sx={{
                    flex: 1,
                    fontFamily: "Inter, sans-serif",
                  }}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {filterButtons.map((btn) => (
                  <Button
                    key={btn.value}
                    size="small"
                    variant={
                      filterStatus === btn.value ? "contained" : "outlined"
                    }
                    onClick={() => setFilterStatus(btn.value)}
                    sx={{
                      borderRadius: 2,
                      textTransform: "none",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 600,
                      ...(filterStatus === btn.value
                        ? {
                            bgcolor: "#2196f3",
                            "&:hover": { bgcolor: "#1976d2" },
                          }
                        : {
                            borderColor: alpha("#000", 0.12),
                            color: "text.primary",
                            "&:hover": {
                              borderColor: "#2196f3",
                              bgcolor: alpha("#2196f3", 0.04),
                            },
                          }),
                    }}
                  >
                    {btn.label}
                  </Button>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // ✅ posisi tengah horizontal
          mx: "auto",
          px: 3,
          py: 3,
          // maxWidth: "1200px",
          width: "100vw",
          overflowX: "hidden",
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2, fontFamily: "Inter, sans-serif" }}
        >
          Menampilkan {filteredOrders.length} order
        </Typography>

        {filteredOrders.length === 0 ? (
          <Paper
            sx={{
              p: 6,
              textAlign: "center",
              borderRadius: 3,
              border: "1px dashed",
              borderColor: alpha("#000", 0.12),
            }}
          >
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ fontFamily: "Inter, sans-serif" }}
            >
              Tidak ada order ditemukan
            </Typography>
          </Paper>
        ) : (
          filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))
        )}
      </Box>

      {/* Status Update Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            borderRadius: 2,
            mt: 1,
            minWidth: 200,
          },
        }}
      >
        <MenuItem onClick={() => handleStatusChange("pending")}>
          <Schedule sx={{ mr: 1.5, fontSize: 20, color: "#ff9800" }} />
          <Typography sx={{ fontFamily: "Inter, sans-serif" }}>
            Menunggu
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange("processing")}>
          <Receipt sx={{ mr: 1.5, fontSize: 20, color: "#2196f3" }} />
          <Typography sx={{ fontFamily: "Inter, sans-serif" }}>
            Diproses
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange("delivering")}>
          <LocalShipping sx={{ mr: 1.5, fontSize: 20, color: "#9c27b0" }} />
          <Typography sx={{ fontFamily: "Inter, sans-serif" }}>
            Dikirim
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange("completed")}>
          <CheckCircle sx={{ mr: 1.5, fontSize: 20, color: "#4caf50" }} />
          <Typography sx={{ fontFamily: "Inter, sans-serif" }}>
            Selesai
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => handleStatusChange("cancelled")}
          sx={{ color: "#f44336" }}
        >
          <Close sx={{ mr: 1.5, fontSize: 20 }} />
          <Typography sx={{ fontFamily: "Inter, sans-serif" }}>
            Batalkan
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default OrderListPage;
