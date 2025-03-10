"use client"

import { useState } from "react"
import { Box, Card, CardContent, Typography, Chip, Grid, Collapse, Button, Divider } from "@mui/material"
import { ChevronDown, ChevronUp, Package, Truck, CheckCircle, XCircle } from "lucide-react"
import type { Order } from "@/types/order"
import OrderDetails from "./OrderDetails"

interface OrderListProps {
  orders: Order[]
}

const OrderList = ({ orders }: OrderListProps) => {
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null)

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processing":
        return <Package size={16} />
      case "shipped":
        return <Truck size={16} />
      case "delivered":
        return <CheckCircle size={16} />
      case "cancelled":
        return <XCircle size={16} />
      default:
        return <Package size={16} />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "#F59E0B" // Amber
      case "shipped":
        return "#3B82F6" // Blue
      case "delivered":
        return "#10B981" // Green
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
      {orders.map((order) => (
        <Card key={order.id} sx={{ mb: 3 }}>
          <CardContent sx={{ p: 0 }}>
            {/* Order Header */}
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
                  <Typography variant="subtitle2">Order #{order.id}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(order.date)}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="body2" color="text.secondary">
                    Items: {order.items.length}
                  </Typography>
                  <Typography variant="subtitle2">{formatCurrency(order.total)}</Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Chip
                    icon={getStatusIcon(order.status)}
                    label={order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    size="small"
                    sx={{
                      backgroundColor: `${getStatusColor(order.status)}20`,
                      color: getStatusColor(order.status),
                      borderColor: getStatusColor(order.status),
                      "& .MuiChip-icon": {
                        color: getStatusColor(order.status),
                      },
                    }}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      onClick={() => toggleOrderDetails(order.id)}
                      endIcon={expandedOrderId === order.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      sx={{
                        color: "#A0522D",
                        "&:hover": {
                          backgroundColor: "rgba(160, 82, 45, 0.08)",
                        },
                      }}
                    >
                      {expandedOrderId === order.id ? "Hide" : "Details"}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            {/* Order Details (Collapsible) */}
            <Collapse in={expandedOrderId === order.id}>
              <Divider />
              <OrderDetails order={order} />
            </Collapse>
          </CardContent>
        </Card>
      ))}
    </Box>
  )
}

export default OrderList

