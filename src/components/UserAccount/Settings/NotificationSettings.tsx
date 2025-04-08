"use client"

import type React from "react"

import { useState } from "react"
import {
  Box,
  Typography,
  Grid,
  Switch,
  FormControlLabel,
  Divider,
  Button,
  Snackbar,
  Alert,
  Card,
  CardContent,
} from "@mui/material"
import { Bell, Mail, MessageSquare, BellRing } from "lucide-react"

interface NotificationSetting {
  id: string
  title: string
  description: string
  enabled: boolean
  icon: React.ReactNode
}

const NotificationSettings = () => {
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  })

  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: "email_notifications",
      title: "Email Notifications",
      description: "Receive order updates, promotions, and account information via email",
      enabled: true,
      icon: <Mail size={20} />,
    },
    {
      id: "sms_notifications",
      title: "SMS Notifications",
      description: "Get text messages for order status changes and important updates",
      enabled: false,
      icon: <MessageSquare size={20} />,
    },
    {
      id: "push_notifications",
      title: "Push Notifications",
      description: "Receive alerts on your device for new offers and order updates",
      enabled: true,
      icon: <BellRing size={20} />,
    },
    {
      id: "marketing_emails",
      title: "Marketing Communications",
      description: "Stay updated with our latest products, offers, and promotions",
      enabled: false,
      icon: <Bell size={20} />,
    },
  ])

  const handleToggle = (id: string) => {
    setSettings(settings.map((setting) => (setting.id === id ? { ...setting, enabled: !setting.enabled } : setting)))
  }

  const handleSave = () => {
    // Here you would make an API call to save the notification settings
    setNotification({
      open: true,
      message: "Notification settings saved successfully!",
      severity: "success",
    })
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Notification Preferences
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Manage how you receive notifications and updates from Ceylon Fusion
      </Typography>

      <Grid container spacing={3}>
        {settings.map((setting) => (
          <Grid item xs={12} key={setting.id}>
            <Card variant="outlined" sx={{ mb: 2 }}>
              <CardContent sx={{ display: "flex", alignItems: "flex-start", gap: 2, p: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "rgba(160, 82, 45, 0.1)",
                    borderRadius: "50%",
                    p: 1,
                    color: "#A0522D",
                  }}
                >
                  {setting.icon}
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1">{setting.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {setting.description}
                  </Typography>
                </Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={setting.enabled}
                      onChange={() => handleToggle(setting.id)}
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: "#A0522D",
                          "&:hover": {
                            backgroundColor: "rgba(160, 82, 45, 0.08)",
                          },
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                          backgroundColor: "#A0522D",
                        },
                      }}
                    />
                  }
                  label=""
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          onClick={handleSave}
          sx={{
            backgroundColor: "#A0522D",
            "&:hover": {
              backgroundColor: "#8B4513",
            },
          }}
        >
          Save Preferences
        </Button>
      </Box>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, open: false })}
      >
        <Alert severity={notification.severity}>{notification.message}</Alert>
      </Snackbar>
    </Box>
  )
}

export default NotificationSettings

