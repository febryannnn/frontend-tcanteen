import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import api from "../../services/api";

export default function OrderDetailDialog({
  open,
  onClose,
  item, // item akan berisi data menu kalau edit
  onSaved, // callback setelah berhasil save
}) {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
    description: "",
    file: null,
  });
  const [isEdit, setIsEdit] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);

  // isi data ke form saat item berubah
  useEffect(() => {
    if (item) {
      setFormData({
        id: item.id,
        name: item.name,
        price: item.price,
        description: item.description || "",
        file: null,
      });
      setPreviewImage(item.image_url || "");
      setIsEdit(true);
    } else {
      setFormData({ id: "", name: "", price: "", description: "", file: null });
      setPreviewImage("");
      setIsEdit(false);
    }
  }, [item]);

  const handleSubmitMenu = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (isEdit) {
        await api.patch(
          `admin/menus/${formData.id}`,
          {
            name: formData.name,
            price: formData.price,
            description: formData.description,
          },
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          }
        );
      } else {
        await api.post(
          `/menus`,
          {
            name: formData.name,
            price: formData.price,
            description: formData.description,
          },
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          }
        );
      }

      if (onSaved) onSaved(); // kasih tahu parent untuk refresh
      onClose();
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan data menu");
    } finally {
      setLoading(false);
    }
  };

  const handleUploadImage = async () => {
    if (!formData.file || !formData.id) {
      alert("Pilih file dulu atau pastikan menu sudah tersimpan.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const data = new FormData();
      data.append("image", formData.file);

      const res = await api.post(`/menus/image/${formData.id}`, data, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      setPreviewImage(res.data.data.image_url);
      alert("Gambar berhasil diunggah!");
      if (onSaved) onSaved();
    } catch (err) {
      console.error(err);
      alert("Gagal mengunggah gambar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {isEdit ? "Edit Menu" : "Tambah Menu"}
      </DialogTitle>

      <DialogContent>
        <TextField
          margin="dense"
          label="Nama Menu"
          fullWidth
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
        />
        <TextField
          margin="dense"
          label="Harga"
          type="number"
          fullWidth
          value={formData.price}
          onChange={(e) =>
            setFormData({ ...formData, price: e.target.value })
          }
        />
        <TextField
          margin="dense"
          label="Deskripsi"
          fullWidth
          multiline
          rows={3}
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />

        <Box mt={2}>
          <Typography variant="body2">Upload Gambar:</Typography>
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
            onClick={handleUploadImage}
            disabled={loading}
          >
            Upload
          </Button>

          {previewImage && (
            <Box
              component="img"
              src={previewImage}
              alt="Preview"
              sx={{
                mt: 2,
                width: "100%",
                height: 200,
                objectFit: "cover",
                borderRadius: 1,
              }}
            />
          )}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Batal
        </Button>
        <Button
          onClick={handleSubmitMenu}
          variant="contained"
          disabled={loading}
          sx={{
            background: "linear-gradient(45deg, #050163ff, #2c96c1ff)",
          }}
        >
          {loading ? "Menyimpan..." : isEdit ? "Perbarui Menu" : "Tambah Menu"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
