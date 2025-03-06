import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';

const Dashboard = () => {
  // Sales Data (Daily/Weekly Sales with Product)
  const salesData = [
    { date: '2023-10-01', product: 'Cinnamon Sticks', sales: 120 },
    { date: '2023-10-02', product: 'Cinnamon Powder', sales: 80 },
    { date: '2023-10-03', product: 'Cinnamon Oil', sales: 200 },
    { date: '2023-10-04', product: 'Cinnamon Tea', sales: 50 },
    { date: '2023-10-05', product: 'Cinnamon Sticks', sales: 150 },
    { date: '2023-10-06', product: 'Cinnamon Powder', sales: 90 },
    { date: '2023-10-07', product: 'Cinnamon Oil', sales: 220 },
  ];

  // Recent Sales Data
  const recentSales = [
    { id: 1, product: 'Cinnamon Sticks', customer: 'John Doe', amount: 120, status: 'Completed' },
    { id: 2, product: 'Cinnamon Powder', customer: 'Jane Smith', amount: 80, status: 'Pending' },
    { id: 3, product: 'Cinnamon Oil', customer: 'Alice Johnson', amount: 200, status: 'Cancelled' },
  ];

  // Booking Trends Data (Bookings Over Time with Package Name)
  const bookingTrendsData = [
    { date: '2023-10-01', package: 'Luxury Villa', bookings: 5 },
    { date: '2023-10-02', package: 'Eco Cabin', bookings: 3 },
    { date: '2023-10-03', package: 'Beach Resort', bookings: 7 },
    { date: '2023-10-04', package: 'Luxury Villa', bookings: 6 },
    { date: '2023-10-05', package: 'Eco Cabin', bookings: 4 },
    { date: '2023-10-06', package: 'Beach Resort', bookings: 8 },
    { date: '2023-10-07', package: 'Luxury Villa', bookings: 5 },
  ];

  // Product Performance Data (Best-Selling Cinnamon Products)
  const productPerformanceData = [
    { name: 'Cinnamon Sticks', value: 400 },
    { name: 'Cinnamon Powder', value: 300 },
    { name: 'Cinnamon Oil', value: 200 },
    { name: 'Cinnamon Tea', value: 100 },
  ];

  // Package Performance Data (Accommodation Packages)
  const packagePerformanceData = [
    { name: 'Luxury Villa', value: 500 },
    { name: 'Eco Cabin', value: 300 },
    { name: 'Beach Resort', value: 200 },
  ];

  // Recent Bookings Data
  const recentBookings = [
    { id: 1, name: 'John Doe', date: '2023-10-01', guests: 2, status: 'Confirmed' },
    { id: 2, name: 'Jane Smith', date: '2023-10-02', guests: 4, status: 'Pending' },
    { id: 3, name: 'Alice Johnson', date: '2023-10-03', guests: 3, status: 'Cancelled' },
  ];

  // Modern Color Scheme
  const colors = {
    primary: '#3B82F6', // Blue
    secondary: '#10B981', // Green
    error: '#EF4444', // Red
    warning: '#F59E0B', // Orange
    background: '#F8FAFC', // Light Gray
    text: '#1E293B', // Dark Blue
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3, backgroundColor: colors.background, minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom sx={{ color: colors.text }}>
        Dashboard
      </Typography>

      {/* Sales Chart */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: colors.text }}>
                Sales Chart
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="sales" stroke={colors.primary} name="Sales" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Booking Trends */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: colors.text }}>
                Booking Trends
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={bookingTrendsData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="bookings" stroke={colors.secondary} name="Bookings" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Product Performance Pie Chart */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: colors.text }}>
                Product Performance
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={productPerformanceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill={colors.primary}>
                    {productPerformanceData.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={[colors.primary, colors.secondary, colors.warning, colors.error][index % 4]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Package Performance Pie Chart */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: colors.text }}>
                Package Performance
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={packagePerformanceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill={colors.primary}>
                    {packagePerformanceData.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={[colors.primary, colors.secondary, colors.warning][index % 3]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Purchases */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: colors.text }}>
                Recent Purchases
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Product</TableCell>
                      <TableCell>Customer</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentSales.map((sale) => (
                      <TableRow key={sale.id}>
                        <TableCell>{sale.product}</TableCell>
                        <TableCell>{sale.customer}</TableCell>
                        <TableCell>{sale.amount}</TableCell>
                        <TableCell>
                          <Typography
                            sx={{
                              color:
                                sale.status === 'Completed'
                                  ? colors.secondary
                                  : sale.status === 'Pending'
                                  ? colors.warning
                                  : colors.error,
                            }}
                          >
                            {sale.status}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Bookings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: colors.text }}>
                Recent Bookings
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Guests</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>{booking.name}</TableCell>
                        <TableCell>{booking.date}</TableCell>
                        <TableCell>{booking.guests}</TableCell>
                        <TableCell>
                          <Typography
                            sx={{
                              color:
                                booking.status === 'Confirmed'
                                  ? colors.secondary
                                  : booking.status === 'Pending'
                                  ? colors.warning
                                  : colors.error,
                            }}
                          >
                            {booking.status}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;