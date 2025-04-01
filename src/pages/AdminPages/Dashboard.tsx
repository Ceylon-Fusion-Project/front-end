
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

// Define props for StatusBadge
interface StatusBadgeProps {
  status: 'Completed' | 'Confirmed' | 'Pending' | 'Cancelled';
  children: React.ReactNode;
}

// Custom styled components
const DashboardCard = styled(Card)({
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  transition: 'transform 0.3s ease-in-out',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    transform: 'translateY(-5px)'
  }
});

const StatusBadge = styled(Typography)<StatusBadgeProps>(({ status }) => ({
  display: 'inline-block',
  padding: '4px 12px',
  borderRadius: '16px',
  fontWeight: 500,
  backgroundColor: 
    status === 'Completed' || status === 'Confirmed' ? 'rgba(16, 185, 129, 0.1)' :
    status === 'Pending' ? 'rgba(245, 158, 11, 0.1)' :
    'rgba(239, 68, 68, 0.1)',
  color: 
    status === 'Completed' || status === 'Confirmed' ? '#10B981' :
    status === 'Pending' ? '#F59E0B' :
    '#EF4444'
}));

// Data interfaces
interface ProductData {
  name: string;
  value: number;
}

interface PackageData {
  name: string;
  value: number;
}

interface SaleData {
  id: number;
  product: string;
  customer: string;
  amount: string;
  status: 'Completed' | 'Pending' | 'Cancelled';
}

interface BookingData {
  id: number;
  package: string;
  customer: string;
  date: string;
  guests: number;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
}

