import { ReactNode, useState, MouseEvent } from 'react';
import { 
  Box, AppBar, Toolbar, IconButton, Typography, useTheme, useMediaQuery, 
  Menu, MenuItem, Badge, Tooltip 
} from '@mui/material';
import { Menu as MenuIcon, Notifications, Settings } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import Sidebar from './Sidebar';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchor, setNotificationAnchor] = useState<null | HTMLElement>(null);
  const navigate = useNavigate(); // Use React Router's useNavigate hook

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleNotificationOpen = (event: MouseEvent<HTMLElement>) => setNotificationAnchor(event.currentTarget);
  const handleNotificationClose = () => setNotificationAnchor(null);

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar isOpen={sidebarOpen || isLargeScreen} toggleSidebar={toggleSidebar} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: '#4c381e',
          }}
        >
          <Toolbar>
            {/* Sidebar toggle button */}
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleSidebar}
              sx={{ mr: 2, display: { lg: 'none' } }}
            >
              <MenuIcon />
            </IconButton>

            {/* Dashboard title */}
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              CEYLON FUSION Admin Dashboard
            </Typography>

            {/* Notifications Icon */}
            <IconButton color="inherit" onClick={handleNotificationOpen}>
              <Badge badgeContent={3} color="error">
                <Notifications />
              </Badge>
            </IconButton>

            {/* Notifications Dropdown */}
            <Menu
              anchorEl={notificationAnchor}
              open={Boolean(notificationAnchor)}
              onClose={handleNotificationClose}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem onClick={handleNotificationClose}>New booking confirmed</MenuItem>
              <MenuItem onClick={handleNotificationClose}>Order dispatched</MenuItem>
              <MenuItem onClick={handleNotificationClose}>New user registered</MenuItem>
            </Menu>

            {/* Settings Icon */}
            <Tooltip title="Settings">
              <IconButton color="inherit" onClick={handleMenuOpen}>
                <Settings />
              </IconButton>
            </Tooltip>

            {/* Settings Dropdown */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <MenuItem onClick={() => navigate('/admin/profile')}>My Profile</MenuItem> {/* Use navigate */}
              <MenuItem onClick={handleMenuClose}>Account Settings</MenuItem>
              <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Toolbar />
        {children} {/* Render the nested routes */}
      </Box>
    </Box>
  );
};

export default AdminLayout;