import React, { useState, useEffect } from "react";
import {
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
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MenuDetails from "../components/MenuDetails";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import heroBg from "../assets/header-2.svg";
import api from "../../services/api";

const theme = createTheme({
  typography: {
    fontFamily: '"Inter", sans-serif',
  },
  palette: {
    mode: "light",
    primary: {
      main: "#040870ff",
      light: "#041f6aff",
      dark: "#040c66ff",
    },
    background: {
      default: "#ecf0f7ff",
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

export default function CanteenHomepage() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const [menuItems, setMenuItems] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [openChart, setOpenChart] = useState(false);
  const [close, setClose] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await api.get("/menus");
        setMenuItems(response.data.data || response.data);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat data menu.");
      } finally {
        setLoading(false);
      }
    };
    fetchMenus();

    const interval = setInterval(fetchMenus, 5000); // fetch ulang setiap 5 detik

    return () => clearInterval(interval);
  }, []);

  const categories = ["all", "snack", "foods", "beverages"];
  const categoryLabels = ["All Menu", "Snack", "Foods", "Beverages"];

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  const handleAuthNav = (type) => {
    if (type === "login") {
      navigate("/login");
    } else if (type === "register") {
      navigate("/register");
    }
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
          width: "100vw",
          overflow: "hidden",
          alignItems: "center",
        }}
      >
        <Navbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          cartCount={cartCount}
          openCart={openChart}
          setOpenCart={setOpenChart}
          handleAuthNav={handleAuthNav}
        />

        {/* Hero Section */}
        <Box
          sx={{
            backgroundColor: "background.paper",
            py: 8,
            mt: 8,
            borderBottom: 1,
            borderColor: "divider",
            backgroundImage: `url("${heroBg}")`,
            backgroundSize: "cover",
            minHeight: "280px"
          }}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h1"
              align="center"
              sx={{
                fontWeight: 800,
                fontFamily: '"Poppins", sans-serif',
                fontSize: { xs: "3rem", md: "4.5rem" },
                color: "transparent",
                letterSpacing: "-0.02em",
              }}
            >
              C28 Canteen
            </Typography>
            <Typography
              variant="h6"
              align="center"
              sx={{
                mt: 2,
                color: "transparent",
                fontWeight: 400,
              }}
            >
              Order your favorite food and beverages
            </Typography>
          </Container>
        </Box>

        {/* Menu Section */}
        <Container maxWidth="xl" sx={{ mt: 5, mb: 8 }}>
          {/* Category Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
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
            spacing={6}
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
                  onClick={() => {
                    setOpen(true);
                    setSelectedItem(item);
                  }}
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
                    component="img"
                    image={item.image_url}
                    alt={item.name}
                    sx={{
                      height: 180,
                      backgroundColor: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "4rem",
                    }}
                  >
                    {/* {item.emoji} */}
                  </CardMedia>
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      p: 2.5,
                      // bgcolor: "#FFF8E1",
                      bgcolor: "background.paper",
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
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart();
                        }}
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
          {selectedItem && (
            <MenuDetails
              open={open}
              onClose={() => setOpen(false)}
              item={selectedItem}
            />
          )}
          {filteredItems.length === 0 && (
            <Box sx={{ textAlign: "center", py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                No items found matching your search.
              </Typography>
            </Box>
          )}
        </Container>
      </Box>
      <Footer />
    </ThemeProvider>
  );
}
