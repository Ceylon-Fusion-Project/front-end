"use client"

import type React from "react"

import { useState } from "react"
import { Box, Typography, Card, CardContent, Tabs, Tab } from "@mui/material"
import NotificationSettings from "@/components/UserAccount/Settings/NotificationSettings"
// import SecuritySettings from "@/components/UserAccount/Settings/SecuritySettings"
import PreferenceSettings from "@/components/UserAccount/Settings/PreferenceSettings"
import PaymentSettings from "@/components/UserAccount/Settings/PaymentSettings"

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `settings-tab-${index}`,
    "aria-controls": `settings-tabpanel-${index}`,
  }
}

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState(0)

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3, backgroundColor: "#F8FAFC", minHeight: "100vh" }}>
      <Typography variant="h4" gutterBottom sx={{ color: "#1E293B" }}>
        Account Settings
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              aria-label="settings tabs"
              sx={{
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontWeight: "medium",
                },
                "& .Mui-selected": {
                  color: "#A0522D",
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: "#A0522D",
                },
              }}
            >
              <Tab label="Notifications" {...a11yProps(0)} />
              {/* <Tab label="Security" {...a11yProps(1)} /> */}
              <Tab label="Preferences" {...a11yProps(2)} />
              <Tab label="Payment Methods" {...a11yProps(3)} />
            </Tabs>
          </Box>

          <TabPanel value={activeTab} index={0}>
            <NotificationSettings />
          </TabPanel>

          {/* <TabPanel value={activeTab} index={1}>
            <SecuritySettings />
          </TabPanel> */}

          <TabPanel value={activeTab} index={2}>
            <PreferenceSettings />
          </TabPanel>

          <TabPanel value={activeTab} index={3}>
            <PaymentSettings />
          </TabPanel>
        </CardContent>
      </Card>
    </Box>
  )
}

export default SettingsPage

