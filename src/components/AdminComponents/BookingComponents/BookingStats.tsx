import type React from "react"
import { Box, Card, CardContent, Grid, Typography, CircularProgress } from "@mui/material"
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Hotel as HotelIcon,
  MeetingRoom as RoomIcon,
  Event as EventIcon,
  LocalActivity as PackageIcon,
  Explore as ExperienceIcon,
} from "@mui/icons-material"

interface StatCardProps {
  title: string
  value: number
  change: number
  icon: React.ReactNode
  color: string
}

const StatCard = ({ title, value, change, icon, color }: StatCardProps) => {
  return (
    <Card
      sx={{
        borderRadius: "12px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
        height: "100%",
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {title}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
              {value}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {change > 0 ? (
                <TrendingUpIcon sx={{ color: "success.main", fontSize: 16, mr: 0.5 }} />
              ) : (
                <TrendingDownIcon sx={{ color: "error.main", fontSize: 16, mr: 0.5 }} />
              )}
              <Typography
                variant="body2"
                sx={{
                  color: change > 0 ? "success.main" : "error.main",
                  fontWeight: "medium",
                }}
              >
                {Math.abs(change)}% {change > 0 ? "increase" : "decrease"}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              backgroundColor: `${color}20`,
              p: 1.5,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ color: color }}>{icon}</Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

interface BookingTypeData {
  type: string
  count: number
  total: number
}

const BookingStats = () => {
  // Mock data - replace with your actual data
  const totalBookings = 245
  const bookingChange = 12.5
  const revenue = 45600
  const revenueChange = 8.3

  const bookingTypes: BookingTypeData[] = [
    { type: "Rooms", count: 85, total: totalBookings },
    { type: "Events", count: 45, total: totalBookings },
    { type: "Packages", count: 65, total: totalBookings },
    { type: "Accommodations", count: 30, total: totalBookings },
    { type: "Experiences", count: 20, total: totalBookings },
  ]

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ mb: 3, fontFamily: "Poppins, sans-serif", color: "#1E293B" }}>
        Booking Statistics
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard
            title="Total Bookings"
            value={totalBookings}
            change={bookingChange}
            icon={<EventIcon />}
            color="#B45309"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StatCard
            title="Total Revenue"
            value={revenue}
            change={revenueChange}
            icon={<TrendingUpIcon />}
            color="#0891B2"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StatCard title="Room Occupancy" value={78} change={5.2} icon={<RoomIcon />} color="#4F46E5" />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StatCard title="Upcoming Events" value={12} change={-2.5} icon={<EventIcon />} color="#EC4899" />
        </Grid>
      </Grid>

      <Typography variant="h6" sx={{ mt: 4, mb: 3, fontFamily: "Poppins, sans-serif", color: "#1E293B" }}>
        Booking Distribution
      </Typography>

      <Grid container spacing={3}>
        {bookingTypes.map((type, index) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
            <Card
              sx={{
                borderRadius: "12px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                p: 2,
              }}
            >
              <Box
                sx={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}
              >
                <CircularProgress
                  variant="determinate"
                  value={(type.count / type.total) * 100}
                  size={80}
                  thickness={5}
                  sx={{ color: "#B45309" }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {type.type === "Rooms" && <RoomIcon color="action" />}
                  {type.type === "Events" && <EventIcon color="action" />}
                  {type.type === "Packages" && <PackageIcon color="action" />}
                  {type.type === "Accommodations" && <HotelIcon color="action" />}
                  {type.type === "Experiences" && <ExperienceIcon color="action" />}
                </Box>
              </Box>
              <Typography variant="body1" sx={{ fontWeight: "medium", textAlign: "center" }}>
                {type.type}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
                {type.count} bookings
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
                {Math.round((type.count / type.total) * 100)}%
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default BookingStats

