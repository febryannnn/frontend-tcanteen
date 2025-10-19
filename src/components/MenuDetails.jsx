import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Divider,
  Chip,
  Paper,
  TextField,
  Button,
  CardMedia,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";

export default function OrderDetailDialog({ open, onClose, item }) {
  console.log(item);

  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const handleIncrement = () => setQuantity((q) => q + 1);
  const handleDecrement = () => quantity > 1 && setQuantity((q) => q - 1);
  const formatPrice = (price) => `Rp ${price.toLocaleString("id-ID")}`;

  const totalPrice = item.price * quantity;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      scroll="paper"
      PaperProps={{
        sx: { borderRadius: 1, overflow: "hidden" },
      }}
    >
      <DialogContent sx={{ p: 0, overflow: "hidden" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            height: { md: 500 },
            overflow: "auto"
          }}
        >
          {/* LEFT SECTION – IMAGE */}
          <Box
            sx={{
              width: { xs: "100%", md: "45%" },
              backgroundColor: "grey.100",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              fontSize: "10rem",
            }}
          >
            <CardMedia
              component="img"
              image={item.image_url}
              alt={item.name}
              sx={{
                height: "100%",
                objectFit: "cover",
              }}
            />

            <IconButton
              onClick={onClose}
              sx={{
                position: "absolute",
                top: 12,
                left: 12,
                backgroundColor: "white",
                "&:hover": { backgroundColor: "grey.100" },
              }}
            >
              <CloseIcon />
            </IconButton>
            <IconButton
              onClick={() => setIsFavorite(!isFavorite)}
              sx={{
                position: "absolute",
                top: 12,
                right: 12,
                backgroundColor: "white",
                "&:hover": { backgroundColor: "grey.100" },
              }}
            >
              {isFavorite ? (
                <FavoriteIcon sx={{ color: "red" }} />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
          </Box>

          {/* RIGHT SECTION – DETAILS */}
          <Box
            sx={{
              flex: 1,
              p: 4,
              overflowY: "auto",
              scrollbarWidth: "none", // Firefox
              "&::-webkit-scrollbar": {
                display: "none", // Chrome, Edge, Safari
              },
            }}
          >
            {/* HEADER */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {item.name}
              </Typography>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: "warning.main", fontWeight: 600 }}
                >
                  ⭐ 4.5/5.0
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ({item.reviews} reviews)
                </Typography>
                <Divider orientation="vertical" flexItem />
                <Typography variant="body2" color="text.secondary">
                  🕐 10-15 Minutes
                </Typography>
              </Box>
              <Chip
                label="available"
                color="success"
                size="small"
                sx={{ mt: 1, fontWeight: 600 }}
              />
            </Box>

            <Typography
              variant="h5"
              sx={{ fontWeight: 700, color: "primary.main", mb: 2 }}
            >
              {formatPrice(item.price)}
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 3, lineHeight: 1.6 }}
            >
              Nasi goreng is a popular Indonesian fried rice dish made with
              cooked rice stir-fried in oil, soy sauce, garlic, shallots, and
              chili. It’s often mixed with ingredients like eggs, chicken,
              shrimp, or vegetables, and served with toppings such as fried
              shallots, cucumber, and crackers. It’s flavorful, slightly sweet,
              and smoky — a favorite comfort food across Indonesia.
            </Typography>

            {/* QUANTITY */}
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Quantity
            </Typography>
            <Paper
              variant="outlined"
              sx={{
                display: "flex",
                alignItems: "center",
                width: "fit-content",
                borderRadius: 2,
                mb: 3,
              }}
            >
              <IconButton onClick={handleDecrement} disabled={quantity <= 1}>
                <RemoveIcon />
              </IconButton>
              <Typography variant="h6" sx={{ px: 2 }}>
                {quantity}
              </Typography>
              <IconButton onClick={handleIncrement}>
                <AddIcon />
              </IconButton>
            </Paper>

            {/* NOTES */}
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Special Notes (Optional)
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={2}
              placeholder="Add any special requests..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "grey.50",
                },
              }}
            />

            {/* TOTAL */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 3,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Total
              </Typography>
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, color: "primary.main" }}
              >
                {formatPrice(totalPrice)}
              </Typography>
            </Box>

            {/* BUTTON */}
            <Button
              variant="contained"
              fullWidth
              startIcon={<ShoppingCartIcon />}
              sx={{ mt: 3, py: 1.2, fontWeight: 600, fontSize: "1rem" }}
              onClick={() => {
                alert(`${item.name} (${quantity}) added to cart`);
                onClose();
              }}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
