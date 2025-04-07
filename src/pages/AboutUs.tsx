import { Box, Container, Typography, Paper } from "@mui/material";
import cinnamonBg from "../assets/images/cinnamon-bg.jpg";
import NavBar from "../components/Navbar";
import Footer from "../components/footer";

export default function AboutUs() {
  return (
    <>
      <NavBar />
      <Box
        sx={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${cinnamonBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          py: { xs: 8, md: 12 },
          px: 2,
          minHeight: "100vh",
        }}
      >
        <Container maxWidth="md">
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 5 },
              backgroundColor: "rgba(255, 253, 250, 0.75)",
              borderRadius: 4,
              backdropFilter: "blur(3px)",
              border: "1px solid rgba(255, 255, 255, 0.3)"
            }}
          >
            <Typography
              variant="h3"
              gutterBottom
              textAlign="center"
              fontWeight={700}
              sx={{
                color: "#5D4037",
                fontFamily: "'Playfair Display', serif",
                mb: 4,
                letterSpacing: 1,
                textShadow: "0 2px 4px rgba(0,0,0,0.1)"
              }}
            >
              Who we are
            </Typography>

            <Typography
              variant="body1"
              paragraph
              sx={{
                fontSize: "1.1rem",
                lineHeight: 1.8,
                color: "#3E2723",
                textAlign: "center",
                '& strong': {
                  color: "#8D6E63",
                  fontWeight: 600
                }
              }}
            >
              <strong>Direct from Sri Lanka's cinnamon estates</strong> to your hands - authentic products and immersive experiences that connect you to the source.
            </Typography>

            <Box sx={{ 
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: 3,
              my: 5
            }}>
              <Box sx={{ p: 3, backgroundColor: 'rgba(255, 253, 250, 0.6)', borderRadius: 3 }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: "#5D4037",
                    mb: 2,
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  ✦ Premium Cinnamon Products
                </Typography>
                <Typography variant="body2" sx={{ color: "#4E342E", textAlign: 'center' }}>
                  Hand-harvested quills, oils, and specialty goods shipped directly from family-owned estates
                </Typography>
              </Box>

              <Box sx={{ p: 3, backgroundColor: 'rgba(255, 253, 250, 0.6)', borderRadius: 3 }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: "#5D4037",
                    mb: 2,
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  ✦ Estate Experiences
                </Typography>
                <Typography variant="body2" sx={{ color: "#4E342E", textAlign: 'center' }}>
                  Book private tours, harvesting workshops, and cinnamon-infused meals at working plantations
                </Typography>
              </Box>
            </Box>

            <Typography
              variant="body1"
              paragraph
              sx={{
                fontSize: "1.1rem",
                lineHeight: 1.8,
                color: "#3E2723",
                textAlign: "center",
                mt: 4,
                px: 2,
                '& strong': {
                  color: "#5D4037",
                  fontWeight: 600
                }
              }}
            >
              Our partner estates in <strong>Southern Sri Lanka</strong> open their doors to travelers seeking authentic connections with cinnamon cultivation traditions dating back centuries.
            </Typography>

            <Box sx={{ 
              p: 3, 
              mt: 4, 
              backgroundColor: 'rgba(94, 53, 30, 0.08)', 
              borderRadius: 3,
              borderLeft: '4px solid #8D6E63'
            }}>
              <Typography variant="body2" sx={{ 
                color: "#5D4037", 
                fontStyle: 'italic',
                textAlign: 'center',
                fontSize: '1rem'
              }}>
                "Walk through fragrant cinnamon groves, meet the families who cultivate them, and take home the purest cinnamon you'll ever taste."
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>
      <Footer />
    </>
  );
}