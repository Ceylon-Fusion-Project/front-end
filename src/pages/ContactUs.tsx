// src/pages/ContactUs.tsx
import { Box, Container, Grid, Typography, TextField, Button, Paper } from "@mui/material";
import teaBg from "../assets/images/tea-bg.jpg";
import NavBar from "../components/Navbar";
import Footer from "../components/footer";

export default function ContactUs() {
  return (
    <>
      <NavBar />
      <Box
        sx={{
          backgroundImage: `url(${teaBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          py: { xs: 8, md: 12 },
          px: 2,
          minHeight: '100vh',
        }}
      >
        <Container maxWidth="md">
          <Paper
            elevation={6}
            sx={{
              p: { xs: 3, md: 5 },
              backgroundColor: "rgba(255, 253, 250, 0.6)", // Transparent pearl look
              borderRadius: 4,
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
              backdropFilter: "blur(6px)", // Adds glass effect
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              textAlign="center"
              fontWeight="bold"
              color="#5D4037"
            >
              Get in Touch with Ceylon Fusion
            </Typography>

            <Grid container spacing={3} mt={1}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Your Name"
                  fullWidth
                  required
                  variant="outlined"
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                    borderRadius: 2,
                  }}
                  InputLabelProps={{ sx: { color: "#6d4c41" } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email Address"
                  fullWidth
                  required
                  variant="outlined"
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                    borderRadius: 2,
                  }}
                  InputLabelProps={{ sx: { color: "#6d4c41" } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Subject"
                  fullWidth
                  variant="outlined"
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                    borderRadius: 2,
                  }}
                  InputLabelProps={{ sx: { color: "#6d4c41" } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Message"
                  fullWidth
                  multiline
                  rows={5}
                  variant="outlined"
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                    borderRadius: 2,
                  }}
                  InputLabelProps={{ sx: { color: "#6d4c41" } }}
                />
              </Grid>
              <Grid item xs={12} textAlign="center">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#8D6E63",
                    color: "white",
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    '&:hover': {
                      backgroundColor: "#6D4C41",
                    },
                  }}
                >
                  Send Message
                </Button>
              </Grid>
            </Grid>

            <Box mt={5} textAlign="center">
              <Typography variant="subtitle1" gutterBottom color="#4E342E">
                📍 No. 12, Cinnamon Street, Colombo 07, Sri Lanka
              </Typography>
              <Typography variant="subtitle1" gutterBottom color="#4E342E">
                📞 +94 77 123 4567
              </Typography>
              <Typography variant="subtitle1" gutterBottom color="#4E342E">
                ✉️ hello@ceylonfusion.lk
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>
      <Footer />
    </>
  );
}
