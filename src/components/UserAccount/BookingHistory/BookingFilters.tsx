"use client"
import {
  Box,
  Grid,
  TextField,
  Button,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
} from "@mui/material"

interface BookingFiltersProps {
  dateRange: {
    startDate: string
    endDate: string
  }
  statusFilter: string
  onDateRangeChange: (type: "startDate" | "endDate", value: string) => void
  onStatusFilterChange: (value: string) => void
  onClearFilters: () => void
}

const BookingFilters = ({
  dateRange,
  statusFilter,
  onDateRangeChange,
  onStatusFilterChange,
  onClearFilters,
}: BookingFiltersProps) => {
  const handleStatusChange = (event: SelectChangeEvent) => {
    onStatusFilterChange(event.target.value)
  }

  return (
    <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            label="From Date"
            type="date"
            value={dateRange.startDate}
            onChange={(e) => onDateRangeChange("startDate", e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            label="To Date"
            type="date"
            value={dateRange.endDate}
            onChange={(e) => onDateRangeChange("endDate", e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel id="status-filter-label">Status</InputLabel>
            <Select
              labelId="status-filter-label"
              id="status-filter"
              value={statusFilter}
              label="Status"
              onChange={handleStatusChange}
            >
              <MenuItem value="all">All Bookings</MenuItem>
              <MenuItem value="confirmed">Confirmed</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              onClick={onClearFilters}
              size="small"
              sx={{
                borderColor: "#A0522D",
                color: "#A0522D",
                "&:hover": {
                  borderColor: "#8B4513",
                  backgroundColor: "rgba(160, 82, 45, 0.08)",
                },
              }}
            >
              Clear Filters
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default BookingFilters

