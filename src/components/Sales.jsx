import React from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  Paper,
  Container,
  Chip
} from '@mui/material';
import { 
  ThemeProvider, 
  createTheme 
} from '@mui/material/styles';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, ShoppingCart, DollarSign, Users } from 'lucide-react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a237e',
    },
    secondary: {
      main: '#1976d2',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default function SalesAnalytics() {
  const salesData = [
    { date: '19 Okt', orders: 2, revenue: 152000, items: 11 },
    { date: '20 Okt', orders: 10, revenue: 672000, items: 45 }
  ];

  const totalRevenue = 824000;
  const totalOrders = 12;
  const totalItems = 56;
  const avgOrderValue = Math.round(totalRevenue / totalOrders);

  const StatCard = ({ title, value, icon: Icon, color, subtitle }) => (
    <Card 
      elevation={2}
      sx={{
        height: '100%',
        transition: 'all 0.3s',
        width:"100%",
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        }
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box flex={1}>
            <Typography 
              variant="overline" 
              color="text.secondary" 
              sx={{ fontWeight: 600, letterSpacing: '0.5px' }}
            >
              {title}
            </Typography>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700, 
                color, 
                my: 1 
              }}
            >
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="caption" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: 2,
              bgcolor: color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              ml: 2
            }}
          >
            <Icon color="#fff" size={28} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="subtitle2" fontWeight={600} gutterBottom>
            {payload[0].payload.date}
          </Typography>
          {payload.map((entry, index) => (
            <Typography 
              key={index} 
              variant="body2" 
              sx={{ color: entry.color }}
            >
              {entry.name}: <strong>{entry.value.toLocaleString('id-ID')}</strong>
              {entry.name === 'Revenue' && ' IDR'}
            </Typography>
          ))}
        </Paper>
      );
    }
    return null;
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: '#f5f7fa', minHeight: '100vh', py: 4, width:"100%", minWidth:"80vw"}}>
        <Container maxWidth="xl">
          <Paper elevation={3} sx={{ p: 5, borderRadius: 3, width:"100%" }}>
            {/* Header */}
            <Box mb={4}>
              <Typography 
                variant="h3" 
                component="h1" 
                fontWeight={700}
                color="primary"
                gutterBottom
              >
                Dashboard Analitik Penjualan
              </Typography>
              <Typography variant="body1" color="text.secondary">
                📅 Periode: 19-20 Oktober 2025
              </Typography>
            </Box>

            {/* Statistics Cards */}
            <Grid container spacing={3} mb={4}>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  title="Total Revenue"
                  value={`Rp ${(totalRevenue / 1000).toFixed(0)}K`}
                  icon={DollarSign}
                  color="#1976d2"
                  subtitle="Total pendapatan"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  title="Total Orders"
                  value={totalOrders}
                  icon={ShoppingCart}
                  color="#1a237e"
                  subtitle="Jumlah pesanan"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  title="Items Sold"
                  value={totalItems}
                  icon={TrendingUp}
                  color="#e91e63"
                  subtitle="Item terjual"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  title="Avg Order Value"
                  value={`Rp ${(avgOrderValue / 1000).toFixed(0)}K`}
                  icon={Users}
                  color="#00acc1"
                  subtitle="Rata-rata per order"
                />
              </Grid>
            </Grid>

            {/* Charts Grid */}
            <Grid container spacing={3} mb={3}>
              {/* Revenue Area Chart */}
              <Grid item xs={12} lg={6}>
                <Card elevation={2} sx={{minWidth:"70vw"}}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={600} color="primary" gutterBottom>
                      Revenue per Hari
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={salesData}>
                        <defs>
                          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#1976d2" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#1976d2" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis 
                          dataKey="date" 
                          stroke="#666"
                          style={{ fontSize: '14px', fontWeight: 500 }}
                        />
                        <YAxis 
                          stroke="#666"
                          style={{ fontSize: '14px', fontWeight: 500 }}
                          tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area 
                          type="monotone" 
                          dataKey="revenue" 
                          stroke="#1976d2" 
                          strokeWidth={3}
                          fillOpacity={1} 
                          fill="url(#colorRevenue)" 
                          name="Revenue"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>

              {/* Orders Bar Chart */}
              <Grid item xs={12} lg={6}>
                <Card elevation={2}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={600} color="primary" gutterBottom>
                      Jumlah Orders per Hari
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis 
                          dataKey="date" 
                          stroke="#666"
                          style={{ fontSize: '14px', fontWeight: 500 }}
                        />
                        <YAxis 
                          stroke="#666"
                          style={{ fontSize: '14px', fontWeight: 500 }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar 
                          dataKey="orders" 
                          fill="url(#barGradient)" 
                          radius={[8, 8, 0, 0]}
                          name="Orders"
                        />
                        <defs>
                          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#1a237e" />
                            <stop offset="100%" stopColor="#1976d2" />
                          </linearGradient>
                        </defs>
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Combined Line Chart */}
            <Card elevation={2} sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} color="primary" gutterBottom>
                  Perbandingan Revenue, Orders & Items
                </Typography>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis 
                      dataKey="date" 
                      stroke="#666"
                      style={{ fontSize: '14px', fontWeight: 500 }}
                    />
                    <YAxis 
                      yAxisId="left"
                      stroke="#666"
                      style={{ fontSize: '14px', fontWeight: 500 }}
                      tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                    />
                    <YAxis 
                      yAxisId="right" 
                      orientation="right"
                      stroke="#666"
                      style={{ fontSize: '14px', fontWeight: 500 }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend 
                      wrapperStyle={{ paddingTop: '20px' }}
                      iconType="circle"
                    />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#1976d2" 
                      strokeWidth={3}
                      dot={{ fill: '#1976d2', r: 6 }}
                      activeDot={{ r: 8 }}
                      name="Revenue"
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="orders" 
                      stroke="#1a237e" 
                      strokeWidth={3}
                      dot={{ fill: '#1a237e', r: 6 }}
                      activeDot={{ r: 8 }}
                      name="Orders"
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="items" 
                      stroke="#e91e63" 
                      strokeWidth={3}
                      dot={{ fill: '#e91e63', r: 6 }}
                      activeDot={{ r: 8 }}
                      name="Items"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Growth Indicator */}
            <Paper 
              elevation={3}
              sx={{
                background: 'linear-gradient(135deg, #1a237e 0%, #1976d2 100%)',
                p: 4,
                textAlign: 'center',
                color: 'white'
              }}
            >
              <Typography variant="h5" fontWeight={600} gutterBottom>
                📈 Pertumbuhan Signifikan!
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Revenue meningkat <strong style={{ fontSize: '1.3rem' }}>341%</strong> dari 19 ke 20 Oktober 2025
              </Typography>
              <Typography variant="body2">
                Total <strong>5 customer aktif</strong> melakukan pemesanan
              </Typography>
            </Paper>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}