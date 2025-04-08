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
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Pagination,
  type SelectChangeEvent,
} from "@mui/material"
import { Search, ListFilterIcon as FilterList } from "lucide-react"
import type { Order } from "@/types/order"
import OrderFilters from "@/components/UserAccount/OrderHistory/OrderFilters"
import OrderList from "@/components/UserAccount/OrderHistory/OrderList"

// Mock data for orders
const mockOrders: Order[] = [
  {
    id: "ORD-2023-1001",
    date: "2023-12-15",
    status: "delivered",
    total: 4250,
    items: [
      { id: 1, name: "Ceylon Cinnamon Sticks", quantity: 2, price: 1500, image: "/placeholder.svg?height=80&width=80" },
      { id: 2, name: "Organic Ceylon Tea", quantity: 1, price: 1250, image: "/placeholder.svg?height=80&width=80" },
    ],
    shippingAddress: {
      name: "John Doe",
      street: "123 Temple Road",
      city: "Colombo",
      state: "Western Province",
      zip: "10300",
      country: "Sri Lanka",
    },
    paymentMethod: "Credit Card",
    trackingNumber: "SL9876543210",
  },
  {
    id: "ORD-2023-0985",
    date: "2023-11-28",
    status: "delivered",
    total: 3600,
    items: [
      { id: 3, name: "Handcrafted Wooden Box", quantity: 1, price: 3600, image: "/placeholder.svg?height=80&width=80" },
    ],
    shippingAddress: {
      name: "John Doe",
      street: "123 Temple Road",
      city: "Colombo",
      state: "Western Province",
      zip: "10300",
      country: "Sri Lanka",
    },
    paymentMethod: "creadit Card",
    trackingNumber: "SL9876543209",
  },
  {
    id: "ORD-2023-0954",
    date: "2023-11-10",
    status: "delivered",
    total: 5800,
    items: [
      { id: 4, name: "Ceylon Cinnamon Powder", quantity: 3, price: 1200, image: "/placeholder.svg?height=80&width=80" },
      { id: 5, name: "Spice Gift Set", quantity: 1, price: 2200, image: "/placeholder.svg?height=80&width=80" },
    ],
    shippingAddress: {
      name: "John Doe",
      street: "123 Temple Road",
      city: "Colombo",
      state: "Western Province",
      zip: "10300",
      country: "Sri Lanka",
    },
    paymentMethod: "Credit Card",
    trackingNumber: "SL9876543208",
  },
  {
    id: "ORD-2024-0023",
    date: "2024-01-05",
    status: "processing",
    total: 7500,
    items: [
      {
        id: 6,
        name: "Premium Ceylon Tea Collection",
        quantity: 1,
        price: 4500,
        image: "/placeholder.svg?height=80&width=80",
      },
      { id: 7, name: "Cinnamon Essential Oil", quantity: 1, price: 3000, image: "/placeholder.svg?height=80&width=80" },
    ],
    shippingAddress: {
      name: "John Doe",
      street: "123 Temple Road",
      city: "Colombo",
      state: "Western Province",
      zip: "10300",
      country: "Sri Lanka",
    },
    paymentMethod: "Credit Card",
    trackingNumber: "Pending",
  },
  {
    id: "ORD-2024-0045",
    date: "2024-01-15",
    status: "shipped",
    total: 6200,
    items: [
      {
        id: 8,
        name: "Handwoven Cinnamon Basket",
        quantity: 1,
        price: 2700,
        image: "/placeholder.svg?height=80&width=80",
      },
      { id: 9, name: "Ceylon Black Tea", quantity: 2, price: 1750, image: "/placeholder.svg?height=80&width=80" },
    ],
    shippingAddress: {
      name: "John Doe",
      street: "123 Temple Road",
      city: "Colombo",
      state: "Western Province",
      zip: "10300",
      country: "Sri Lanka",
    },
    paymentMethod: "PayPal",
    trackingNumber: "SL9876543211",
  },
]

const OrdersPage = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [dateSort, setDateSort] = useState<string>("newest")
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const [dateRange, setDateRange] = useState<{
    startDate: string
    endDate: string
  }>({
    startDate: "",
    endDate: "",
  })

  const ordersPerPage = 3

  // Filter and sort orders
  const filteredOrders = mockOrders
    .filter((order) => {
      // Apply search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          order.id.toLowerCase().includes(query) || order.items.some((item) => item.name.toLowerCase().includes(query))
        )
      }
      return true
    })
    .filter((order) => {
      // Apply status filter
      if (statusFilter !== "all") {
        return order.status === statusFilter
      }
      return true
    })
    .filter((order) => {
      // Apply date range filter
      if (dateRange.startDate && dateRange.endDate) {
        const orderDate = new Date(order.date)
        const startDate = new Date(dateRange.startDate)
        const endDate = new Date(dateRange.endDate)
        return orderDate >= startDate && orderDate <= endDate
      }
      return true
    })
    .sort((a, b) => {
      // Apply date sorting
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return dateSort === "newest" ? dateB - dateA : dateA - dateB
    })

  // Pagination
  const indexOfLastOrder = currentPage * ordersPerPage
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder)
  const pageCount = Math.ceil(filteredOrders.length / ordersPerPage)

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
  }

  const handleStatusFilterChange = (event: SelectChangeEvent) => {
    setStatusFilter(event.target.value)
    setCurrentPage(1)
  }

  const handleDateSortChange = (event: SelectChangeEvent) => {
    setDateSort(event.target.value)
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
    setDateSort("newest")
    setDateRange({ startDate: "", endDate: "" })
    setCurrentPage(1)
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3, backgroundColor: "#F8FAFC", minHeight: "100vh" }}>
      <Typography variant="h4" gutterBottom sx={{ color: "#1E293B" }}>
        My Orders
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        View and track your order history
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search by order ID or product name"
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
            <Grid item xs={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel id="status-filter-label">Status</InputLabel>
                <Select
                  labelId="status-filter-label"
                  id="status-filter"
                  value={statusFilter}
                  label="Status"
                  onChange={handleStatusFilterChange}
                >
                  <MenuItem value="all">All Orders</MenuItem>
                  <MenuItem value="processing">Processing</MenuItem>
                  <MenuItem value="shipped">Shipped</MenuItem>
                  <MenuItem value="delivered">Delivered</MenuItem>
                  <MenuItem value="cancelled">Cancelled</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel id="date-sort-label">Sort By</InputLabel>
                <Select
                  labelId="date-sort-label"
                  id="date-sort"
                  value={dateSort}
                  label="Sort By"
                  onChange={handleDateSortChange}
                >
                  <MenuItem value="newest">Newest First</MenuItem>
                  <MenuItem value="oldest">Oldest First</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
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
                  <Typography variant="body2">{showFilters ? "Hide Filters" : "More Filters"}</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>

          {showFilters && (
            <OrderFilters
              dateRange={dateRange}
              onDateRangeChange={handleDateRangeChange}
              onClearFilters={handleClearFilters}
            />
          )}
        </CardContent>
      </Card>

      <OrderList orders={currentOrders} />

      {filteredOrders.length > ordersPerPage && (
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

      {filteredOrders.length === 0 && (
        <Card sx={{ mt: 3 }}>
          <CardContent sx={{ textAlign: "center", py: 6 }}>
            <Typography variant="h6" color="text.secondary">
              No orders found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Try adjusting your search or filter criteria
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  )
}

export default OrdersPage

