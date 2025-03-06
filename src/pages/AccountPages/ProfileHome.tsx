import ProfileInfo from '@/components/UserAccount/ProfileInfo';
import { Box, Typography, Grid } from '@mui/material';


const ProfileHome = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 3, backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#1E293B' }}>
        My Profile
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ProfileInfo />
        </Grid>
        {/* You could add more components here, like a summary of recent activities */}
      </Grid>
    </Box>
  );
};

export default ProfileHome;