"use client"

import type React from "react"

import { useState } from "react"
import {
  Box,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
} from "@mui/material"
import { CreditCard, Plus, Trash2 } from "lucide-react"

interface PaymentMethod {
  id: string
  type: "card" | "paypal"
  name: string
  details: string
  isDefault: boolean
}

const PaymentSettings = () => {
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  })

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "1",
      type: "card",
      name: "Visa ending in 4242",
      details: "Expires 12/2025",
      isDefault: true,
    },
    {
      id: "2",
      type: "paypal",
      name: "PayPal",
      details: "john.doe@example.com",
      isDefault: false,
    },
  ])

  const [dialogOpen, setDialogOpen] = useState(false)
  const [newCard, setNewCard] = useState({
    cardNumber: "",
    cardName: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  })

  const handleDialogClose = () => {
    setDialogOpen(false)
    setNewCard({
      cardNumber: "",
      cardName: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewCard({
      ...newCard,
      [name]: value,
    })
  }

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target
    setNewCard({
      ...newCard,
      [name]: value,
    })
  }

  const handleAddCard = () => {
    // Here you would validate and process the card details
    // For demo purposes, we'll just add a mock card
    const newPaymentMethod: PaymentMethod = {
      id: Date.now().toString(),
      type: "card",
      name: `Card ending in ${newCard.cardNumber.slice(-4)}`,
      details: `Expires ${newCard.expiryMonth}/${newCard.expiryYear}`,
      isDefault: false,
    }

    setPaymentMethods([...paymentMethods, newPaymentMethod])
    setNotification({
      open: true,
      message: "Payment method added successfully!",
      severity: "success",
    })

    handleDialogClose()
  }

  const handleRemovePaymentMethod = (id: string) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id))
    setNotification({
      open: true,
      message: "Payment method removed",
      severity: "success",
    })
  }

  const handleSetDefault = (id: string) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      })),
    )

    setNotification({
      open: true,
      message: "Default payment method updated",
      severity: "success",
    })
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Payment Methods
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Manage your payment methods for purchases and subscriptions
      </Typography>

      <Grid container spacing={3}>
        {paymentMethods.map((method) => (
          <Grid item xs={12} md={6} key={method.id}>
            <Card variant="outlined">
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
                    <CreditCard size={20} />
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography variant="subtitle1">{method.name}</Typography>
                      {method.isDefault && (
                        <Typography
                          variant="caption"
                          sx={{
                            bgcolor: "rgba(160, 82, 45, 0.1)",
                            color: "#A0522D",
                            px: 1,
                            py: 0.5,
                            borderRadius: 1,
                            fontSize: "0.7rem",
                          }}
                        >
                          Default
                        </Typography>
                      )}
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {method.details}
                    </Typography>
                  </Box>
                  <Box>
                    {!method.isDefault && (
                      <Button
                        variant="text"
                        size="small"
                        onClick={() => handleSetDefault(method.id)}
                        sx={{ color: "#A0522D" }}
                      >
                        Set Default
                      </Button>
                    )}
                    <Button
                      variant="text"
                      color="error"
                      size="small"
                      onClick={() => handleRemovePaymentMethod(method.id)}
                      startIcon={<Trash2 size={16} />}
                    >
                      Remove
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}

        <Grid item xs={12} md={6}>
          <Card
            variant="outlined"
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              border: "1px dashed",
              borderColor: "divider",
              "&:hover": {
                borderColor: "#A0522D",
                backgroundColor: "rgba(160, 82, 45, 0.05)",
              },
            }}
            onClick={() => setDialogOpen(true)}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <Plus size={24} style={{ color: "#A0522D", marginBottom: "8px" }} />
              <Typography variant="subtitle1">Add Payment Method</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Add Payment Method Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add Payment Method</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Card Number"
                  name="cardNumber"
                  value={newCard.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name on Card"
                  name="cardName"
                  value={newCard.cardName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="expiry-month-label">Month</InputLabel>
                  <Select
                    labelId="expiry-month-label"
                    name="expiryMonth"
                    value={newCard.expiryMonth}
                    label="Month"
                    onChange={handleSelectChange}
                  >
                    {Array.from({ length: 12 }, (_, i) => {
                      const month = (i + 1).toString().padStart(2, "0")
                      return (
                        <MenuItem key={month} value={month}>
                          {month}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="expiry-year-label">Year</InputLabel>
                  <Select
                    labelId="expiry-year-label"
                    name="expiryYear"
                    value={newCard.expiryYear}
                    label="Year"
                    onChange={handleSelectChange}
                  >
                    {Array.from({ length: 10 }, (_, i) => {
                      const year = (new Date().getFullYear() + i).toString()
                      return (
                        <MenuItem key={year} value={year}>
                          {year}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="CVV"
                  name="cvv"
                  value={newCard.cvv}
                  onChange={handleInputChange}
                  type="password"
                  inputProps={{ maxLength: 4 }}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button
            onClick={handleAddCard}
            variant="contained"
            sx={{
              backgroundColor: "#A0522D",
              "&:hover": {
                backgroundColor: "#8B4513",
              },
            }}
          >
            Add Card
          </Button>
        </DialogActions>
      </Dialog>

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

export default PaymentSettings

