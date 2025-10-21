import React, { useState, useEffect, useRef } from "react";
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
import heroBg1 from "../assets/bgMenu1.svg";
import heroBg2 from "../assets/bgMenu2.svg";
import heroBg3 from "../assets/bgMenu3.svg";
import { IconButton } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import heroBg4 from "../assets/bgMenu4.svg";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [openChart, setOpenChart] = useState(false);
  const [loading, setLoading] = useState(0);
  const [bgIndex, setBgIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const categories = ["all", "snack", "foods", "beverages"];

  const backgrounds = [heroBg1, heroBg2, heroBg3, heroBg4];

 
// tambahkan duplikat pertama di akhir & terakhir di awal untuk efek loop halus
const loopedBackgrounds = [
  backgrounds[backgrounds.length - 1],
  ...backgrounds,
  backgrounds[0],
];

  // Geser ke kanan
  const nextSlide = () => {
    setBgIndex((prev) => prev + 1);
  };

  // Geser ke kiri
  const prevSlide = () => {
    setBgIndex((prev) => prev - 1);
  };

  // Efek looping otomatis
  useEffect(() => {
    if (isHovered) return; // pause saat hover

    const interval = setInterval(() => {
      setBgIndex((prev) => prev + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered]);

  // Loop tanpa jeda visual
  useEffect(() => {
    if (bgIndex === loopedBackgrounds.length - 1) {
      // kalau di slide duplikat terakhir → reset ke index 1
      setTimeout(() => {
        setIsTransitioning(false);
        setBgIndex(1);
      }, 2000);
    } else if (bgIndex === 0) {
      // kalau di slide duplikat pertama → reset ke index terakhir yang asli
      setTimeout(() => {
        setIsTransitioning(false);
        setBgIndex(loopedBackgrounds.length - 2);
      }, 2000);
    } else {
      setIsTransitioning(true);
    }
  }, [bgIndex]);

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

        {/* Hero Section - Slide ke kiri otomatis */}
        <Box
          sx={{
            position: "relative",
            width: "100vw",
            overflow: "hidden",
            mt: 8,
            height: "280px",
          }}
          onMouseEnter={() => setIsHovered(true)} 
          onMouseLeave={() => setIsHovered(false)} 
        >
        {/* Semua gambar ditaruh dalam 1 baris */}
        <Box
          sx={{
            display: "flex",
            width: "max-content",
            transform: `translateX(-${bgIndex * 100}vw)`,
            transition: isTransitioning ? "transform 2s ease-in-out" : "none",
          }}
        >
          {loopedBackgrounds.map((bg, index) => (
            <Box
              key={index}
              sx={{
                width: "100vw",
                height: "280px",
                backgroundImage: `url(${bg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                flexShrink: 0,
              }}
            />
          ))}
        </Box>

        {/* Tombol Kiri */}
        <IconButton
          onClick={prevSlide}
          sx={{
            position: "absolute",
            top: "50%",
            left: 20,
            transform: "translateY(-50%)",
            backgroundColor: "rgba(0,0,0,0.2)",
            color: "white",
            "&:hover": { backgroundColor: "rgba(0,0,0,0.4)" },
            "&:focus": { outline: "none" }, // hilangkan stroke putih saat fokus
            "&:active": { outline: "none" } // hilangkan stroke putih saat klik
          }}
        >
          <ArrowBackIosNewIcon/>
        </IconButton>

        {/* Tombol Kanan */}
        <IconButton
          onClick={nextSlide}
          sx={{
            position: "absolute",
            top: "50%",
            right: 10,
            transform: "translateY(-50%)",
            backgroundColor: "rgba(0,0,0,0.2)",
            color: "white",
            "&:hover": { backgroundColor: "rgba(0,0,0,0.4)" },
            "&:focus": { outline: "none" }, // hilangkan stroke putih saat fokus
            "&:active": { outline: "none" } // hilangkan stroke putih saat klik
          }}
        >
          <ArrowForwardIosIcon/>
        </IconButton>
      </Box>
        <InfiniteCarousel />
        <MenuCard />
        <CustomerReviews />
      </Box>
      <Footer />
    </ThemeProvider>
  );
}
