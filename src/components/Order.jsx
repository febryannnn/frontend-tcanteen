import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Typography,
  Button,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";

export default function CartPopup({open, onClose}) {
//   const [openChart, setOpenChart] = useState(false);

//   const handleOpen = () => setOpenChart(true);
//   const handleClose = () => setOpenChart(false);

  return (
    <>

      {/* 💬 Popup keranjang */}
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        scroll="body"
        sx={{
          "& .MuiDialog-container": {
            overflow: "hidden",
          },
          "& .MuiPaper-root": {
            borderRadius: 1,
            overflow: "hidden",
            width: "100vw",
            maxWidth: "600px",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            bgcolor: "primary.main",
            color: "white",
          }}
        >
          <Typography variant="h6">Keranjang Kamu</Typography>
          <IconButton onClick={onClose} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent
          sx={{
            p: 3,
            overflowY: "auto",
            maxHeight: "70vh",
            bgcolor: "#fafafa",
          }}
        >
          {/* 👉 Isi keranjang di sini */}
          <Box>
            <Typography variant="body1" color="text.secondary">
              Belum ada item di keranjang.
            </Typography>
          </Box>

          {/* Tombol aksi */}
          <Box sx={{ mt: 3, textAlign: "right" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => alert("Lanjut ke checkout")}
            >
              Pay Now
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
