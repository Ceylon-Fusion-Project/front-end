import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, MapPin, BadgeCheck, CalendarCheck, Package, X } from 'lucide-react';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, IconButton, useMediaQuery, useTheme } from '@mui/material';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const location = useLocation();
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  const isActive = (path: string) => location.pathname === path;

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
          backgroundColor: '#4c381e', // Modern dark brown
          color: 'white',
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          CEYLON FUSION
        </Typography>
        {!isLargeScreen && (
          <IconButton onClick={toggleSidebar} sx={{ color: 'white' }}>
            <X />
          </IconButton>
        )}
      </Toolbar>
      <List>
        {[
          { text: 'Dashboard', icon: <LayoutDashboard />, path: '/admin' },
          { text: 'Product Management', icon: <Package />, path: '/admin/products' },
          { text: 'Origin Management', icon: <MapPin />, path: '/admin/origins' },
          { text: 'Certification Management', icon: <BadgeCheck />, path: '/admin/certifications' },
          { text: 'Booking Management', icon: <CalendarCheck />, path: '/admin/bookings' },
        ].map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              sx={{
                backgroundColor: isActive(item.path) ? '#aa7e43' : 'transparent',
                '&:hover': {
                  backgroundColor: '#aa7e43',
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

export default Sidebar;