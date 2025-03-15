import React, { useState } from 'react';
import {
  Grid,
  Typography,
  TextField,
  Button,
  Box,
  Divider,
  FormControlLabel,
  Switch,
  Card,
  CardContent,
  CardHeader,
  IconButton,
} from '@mui/material';
import { ExpandMore, CloudDownload, Delete, Security, Notifications, Analytics } from '@mui/icons-material';

const AdminSettings = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [notificationPreferences, setNotificationPreferences] = useState({
    email: true,
    sms: false,
    push: true,
  });

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* Security Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title={
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Security /> Security Settings
                </Typography>
              }
            />
            <CardContent>
              <Box>
                <Typography variant="subtitle1" gutterBottom>Change Password</Typography>
                <TextField
                  fullWidth
                  label="Current Password"
                  type="password"
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="New Password"
                  type="password"
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Confirm New Password"
                  type="password"
                  sx={{ mb: 2 }}
                />
                <Button variant="contained" sx={{ backgroundColor: '#A0522D', '&:hover': { backgroundColor: '#8B4513' } }}>
                  Update Password
                </Button>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* <Box>
                <Typography variant="subtitle1" gutterBottom>Two-Factor Authentication</Typography>
                <FormControlLabel
                  control={<Switch checked={twoFactorEnabled} onChange={() => setTwoFactorEnabled(!twoFactorEnabled)} />}
                  label="Enable Two-Factor Authentication"
                />
              </Box> */}
            </CardContent>
          </Card>
        </Grid>

        {/* Account Management */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title={
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Security /> Account Management
                </Typography>
              }
            />
            <CardContent>
              <Box>
                <Typography variant="subtitle1" gutterBottom>Export Data</Typography>
                <Button
                  variant="outlined"
                  startIcon={<CloudDownload />}
                  sx={{ mb: 2, color: '#A0522D', borderColor: '#A0522D', '&:hover': { borderColor: '#8B4513' } }}
                >
                  Export Profile Data
                </Button>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box>
                <Typography variant="subtitle1" gutterBottom>Delete Account</Typography>
                <Button
                  variant="outlined"
                  startIcon={<Delete />}
                  sx={{ color: '#FF0000', borderColor: '#A0522D', '&:hover': { borderColor: '#8B4513' } }}
                >
                  Delete Account
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Notification Preferences */}
        {/* <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title={
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Notifications /> Notification Preferences
                </Typography>
              }
            />
            <CardContent>
              <Box>
                <Typography variant="subtitle1" gutterBottom>Manage Notifications</Typography>
                <FormControlLabel
                  control={<Switch checked={notificationPreferences.email} onChange={() => setNotificationPreferences({ ...notificationPreferences, email: !notificationPreferences.email })} />}
                  label="Email Notifications"
                />
                <FormControlLabel
                  control={<Switch checked={notificationPreferences.sms} onChange={() => setNotificationPreferences({ ...notificationPreferences, sms: !notificationPreferences.sms })} />}
                  label="SMS Notifications"
                />
                <FormControlLabel
                  control={<Switch checked={notificationPreferences.push} onChange={() => setNotificationPreferences({ ...notificationPreferences, push: !notificationPreferences.push })} />}
                  label="Push Notifications"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid> */}

        {/* Analytics & Reports */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title={
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Analytics /> Analytics & Reports
                </Typography>
              }
            />
            <CardContent>
              <Box>
                <Typography variant="subtitle1" gutterBottom>Sales Reports</Typography>
                <Button
                  variant="outlined"
                  startIcon={<CloudDownload />}
                  sx={{ mb: 2, color: '#A0522D', borderColor: '#A0522D', '&:hover': { borderColor: '#8B4513' } }}
                >
                  Download Sales Report
                </Button>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box>
                <Typography variant="subtitle1" gutterBottom>Booking Reports</Typography>
                <Button
                  variant="outlined"
                  startIcon={<CloudDownload />}
                  sx={{ color: '#A0522D', borderColor: '#A0522D', '&:hover': { borderColor: '#8B4513' } }}
                >
                  Download Bookings Report
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminSettings;