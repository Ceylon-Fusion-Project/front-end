
import React from 'react';
import { motion } from 'framer-motion';
import { Typography, Box, Grid, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CinnamonHarvestImage from '@/assets/events/event71.jpeg';
import GlobalMarketImage from '@/assets/events/event90.jpg';
import ProductVarietiesImage from '@/assets/events/event91.jpeg';
import SustainableFarmingImage from '@/assets/packages/plantation_02.jpg';

const SustainabilityPage: React.FC = () => {
  const navigate = useNavigate();

  const sustainabilityGoals = [
    {
      title: "Global Market Expansion",
      description: "We sell high-quality cinnamon to global markets while ensuring our products meet international standards. Our brand is becoming recognized worldwide through strategic online platforms.",
      image: GlobalMarketImage,
      benefits: [
        "Reduced third-party fees through direct sales",
        "Increased visibility among foreign customers",
        "Integrated product and accommodation sales"
      ]
    },
    {
      title: "Product Diversity",
      description: "We offer cinnamon in various forms including sticks, powder, and oils, while continuously innovating new products for health and wellness markets.",
      image: ProductVarietiesImage,
      benefits: [
        "Multiple product lines for different markets",
        "Specialty health-focused formulations",
        "Premium gourmet offerings"
      ]
    },
    {
      title: "Cultural Preservation",
      description: "We promote the cultural value of cinnamon through authentic farming practices and educational experiences for visitors.",
      image: CinnamonHarvestImage,
      benefits: [
        "Traditional harvesting methods",
        "Cultural immersion programs",
        "Heritage preservation initiatives"
      ]
    },
    {
      title: "Sustainable Practices",
      description: "Our farming methods prioritize environmental stewardship while supporting local farmers and communities.",
      image: SustainableFarmingImage,
      benefits: [
        "Chemical-free cultivation",
        "Soil regeneration techniques",
        "Fair wages and community development"
      ]
    }
  ];

  return (
    <Box sx={{ py: 8, px: 4, bgcolor: 'background.paper' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h2" component="h1" gutterBottom sx={{ 
          textAlign: 'center', 
          fontWeight: 700,
          color: 'text.primary',
          mb: 4
        }}>
          Our Sustainability Commitment
        </Typography>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Typography variant="h5" component="p" sx={{ 
            textAlign: 'center', 
            maxWidth: 800,
            mx: 'auto',
            mb: 6,
            color: 'text.secondary'
          }}>
            Discover how we combine traditional methods with modern sustainability to bring you the finest cinnamon while protecting our planet and communities.
          </Typography>
        </motion.div>
      </motion.div>

      <Grid container spacing={4} sx={{ mb: 8 }}>
        {sustainabilityGoals.map((goal, index) => (
          <Grid item xs={12} md={6} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.3 }
              }}
            >
              <Paper elevation={2} sx={{ 
                borderRadius: 3,
                overflow: 'hidden',
                height: '100%',
                border: '1px solid rgba(79, 70, 50, 0.12)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 8px 24px rgba(79, 70, 50, 0.12)'
                }
              }}>
                <Box sx={{ position: 'relative', height: 300 }}>
                  <motion.img
                    src={goal.image}
                    alt={goal.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'brightness(0.75)'
                    }}
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  />
                  <Box sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: 4,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)'
                  }}>
                    <Typography variant="h4" component="h3" sx={{ color: 'white', mb: 1 }}>
                      {goal.title}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ p: 4 }}>
                  <Typography variant="body1" sx={{ mb: 3, color: 'text.primary' }}>
                    {goal.description}
                  </Typography>
                  <ul style={{ paddingLeft: 20 }}>
                    {goal.benefits.map((benefit, i) => (
                      <motion.li 
                        key={i}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 + (i * 0.1) }}
                      >
                        <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
                          {benefit}
                        </Typography>
                      </motion.li>
                    ))}
                  </ul>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
                      variant="contained"
                      onClick={() => navigate('/')}
                      sx={{
                        padding: '14px 32px',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        textTransform: 'none',
                        borderRadius: '12px',
                        background: 'linear-gradient(45deg,rgb(61, 142, 64) 30%, #2E7D32 90%)',
                        color: 'white',
                        boxShadow: '0 4px 20px rgba(76, 175, 80, 0.3)',
                        '&:hover': {
                          background: 'linear-gradient(45deg,rgb(109, 142, 56) 30%, #1B5E20 90%)',
                          boxShadow: '0 6px 24px rgba(76, 175, 80, 0.4)'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Back to Home
                    </Button>
        </motion.div>
      </Box>
    </Box>
  );
};

export default SustainabilityPage;