import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, MapPin, BadgeCheck, CalendarCheck, Package, X } from 'lucide-react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';

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
          background: 'linear-gradient(180deg, #4c381e 0%, #2c1f12 100%)', // Gradient background
          color: 'white',
          boxShadow: '4px 0 10px rgba(0, 0, 0, 0.2)', // Subtle shadow
        },
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(255, 255, 255, 0.1)', // Semi-transparent background
          backdropFilter: 'blur(10px)', // Blur effect
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)', // Subtle border
        }}
      >
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            flexGrow: 1,
            fontFamily: 'Poppins, sans-serif', // Modern font
            fontWeight: 600,
            letterSpacing: '0.5px',
          }}
        >
          CEYLON FUSION
        </Typography>
        {!isLargeScreen && (
          <IconButton onClick={toggleSidebar} sx={{ color: 'white' }}>
            <X />
          </IconButton>
        )}
      </Toolbar>
      <List sx={{ padding: '8px' }}>
        {[
          { text: 'Dashboard', icon: <LayoutDashboard />, path: '/admin' },
          { text: 'Product Management', icon: <Package />, path: '/admin/products' },
          { text: 'Origin Management', icon: <MapPin />, path: '/admin/origins' },
          { text: 'Certification Management', icon: <BadgeCheck />, path: '/admin/certifications' },
          { text: 'Booking Management', icon: <CalendarCheck />, path: '/admin/bookings' },
        ].map((item) => (
          <ListItem key={item.text} disablePadding sx={{ marginBottom: '4px' }}>
            <ListItemButton
              component={Link}
              to={item.path}
              sx={{
                borderRadius: '8px', // Rounded corners
                backgroundColor: isActive(item.path) ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)', // Subtle hover effect
                },
                transition: 'background-color 0.3s ease', // Smooth transition
              }}
            >
              <ListItemIcon sx={{ color: 'white', minWidth: '40px' }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontFamily: 'Poppins, sans-serif', // Modern font
                  fontWeight: 500,
                  fontSize: '0.9rem',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;