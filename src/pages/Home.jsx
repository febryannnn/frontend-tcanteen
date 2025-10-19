import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Box,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import heroBg from "../assets/header-2.svg";
import api from "../../services/api";
import InfiniteCarousel from "../components/Promo";
import MenuCard from "../components/MenuCard";
import CustomerReviews from "../components/Rating";

const theme = createTheme({
  typography: {
    fontFamily: '"Inter", sans-serif',
  },
  palette: {
    mode: "light",
    primary: {
      main: "#000000ff",
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

  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [openChart, setOpenChart] = useState(false);
  const [loading, setLoading] = useState(0);

  const categories = ["all", "snack", "foods", "beverages"];

  const handleAuthNav = (type) => {
    if (type === "login") {
      navigate("/login");
    } else if (type === "register") {
      navigate("/register");
    }
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
            minHeight: "280px",
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
              TC Canteen
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

        <InfiniteCarousel />
        <MenuCard />
        <CustomerReviews />
      </Box>
      <Footer />
    </ThemeProvider>
  );
}
