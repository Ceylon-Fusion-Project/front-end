"use client"

import type React from "react"

import { useState } from "react"
import {
  Box,
  Typography,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
  Divider,
  Card,
  CardContent,
  Snackbar,
  Alert,
  Chip,
  Autocomplete,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  type SelectChangeEvent,
} from "@mui/material"
import { Globe, Tag } from "lucide-react"

const categories = [
  "Clothing",
  "Accessories",
  "Home Decor",
  "Jewelry",
  "Art",
  "Food",
  "Wellness",
  "Beauty",
  "Crafts",
  "Electronics",
  "Books",
  "Music",
]

const PreferenceSettings = () => {
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  })

  const [language, setLanguage] = useState("english")
  const [currency, setCurrency] = useState("USD")
  const [timezone, setTimezone] = useState("Asia/Colombo")
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["Clothing", "Home Decor"])

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLanguage(event.target.value)
  }

  const handleCurrencyChange = (event: SelectChangeEvent) => {
    setCurrency(event.target.value)
  }

  const handleTimezoneChange = (event: SelectChangeEvent) => {
    setTimezone(event.target.value)
  }

  const handleSave = () => {
    // Here you would make an API call to save the preferences
    setNotification({
      open: true,
      message: "Preferences saved successfully!",
      severity: "success",
    })
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Preferences
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Customize your experience on Ceylon Fusion
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
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
                  <Globe size={20} />
                </Box>
                <Typography variant="h6">Regional Settings</Typography>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <FormLabel id="language-label">Language</FormLabel>
                    <RadioGroup
                      aria-labelledby="language-label"
                      name="language"
                      value={language}
                      onChange={handleLanguageChange}
                    >
                      <FormControlLabel value="english" control={<Radio />} label="English" />
                      <FormControlLabel value="sinhala" control={<Radio />} label="Sinhala" />
                      <FormControlLabel value="tamil" control={<Radio />} label="Tamil" />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel id="currency-label">Currency</InputLabel>
                    <Select
                      labelId="currency-label"
                      id="currency"
                      value={currency}
                      label="Currency"
                      onChange={handleCurrencyChange}
                    >
                      <MenuItem value="LKR">Sri Lankan Rupee (LKR)</MenuItem>
                      <MenuItem value="USD">US Dollar (USD)</MenuItem>
                      <MenuItem value="EUR">Euro (EUR)</MenuItem>
                      <MenuItem value="GBP">British Pound (GBP)</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel id="timezone-label">Timezone</InputLabel>
                    <Select
                      labelId="timezone-label"
                      id="timezone"
                      value={timezone}
                      label="Timezone"
                      onChange={handleTimezoneChange}
                    >
                      <MenuItem value="Asia/Colombo">Colombo (GMT+5:30)</MenuItem>
                      <MenuItem value="America/New_York">New York (GMT-4)</MenuItem>
                      <MenuItem value="Europe/London">London (GMT+1)</MenuItem>
                      <MenuItem value="Asia/Tokyo">Tokyo (GMT+9)</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
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
                  <Tag size={20} />
                </Box>
                <Typography variant="h6">Product Preferences</Typography>
              </Box>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <Autocomplete
                  multiple
                  id="categories"
                  options={categories}
                  value={selectedCategories}
                  onChange={(_event, newValue) => {
                    setSelectedCategories(newValue)
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Product Categories of Interest"
                      placeholder="Select categories"
                    />
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        label={option}
                        {...getTagProps({ index })}
                        sx={{
                          backgroundColor: "rgba(160, 82, 45, 0.1)",
                          color: "#A0522D",
                          "& .MuiChip-deleteIcon": {
                            color: "#A0522D",
                            "&:hover": {
                              color: "#8B4513",
                            },
                          },
                        }}
                      />
                    ))
                  }
                />
              </FormControl>
            </CardContent>
          </Card>
        </Grid>
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

export default PreferenceSettings

