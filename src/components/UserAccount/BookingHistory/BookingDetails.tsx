"use client"

import {
  Box,
  Typography,
  Grid,
  Divider,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Rating,
} from "@mui/material"
import { useState } from "react"
import { Calendar, MapPin, Users, Clock, Star, MessageSquare, XCircle } from "lucide-react"
import type { Booking } from "@/types/booking"

interface BookingDetailsProps {
  booking: Booking
}

const BookingDetails = ({ booking }: BookingDetailsProps) => {
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false)
  const [rating, setRating] = useState<number | null>(0)
  const [reviewText, setReviewText] = useState("")
  const [cancellationReason, setCancellationReason] = useState("")

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const handleCancelBooking = () => {
    // Here you would make an API call to cancel the booking
    console.log("Cancelling booking with reason:", cancellationReason)
    setCancelDialogOpen(false)
    // You would typically update the booking status after successful cancellation
  }

  const handleSubmitReview = () => {
    // Here you would make an API call to submit the review
    console.log("Submitting review:", { rating, reviewText })
    setReviewDialogOpen(false)
    // You would typically show a success message after submission
  }

  const canCancel = booking.status === "confirmed" || booking.status === "pending"
  const canReview = booking.status === "completed" && !booking.hasReviewed

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={4}>
        {/* Booking Information */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Booking Details
          </Typography>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1, mb: 2 }}>
                  <Calendar size={20} style={{ color: "#A0522D", marginTop: "2px" }} />
                  <Box>
                    <Typography variant="subtitle2">Check-in</Typography>
                    <Typography variant="body2">{formatDate(booking.checkInDate)}</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1, mb: 2 }}>
                  <Calendar size={20} style={{ color: "#A0522D", marginTop: "2px" }} />
                  <Box>
                    <Typography variant="subtitle2">Check-out</Typography>
                    <Typography variant="body2">{formatDate(booking.checkOutDate)}</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                  <Users size={20} style={{ color: "#A0522D", marginTop: "2px" }} />
                  <Box>
                    <Typography variant="subtitle2">Guests</Typography>
                    <Typography variant="body2">
                      {booking.guests} {booking.guests === 1 ? "Guest" : "Guests"}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1, mb: 2 }}>
                  <MapPin size={20} style={{ color: "#A0522D", marginTop: "2px" }} />
                  <Box>
                    <Typography variant="subtitle2">Location</Typography>
                    <Typography variant="body2">{booking.location}</Typography>
                    <Typography variant="body2">{booking.address}</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1, mb: 2 }}>
                  <Clock size={20} style={{ color: "#A0522D", marginTop: "2px" }} />
                  <Box>
                    <Typography variant="subtitle2">Status</Typography>
                    <Typography variant="body2">
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Accommodation/Experience Details */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            {booking.type.charAt(0).toUpperCase() + booking.type.slice(1)} Details
          </Typography>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Box
                  component="img"
                  src={booking.image || "/placeholder.svg?height=150&width=250"}
                  alt={booking.name}
                  sx={{
                    width: "100%",
                    height: 150,
                    objectFit: "cover",
                    borderRadius: 1,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant="h6">{booking.name}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {booking.description}
                </Typography>
                {booking.type === "accommodation" && (
                  <Typography variant="body2">
                    <strong>Room Type:</strong> {booking.roomType}
                  </Typography>
                )}
                {booking.type === "experience" && (
                  <Typography variant="body2">
                    <strong>Duration:</strong> {booking.duration}
                  </Typography>
                )}
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 1 }}>
                  <Star size={16} style={{ color: "#F59E0B", fill: "#F59E0B" }} />
                  <Typography variant="body2">
                    {booking.rating} ({booking.reviewCount} reviews)
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Payment Details */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Payment Details
          </Typography>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2">
                  <strong>Payment Method:</strong> {booking.paymentMethod}
                </Typography>
                <Typography variant="body2">
                  <strong>Payment Status:</strong> {booking.paymentStatus}
                </Typography>
                <Typography variant="body2">
                  <strong>Booking Date:</strong> {formatDate(booking.bookingDate)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2">
                  <strong>Base Price:</strong> {formatCurrency(booking.basePrice)}
                </Typography>
                {booking.taxes > 0 && (
                  <Typography variant="body2">
                    <strong>Taxes & Fees:</strong> {formatCurrency(booking.taxes)}
                  </Typography>
                )}
                <Divider sx={{ my: 1 }} />
                <Typography variant="subtitle2">
                  <strong>Total Amount:</strong> {formatCurrency(booking.totalAmount)}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Action Buttons */}
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}>
            {canReview && (
              <Button
                variant="outlined"
                startIcon={<MessageSquare size={16} />}
                onClick={() => setReviewDialogOpen(true)}
                sx={{
                  borderColor: "#A0522D",
                  color: "#A0522D",
                  "&:hover": {
                    borderColor: "#8B4513",
                    backgroundColor: "rgba(160, 82, 45, 0.08)",
                  },
                }}
              >
                Write Review
              </Button>
            )}
            {canCancel && (
              <Button
                variant="outlined"
                color="error"
                startIcon={<XCircle size={16} />}
                onClick={() => setCancelDialogOpen(true)}
              >
                Cancel Booking
              </Button>
            )}
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#A0522D",
                "&:hover": {
                  backgroundColor: "#8B4513",
                },
              }}
            >
              Contact Host
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Cancel Booking Dialog */}
      <Dialog open={cancelDialogOpen} onClose={() => setCancelDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Cancel Booking</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Are you sure you want to cancel this booking? Please provide a reason for cancellation.
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="cancellation-reason"
            label="Cancellation Reason"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={cancellationReason}
            onChange={(e) => setCancellationReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCancelDialogOpen(false)}>Back</Button>
          <Button onClick={handleCancelBooking} color="error">
            Confirm Cancellation
          </Button>
        </DialogActions>
      </Dialog>

      {/* Review Dialog */}
      <Dialog open={reviewDialogOpen} onClose={() => setReviewDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Write a Review</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Share your experience at {booking.name}
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography component="legend">Rating</Typography>
            <Rating
              name="booking-rating"
              value={rating}
              onChange={(_event, newValue) => {
                setRating(newValue)
              }}
              precision={0.5}
            />
          </Box>
          <TextField
            autoFocus
            margin="dense"
            id="review-text"
            label="Your Review"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReviewDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleSubmitReview}
            sx={{
              backgroundColor: "#A0522D",
              color: "white",
              "&:hover": {
                backgroundColor: "#8B4513",
              },
            }}
          >
            Submit Review
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default BookingDetails

