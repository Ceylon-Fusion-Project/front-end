import { Link, useLocation } from 'react-router-dom';
import { User, ShoppingBag, CalendarCheck, Settings,  X } from 'lucide-react';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, IconButton, useMediaQuery, useTheme } from '@mui/material';

interface ProfileSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const ProfileSidebar = ({ isOpen, toggleSidebar }: ProfileSidebarProps) => {
  const location = useLocation();
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  const isActive = (path: string) => location.pathname === `/profile${path}`;

  return (
    <Drawer
      variant={isLargeScreen ? 'permanent' : 'temporary'}
      open={isOpen}
      onClose={toggleSidebar}
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#1E293B', // Modern dark blue
          color: 'white',
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          My Account
        </Typography>
        {!isLargeScreen && (
          <IconButton onClick={toggleSidebar} sx={{ color: 'white' }}>
            <X />
          </IconButton>
        )}
      </Toolbar>
      <List>
        {[
          { text: 'Profile', icon: <User />, path: '/' },
          { text: 'My Orders', icon: <ShoppingBag />, path: '/orders' },
          { text: 'My Bookings', icon: <CalendarCheck />, path: '/bookings' },
          //{ text: 'Dashboard', icon: <LayoutDashboard />, path: '/dashboard' },
          { text: 'Settings', icon: <Settings />, path: '/settings' },
        ].map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              to={`/profile${item.path}`}
              sx={{
                backgroundColor: isActive(item.path) ? '#334155' : 'transparent',
                '&:hover': {
                  backgroundColor: '#334155',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default ProfileSidebar;