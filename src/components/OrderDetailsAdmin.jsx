import React, { useState, useEffect} from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Badge
} from '@mui/material';
import {
  Search,
  Notifications,
  ShoppingCart,
  AccessTime,
  CheckCircle,
  Restaurant
} from '@mui/icons-material';
import api from "../../services/api"

const Dashboard = () => {
  const [orderStats] = useState({
    pending: { count: 12, change: '+3', color: '#ff9800' },
    processing: { count: 8, change: '+2', color: '#2196f3' },
    completed: { count: 45, change: '+15', color: '#4caf50' }
  });

  const [menuItems, setMenuItems] = useState([])
  const token = localStorage.getItem("token")
  console.log(token)

  useEffect(() => {
    const fetchMenu =  async () => {
      try {
        const res = await api.get("/orders",{
          headers: {
          Authorization: `bearer ${token}`,
        },
        });
        setMenuItems(res)
        console.log("yeyeye berhasil")
        console.log(res)
        
      } catch (error) {
        console.log(error)
        console.log("yah gagal")
      }
    }
    fetchMenu()
  }, []);

  const [orders] = useState({
    pending: [
      { id: '#ORD001', food: 'Nasi Goreng Special', qty: 2, customer: 'Ahmad Rizki', time: '10:30', price: 'Rp 50.000' },
      { id: '#ORD002', food: 'Mie Ayam Bakso', qty: 1, customer: 'Siti Aminah', time: '10:35', price: 'Rp 25.000' },
      { id: '#ORD003', food: 'Ayam Geprek + Es Teh', qty: 3, customer: 'Budi Santoso', time: '10:40', price: 'Rp 75.000' },
      { id: '#ORD004', food: 'Soto Ayam', qty: 1, customer: 'Dewi Lestari', time: '10:42', price: 'Rp 20.000' }
    ],
    processing: [
      { id: '#ORD005', food: 'Rendang + Nasi Putih', qty: 2, customer: 'Eko Prasetyo', time: '10:15', price: 'Rp 80.000' },
      { id: '#ORD006', food: 'Gado-gado', qty: 1, customer: 'Fitri Handayani', time: '10:20', price: 'Rp 18.000' },
      { id: '#ORD007', food: 'Bakso Urat Jumbo', qty: 2, customer: 'Hendra Wijaya', time: '10:25', price: 'Rp 60.000' }
    ],
    completed: [
      { id: '#ORD008', food: 'Nasi Padang', qty: 1, customer: 'Rina Susanti', time: '09:50', price: 'Rp 35.000' },
      { id: '#ORD009', food: 'Sate Ayam 20 Tusuk', qty: 1, customer: 'Joko Widodo', time: '09:45', price: 'Rp 45.000' },
      { id: '#ORD010', food: 'Es Campur + Pisang Goreng', qty: 2, customer: 'Maya Sari', time: '09:40', price: 'Rp 30.000' },
      { id: '#ORD011', food: 'Rawon Daging', qty: 1, customer: 'Agus Salim', time: '09:35', price: 'Rp 28.000' }
    ]
  });

  const StatCard = ({ title, count, change, color, icon: Icon }) => (
    <Card sx={{ height: '100%', boxShadow: 3, borderRadius: 2, width:"100%"}}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: 'space-between', alignItems: 'flex-start', minWidth:"328px", width:"100%" }}>
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 'bold', my: 1 }}>
              {count}
            </Typography>
            <Chip 
              label={change} 
              size="small" 
              sx={{ 
                bgcolor: `${color}20`,
                color: color,
                fontWeight: 'bold',
                fontSize: '0.75rem',
                fontFamily: "Poppins, sans-serif"
              }} 
            />
          </Box>
          <Avatar sx={{ bgcolor: `${color}20`, width: 56, height: 56 }}>
            <Icon sx={{ color: color, fontSize: 30 }} />
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );

  const OrderTable = ({ title, orders, status, color }) => (
    <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Restaurant sx={{ color: color, mr: 1 }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
          <Chip 
            label={orders.length} 
            size="small" 
            sx={{ ml: 1, bgcolor: `${color}20`, color: color, fontWeight: 'bold' }} 
          />
        </Box>
        <TableContainer>
          <Table sx={{ tableLayout: 'fixed', width: '100%' }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5', width: '12%' }}>Order ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5', width: '25%' }}>Makanan</TableCell>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5', width: '8%' }}>Qty</TableCell>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5', width: '20%' }}>Customer</TableCell>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5', width: '15%' }}>Waktu</TableCell>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5', width: '20%' }}>Harga</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order, idx) => (
                <TableRow 
                  key={idx}
                  sx={{ '&:hover': { bgcolor: '#fafafa' } }}
                >
                  <TableCell sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: color }}>
                      {order.id}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {order.food}
                  </TableCell>
                  <TableCell>
                    <Chip label={`${order.qty}x`} size="small" />
                  </TableCell>
                  <TableCell sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {order.customer}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AccessTime sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                      {order.time}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>{order.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ 
      bgcolor: '#f5f7fa', 
      minHeight: '100vh', 
      width: '100%',
      overflow: 'hidden'
    }}>
      <AppBar position="static" sx={{ bgcolor: 'white', boxShadow: 1 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: 'text.primary', fontWeight: 'bold' }}>
            Dashboard Order
          </Typography>
          <Box sx={{ 
            display: { xs: 'none', sm: 'flex' }, 
            alignItems: 'center', 
            bgcolor: '#f5f5f5', 
            borderRadius: 2, 
            px: 2, 
            py: 0.5, 
            mr: 2 
          }}>
            <Search sx={{ color: 'text.secondary', mr: 1 }} />
            <InputBase placeholder="Search..." />
          </Box>
          <Typography variant="body2" sx={{ color: 'text.secondary', mr: 2, display: { xs: 'none', sm: 'block' } }}>
            Apr 17, 2023
          </Typography>
          <IconButton>
            <Badge badgeContent={4} color="error">
              <Notifications />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ px: 3, py: 3, width: '100%' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
          Overview
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4, width:"100%", flex:1}}>
          <Grid item xs={12} md={4}>
            <StatCard
              title="Order Belum Diproses"
              count={orderStats.pending.count}
              change={orderStats.pending.change}
              color={orderStats.pending.color}
              icon={ShoppingCart}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatCard
              title="Order Sedang Diproses"
              count={orderStats.processing.count}
              change={orderStats.processing.change}
              color={orderStats.processing.color}
              icon={AccessTime}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatCard
              title="Order Selesai"
              count={orderStats.completed.count}
              change={orderStats.completed.change}
              color={orderStats.completed.color}
              icon={CheckCircle}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <OrderTable
              title="Order Belum Diprosess"
              orders={orders.pending}
              status="pending"
              color="#ff9800"
            />
          </Grid>
          <Grid item xs={12}>
            <OrderTable
              title="Order Sedang Diproses"
              orders={orders.processing}
              status="processing"
              color="#2196f3"
            />
          </Grid>
          <Grid item xs={12}>
            <OrderTable
              title="Order Selesai"
              orders={orders.completed}
              status="completed"
              color="#4caf50"
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;