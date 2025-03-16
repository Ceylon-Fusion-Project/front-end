"use client"
import { useState } from "react"
import type React from "react"
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  InputAdornment,
  Pagination,
  Snackbar,
  Alert,
} from "@mui/material"
import { Search, ListFilterIcon as FilterList } from "lucide-react"
import type { Booking } from "@/types/booking"
import BookingFilters from "@/components/UserAccount/BookingHistory/BookingFilters"
import BookingList from "@/components/UserAccount/BookingHistory/BookingList"

// Mock data for bookings
const mockBookings: Booking[] = [
  {
    id: "BK-2024-0045",
    type: "accommodation",
    name: "Cinnamon Grand Colombo",
    description: "Luxury hotel in the heart of Colombo with stunning ocean views",
    roomType: "Deluxe Ocean View",
    image: "/placeholder.svg?height=150&width=250",
    location: "Colombo",
    address: "77 Galle Road, Colombo 03, Sri Lanka",
    checkInDate: "2024-02-15",
    checkOutDate: "2024-02-18",
    bookingDate: "2024-01-20",
    guests: 2,
    status: "completed",
    paymentMethod: "Credit Card",
    paymentStatus: "Paid",
    basePrice: 45000,
    taxes: 5000,
    totalAmount: 50000,
    rating: 4.8,
    reviewCount: 245,
    hasReviewed: false,
  },
  {
    id: "BK-2024-0067",
    type: "experience",
    name: "Ceylon Tea Plantation Tour",
    description: "Guided tour of historic tea plantations with tea tasting experience",
    duration: "Full Day (8 hours)",
    image: "/placeholder.svg?height=150&width=250",
    location: "Nuwara Eliya",
    address: "Pedro Tea Estate, Nuwara Eliya, Sri Lanka",
    checkInDate: "2024-03-10",
    checkOutDate: "2024-03-10",
    bookingDate: "2024-02-05",
    guests: 4,
    status: "confirmed",
    paymentMethod: "PayPal",
    paymentStatus: "Paid",
    basePrice: 24000,
    taxes: 2400,
    totalAmount: 26400,
    rating: 4.9,
    reviewCount: 128,
    hasReviewed: false,
  },
  {
    id: "BK-2024-0089",
    type: "accommodation",
    name: "Sigiriya Eco Lodge",
    description: "Eco-friendly accommodation near the ancient rock fortress",
    roomType: "Garden Cabana",
    image: "/placeholder.svg?height=150&width=250",
    location: "Sigiriya",
    address: "Sigiriya Wildlife Corridor, Sigiriya, Sri Lanka",
    checkInDate: "2024-04-05",
    checkOutDate: "2024-04-08",
    bookingDate: "2024-02-20",
    guests: 2,
    status: "pending",
    paymentMethod: "Credit Card",
    paymentStatus: "Pending",
    basePrice: 30000,
    taxes: 3000,
    totalAmount: 33000,
    rating: 4.6,
    reviewCount: 87,
    hasReviewed: false,
  },
  {
    id: "BK-2023-0156",
    type: "experience",
    name: "Whale Watching Expedition",
    description: "Boat tour to see blue whales and dolphins in their natural habitat",
    duration: "Half Day (4 hours)",
    image: "/placeholder.svg?height=150&width=250",
    location: "Mirissa",
    address: "Mirissa Harbor, Mirissa, Sri Lanka",
    checkInDate: "2023-12-12",
    checkOutDate: "2023-12-12",
    bookingDate: "2023-11-25",
    guests: 3,
    status: "cancelled",
    paymentMethod: "Credit Card",
    paymentStatus: "Refunded",
    basePrice: 18000,
    taxes: 1800,
    totalAmount: 19800,
    rating: 4.7,
    reviewCount: 156,
    hasReviewed: false,
  },
  {
    id: "BK-2024-0102",
    type: "accommodation",
    name: "Ella Treehouse Retreat",
    description: "Unique treehouse accommodation with panoramic mountain views",
    roomType: "Luxury Treehouse",
    image: "/placeholder.svg?height=150&width=250",
    location: "Ella",
    address: "Ella Rock Road, Ella, Sri Lanka",
    checkInDate: "2024-05-20",
    checkOutDate: "2024-05-23",
    bookingDate: "2024-03-01",
    guests: 2,
    status: "confirmed",
    paymentMethod: "Credit Card",
    paymentStatus: "Paid",
    basePrice: 36000,
    taxes: 3600,
    totalAmount: 39600,
    rating: 4.9,
    reviewCount: 64,
    hasReviewed: false,
  },
]

