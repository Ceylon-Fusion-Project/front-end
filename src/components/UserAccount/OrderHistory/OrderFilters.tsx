"use client"

import { Box, Grid, TextField, Button, Paper } from "@mui/material"

interface OrderFiltersProps {
  dateRange: {
    startDate: string
    endDate: string
  }
  onDateRangeChange: (type: "startDate" | "endDate", value: string) => void
  onClearFilters: () => void
}

const OrderFilters = ({ dateRange, onDateRangeChange, onClearFilters }: OrderFiltersProps) => {
  return (
    <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={5}>
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
        <Grid item xs={12} sm={5}>
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
        <Grid item xs={12} sm={2}>
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

export default OrderFilters

