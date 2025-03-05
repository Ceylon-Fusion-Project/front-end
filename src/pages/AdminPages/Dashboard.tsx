import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

import { Card, CardContent, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';

const Dashboard = () => {
  // Origin Analytics Data
  const originData = [
    { name: 'Kandy', visitors: 4000, sales: 2400 },
    { name: 'Colombo', visitors: 3000, sales: 1398 },
    { name: 'Galle', visitors: 2000, sales: 9800 },
    { name: 'Jaffna', visitors: 2780, sales: 3908 },
    { name: 'Matara', visitors: 1890, sales: 4800 },
    { name: 'Anuradhapura', visitors: 2390, sales: 3800 },
  ];

  // Recent Sales Data
  const recentSales = [
    { id: 1, product: 'Cinnamon Sticks', customer: 'John Doe', amount: '$120', status: 'Completed' },
    { id: 2, product: 'Cinnamon Powder', customer: 'Jane Smith', amount: '$80', status: 'Pending' },
    { id: 3, product: 'Cinnamon Oil', customer: 'Alice Johnson', amount: '$200', status: 'Completed' },
    { id: 4, product: 'Cinnamon Tea', customer: 'Bob Brown', amount: '$50', status: 'Cancelled' },
  ];

  // Recent Bookings Data
  const recentBookings = [
    { id: 1, name: 'John Doe', date: '2023-10-15', guests: 4, status: 'Confirmed' },
    { id: 2, name: 'Jane Smith', date: '2023-10-16', guests: 2, status: 'Pending' },
    { id: 3, name: 'Alice Johnson', date: '2023-10-17', guests: 6, status: 'Cancelled' },
    { id: 4, name: 'Bob Brown', date: '2023-10-18', guests: 3, status: 'Confirmed' },
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

      {/* Origin Analytics */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: colors.text }}>
                Origin Analytics
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={originData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="visitors" stroke={colors.primary} />
                  <Line type="monotone" dataKey="sales" stroke={colors.secondary} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Pie Chart for Origin Distribution */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: colors.text }}>
                Origin Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={originData} dataKey="visitors" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill={colors.primary}>
                    {originData.map((entry, index) => (
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
      </Grid>

      {/* Recent Sales */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: colors.text }}>
                Recent Sales
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