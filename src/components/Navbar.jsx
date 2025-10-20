// src/components/Navbar.jsx
import React, { useState, useEffect, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Badge,
  Avatar,
  Button,
  Card,
  CardContent,
  Divider,
  Fade,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import CartPopup from "./Cart";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/UserContext";

export default function Navbar({
  searchQuery,
  setSearchQuery,
  cartCount,
  openCart,
  setOpenCart,
  handleAuthNav,
}) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileCard, setShowProfileCard] = useState(false);
  // const [user, setUser] = useState({ name: "Guest", email: "guest@gmail.com" });
  const { user, setUser } = useContext(UserContext);

  // 🔹 Cek token di localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    } else {
      setUser({ name: "Guest", email: "Not logged in" });
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser({ name: "Guest", email: "Not logged in" });
    setIsLoggedIn(false);
    setShowProfileCard(false);
    // navigate("/login");
  };

  const toggleProfileCard = () => {
    setShowProfileCard((prev) => !prev);
  };

  return (
    <AppBar
      position="fixed"
      elevation={1}
      sx={{
        backgroundColor: "#ffffff",
        color: "black",
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
      }}
    >
      <Toolbar sx={{ py: 1 }}>
        {/* LOGO */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "primary.main",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          TCanteen
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        {/* SEARCH */}
        <TextField
          placeholder="Search menu..."
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            width: 300,
            mr: 3,
            "& .MuiOutlinedInput-root": {
              bgcolor: "#f5f5f5",
              borderRadius: "12px",
              "& fieldset": { borderColor: "transparent" },
              "&:hover fieldset": { borderColor: "#ccc" },
              "&.Mui-focused fieldset": { borderColor: "primary.main" },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "grey.600" }} />
              </InputAdornment>
            ),
          }}
        />

        {/* CART */}
        <IconButton onClick={() => setOpenCart(true)} sx={{ mr: 2 }}>
          <Badge badgeContent={cartCount} color="primary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <CartPopup open={openCart} onClose={() => setOpenCart(false)} />

        {/* 🔹 Auth Section */}
        {!isLoggedIn ? (
          <>
            <Button
              variant="outlined"
              sx={{ mr: 1.5, borderRadius: "10px" }}
              onClick={() => handleAuthNav("login")}
            >
              Login
            </Button>
            <Button
              variant="contained"
              sx={{ borderRadius: "10px" }}
              onClick={() => handleAuthNav("register")}
            >
              Register
            </Button>
          </>
        ) : (
          <Box sx={{ position: "relative" }}>
            <IconButton onClick={toggleProfileCard}>
              <Avatar sx={{ bgcolor: "primary.main" }}>
                <PersonIcon />
              </Avatar>
            </IconButton>

            {/* 🔽 Profile Card */}
            <Fade in={showProfileCard}>
              <Card
                sx={{
                  position: "absolute",
                  top: "50px",
                  right: 0,
                  width: 250,
                  borderRadius: "16px",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                  overflow: "hidden",
                  zIndex: 1000,
                }}
              >
                <CardContent sx={{ textAlign: "center", p: 2.5 }}>
                  <Avatar
                    sx={{
                      bgcolor: "primary.main",
                      width: 56,
                      height: 56,
                      mx: "auto",
                      mb: 1.5,
                    }}
                  >
                    <PersonIcon fontSize="large" />
                  </Avatar>
                  <Typography fontWeight="bold">{user.name}</Typography>
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    {user.email}
                  </Typography>

                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => navigate("/order")}
                    sx={{
                      mb: 1,
                      borderRadius: "10px",
                      textTransform: "none",
                    }}
                  >
                    View Order
                  </Button>

                  <Divider sx={{ my: 1 }} />

                  <Button
                    fullWidth
                    variant="contained"
                    color="error"
                    startIcon={<LogoutIcon />}
                    onClick={handleLogout}
                    sx={{
                      borderRadius: "10px",
                      textTransform: "none",
                      fontWeight: "bold",
                    }}
                  >
                    Logout
                  </Button>
                </CardContent>
              </Card>
            </Fade>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
