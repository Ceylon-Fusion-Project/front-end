import { ReactNode, useState } from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography, useTheme, useMediaQuery, Avatar } from '@mui/material';
import { Menu, Person } from '@mui/icons-material';
import ProfileSidebar from './ProfileSidebar';


interface ProfileLayoutProps {
  children: ReactNode;
}

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <Box sx={{ display: 'flex' }}>
      <ProfileSidebar isOpen={sidebarOpen || isLargeScreen} toggleSidebar={toggleSidebar} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: '#1E293B', // Match sidebar color
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleSidebar}
              sx={{ mr: 2, display: { lg: 'none' } }}
            >
              <Menu />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              CEYLON FUSION My Account
            </Typography>
            <Avatar sx={{ bgcolor: '#A0522D' }}>
              <Person />
            </Avatar>
          </Toolbar>
        </AppBar>
        <Toolbar /> {/* Add space for the AppBar */}
        {children}
      </Box>
    </Box>
  );
};

export default ProfileLayout;