"use client"
import { useState } from "react"
import { Box, Card, CardContent, Typography, Chip, Grid, Collapse, Button, Divider } from "@mui/material"
import { ChevronDown, ChevronUp, MapPin, Users, CheckCircle, XCircle, Clock } from "lucide-react"
import type { Booking } from "@/types/booking"
import BookingDetails from "./BookingDetails"

interface BookingListProps {
  bookings: Booking[]
}

const BookingList = ({ bookings }: BookingListProps) => {
  const [expandedBookingId, setExpandedBookingId] = useState<string | null>(null)

  const toggleBookingDetails = (bookingId: string) => {
    setExpandedBookingId(expandedBookingId === bookingId ? null : bookingId)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle size={16} />
      case "pending":
        return <Clock size={16} />
      case "completed":
        return <CheckCircle size={16} />
      case "cancelled":
        return <XCircle size={16} />
      default:
        return <Clock size={16} />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "#10B981" // Green
      case "pending":
        return "#F59E0B" // Amber
      case "completed":
        return "#3B82F6" // Blue
      case "cancelled":
        return "#EF4444" // Red
      default:
        return "#6B7280" // Gray
    }
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
    }).format(amount)
  }

  return (
    <Box>
      {bookings.map((booking) => (
        <Card key={booking.id} sx={{ mb: 3 }}>
          <CardContent sx={{ p: 0 }}>
            {/* Booking Header */}
            <Box
              sx={{
                p: 2,
                borderBottom: "1px solid",
                borderColor: "divider",
                backgroundColor: "rgba(0, 0, 0, 0.02)",
              }}
            >
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle1" fontWeight="medium">
                    Booking #{booking.id}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(booking.checkInDate)} - {formatDate(booking.checkOutDate)}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography variant="body2" color="text.secondary">
                    <Box component="span" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                      <MapPin size={14} />
                      {booking.location}
                    </Box>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <Box component="span" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                      <Users size={14} />
                      {booking.guests} {booking.guests === 1 ? "Guest" : "Guests"}
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="body2" fontWeight="medium">
                    {formatCurrency(booking.totalAmount)}
                  </Typography>
                  <Chip
                    icon={getStatusIcon(booking.status)}
                    label={booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    size="small"
                    sx={{
                      backgroundColor: `${getStatusColor(booking.status)}20`,
                      color: getStatusColor(booking.status),
                      borderColor: getStatusColor(booking.status),
                      "& .MuiChip-icon": {
                        color: getStatusColor(booking.status),
                      },
                    }}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6} sm={2}>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      onClick={() => toggleBookingDetails(booking.id)}
                      endIcon={expandedBookingId === booking.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      sx={{
                        color: "#A0522D",
                        "&:hover": {
                          backgroundColor: "rgba(160, 82, 45, 0.08)",
                        },
                      }}
                    >
                      {expandedBookingId === booking.id ? "Hide" : "Details"}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            {/* Booking Details (Collapsible) */}
            <Collapse in={expandedBookingId === booking.id}>
              <Divider />
              <BookingDetails booking={booking} />
            </Collapse>
          </CardContent>
        </Card>
      ))}
    </Box>
  )
}

export default BookingList

