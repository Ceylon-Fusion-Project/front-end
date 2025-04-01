import {
    Box,
    Typography,
    Grid,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
  } from "@mui/material"
  import { FileText, Truck } from "lucide-react"
  import type { Order } from "@/types/order"
  
  interface OrderDetailsProps {
    order: Order
  }
  
  const OrderDetails = ({ order }: OrderDetailsProps) => {
    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat("en-LK", {
        style: "currency",
        currency: "LKR",
      }).format(amount)
    }
  
    return (
      <Box sx={{ p: 3 }}>
        <Grid container spacing={4}>
          {/* Order Items */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Order Items
            </Typography>
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead sx={{ backgroundColor: "rgba(0, 0, 0, 0.03)" }}>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Box
                            component="img"
                            src={item.image}
                            alt={item.name}
                            sx={{
                              width: 50,
                              height: 50,
                              objectFit: "cover",
                              borderRadius: 1,
                              mr: 2,
                            }}
                          />
                          <Typography variant="body2">{item.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">{formatCurrency(item.price)}</TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">{formatCurrency(item.price * item.quantity)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={2} />
                    <TableCell align="right">
                      <Typography variant="subtitle2">Subtotal</Typography>
                    </TableCell>
                    <TableCell align="right">
                      {formatCurrency(order.items.reduce((sum, item) => sum + item.price * item.quantity, 0))}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} />
                    <TableCell align="right">
                      <Typography variant="subtitle2">Shipping</Typography>
                    </TableCell>
                    <TableCell align="right">{formatCurrency(500)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} />
                    <TableCell align="right">
                      <Typography variant="subtitle1">Total</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="subtitle1">{formatCurrency(order.total)}</Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
  
          <Grid item xs={12}>
            <Divider />
          </Grid>
  
          {/* Order Information */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Shipping Address
            </Typography>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="body2">{order.shippingAddress.name}</Typography>
              <Typography variant="body2">{order.shippingAddress.street}</Typography>
              <Typography variant="body2">
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
              </Typography>
              <Typography variant="body2">{order.shippingAddress.country}</Typography>
            </Paper>
          </Grid>
  
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Payment Information
            </Typography>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="body2">
                <strong>Method:</strong> {order.paymentMethod}
              </Typography>
              <Typography variant="body2">
                <strong>Status:</strong> Paid
              </Typography>
              <Typography variant="body2">
                <strong>Date:</strong>{" "}
                {new Date(order.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Typography>
            </Paper>
          </Grid>
  
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Shipping Information
            </Typography>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="body2">
                <strong>Carrier:</strong> Ceylon Express
              </Typography>
              <Typography variant="body2">
                <strong>Tracking Number:</strong> {order.trackingNumber}
              </Typography>
              <Typography variant="body2">
                <strong>Status:</strong> {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Typography>
            </Paper>
          </Grid>
  
          {/* Action Buttons */}
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}>
              <Button
                variant="outlined"
                startIcon={<FileText size={16} />}
                sx={{
                  borderColor: "#A0522D",
                  color: "#A0522D",
                  "&:hover": {
                    borderColor: "#8B4513",
                    backgroundColor: "rgba(160, 82, 45, 0.08)",
                  },
                }}
              >
                Download Invoice
              </Button>
              {(order.status === "shipped" || order.status === "processing") && (
                <Button
                  variant="contained"
                  startIcon={<Truck size={16} />}
                  sx={{
                    backgroundColor: "#A0522D",
                    "&:hover": {
                      backgroundColor: "#8B4513",
                    },
                  }}
                >
                  Track Order
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    )
  }
  
  export default OrderDetails
  
  