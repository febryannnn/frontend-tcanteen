import { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  Box,
  Tabs,
  Tab,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CancelIcon from "@mui/icons-material/Cancel";
import VisibilityIcon from "@mui/icons-material/Visibility";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function OrderComponent() {
  const [orders, setOrders] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get("/orders");
        setOrders(response.data.data || response.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    fetchOrders();

    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  const orderStatuses = ["All", "Pending", "Processing", "Completed", "Cancelled"];

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleViewDetail = (order) => {
    setSelectedOrder(order);
    setOpenDialog(true);
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await api.patch(
        `/orders/${orderId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      const response = await api.get("/orders");
      setOrders(response.data.data || response.data);
      setOpenDialog(false);
    } catch (err) {
      console.error("Error updating order:", err);
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return <PendingIcon />;
      case "processing":
        return <LocalShippingIcon />;
      case "completed":
        return <CheckCircleIcon />;
      case "cancelled":
        return <CancelIcon />;
      default:
        return <ShoppingCartIcon />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "warning";
      case "processing":
        return "info";
      case "completed":
        return "success";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (selectedTab === 0) return true;
    return order.status?.toLowerCase() === orderStatuses[selectedTab].toLowerCase();
  });

  const formatPrice = (price) => {
    return `Rp ${price?.toLocaleString("id-ID") || 0}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 8, mb: 8 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Order Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Kelola semua pesanan pelanggan
        </Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          sx={{
            "& .MuiTab-root": {
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 500,
              minWidth: 120,
            },
          }}
        >
          {orderStatuses.map((status, index) => (
            <Tab key={index} label={status} />
          ))}
        </Tabs>
      </Box>

      <Grid container spacing={3}>
        {filteredOrders.map((order) => (
          <Grid item xs={12} sm={6} md={4} key={order.id}>
            <Card
              elevation={2}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 4,
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    #{order.order_number || order.id}
                  </Typography>
                  <Chip
                    icon={getStatusIcon(order.status)}
                    label={order.status || "Pending"}
                    color={getStatusColor(order.status)}
                    size="small"
                    sx={{ fontWeight: 600 }}
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Pelanggan
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {order.customer_name || "Guest"}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Total Item
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {order.items?.length || 0} item
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Total Harga
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: "primary.main" }}
                  >
                    {formatPrice(order.total_price)}
                  </Typography>
                </Box>

                <Typography variant="caption" color="text.secondary">
                  {formatDate(order.created_at || new Date())}
                </Typography>

                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<VisibilityIcon />}
                  onClick={() => handleViewDetail(order)}
                  sx={{ mt: 2 }}
                >
                  Lihat Detail
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredOrders.length === 0 && (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <ShoppingCartIcon sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            Tidak ada pesanan
          </Typography>
        </Box>
      )}

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Detail Pesanan #{selectedOrder?.order_number || selectedOrder?.id}
            </Typography>
            <Chip
              icon={getStatusIcon(selectedOrder?.status)}
              label={selectedOrder?.status || "Pending"}
              color={getStatusColor(selectedOrder?.status)}
              sx={{ fontWeight: 600 }}
            />
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Informasi Pelanggan
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {selectedOrder?.customer_name || "Guest"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {selectedOrder?.customer_phone || "-"}
            </Typography>
          </Box>

          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Item Pesanan
          </Typography>
          <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Nama Item</TableCell>
                  <TableCell align="center">Jumlah</TableCell>
                  <TableCell align="right">Harga</TableCell>
                  <TableCell align="right">Subtotal</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedOrder?.items?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell align="center">{item.quantity}</TableCell>
                    <TableCell align="right">{formatPrice(item.price)}</TableCell>
                    <TableCell align="right">
                      {formatPrice(item.price * item.quantity)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Total
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700, color: "primary.main" }}>
              {formatPrice(selectedOrder?.total_price)}
            </Typography>
          </Box>

          <Typography variant="caption" color="text.secondary">
            Dibuat: {formatDate(selectedOrder?.created_at || new Date())}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Tutup</Button>
          {selectedOrder?.status?.toLowerCase() === "pending" && (
            <>
              <Button
                onClick={() => handleUpdateStatus(selectedOrder.id, "Processing")}
                color="info"
                variant="contained"
              >
                Proses
              </Button>
              <Button
                onClick={() => handleUpdateStatus(selectedOrder.id, "Cancelled")}
                color="error"
              >
                Batalkan
              </Button>
            </>
          )}
          {selectedOrder?.status?.toLowerCase() === "processing" && (
            <Button
              onClick={() => handleUpdateStatus(selectedOrder.id, "Completed")}
              color="success"
              variant="contained"
            >
              Selesai
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Container>
  );
}