const Dashboard = () => {
  const theme = useTheme();
  
  // Cinnamon-inspired color palette
  const colors = {
    cinnamonPrimary: '#B45309',
    cinnamonDark: '#92400E',
    cinnamonLight: '#FEF3C7',
    accentGreen: '#10B981',
    accentRed: '#EF4444',
    accentBlue: '#3B82F6',
    textPrimary: '#1F2937',
    textSecondary: '#6B7280',
    background: '#F8FAFC',
    cardBackground: '#FFFFFF',
  };

  // Product Performance Data
  const productPerformanceData: ProductData[] = [
    { name: 'Cinnamon Sticks', value: 400 },
    { name: 'Cinnamon Powder', value: 300 },
    { name: 'Cinnamon Oil', value: 200 },
    { name: 'Cinnamon Tea', value: 100 },
  ];

  // Package Performance Data
  const packagePerformanceData: PackageData[] = [
    { name: 'Estate Tour', value: 500 },
    { name: 'Cinnamon Workshop', value: 300 },
    { name: 'Luxury Stay', value: 200 },
  ];

  // Recent Sales Data
  const recentSales: SaleData[] = [
    { id: 1, product: 'Cinnamon Sticks (1kg)', customer: 'John Doe', amount: '$120', status: 'Completed' },
    { id: 2, product: 'Cinnamon Powder (500g)', customer: 'Jane Smith', amount: '$80', status: 'Pending' },
    { id: 3, product: 'Cinnamon Oil (100ml)', customer: 'Alice Johnson', amount: '$200', status: 'Cancelled' },
    { id: 4, product: 'Cinnamon Tea (20 bags)', customer: 'Robert Brown', amount: '$45', status: 'Completed' },
  ];

  // Recent Bookings Data
  const recentBookings: BookingData[] = [
    { id: 1, package: 'Estate Tour', customer: 'John Doe', date: 'Oct 1', guests: 2, status: 'Confirmed' },
    { id: 2, package: 'Luxury Stay', customer: 'Jane Smith', date: 'Oct 2', guests: 4, status: 'Pending' },
    { id: 3, package: 'Cinnamon Workshop', customer: 'Alice Johnson', date: 'Oct 3', guests: 3, status: 'Cancelled' },
    { id: 4, package: 'Estate Tour', customer: 'Michael Wilson', date: 'Oct 4', guests: 5, status: 'Confirmed' },
  ];

  // Sales Trend Data
  const salesData = [
    { date: 'Oct 1', sales: 120 },
    { date: 'Oct 2', sales: 80 },
    { date: 'Oct 3', sales: 200 },
    { date: 'Oct 4', sales: 50 },
    { date: 'Oct 5', sales: 150 },
    { date: 'Oct 6', sales: 90 },
    { date: 'Oct 7', sales: 220 },
  ];

  // Booking Trend Data
  const bookingTrendsData = [
    { date: 'Oct 1', bookings: 5 },
    { date: 'Oct 2', bookings: 3 },
    { date: 'Oct 3', bookings: 7 },
    { date: 'Oct 4', bookings: 6 },
    { date: 'Oct 5', bookings: 4 },
    { date: 'Oct 6', bookings: 8 },
    { date: 'Oct 7', bookings: 5 },
  ];

  // Custom label renderer for pie charts
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
    name
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index: number;
    name: string;
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={12}
        fontWeight={500}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Box sx={{ 
      flexGrow: 1, 
      p: { xs: 2, md: 3 }, 
      backgroundColor: colors.background,
      minHeight: '100vh'
    }}>
      <Typography variant="h4" gutterBottom sx={{ 
        color: colors.textPrimary,
        fontWeight: 600,
        mb: 4,
        fontSize: { xs: '1.5rem', md: '2rem' }
      }}>
        Ceylon Fusion Dashboard
      </Typography>

      {/* Summary Cards Row */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {[
          { title: 'Total Revenue', value: '$12,345', change: '+12%', color: colors.cinnamonPrimary },
          { title: 'Product Sales', value: '1,234', change: '+8%', color: colors.accentGreen },
          { title: 'Bookings', value: '156', change: '+15%', color: colors.accentBlue },
          { title: 'New Customers', value: '87', change: '+5%', color: colors.cinnamonDark },
        ].map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <DashboardCard sx={{ borderLeft: `4px solid ${card.color}` }}>
              <CardContent>
                <Typography variant="subtitle2" sx={{ color: colors.textSecondary }}>{card.title}</Typography>
                <Typography variant="h5" sx={{ color: colors.textPrimary, fontWeight: 600 }}>{card.value}</Typography>
                <Typography variant="caption" sx={{ color: colors.accentGreen }}>{card.change} from last month</Typography>
              </CardContent>
            </DashboardCard>
          </Grid>
        ))}
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Sales Chart */}
        <Grid item xs={12} md={6}>
          <DashboardCard>
            <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" sx={{ color: colors.textPrimary, mb: 2, fontWeight: 600 }}>
                Product Sales
              </Typography>
              <Box sx={{ flex: 1, minHeight: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData}>
                    <XAxis 
                      dataKey="date" 
                      tick={{ fill: colors.textSecondary, fontSize: 12 }}
                      axisLine={{ stroke: '#E5E7EB' }}
                    />
                    <YAxis 
                      tick={{ fill: colors.textSecondary, fontSize: 12 }}
                      axisLine={{ stroke: '#E5E7EB' }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: colors.cardBackground,
                        borderColor: '#E5E7EB',
                        borderRadius: '8px',
                        boxShadow: theme.shadows[3],
                        fontSize: '0.875rem'
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '0.875rem' }} />
                    <Line 
                      type="monotone" 
                      dataKey="sales" 
                      stroke={colors.cinnamonPrimary} 
                      strokeWidth={2}
                      dot={{ fill: colors.cinnamonPrimary, strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: colors.cinnamonPrimary, strokeWidth: 2 }}
                      name="Sales (USD)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </DashboardCard>
        </Grid>

        {/* Booking Trends */}
        <Grid item xs={12} md={6}>
          <DashboardCard>
            <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" sx={{ color: colors.textPrimary, mb: 2, fontWeight: 600 }}>
                Booking Trends
              </Typography>
              <Box sx={{ flex: 1, minHeight: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={bookingTrendsData}>
                    <XAxis 
                      dataKey="date" 
                      tick={{ fill: colors.textSecondary, fontSize: 12 }}
                      axisLine={{ stroke: '#E5E7EB' }}
                    />
                    <YAxis 
                      tick={{ fill: colors.textSecondary, fontSize: 12 }}
                      axisLine={{ stroke: '#E5E7EB' }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: colors.cardBackground,
                        borderColor: '#E5E7EB',
                        borderRadius: '8px',
                        boxShadow: theme.shadows[3],
                        fontSize: '0.875rem'
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '0.875rem' }} />
                    <Line 
                      type="monotone" 
                      dataKey="bookings" 
                      stroke={colors.accentBlue} 
                      strokeWidth={2}
                      dot={{ fill: colors.accentBlue, strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: colors.accentBlue, strokeWidth: 2 }}
                      name="Bookings"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </DashboardCard>
        </Grid>
      </Grid>

      {/* Pie Charts Row */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Product Performance */}
        <Grid item xs={12} md={6}>
          <DashboardCard>
            <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" sx={{ color: colors.textPrimary, mb: 2, fontWeight: 600 }}>
                Product Distribution
              </Typography>
              <Box sx={{ flex: 1, minHeight: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={productPerformanceData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      label={renderCustomizedLabel}
                      labelLine={false}
                    >
                      {productPerformanceData.map((_entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={
                            index === 0 ? colors.cinnamonPrimary :
                            index === 1 ? colors.cinnamonDark :
                            index === 2 ? '#D97706' :
                            '#F59E0B'
                          }
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number) => [`${value} units`, 'Sales']}
                      contentStyle={{
                        backgroundColor: colors.cardBackground,
                        borderColor: '#E5E7EB',
                        borderRadius: '8px',
                        boxShadow: theme.shadows[3],
                        fontSize: '0.875rem'
                      }}
                    />
                    <Legend 
                      layout="vertical"
                      verticalAlign="middle"
                      align="right"
                      wrapperStyle={{ 
                        fontSize: '0.75rem',
                        paddingLeft: '10px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </DashboardCard>
        </Grid>

        {/* Package Performance */}
        <Grid item xs={12} md={6}>
          <DashboardCard>
            <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" sx={{ color: colors.textPrimary, mb: 2, fontWeight: 600 }}>
                Booking Distribution
              </Typography>
              <Box sx={{ flex: 1, minHeight: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={packagePerformanceData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      label={renderCustomizedLabel}
                      labelLine={false}
                    >
                      {packagePerformanceData.map((_entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={
                            index === 0 ? colors.cinnamonPrimary :
                            index === 1 ? colors.accentBlue :
                            colors.accentGreen
                          }
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number) => [`${value} bookings`, 'Count']}
                      contentStyle={{
                        backgroundColor: colors.cardBackground,
                        borderColor: '#E5E7EB',
                        borderRadius: '8px',
                        boxShadow: theme.shadows[3],
                        fontSize: '0.875rem'
                      }}
                    />
                    <Legend 
                      layout="vertical"
                      verticalAlign="middle"
                      align="right"
                      wrapperStyle={{ 
                        fontSize: '0.75rem',
                        paddingLeft: '10px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </DashboardCard>
        </Grid>
      </Grid>

      {/* Tables Row */}
      <Grid container spacing={3}>
        {/* Recent Orders */}
        <Grid item xs={12} md={6}>
          <DashboardCard>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Typography variant="h6" sx={{ color: colors.textPrimary, mb: 2, fontWeight: 600 }}>
                Recent Orders
              </Typography>
              <Box sx={{ overflow: 'auto' }}>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600, color: colors.textPrimary }}>Product</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: colors.textPrimary }}>Customer</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: colors.textPrimary }}>Amount</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: colors.textPrimary }}>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recentSales.map((sale) => (
                        <TableRow key={sale.id} hover>
                          <TableCell sx={{ color: colors.textPrimary }}>{sale.product}</TableCell>
                          <TableCell sx={{ color: colors.textPrimary }}>{sale.customer}</TableCell>
                          <TableCell sx={{ color: colors.textPrimary }}>{sale.amount}</TableCell>
                          <TableCell>
                            <StatusBadge variant="caption" status={sale.status}>
                              {sale.status}
                            </StatusBadge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </CardContent>
          </DashboardCard>
        </Grid>

        {/* Recent Bookings */}
        <Grid item xs={12} md={6}>
          <DashboardCard>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Typography variant="h6" sx={{ color: colors.textPrimary, mb: 2, fontWeight: 600 }}>
                Recent Bookings
              </Typography>
              <Box sx={{ overflow: 'auto' }}>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600, color: colors.textPrimary }}>Package</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: colors.textPrimary }}>Customer</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: colors.textPrimary }}>Date</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: colors.textPrimary }}>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recentBookings.map((booking) => (
                        <TableRow key={booking.id} hover>
                          <TableCell sx={{ color: colors.textPrimary }}>{booking.package}</TableCell>
                          <TableCell sx={{ color: colors.textPrimary }}>{booking.customer}</TableCell>
                          <TableCell sx={{ color: colors.textPrimary }}>{booking.date}</TableCell>
                          <TableCell>
                            <StatusBadge variant="caption" status={booking.status}>
                              {booking.status}
                            </StatusBadge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </CardContent>
          </DashboardCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;