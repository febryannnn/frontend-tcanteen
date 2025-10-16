import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Card,
  CardContent,
  IconButton,
  TextField,
  Divider,
  Chip,
  Badge,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Paper
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const theme = createTheme({
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#556B2F',
      light: '#6B8E23',
      dark: '#3D4F21',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

const menuItem = {
  id: 1,
  name: 'Nasi Goreng Special',
  description: 'Delicious fried rice cooked with premium ingredients including tender chicken, fresh vegetables, and a perfectly fried egg on top. Served with crackers and pickles.',
  price: 30000,
  category: 'foods',
  emoji: '🍚',
  rating: 4.8,
  reviews: 126,
  availability: 'Available',
  preparationTime: '15-20 minutes'
};

export default function OrderDetailPage() {
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    setCartCount(prev => prev + quantity);
    // Reset quantity after adding to cart
    setQuantity(1);
    setNotes('');
  };

  const formatPrice = (price) => {
    return `Rp ${price.toLocaleString('id-ID')}`;
  };

  const totalPrice = menuItem.price * quantity;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, minHeight: '100vh', backgroundColor: 'background.default', width: '100vw' }}>
        {/* App Bar */}
        <AppBar position="sticky" elevation={1} sx={{ backgroundColor: 'background.paper' }}>
          <Toolbar sx={{ py: 1 }}>
            <IconButton 
              edge="start" 
              sx={{ mr: 2, color: 'grey.700' }}
              onClick={() => window.history.back()}
            >
              <ArrowBackIcon />
            </IconButton>
            
            <Typography
              variant="h5"
              component="div"
              sx={{ 
                flexGrow: 1,
                color: 'primary.main', 
                fontWeight: 700,
              }}
            >
              CanteenTC
            </Typography>

            <IconButton sx={{ mr: 2 }}>
              <Badge badgeContent={cartCount} color="primary">
                <ShoppingCartIcon sx={{ color: 'grey.700' }} />
              </Badge>
            </IconButton>
            
            <Button
              variant="outlined"
              sx={{ mr: 1.5 }}
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="primary"
            >
              Register
            </Button>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
          <Card elevation={3}>
            {/* Food Image Section */}
            <Box
              sx={{
                height: 400,
                backgroundColor: 'grey.100',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12rem',
                position: 'relative',
              }}
            >
              {menuItem.emoji}
              <IconButton
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  backgroundColor: 'white',
                  '&:hover': {
                    backgroundColor: 'grey.100',
                  },
                }}
                onClick={() => setIsFavorite(!isFavorite)}
              >
                {isFavorite ? (
                  <FavoriteIcon sx={{ color: 'red' }} />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>
            </Box>

            <CardContent sx={{ p: 4 }}>
              {/* Header Section */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontWeight: 700,
                      color: 'text.primary',
                    }}
                  >
                    {menuItem.name}
                  </Typography>
                  <Chip 
                    label={menuItem.availability} 
                    color="success" 
                    size="small"
                    sx={{ fontWeight: 600 }}
                  />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Typography variant="body1" sx={{ fontWeight: 600, color: 'warning.main' }}>
                      ⭐ {menuItem.rating}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ({menuItem.reviews} reviews)
                    </Typography>
                  </Box>
                  <Divider orientation="vertical" flexItem />
                  <Typography variant="body2" color="text.secondary">
                    🕐 {menuItem.preparationTime}
                  </Typography>
                  <Divider orientation="vertical" flexItem />
                  <Chip 
                    label={menuItem.category} 
                    size="small" 
                    variant="outlined"
                    sx={{ textTransform: 'capitalize' }}
                  />
                </Box>

                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 700,
                    color: 'primary.main',
                  }}
                >
                  {formatPrice(menuItem.price)}
                </Typography>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Description */}
              <Box sx={{ mb: 3 }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600,
                    mb: 1.5,
                    color: 'text.primary'
                  }}
                >
                  Description
                </Typography>
                <Typography 
                  variant="body1" 
                  color="text.secondary"
                  sx={{ lineHeight: 1.8 }}
                >
                  {menuItem.description}
                </Typography>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Quantity Selector */}
              <Box sx={{ mb: 3 }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600,
                    mb: 2,
                    color: 'text.primary'
                  }}
                >
                  Quantity
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      border: 1, 
                      borderColor: 'divider',
                      borderRadius: 2,
                      overflow: 'hidden'
                    }}
                  >
                    <IconButton 
                      onClick={handleDecrement}
                      disabled={quantity <= 1}
                      sx={{ 
                        borderRadius: 0,
                        px: 2,
                        '&:hover': {
                          backgroundColor: 'grey.100',
                        }
                      }}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        px: 4, 
                        fontWeight: 600,
                        minWidth: 60,
                        textAlign: 'center'
                      }}
                    >
                      {quantity}
                    </Typography>
                    <IconButton 
                      onClick={handleIncrement}
                      sx={{ 
                        borderRadius: 0,
                        px: 2,
                        '&:hover': {
                          backgroundColor: 'grey.100',
                        }
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  </Paper>
                </Box>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Special Notes */}
              <Box sx={{ mb: 3 }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600,
                    mb: 2,
                    color: 'text.primary'
                  }}
                >
                  Special Notes (Optional)
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="Add any special requests or dietary restrictions..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'grey.50',
                    }
                  }}
                />
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Total Price Section */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body1" color="text.secondary">
                    Subtotal ({quantity} item{quantity > 1 ? 's' : ''})
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {formatPrice(totalPrice)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Total
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    {formatPrice(totalPrice)}
                  </Typography>
                </Box>
              </Box>

              {/* Add to Cart Button */}
              <Button
                variant="contained"
                size="large"
                fullWidth
                startIcon={<ShoppingCartIcon />}
                onClick={handleAddToCart}
                sx={{
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                }}
              >
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </ThemeProvider>
  );
}