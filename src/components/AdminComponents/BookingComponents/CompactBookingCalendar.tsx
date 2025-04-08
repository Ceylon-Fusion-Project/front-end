"use client"

import type React from "react"

import { useState } from "react"
import {
  Paper,
  Typography,
  Box,
  Grid,
  Chip,
  IconButton,
  Tooltip,
  Card,
  CardContent,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material"
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Hotel as HotelIcon,
  MeetingRoom as RoomIcon,
  Event as EventIcon,
  LocalActivity as PackageIcon,
  Explore as ExperienceIcon,
  FilterList as FilterIcon,
} from "@mui/icons-material"

// Types for our bookings
interface Booking {
  id: string
  title: string
  date: Date
  type: "room" | "event" | "package" | "accommodation" | "experience"
  status: "confirmed" | "pending" | "cancelled"
  customer: string
}

// Mock data - replace with your actual data fetching logic
const mockBookings: Booking[] = [
  {
    id: "1",
    title: "Deluxe Room",
    date: new Date(2025, 3, 5), // April 5, 2025
    type: "room",
    status: "confirmed",
    customer: "John Doe",
  },
  {
    id: "2",
    title: "Cinnamon Tour",
    date: new Date(2025, 3, 8), // April 8, 2025
    type: "experience",
    status: "pending",
    customer: "Jane Smith",
  },
  {
    id: "3",
    title: "Festival Event",
    date: new Date(2025, 3, 15), // April 15, 2025
    type: "event",
    status: "confirmed",
    customer: "Group Booking",
  },
  {
    id: "4",
    title: "Premium Suite",
    date: new Date(2025, 3, 10), // April 10, 2025
    type: "accommodation",
    status: "confirmed",
    customer: "Robert Johnson",
  },
  {
    id: "5",
    title: "Spice Package",
    date: new Date(2025, 3, 20), // April 20, 2025
    type: "package",
    status: "pending",
    customer: "Emily Davis",
  },
  {
    id: "6",
    title: "Cooking Class",
    date: new Date(2025, 3, 12), // April 12, 2025
    type: "event",
    status: "cancelled",
    customer: "Michael Brown",
  },
]

// Modern color palette
const colorPalette = {
  primary: "#B45309", // Cinnamon as accent
  confirmed: "#10B981", // Green
  pending: "#F59E0B", // Amber
  cancelled: "#EF4444", // Red
  background: "#FFFFFF",
  cardBg: "#F9FAFB",
  border: "#E5E7EB",
  text: {
    primary: "#111827",
    secondary: "#6B7280",
    light: "#9CA3AF",
  },
  today: "#F3F4F6",
}

// Get icon based on booking type
const getBookingIcon = (type: string) => {
  switch (type) {
    case "room":
      return <RoomIcon fontSize="small" />
    case "event":
      return <EventIcon fontSize="small" />
    case "package":
      return <PackageIcon fontSize="small" />
    case "accommodation":
      return <HotelIcon fontSize="small" />
    case "experience":
      return <ExperienceIcon fontSize="small" />
    default:
      return <EventIcon fontSize="small" />
  }
}

// Get color based on booking status
const getStatusColor = (status: string) => {
  switch (status) {
    case "confirmed":
      return colorPalette.confirmed
    case "pending":
      return colorPalette.pending
    case "cancelled":
      return colorPalette.cancelled
    default:
      return colorPalette.text.light
  }
}

