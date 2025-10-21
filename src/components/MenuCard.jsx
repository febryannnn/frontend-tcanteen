import { useState, useEffect } from "react";
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
  IconButton,
  Chip,
  Rating,
  CircularProgress,
  Dialog,
  DialogContent,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import OrderDetailDialog from "./MenuDetails";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function MenuCard() {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [favorites, setFavorites] = useState({});
  const [cartCount, setCartCount] = useState(0);
  const [formData, setFormData] = useState({
    id: "",
    quantitiy: 0,
  });
  const [cartItems, setCartItems] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  let menuCartCount = 0;

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await api.get("/menus");
        setMenuItems(response.data.data || response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMenus();

    const interval = setInterval(fetchMenus, 5000);

    return () => clearInterval(interval);
  }, []);

  const categories = ["All Menu", "Snack", "Main Course", "Beverage"];

  const categoryMapping = {
    snack: "Snack",
    foods: "Makanan",
    beverages: "Minuman",
  };
  

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  console.log("Token:", localStorage.getItem("token"));
  const token = localStorage.getItem("token");

  const handleAddToCart = async (item_id) => {
    setLoading(true);
    try {
      let currentQuantity = cartItems[item_id] || 0;
      let newQuantity = currentQuantity + 1;

      setCartItems((prev) => ({
        ...prev,
        [item_id]: newQuantity,
      }));

      console.log("Sending:", { menu_id: item_id, quantity: newQuantity });

      // Kirim ke backend
      await api.patch(
        `/carts`,
        {
          menu_id: item_id,
          quantity: newQuantity,
        },
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
      setLoading(false);
      setSuccess(true);
      // setSuccess(false)

      const timer = setTimeout(() => {
        setSuccess(false);
      }, 1000);

      // Update badge cart count total
      setCartCount((prev) => prev + 1);
    } catch (err) {
      setLoading(false);
      console.error("Error adding to cart:", err.response?.data || err);
    }
  };

  const handleToggleFavorite = (itemId, event) => {
    event.stopPropagation();
    setFavorites((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      selectedTab === 0 || item.type === categories[selectedTab];
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatPrice = (price) => {
    return `Rp ${price.toLocaleString("id-ID")}`;
  };

  return (
    <>
      <Container maxWidth="xl" sx={{ mt: 8, mb: 8 }}>
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
            {categories.map((label, index) => (
              <Tab key={index} label={label} />
            ))}
          </Tabs>
        </Box>

        {/* Menu Grid - 4 cards per row */}
        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="stretch"
          sx={{
            overflowX: "hidden",
            flexWrap: "wrap",
          }}
        >
          {filteredItems.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.id}>
              <Card
                onClick={() => {
                  setOpen(true);
                  setSelectedItem(item);
                }}
                elevation={3}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  width: "clamp(290px, 23vw, 330px)",
                  borderRadius: 1,
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 6,
                  },
                }}
              >
                {/* Image Container with Favorite & Category */}
                <Box sx={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    image={item.image_url}
                    alt={item.name}
                    sx={{
                      height: 200,
                      objectFit: "cover",
                    }}
                  />

                  {/* Favorite Button */}
                  <IconButton
                    onClick={(e) => handleToggleFavorite(item.id, e)}
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 1)",
                      },
                    }}
                  >
                    {favorites[item.id] ? (
                      <FavoriteIcon sx={{ color: "red" }} />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </IconButton>

                  {/* Category Chip */}
                  <Chip
                    icon={<LocalOfferIcon />}
                    label={item.type}
                    size="small"
                    sx={{
                      position: "absolute",
                      bottom: 8,
                      left: 8,
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      fontWeight: 600,
                    }}
                  />
                </Box>

                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    p: 2.5,
                  }}
                >
                  {/* Title and Price */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      mb: 1,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        fontSize: "1.1rem",
                        color: "text.primary",
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: "primary.main",
                        ml: 1,
                      }}
                    >
                      {formatPrice(item.price)}
                    </Typography>
                  </Box>

                  {/* Description */}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      flexGrow: 1,
                      lineHeight: 1.6,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.description}
                  </Typography>

                  {/* Rating */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Rating
                      value={item.rating || 4.5}
                      precision={0.5}
                      readOnly
                      size="small"
                    />
                    <Typography
                      variant="body2"
                      sx={{ ml: 1, color: "text.secondary" }}
                    >
                      {item.rating || 4.5} ({item.total_reviews || 0})
                    </Typography>
                  </Box>

                  {/* Add Button */}
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={(e) => {
                        setOpen(true);
                        setSelectedItem(item);
                      }}
                      sx={{
                        mt: "auto",
                        borderColor: "#2c96c1ff",
                        border: 1,
                        background: "transparent",
                        color: "black",
                      }}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={(e) => {
                        e.stopPropagation();
                        menuCartCount++;
                        handleAddToCart(item.id);
                      }}
                      sx={{
                        mt: "auto",
                        background:
                          "linear-gradient(45deg, #050163ff, #2c96c1ff)",
                      }}
                    >
                      Add to Cart
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {selectedItem && (
          <OrderDetailDialog
            open={open}
            onClose={() => setOpen(false)}
            item={selectedItem}
          />
        )}

        {filteredItems.length === 0 && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No Items Found.
            </Typography>
          </Box>
        )}
      </Container>
      {/* INI BUAT LOADING */}
      <Dialog
        open={loading}
        PaperProps={{
          sx: {
            bgcolor: "white",
            borderRadius: 2,
            p: 3,
            minWidth: 300,
          },
        }}
      >
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <CircularProgress size={50} sx={{ color: "black" }} />
            <Typography
              variant="body1"
              sx={{ color: "black", fontWeight: 500 }}
            >
              Adding to cart...
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog
        open={success}
        PaperProps={{
          sx: {
            bgcolor: "white",
            borderRadius: 2,
            p: 3,
            minWidth: 300,
          },
        }}
      >
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                bgcolor: "#4caf50",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CheckCircle size={36} color="white" />
            </Box>
            <Typography
              variant="h6"
              sx={{
                color: "black",
                fontWeight: 600,
                fontFamily: "Inter, sans-serif",
              }}
            >
              Added to Cart Succesfully!
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