const BookingsPage = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const [notification, setNotification] = useState<{
    open: boolean
    message: string
    severity: "success" | "error" | "info" | "warning"
  }>({
    open: false,
    message: "",
    severity: "info",
  })
  const [dateRange, setDateRange] = useState<{
    startDate: string
    endDate: string
  }>({
    startDate: "",
    endDate: "",
  })

  const bookingsPerPage = 3

  // Filter and sort bookings
  const filteredBookings = mockBookings
    .filter((booking) => {
      // Apply search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          booking.id.toLowerCase().includes(query) ||
          booking.name.toLowerCase().includes(query) ||
          booking.location.toLowerCase().includes(query)
        )
      }
      return true
    })
    .filter((booking) => {
      // Apply status filter
      if (statusFilter !== "all") {
        return booking.status === statusFilter
      }
      return true
    })
    .filter((booking) => {
      // Apply date range filter
      if (dateRange.startDate && dateRange.endDate) {
        const bookingDate = new Date(booking.checkInDate)
        const startDate = new Date(dateRange.startDate)
        const endDate = new Date(dateRange.endDate)
        return bookingDate >= startDate && bookingDate <= endDate
      }
      return true
    })
    .sort((a, b) => {
      // Sort by date (newest first)
      return new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime()
    })

  // Pagination
  const indexOfLastBooking = currentPage * bookingsPerPage
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage
  const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking)
  const pageCount = Math.ceil(filteredBookings.length / bookingsPerPage)

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
  }

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value)
    setCurrentPage(1)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
    setCurrentPage(1)
  }

  const handleDateRangeChange = (type: "startDate" | "endDate", value: string) => {
    setDateRange({
      ...dateRange,
      [type]: value,
    })
    setCurrentPage(1)
  }

  const handleToggleFilters = () => {
    setShowFilters(!showFilters)
  }

  const handleClearFilters = () => {
    setSearchQuery("")
    setStatusFilter("all")
    setDateRange({ startDate: "", endDate: "" })
    setCurrentPage(1)
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3, backgroundColor: "#F8FAFC", minHeight: "100vh" }}>
      <Typography variant="h4" gutterBottom sx={{ color: "#1E293B" }}>
        My Bookings
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        View and manage your accommodation and experience bookings
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                placeholder="Search by booking ID, name, or location"
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search size={20} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    color: "#A0522D",
                  }}
                  onClick={handleToggleFilters}
                >
                  <FilterList size={20} style={{ marginRight: "4px" }} />
                  <Typography variant="body2">{showFilters ? "Hide Filters" : "Show Filters"}</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
          {showFilters && (
            <BookingFilters
              dateRange={dateRange}
              statusFilter={statusFilter}
              onDateRangeChange={handleDateRangeChange}
              onStatusFilterChange={handleStatusFilterChange}
              onClearFilters={handleClearFilters}
            />
          )}
        </CardContent>
      </Card>

      <BookingList bookings={currentBookings} />

      {filteredBookings.length > bookingsPerPage && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={pageCount}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            sx={{
              "& .MuiPaginationItem-root.Mui-selected": {
                backgroundColor: "#A0522D",
                color: "white",
              },
            }}
          />
        </Box>
      )}

      {filteredBookings.length === 0 && (
        <Card sx={{ mt: 3 }}>
          <CardContent sx={{ textAlign: "center", py: 6 }}>
            <Typography variant="h6" color="text.secondary">
              No bookings found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Try adjusting your search or filter criteria
            </Typography>
          </CardContent>
        </Card>
      )}

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

export default BookingsPage