const CompactBookingCalendar = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const [currentDate, setCurrentDate] = useState(new Date())
  const [bookings] = useState<Booking[]>(mockBookings)
  const [filterType, setFilterType] = useState<string | null>("all")
  const [filterStatus, setFilterStatus] = useState<string | null>("all")

  // Calendar navigation
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  // Filter handlers
  const handleTypeFilterChange = (_event: React.MouseEvent<HTMLElement>, newFilterType: string | null) => {
    setFilterType(newFilterType || "all")
  }

  const handleStatusFilterChange = (_event: React.MouseEvent<HTMLElement>, newFilterStatus: string | null) => {
    setFilterStatus(newFilterStatus || "all")
  }

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    // First day of the month
    const firstDay = new Date(year, month, 1)
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0)

    // Day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfWeek = firstDay.getDay()

    // Total days in the month
    const daysInMonth = lastDay.getDate()

    // Array to hold all calendar days
    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  // Get bookings for a specific day
  const getBookingsForDay = (date: Date) => {
    if (!date) return []

    return bookings.filter((booking) => {
      const bookingDate = new Date(booking.date)
      const matchesDate =
        bookingDate.getDate() === date.getDate() &&
        bookingDate.getMonth() === date.getMonth() &&
        bookingDate.getFullYear() === date.getFullYear()

      const matchesType = filterType === "all" || booking.type === filterType
      const matchesStatus = filterStatus === "all" || booking.status === filterStatus

      return matchesDate && matchesType && matchesStatus
    })
  }

  // Format date for display
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric",
    }).format(date)
  }

  // Days of the week
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  // Calendar days
  const calendarDays = generateCalendarDays()

  return (
    <Card
      sx={{
        marginTop: 4,
        borderRadius: "12px",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        overflow: "hidden",
        border: `1px solid ${colorPalette.border}`,
      }}
    >
      <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
        {/* Header with title, filters and navigation */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            mb: 2,
            gap: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: "Poppins, sans-serif",
              color: colorPalette.text.primary,
              fontWeight: 600,
            }}
          >
            Booking Calendar
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "flex-start", sm: "center" },
              gap: 2,
              width: { xs: "100%", sm: "auto" },
            }}
          >
            {/* Filters */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                flexWrap: "wrap",
                width: { xs: "100%", sm: "auto" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: colorPalette.cardBg,
                  borderRadius: "8px",
                  p: 0.5,
                  border: `1px solid ${colorPalette.border}`,
                }}
              >
                <FilterIcon sx={{ color: colorPalette.text.secondary, fontSize: "1rem", mx: 0.5 }} />
                <ToggleButtonGroup
                  value={filterType}
                  exclusive
                  onChange={handleTypeFilterChange}
                  aria-label="booking type filter"
                  size="small"
                  sx={{
                    "& .MuiToggleButtonGroup-grouped": {
                      border: 0,
                      fontSize: "0.75rem",
                      px: 1,
                      py: 0.5,
                      "&.Mui-selected": {
                        backgroundColor: "white",
                        color: colorPalette.primary,
                        fontWeight: "bold",
                        boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                      },
                    },
                  }}
                >
                  <ToggleButton value="all" aria-label="all types">
                    All
                  </ToggleButton>
                  <ToggleButton value="room" aria-label="rooms">
                    Rooms
                  </ToggleButton>
                  <ToggleButton value="event" aria-label="events">
                    Events
                  </ToggleButton>
                  {!isMobile && (
                    <>
                      <ToggleButton value="package" aria-label="packages">
                        Packages
                      </ToggleButton>
                      <ToggleButton value="accommodation" aria-label="accommodations">
                        Accom.
                      </ToggleButton>
                      <ToggleButton value="experience" aria-label="experiences">
                        Exp.
                      </ToggleButton>
                    </>
                  )}
                </ToggleButtonGroup>
              </Box>

              {/* Status filter */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: colorPalette.cardBg,
                  borderRadius: "8px",
                  p: 0.5,
                  border: `1px solid ${colorPalette.border}`,
                }}
              >
                <ToggleButtonGroup
                  value={filterStatus}
                  exclusive
                  onChange={handleStatusFilterChange}
                  aria-label="booking status filter"
                  size="small"
                  sx={{
                    "& .MuiToggleButtonGroup-grouped": {
                      border: 0,
                      fontSize: "0.75rem",
                      px: 1,
                      py: 0.5,
                      "&.Mui-selected": {
                        backgroundColor: "white",
                        fontWeight: "bold",
                        boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                      },
                      '&.Mui-selected[value="confirmed"]': {
                        color: colorPalette.confirmed,
                      },
                      '&.Mui-selected[value="pending"]': {
                        color: colorPalette.pending,
                      },
                      '&.Mui-selected[value="cancelled"]': {
                        color: colorPalette.cancelled,
                      },
                    },
                  }}
                >
                  <ToggleButton value="all" aria-label="all statuses">
                    All
                  </ToggleButton>
                  <ToggleButton value="confirmed" aria-label="confirmed">
                    Confirmed
                  </ToggleButton>
                  <ToggleButton value="pending" aria-label="pending">
                    Pending
                  </ToggleButton>
                  <ToggleButton value="cancelled" aria-label="cancelled">
                    Cancelled
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
            </Box>

            {/* Month navigation */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: colorPalette.cardBg,
                borderRadius: "8px",
                p: 0.5,
                border: `1px solid ${colorPalette.border}`,
                ml: { xs: 0, sm: "auto" },
              }}
            >
              <IconButton onClick={goToPreviousMonth} size="small" sx={{ color: colorPalette.text.primary }}>
                <ChevronLeftIcon fontSize="small" />
              </IconButton>
              <Typography
                variant="subtitle2"
                sx={{
                  mx: 1,
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 500,
                  color: colorPalette.text.primary,
                }}
              >
                {formatDate(currentDate)}
              </Typography>
              <IconButton onClick={goToNextMonth} size="small" sx={{ color: colorPalette.text.primary }}>
                <ChevronRightIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </Box>

        {/* Calendar */}
        <Paper
          elevation={0}
          sx={{
            backgroundColor: colorPalette.cardBg,
            borderRadius: "8px",
            overflow: "hidden",
            border: `1px solid ${colorPalette.border}`,
          }}
        >
          {/* Days of the week header */}
          <Grid container sx={{ backgroundColor: "white" }}>
            {daysOfWeek.map((day, index) => (
              <Grid item xs={12 / 7} key={index} sx={{ textAlign: "center" }}>
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: colorPalette.text.secondary,
                    fontSize: "0.75rem",
                    py: 1,
                  }}
                >
                  {day}
                </Typography>
              </Grid>
            ))}
          </Grid>

          <Divider />

          {/* Calendar grid */}
          <Grid container>
            {calendarDays.map((day, index) => (
              <Grid
                item
                xs={12 / 7}
                key={index}
                sx={{
                  height: "70px",
                  borderRight: index % 7 !== 6 ? `1px solid ${colorPalette.border}` : "none",
                  borderBottom: `1px solid ${colorPalette.border}`,
                  p: 0.5,
                  backgroundColor:
                    day &&
                    day.getDate() === new Date().getDate() &&
                    day.getMonth() === new Date().getMonth() &&
                    day.getFullYear() === new Date().getFullYear()
                      ? colorPalette.today
                      : "white",
                }}
              >
                {day && (
                  <>
                    <Typography
                      sx={{
                        color: colorPalette.text.primary,
                        fontWeight: 500,
                        fontSize: "0.75rem",
                        mb: 0.5,
                      }}
                    >
                      {day.getDate()}
                    </Typography>
                    <Box sx={{ maxHeight: "45px", overflowY: "auto" }}>
                      {getBookingsForDay(day).map((booking) => (
                        <Tooltip key={booking.id} title={`${booking.title} - ${booking.customer} (${booking.status})`}>
                          <Chip
                            icon={getBookingIcon(booking.type)}
                            label={booking.title.length > 8 ? `${booking.title.substring(0, 8)}...` : booking.title}
                            size="small"
                            sx={{
                              mb: 0.5,
                              backgroundColor: getStatusColor(booking.status),
                              color: "white",
                              "& .MuiChip-icon": {
                                color: "white",
                              },
                              width: "100%",
                              justifyContent: "flex-start",
                              height: "20px",
                              "& .MuiChip-label": {
                                fontSize: "0.65rem",
                                padding: "0 4px",
                              },
                            }}
                          />
                        </Tooltip>
                      ))}
                    </Box>
                  </>
                )}
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Legend */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            mt: 2,
            justifyContent: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Box sx={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: colorPalette.confirmed }} />
            <Typography variant="caption" sx={{ color: colorPalette.text.secondary }}>
              Confirmed
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Box sx={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: colorPalette.pending }} />
            <Typography variant="caption" sx={{ color: colorPalette.text.secondary }}>
              Pending
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Box sx={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: colorPalette.cancelled }} />
            <Typography variant="caption" sx={{ color: colorPalette.text.secondary }}>
              Cancelled
            </Typography>
          </Box>
          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <RoomIcon sx={{ color: colorPalette.text.secondary, fontSize: "0.875rem" }} />
            <Typography variant="caption" sx={{ color: colorPalette.text.secondary }}>
              Room
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <EventIcon sx={{ color: colorPalette.text.secondary, fontSize: "0.875rem" }} />
            <Typography variant="caption" sx={{ color: colorPalette.text.secondary }}>
              Event
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <PackageIcon sx={{ color: colorPalette.text.secondary, fontSize: "0.875rem" }} />
            <Typography variant="caption" sx={{ color: colorPalette.text.secondary }}>
              Package
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default CompactBookingCalendar

