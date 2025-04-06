import { ReactNode, useState, MouseEvent, useEffect } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
  Badge,
  Tooltip,
} from "@mui/material";
import { Menu as MenuIcon, Notifications, Settings } from "@mui/icons-material";
import { useNavigate } from "react-router-dom"; // Import Link and useNavigate
import Sidebar from "./Sidebar";
import NotificationService from "@/utils/NotificationService";
import userConfirmation from "@/utils/useConfirmation";
import api from "@/api/axiosInstance";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchor, setNotificationAnchor] =
    useState<null | HTMLElement>(null);
  const navigate = useNavigate(); // Use React Router's useNavigate hook
  const { requestConfirmation, ConfirmationDialog } = userConfirmation();
  const [_isLoggedIn, setIsLoggedIn] = useState(true);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const handleMenuOpen = (event: MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleNotificationOpen = (event: MouseEvent<HTMLElement>) =>
    setNotificationAnchor(event.currentTarget);
  const handleNotificationClose = () => setNotificationAnchor(null);

  // 👇 Auth check function
  const checkAuth = async () => {
    try {
      const response = await api.get("/auth/check");
      if (!response.data.authenticated) {
        navigate("/", { replace: true });
      } else {
        setIsCheckingAuth(false);
      }
    } catch (error) {
      navigate("/", { replace: true });
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);

  // Logout function
  const handleLogout = () => {
    requestConfirmation({
      title: "Logout Confirmation",
      message: "Are you sure you want to logout?",
      onConfirm: async () => {
        try {
          await api.get("/auth/logout");
          setIsLoggedIn(false);
          NotificationService.success("You have been logged out.");
          navigate("/");
        } catch (error) {
          console.error("Logout failed:", error);
          NotificationService.error("Logout failed. Try again.");
        }
      },
      onCancel: () => NotificationService.info("Logout canceled."),
    });
  };

  if (isCheckingAuth) {
    return <div>Checking authentication...</div>;
  }
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar
        isOpen={sidebarOpen || isLargeScreen}
        toggleSidebar={toggleSidebar}
      />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: "#4c381e",
          }}
        >
          <Toolbar>
            {/* Sidebar toggle button */}
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleSidebar}
              sx={{ mr: 2, display: { lg: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            {/* Dashboard title */}
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
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
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={handleNotificationClose}>
                New booking confirmed
              </MenuItem>
              <MenuItem onClick={handleNotificationClose}>
                Order dispatched
              </MenuItem>
              <MenuItem onClick={handleNotificationClose}>
                New user registered
              </MenuItem>
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
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={() => navigate("/admin/profile")}>
                My Profile
              </MenuItem>{" "}
              {/* Use navigate */}
              <MenuItem onClick={() => navigate("/admin/profilesettings")}>
                Account Settings
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Toolbar />
        {children} {/* Render the nested routes */}
      </Box>
      {/* Confirmation Dialog */}
      <ConfirmationDialog />
    </Box>
  );
};

export default AdminLayout;
