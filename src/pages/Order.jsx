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
  Dialog,
  Paper,
  Fade,
  Collapse,
  alpha,
  DialogTitle,
  DialogContent,
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
  ExpandMore,
  ExpandLess,
} from "@mui/icons-material";
import api from "../../services/api";

const OrderListPage = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const token = localStorage.getItem("token");
  const [openDialog, setOpenDialog] = useState(false);

  // Dummy data for demo
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
        console.log(res.data.data);
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
      filtered = filtered.filter(
        (order) => order.status.toLowerCase() === filterStatus.toLowerCase()
      );
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          savedUser.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredOrders(filtered);
  }, [searchQuery, filterStatus, orders]);

  const getStatusConfig = (status) => {
    const configs = {
      Pending: {
        label: "Menunggu",
        color: "#ff9800",
        icon: Schedule,
        bgcolor: alpha("#ff9800", 0.1),
      },
      Processing: {
        label: "Diproses",
        color: "#2196f3",
        icon: Receipt,
        bgcolor: alpha("#2196f3", 0.1),
      },
      Completed: {
        label: "Selesai",
        color: "#4caf50",
        icon: CheckCircle,
        bgcolor: alpha("#4caf50", 0.1),
      },
      Cancelled: {
        label: "Dibatalkan",
        color: "#f44336",
        icon: Close,
        bgcolor: alpha("#f44336", 0.1),
      },
    };
    return configs[status] || configs.pending;
  };

  const handleMenuOpen = (event, order) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedOrder(order);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedOrder(null);
  };

  const handleStatusChange = async (newStatus) => {
    if (!selectedOrder) return;

    setOrders(
      orders.map((order) =>
        order.id === selectedOrder.id ? { ...order, status: newStatus } : order
      )
    );

    handleMenuClose();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const toggleExpand = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const OrderCard = ({ order }) => {
    const statusConfig = getStatusConfig(order.status);
    const StatusIcon = statusConfig.icon;
    const isExpanded = expandedOrderId === order.id;

    // --- Tambahan: state dan handler untuk menu titik tiga ---
    // const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
      event.stopPropagation();
      setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
    };

    const handleCancelClick = () => {
      handleMenuClose();
      // 👉 logika cancel order taruh di sini
      // misal: handleCancelOrder(order.id)
    };

    return (
      <Fade in={true}>
        <Card
          sx={{
            mb: 2,
            borderRadius: 3,
            border: "1px solid",
            borderColor: alpha("#000", 0.08),
            transition: "all 0.3s ease",
            width: "100%",
            cursor: "pointer",
            "&:hover": {
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              transform: "translateY(-2px)",
            },
          }}
          onClick={() => toggleExpand(order.id)}
        >
          <CardContent sx={{ p: 3 }}>
            {/* Preview Header */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}
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
                    ORD-{order.id}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
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
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {formatTime(order.created_at)}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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

                <Chip
                  icon={<StatusIcon sx={{ fontSize: 18 }} />}
                  label={order.status}
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

                {/* --- Titik tiga (menu) --- */}
                {/* <IconButton
                  size="small"
                  onClick={handleMenuOpen}
                  sx={{
                    bgcolor: alpha("#000", 0.04),
                    "&:hover": { bgcolor: alpha("#000", 0.08) },
                  }}
                >
                  <MoreVert fontSize="small" />
                </IconButton> */}

                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    setAnchorEl(e.currentTarget);
                    setOpenDialog(true);
                  }}
                  sx={{ ml: "auto" }}
                >
                  <MoreVert />
                </IconButton>

                {/* Popup Dialog di tengah */}
                <Dialog
                  open={openDialog}
                  onClose={() => setOpenDialog(false)}
                  onClick={(e) => e.stopPropagation()}
                  PaperProps={{
                    sx: {
                      borderRadius: 3,
                      boxShadow:"none",
                      p: 3,
                      width: "100%",
                      maxWidth: 400,
                    },
                  }}
                  BackdropProps={{
                    sx: {
                      backgroundColor: "rgba(0, 0, 0, 0.2)",
                    },
                  }}
                >
                  <DialogTitle
                    sx={{
                      fontWeight: 600,
                      fontFamily: "Inter, sans-serif",
                      textAlign: "center",
                    }}
                  >
                    Pilihan Order
                  </DialogTitle>

                  <DialogContent>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      textAlign="center"
                      mb={3}
                    >
                      Pilih tindakan untuk order ini.
                    </Typography>

                    {(order.status === "Pending" ||
                      order.status === "Processing") && (
                      <Button
                        variant="contained"
                        color="error"
                        fullWidth
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCancelOrder(e);
                          setOpenDialog(false);
                        }}
                        sx={{
                          textTransform: "none",
                          fontWeight: 600,
                          borderRadius: 2,
                          mb: 1.5,
                        }}
                      >
                        Batalkan Order
                      </Button>
                    )}

                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => setOpenDialog(false)}
                      sx={{
                        textTransform: "none",
                        fontWeight: 600,
                        borderRadius: 1,
                      }}
                    >
                      Tutup
                    </Button>
                  </DialogContent>
                </Dialog>

                <IconButton size="small">
                  {isExpanded ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              </Box>
            </Box>

            {/* Expanded Details tetap sama */}
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
              {/* ... semua detail customer, items, dan payment di sini seperti punyamu ... */}
            </Collapse>
          </CardContent>
        </Card>
      </Fade>
    );
  };

  const filterButtons = [
    { value: "all", label: "Semua" },
    { value: "pending", label: "Menunggu" },
    { value: "processing", label: "Diproses" },
    { value: "completed", label: "Selesai" },
    { value: "cancelled", label: "Dibatalkan" },
  ];

  return (
    <Box
      sx={{
        bgcolor: "#f8f9fa",
        minHeight: "100vh",
        fontFamily: "Inter, sans-serif",
        width: "100vw",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          borderBottom: "1px solid",
          borderColor: alpha("#000", 0.08),
          position: "sticky",
          top: 0,
          zIndex: 100,
          backdropFilter: "blur(8px)",
          bgcolor: alpha("#fff", 0.9),
          width: "100%",
        }}
      >
        <Box
          sx={{
            mx: "auto",
            px: 3,
            py: 3,
            maxWidth: "1200px",
            width: "100%",
          }}
        >
          <Grid container spacing={2} alignItems="center">
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
                    color={filterStatus === btn.value ? "primary" : "inherit"}
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
          alignItems: "center",
          mx: "auto",
          px: 3,
          py: 3,
          maxWidth: "1200px",
          width: "100%",
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
    </Box>
  );
};

export default OrderListPage;
