import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  IconButton,
  Badge,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const theme = createTheme({
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  palette: {
    mode: "light",
    primary: {
      main: "#0d14d1ff",
      light: "#041f6aff",
      dark: "#2205a0ff",
    },
    background: {
      default: "#fafafa",
      paper: "#ffffff",
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
  },
});

const menuItems = [
  {
    id: 1,
    name: "Nasi Goreng Special",
    description: "Fried rice with chicken, egg, and vegetables",
    price: 30000,
    category: "foods",
    emoji: "🍚",
  },
  {
    id: 2,
    name: "Martabak Manis",
    description: "Sweet pancake with chocolate and cheese",
    price: 35000,
    category: "snack",
    emoji: "🥞",
  },
  {
    id: 3,
    name: "Ayam Geprek",
    description: "Crispy fried chicken with sambal",
    price: 28000,
    category: "foods",
    emoji: "🍗",
  },
  {
    id: 4,
    name: "Es Teh Manis",
    description: "Sweet iced tea, refreshing drink",
    price: 8000,
    category: "beverages",
    emoji: "🧋",
  },
  {
    id: 5,
    name: "Pisang Goreng",
    description: "Crispy fried banana with cheese",
    price: 15000,
    category: "snack",
    emoji: "🍌",
  },
  {
    id: 6,
    name: "Mie Goreng",
    description: "Stir-fried noodles with vegetables",
    price: 25000,
    category: "foods",
    emoji: "🍜",
  },
  {
    id: 7,
    name: "Kopi Susu",
    description: "Indonesian milk coffee",
    price: 12000,
    category: "beverages",
    emoji: "☕",
  },
  {
    id: 8,
    name: "Risoles Mayo",
    description: "Fried spring rolls with mayo filling",
    price: 18000,
    category: "snack",
    emoji: "🥟",
  },
  {
    id: 9,
    name: "Soto Ayam",
    description: "Traditional chicken soup with rice",
    price: 27000,
    category: "foods",
    emoji: "🍲",
  },
  {
    id: 10,
    name: "Jus Alpukat",
    description: "Fresh avocado juice with chocolate",
    price: 15000,
    category: "beverages",
    emoji: "🥑",
  },
  {
    id: 11,
    name: "Cireng",
    description: "Fried tapioca crackers with peanut sauce",
    price: 12000,
    category: "snack",
    emoji: "🍢",
  },
  {
    id: 12,
    name: "Bakso",
    description: "Meatball soup with noodles",
    price: 23000,
    category: "foods",
    emoji: "🍝",
  },
];

export default function CanteenHomepage() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);

  const categories = ["all", "snack", "foods", "beverages"];
  const categoryLabels = ["All Menu", "Snack", "Foods", "Beverages"];

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      selectedTab === 0 || item.category === categories[selectedTab];
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatPrice = (price) => {
    return `Rp ${price.toLocaleString("id-ID")}`;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          backgroundColor: "background.default",
          width: "100%",
          overflowX:"hidden",
          alignItems: "center"
        }}
      >
        {/* App Bar */}
        <AppBar
          position="fixed"
          elevation={1}
          sx={{ backgroundColor: "background.paper" }}
        >
          <Toolbar sx={{ py: 1 }}>
            <Typography
              variant="h5"
              component="div"
              sx={{
                flexGrow: 0,
                color: "primary.main",
                fontWeight: 700,
                mr: 4,
              }}
            >
              CanteenTC
            </Typography>

            <Box sx={{ flexGrow: 1 }} />

            <TextField
              placeholder="Search menu..."
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                mr: 3,
                width: 300,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "grey.50",
                  "& fieldset": {
                    borderColor: "transparent",
                  },
                  "&:hover fieldset": {
                    borderColor: "grey.300",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "primary.main",
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "grey.500" }} />
                  </InputAdornment>
                ),
              }}
            />

            <IconButton sx={{ mr: 2 }}>
              <Badge badgeContent={cartCount} color="primary">
                <ShoppingCartIcon sx={{ color: "grey.700" }} />
              </Badge>
            </IconButton>

            <Button variant="outlined" sx={{ mr: 1.5 }}>
              Login
            </Button>
            <Button variant="contained" color="primary">
              Register
            </Button>
          </Toolbar>
        </AppBar>

        {/* Hero Section */}
        <Box
          sx={{
            backgroundColor: "background.paper",
            py: 8,
            mt: 8,
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Container maxWidth="lg" >
            <Typography
              variant="h1"
              align="center"
              sx={{
                fontWeight: 300,
                fontSize: { xs: "3rem", md: "4.5rem" },
                color: "text.primary",
                letterSpacing: "-0.02em",
              }}
            >
              Canteen TC
            </Typography>
            <Typography
              variant="h6"
              align="center"
              sx={{
                mt: 2,
                color: "text.secondary",
                fontWeight: 400,
              }}
            >
              Order your favorite food and beverages
            </Typography>
          </Container>
        </Box>

        {/* Menu Section */}
        <Container maxWidth="xl" sx={{ mt: 5, mb: 8}}>
          {/* Category Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4}}>
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              centered
              sx={{
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 500,
                  minWidth: 120,
                  color: "text.secondary",
                },
                "& .Mui-selected": {
                  color: "primary.main",
                  fontWeight: 600,
                },
              }}
            >
              {categoryLabels.map((label, index) => (
                <Tab key={index} label={label} />
              ))}
            </Tabs>
          </Box>

          {/* Menu Grid - 4 cards per row */}
          <Grid
            container
            spacing={3}
            justifyContent="center" // 🔹 supaya grid item rata tengah
            alignItems="stretch"
            sx={{
              overflowX: "hidden", // 🔹 hilangkan overflow horizontal
              flexWrap: "wrap", // 🔹 pastikan item turun ke baris baru
            }}
          >
            {filteredItems.map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item.id}>
                <Card
                  elevation={2}
                  sx={{
                    height: "100%",
                    display: "flex",
                    width: "clamp(220px, 23vw, 260px)",
                    flexDirection: "column",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardMedia
                    sx={{
                      height: 180,
                      backgroundColor: "grey.100",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "4rem",
                    }}
                  >
                    {item.emoji}
                  </CardMedia>
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      p: 2.5,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        mb: 1,
                        fontSize: "1.1rem",
                        color: "text.primary",
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2.5, flexGrow: 1, lineHeight: 1.6 }}
                    >
                      {item.description}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: "auto",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: "primary.main",
                        }}
                      >
                        {formatPrice(item.price)}
                      </Typography>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<AddIcon />}
                        onClick={handleAddToCart}
                        sx={{
                          px: 2,
                        }}
                      >
                        Add
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {filteredItems.length === 0 && (
            <Box sx={{ textAlign: "center", py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                No items found matching your search.
              </Typography>
            </Box>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}
