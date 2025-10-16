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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  ThemeProvider,
  createTheme,
  CssBaseline,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  typography: { fontFamily: '"Inter", sans-serif' },
  palette: {
    mode: "light",
    primary: { main: "#040870" },
    background: { default: "#f5f6fa", paper: "#ffffff" },
  },
});

export default function AdminDashboard() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
    description: "",
    file: null,
  });
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const res = await api.get("/menus");

        setMenuItems(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMenus();
  }, []);

  // Open modal add/edit
  const handleOpenDialog = (item = null) => {
    if (item) {
      setFormData({
        id: item.id,
        name: item.name,
        price: item.price,
        description: item.description,
        file: null,
      });
      setIsEdit(true);
    } else {
      setFormData({ id: "", name: "", price: "", description: "", file: null });
      setIsEdit(false);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => setOpenDialog(false);

  // Add or update menu (without image)
  const handleSubmitMenu = async () => {
    try {
      if (isEdit) {
        // Gunakan endpoint normal untuk update text menu
        await api.patch(
          `/menus/${formData.id}`,
          {
              name: formData.name,
              price: formData.price,
          },
          {
            headers: {
              Authorization: `bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setMenuItems((prev) =>
          prev.map((item) =>
            item.id === formData.id ? { ...item, ...formData } : item
          )
        );
      } else {
        const res = await api.post(
          "/menus",
          {
              name: formData.name,
              price: formData.price,
          },
          {
            headers: {
              Authorization: `bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setMenuItems([...menuItems, res.data.data]);
        setFormData((prev) => ({ ...prev, id: res.data.data.id })); // simpan ID baru
        alert("Menu added! You can now upload an image for this menu.");
      }
      handleCloseDialog();
    } catch (err) {
      console.error(err);
      alert("Failed to save menu");
    }
  };

  console.log(localStorage.getItem("token"));

  // Upload image for menu
  const handleUploadImage = async (menuId, file) => {
    if (!file || !menuId) {
      alert("Select a file first!");
      return;
    }
    const data = new FormData();
    data.append("image", file);

    try {
      const res = await api.post(`/menus/image/${menuId}`, data, {
        headers: {
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },

        // form:
      });

      console.log(res.data);

      const updatedMenu = res.data.data;

      setMenuItems((prev) =>
        prev.map((item) =>
          item.id === updatedMenu.id
            ? { ...item, image_url: updatedMenu.image_url }
            : item
        )
      );

      alert("Image uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to upload image");
    }
  };

  // Delete menu
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this menu?")) return;
    try {
      await api.delete(`/menus/${id}`);
      setMenuItems((prev) => prev.filter((item) => item.id !== id));
      alert("Menu deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete menu");
    }
  };

  if (loading)
    return (
      <Typography variant="h6" align="center" mt={10}>
        Loading...
      </Typography>
    );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="xl" sx={{ mt: 5, mb: 8 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
          flexWrap="wrap"
        >
          <Typography variant="h4" sx={{ mb: { xs: 2, sm: 0 } }}>
            Admin Dashboard
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Add Menu
          </Button>
        </Box>

        <Grid container spacing={4}>
          {menuItems.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "0.3s",
                  "&:hover": { boxShadow: 6 },
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={item.image_url || "/placeholder.png"}
                  alt={item.name}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent
                  sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
                >
                  <Typography variant="h6" gutterBottom>
                    {item.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ flexGrow: 1 }}
                  >
                    {item.description}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="primary"
                    sx={{ mt: 1, fontWeight: "bold" }}
                  >
                    Rp {Number(item.price).toLocaleString("id-ID")}
                  </Typography>
                  <Box display="flex" justifyContent="flex-end" mt={1}>
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenDialog(item)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Add/Edit Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{isEdit ? "Edit Menu" : "Add Menu"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Price"
            type="number"
            fullWidth
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          {/* Upload Image */}
          <Box mt={2}>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData({ ...formData, file: e.target.files[0] })
              }
            />
            <Button
              variant="contained"
              sx={{ ml: 2, mt: 1 }}
              onClick={() => handleUploadImage(formData.id, formData.file)}
            >
              Upload Image
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmitMenu} variant="contained">
            {isEdit ? "Update Menu" : "Add Menu"}
          </Button>
        </DialogActions>
      </Dialog>

      <Footer />
    </ThemeProvider>
  );
}
