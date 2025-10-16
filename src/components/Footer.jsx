import React from "react";
import { Box, Container, Typography, Grid, Link, Divider } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        color: "white",
        mt: 8,
        py: 5,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 800, mb: 1, letterSpacing: "-0.02em" }}
            >
              CanteenTC
            </Typography>
            <Typography variant="body2" sx={{ color: "grey.200", lineHeight: 1.8 }}>
              Platform pemesanan makanan dan minuman cepat di kampus. Pesan,
              bayar, dan nikmati tanpa antre!
            </Typography>
          </Grid>

          {/* Navigation */}
          <Grid item xs={6} md={4}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Navigasi
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.8 }}>
              <Link href="/" underline="hover" color="inherit">
                Beranda
              </Link>
              <Link href="/menu" underline="hover" color="inherit">
                Menu
              </Link>
              <Link href="/about" underline="hover" color="inherit">
                Tentang Kami
              </Link>
              <Link href="/contact" underline="hover" color="inherit">
                Kontak
              </Link>
            </Box>
          </Grid>

          {/* Contact */}
          <Grid item xs={6} md={4}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Kontak
            </Typography>
            <Typography variant="body2" sx={{ color: "grey.200", lineHeight: 1.8 }}>
              Email: <Link color="inherit" href="mailto:support@canteentc.com">support@canteentc.com</Link>
              <br />
              Telepon: +62 812-3456-7890
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.2)" }} />

        <Typography
          variant="body2"
          align="center"
          sx={{ color: "grey.300", mt: 1 }}
        >
          © {new Date().getFullYear()} CanteenTC. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
