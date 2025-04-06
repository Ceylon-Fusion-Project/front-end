// src/pages/AboutUs.tsx
import { Box, Container, Typography, Paper, Grid } from "@mui/material";
import teaBg from "../assets/images/cinnamon-bg.jpg";
import NavBar from "../components/Navbar";
import Footer from "../components/footer";

export default function AboutUs() {
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
          minHeight: "100vh",
        }}
      >
        <Container maxWidth="md">
          <Paper
            elevation={6}
            sx={{
              p: { xs: 3, md: 5 },
              backgroundColor: "rgba(255, 253, 250, 0.6)", // Pearl transparent
              borderRadius: 4,
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
              backdropFilter: "blur(6px)",
              color: "#4E342E",
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              textAlign="center"
              fontWeight="bold"
              color="#5D4037"
            >
              About Ceylon Fusion
            </Typography>

            <Typography variant="body1" paragraph sx={{ mt: 2, fontSize: "1.1rem" }}>
              Welcome to Ceylon Fusion — where tradition meets taste. We are passionate about
              bringing the rich heritage of Sri Lankan tea to the world, infused with a modern twist.
              Our story began with a deep love for Ceylon’s finest brews and a mission to share this
              experience beyond borders.
            </Typography>

            <Typography variant="h6" fontWeight="bold" sx={{ mt: 4 }}>
              🌿 Our Vision
            </Typography>
            <Typography variant="body1" paragraph>
              To be the global ambassador of premium, sustainable, and authentic Ceylon tea experiences.
            </Typography>

            <Typography variant="h6" fontWeight="bold" sx={{ mt: 4 }}>
              🤝 Our Values
            </Typography>
            <ul style={{ paddingLeft: "1.5rem", lineHeight: 1.8 }}>
              <li><strong>Authenticity:</strong> Honoring Sri Lanka’s tea heritage.</li>
              <li><strong>Quality:</strong> Only the finest handpicked leaves go into our blends.</li>
              <li><strong>Sustainability:</strong> We work closely with local farmers and eco-conscious suppliers.</li>
              <li><strong>Innovation:</strong> Infusing tradition with creative flavors and experiences.</li>
            </ul>

            <Typography variant="h6" fontWeight="bold" sx={{ mt: 4 }}>
              🏆 Why Choose Us?
            </Typography>
            <Typography variant="body1" paragraph>
              Ceylon Fusion stands out not just for its premium teas, but for the journey it offers
              — a journey of aroma, culture, and care. With award-winning blends, ethical sourcing,
              and a passion for excellence, we’re more than just a tea brand — we’re a lifestyle.
            </Typography>

            <Typography variant="body2" textAlign="center" sx={{ mt: 6, fontStyle: "italic" }}>
              “Brewed with love, served with soul — that’s the Ceylon Fusion promise.”
            </Typography>
          </Paper>
        </Container>
      </Box>
      <Footer />
    </>
  );
}
