// // import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
// // import { Card, CardContent, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';

// // const Dashboard = () => {
// //   // Sales Data (Daily/Weekly Sales with Product)
// //   const salesData = [
// //     { date: '2023-10-01', product: 'Cinnamon Sticks', sales: 120 },
// //     { date: '2023-10-02', product: 'Cinnamon Powder', sales: 80 },
// //     { date: '2023-10-03', product: 'Cinnamon Oil', sales: 200 },
// //     { date: '2023-10-04', product: 'Cinnamon Tea', sales: 50 },
// //     { date: '2023-10-05', product: 'Cinnamon Sticks', sales: 150 },
// //     { date: '2023-10-06', product: 'Cinnamon Powder', sales: 90 },
// //     { date: '2023-10-07', product: 'Cinnamon Oil', sales: 220 },
// //   ];

// //   // Recent Sales Data
// //   const recentSales = [
// //     { id: 1, product: 'Cinnamon Sticks', customer: 'John Doe', amount: 120, status: 'Completed' },
// //     { id: 2, product: 'Cinnamon Powder', customer: 'Jane Smith', amount: 80, status: 'Pending' },
// //     { id: 3, product: 'Cinnamon Oil', customer: 'Alice Johnson', amount: 200, status: 'Cancelled' },
// //   ];

// //   // Booking Trends Data (Bookings Over Time with Package Name)
// //   const bookingTrendsData = [
// //     { date: '2023-10-01', package: 'Luxury Villa', bookings: 5 },
// //     { date: '2023-10-02', package: 'Eco Cabin', bookings: 3 },
// //     { date: '2023-10-03', package: 'Beach Resort', bookings: 7 },
// //     { date: '2023-10-04', package: 'Luxury Villa', bookings: 6 },
// //     { date: '2023-10-05', package: 'Eco Cabin', bookings: 4 },
// //     { date: '2023-10-06', package: 'Beach Resort', bookings: 8 },
// //     { date: '2023-10-07', package: 'Luxury Villa', bookings: 5 },
// //   ];

// //   // Product Performance Data (Best-Selling Cinnamon Products)
// //   const productPerformanceData = [
// //     { name: 'Cinnamon Sticks', value: 400 },
// //     { name: 'Cinnamon Powder', value: 300 },
// //     { name: 'Cinnamon Oil', value: 200 },
// //     { name: 'Cinnamon Tea', value: 100 },
// //   ];

// //   // Package Performance Data (Accommodation Packages)
// //   const packagePerformanceData = [
// //     { name: 'Luxury Villa', value: 500 },
// //     { name: 'Eco Cabin', value: 300 },
// //     { name: 'Beach Resort', value: 200 },
// //   ];

// //   // Recent Bookings Data
// //   const recentBookings = [
// //     { id: 1, name: 'John Doe', date: '2023-10-01', guests: 2, status: 'Confirmed' },
// //     { id: 2, name: 'Jane Smith', date: '2023-10-02', guests: 4, status: 'Pending' },
// //     { id: 3, name: 'Alice Johnson', date: '2023-10-03', guests: 3, status: 'Cancelled' },
// //   ];

// //   // Modern Color Scheme
// //   const colors = {
// //     primary: '#3B82F6', // Blue
// //     secondary: '#10B981', // Green
// //     error: '#EF4444', // Red
// //     warning: '#F59E0B', // Orange
// //     background: '#fcfbf8', // Light Gray
// //     text: '#1E293B', // Dark Blue
// //   };

// //   return (
// //     <Box sx={{ flexGrow: 1, p: 3, backgroundColor: colors.background, minHeight: '100vh' }}>
// //       <Typography variant="h4" gutterBottom sx={{ color: colors.text }}>
// //         Dashboard
// //       </Typography>

// //       {/* Sales Chart */}
// //       <Grid container spacing={3} sx={{ mb: 3 }}>
// //         <Grid item xs={12} md={6}>
// //           <Card>
// //             <CardContent>
// //               <Typography variant="h6" gutterBottom sx={{ color: colors.text }}>
// //                 Sales Chart
// //               </Typography>
// //               <ResponsiveContainer width="100%" height={300}>
// //                 <LineChart data={salesData}>
// //                   <XAxis dataKey="date" />
// //                   <YAxis />
// //                   <Tooltip />
// //                   <Legend />
// //                   <Line type="monotone" dataKey="sales" stroke={colors.primary} name="Sales" />
// //                 </LineChart>
// //               </ResponsiveContainer>
// //             </CardContent>
// //           </Card>
// //         </Grid>

// //         {/* Booking Trends */}
// //         <Grid item xs={12} md={6}>
// //           <Card>
// //             <CardContent>
// //               <Typography variant="h6" gutterBottom sx={{ color: colors.text }}>
// //                 Booking Trends
// //               </Typography>
// //               <ResponsiveContainer width="100%" height={300}>
// //                 <LineChart data={bookingTrendsData}>
// //                   <XAxis dataKey="date" />
// //                   <YAxis />
// //                   <Tooltip />
// //                   <Legend />
// //                   <Line type="monotone" dataKey="bookings" stroke={colors.secondary} name="Bookings" />
// //                 </LineChart>
// //               </ResponsiveContainer>
// //             </CardContent>
// //           </Card>
// //         </Grid>
// //       </Grid>

// //       {/* Product Performance Pie Chart */}
// //       <Grid container spacing={3} sx={{ mb: 3 }}>
// //         <Grid item xs={12} md={6}>
// //           <Card>
// //             <CardContent>
// //               <Typography variant="h6" gutterBottom sx={{ color: colors.text }}>
// //                 Product Performance
// //               </Typography>
// //               <ResponsiveContainer width="100%" height={300}>
// //                 <PieChart>
// //                   <Pie data={productPerformanceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill={colors.primary}>
// //                     {productPerformanceData.map((_entry, index) => (
// //                       <Cell key={`cell-${index}`} fill={[colors.primary, colors.secondary, colors.warning, colors.error][index % 4]} />
// //                     ))}
// //                   </Pie>
// //                   <Tooltip />
// //                   <Legend />
// //                 </PieChart>
// //               </ResponsiveContainer>
// //             </CardContent>
// //           </Card>
// //         </Grid>

// //         {/* Package Performance Pie Chart */}
// //         <Grid item xs={12} md={6}>
// //           <Card>
// //             <CardContent>
// //               <Typography variant="h6" gutterBottom sx={{ color: colors.text }}>
// //                 Package Performance
// //               </Typography>
// //               <ResponsiveContainer width="100%" height={300}>
// //                 <PieChart>
// //                   <Pie data={packagePerformanceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill={colors.primary}>
// //                     {packagePerformanceData.map((_entry, index) => (
// //                       <Cell key={`cell-${index}`} fill={[colors.primary, colors.secondary, colors.warning][index % 3]} />
// //                     ))}
// //                   </Pie>
// //                   <Tooltip />
// //                   <Legend />
// //                 </PieChart>
// //               </ResponsiveContainer>
// //             </CardContent>
// //           </Card>
// //         </Grid>
// //       </Grid>

// //       {/* Recent Purchases */}
// //       <Grid container spacing={3} sx={{ mb: 3 }}>
// //         <Grid item xs={12} md={6}>
// //           <Card>
// //             <CardContent>
// //               <Typography variant="h6" gutterBottom sx={{ color: colors.text }}>
// //                 Recent Purchases
// //               </Typography>
// //               <TableContainer component={Paper}>
// //                 <Table>
// //                   <TableHead>
// //                     <TableRow>
// //                       <TableCell>Product</TableCell>
// //                       <TableCell>Customer</TableCell>
// //                       <TableCell>Amount</TableCell>
// //                       <TableCell>Status</TableCell>
// //                     </TableRow>
// //                   </TableHead>
// //                   <TableBody>
// //                     {recentSales.map((sale) => (
// //                       <TableRow key={sale.id}>
// //                         <TableCell>{sale.product}</TableCell>
// //                         <TableCell>{sale.customer}</TableCell>
// //                         <TableCell>{sale.amount}</TableCell>
// //                         <TableCell>
// //                           <Typography
// //                             sx={{
// //                               color:
// //                                 sale.status === 'Completed'
// //                                   ? colors.secondary
// //                                   : sale.status === 'Pending'
// //                                   ? colors.warning
// //                                   : colors.error,
// //                             }}
// //                           >
// //                             {sale.status}
// //                           </Typography>
// //                         </TableCell>
// //                       </TableRow>
// //                     ))}
// //                   </TableBody>
// //                 </Table>
// //               </TableContainer>
// //             </CardContent>
// //           </Card>
// //         </Grid>

// //         {/* Recent Bookings */}
// //         <Grid item xs={12} md={6}>
// //           <Card>
// //             <CardContent>
// //               <Typography variant="h6" gutterBottom sx={{ color: colors.text }}>
// //                 Recent Bookings
// //               </Typography>
// //               <TableContainer component={Paper}>
// //                 <Table>
// //                   <TableHead>
// //                     <TableRow>
// //                       <TableCell>Name</TableCell>
// //                       <TableCell>Date</TableCell>
// //                       <TableCell>Guests</TableCell>
// //                       <TableCell>Status</TableCell>
// //                     </TableRow>
// //                   </TableHead>
// //                   <TableBody>
// //                     {recentBookings.map((booking) => (
// //                       <TableRow key={booking.id}>
// //                         <TableCell>{booking.name}</TableCell>
// //                         <TableCell>{booking.date}</TableCell>
// //                         <TableCell>{booking.guests}</TableCell>
// //                         <TableCell>
// //                           <Typography
// //                             sx={{
// //                               color:
// //                                 booking.status === 'Confirmed'
// //                                   ? colors.secondary
// //                                   : booking.status === 'Pending'
// //                                   ? colors.warning
// //                                   : colors.error,
// //                             }}
// //                           >
// //                             {booking.status}
// //                           </Typography>
// //                         </TableCell>
// //                       </TableRow>
// //                     ))}
// //                   </TableBody>
// //                 </Table>
// //               </TableContainer>
// //             </CardContent>
// //           </Card>
// //         </Grid>
// //       </Grid>
// //     </Box>
// //   );
// // };

// // export default Dashboard;


// import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
// import { Card, CardContent, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';

// const Dashboard = () => {
//   // Sales Data
//   const salesData = [
//     { date: 'Oct 1', product: 'Cinnamon Sticks', sales: 120 },
//     { date: 'Oct 2', product: 'Cinnamon Powder', sales: 80 },
//     { date: 'Oct 3', product: 'Cinnamon Oil', sales: 200 },
//     { date: 'Oct 4', product: 'Cinnamon Tea', sales: 50 },
//     { date: 'Oct 5', product: 'Cinnamon Sticks', sales: 150 },
//     { date: 'Oct 6', product: 'Cinnamon Powder', sales: 90 },
//     { date: 'Oct 7', product: 'Cinnamon Oil', sales: 220 },
//   ];

//   // Recent Sales
//   const recentSales = [
//     { id: 1, product: 'Cinnamon Sticks', customer: 'John Doe', amount: 120, status: 'Completed' },
//     { id: 2, product: 'Cinnamon Powder', customer: 'Jane Smith', amount: 80, status: 'Pending' },
//     { id: 3, product: 'Cinnamon Oil', customer: 'Alice Johnson', amount: 200, status: 'Cancelled' },
//   ];

//   // Product Performance
//   const productPerformanceData = [
//     { name: 'Cinnamon Sticks', value: 400 },
//     { name: 'Cinnamon Powder', value: 300 },
//     { name: 'Cinnamon Oil', value: 200 },
//     { name: 'Cinnamon Tea', value: 100 },
//   ];

//   // Cinnamon-inspired color palette
//   const palette = {
//     primary: '#B45309',       // Main cinnamon color
//     secondary: '#92400E',     // Darker cinnamon
//     accent: '#F59E0B',        // Golden accent
//     background: '#FFF7ED',    // Warm light background
//     paper: '#FFFFFF',         // White for cards
//     textPrimary: '#1E293B',   // Dark text
//     textSecondary: '#64748B', // Secondary text
//     success: '#10B981',       // Green for success
//     warning: '#F59E0B',       // Orange for warning
//     error: '#EF4444',         // Red for errors
//   };

//   return (
//     <Box sx={{ 
//       flexGrow: 1, 
//       p: 3, 
//       backgroundColor: palette.background,
//       minHeight: '100vh'
//     }}>
//       {/* Header */}
//       <Typography variant="h4" gutterBottom sx={{ 
//         color: palette.primary,
//         fontWeight: 600,
//         mb: 4,
//         borderBottom: `2px solid ${palette.secondary}`,
//         pb: 1,
//         display: 'inline-block'
//       }}>
//         Cinnamon Dashboard
//       </Typography>

//       {/* Charts Row */}
//       <Grid container spacing={3} sx={{ mb: 3 }}>
//         {/* Sales Trend */}
//         <Grid item xs={12} md={8}>
//           <Card sx={{ 
//             backgroundColor: palette.paper,
//             boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
//             borderRadius: '12px'
//           }}>
//             <CardContent>
//               <Typography variant="h6" sx={{ 
//                 color: palette.primary,
//                 mb: 2,
//                 fontWeight: 500
//               }}>
//                 Sales Trend (Last 7 Days)
//               </Typography>
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={salesData}>
//                   <XAxis 
//                     dataKey="date" 
//                     tick={{ fill: palette.textSecondary }}
//                   />
//                   <YAxis 
//                     tick={{ fill: palette.textSecondary }}
//                   />
//                   <Tooltip 
//                     contentStyle={{
//                       backgroundColor: palette.paper,
//                       borderColor: palette.primary,
//                       borderRadius: '8px'
//                     }}
//                   />
//                   <Legend />
//                   <Line 
//                     type="monotone" 
//                     dataKey="sales" 
//                     stroke={palette.primary} 
//                     strokeWidth={2}
//                     dot={{ fill: palette.secondary, strokeWidth: 2 }}
//                     activeDot={{ fill: palette.secondary, strokeWidth: 2, r: 6 }}
//                     name="Sales" 
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Product Distribution */}
//         <Grid item xs={12} md={4}>
//           <Card sx={{ 
//             backgroundColor: palette.paper,
//             boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
//             borderRadius: '12px',
//             height: '100%'
//           }}>
//             <CardContent>
//               <Typography variant="h6" sx={{ 
//                 color: palette.primary,
//                 mb: 2,
//                 fontWeight: 500
//               }}>
//                 Product Distribution
//               </Typography>
//               <ResponsiveContainer width="100%" height={300}>
//                 <PieChart>
//                   <Pie 
//                     data={productPerformanceData} 
//                     dataKey="value" 
//                     nameKey="name" 
//                     cx="50%" 
//                     cy="50%" 
//                     outerRadius={80} 
//                     innerRadius={40}
//                     label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                   >
//                     <Cell fill={palette.primary} />
//                     <Cell fill={palette.secondary} />
//                     <Cell fill={palette.accent} />
//                     <Cell fill={palette.warning} />
//                   </Pie>
//                   <Tooltip 
//                     contentStyle={{
//                       backgroundColor: palette.paper,
//                       borderColor: palette.primary,
//                       borderRadius: '8px'
//                     }}
//                   />
//                 </PieChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* Recent Activity Row */}
//       <Grid container spacing={3}>
//         {/* Recent Orders */}
//         <Grid item xs={12} md={6}>
//           <Card sx={{ 
//             backgroundColor: palette.paper,
//             boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
//             borderRadius: '12px'
//           }}>
//             <CardContent>
//               <Typography variant="h6" sx={{ 
//                 color: palette.primary,
//                 mb: 2,
//                 fontWeight: 500
//               }}>
//                 Recent Orders
//               </Typography>
//               <TableContainer>
//                 <Table>
//                   <TableHead>
//                     <TableRow sx={{ 
//                       backgroundColor: palette.background,
//                       '& th': { 
//                         color: palette.textPrimary,
//                         fontWeight: 600
//                       }
//                     }}>
//                       <TableCell>Product</TableCell>
//                       <TableCell>Customer</TableCell>
//                       <TableCell>Amount</TableCell>
//                       <TableCell>Status</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {recentSales.map((sale) => (
//                       <TableRow 
//                         key={sale.id}
//                         hover
//                         sx={{ 
//                           '&:last-child td': { borderBottom: 0 },
//                           '&:hover': { backgroundColor: palette.background }
//                         }}
//                       >
//                         <TableCell>{sale.product}</TableCell>
//                         <TableCell>{sale.customer}</TableCell>
//                         <TableCell>${sale.amount}</TableCell>
//                         <TableCell>
//                           <Box sx={{
//                             display: 'inline-block',
//                             px: 1.5,
//                             py: 0.5,
//                             borderRadius: '12px',
//                             backgroundColor: 
//                               sale.status === 'Completed' ? 'rgba(16, 185, 129, 0.1)' :
//                               sale.status === 'Pending' ? 'rgba(245, 158, 11, 0.1)' :
//                               'rgba(239, 68, 68, 0.1)',
//                             color: 
//                               sale.status === 'Completed' ? palette.success :
//                               sale.status === 'Pending' ? palette.warning :
//                               palette.error,
//                             fontWeight: 500
//                           }}>
//                             {sale.status}
//                           </Box>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Quick Stats */}
//         <Grid item xs={12} md={6}>
//           <Grid container spacing={3}>
//             {/* Total Sales */}
//             <Grid item xs={12} sm={6}>
//               <Card sx={{ 
//                 backgroundColor: palette.primary,
//                 color: '#fff',
//                 borderRadius: '12px',
//                 height: '100%'
//               }}>
//                 <CardContent>
//                   <Typography variant="body2" sx={{ opacity: 0.8 }}>
//                     Total Sales
//                   </Typography>
//                   <Typography variant="h4" sx={{ fontWeight: 600 }}>
//                     $12,345
//                   </Typography>
//                   <Typography variant="caption" sx={{ opacity: 0.8, display: 'block', mt: 1 }}>
//                     +12% from last month
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>

//             {/* New Customers */}
//             <Grid item xs={12} sm={6}>
//               <Card sx={{ 
//                 backgroundColor: palette.paper,
//                 borderRadius: '12px',
//                 height: '100%'
//               }}>
//                 <CardContent>
//                   <Typography variant="body2" sx={{ color: palette.textSecondary }}>
//                     New Customers
//                   </Typography>
//                   <Typography variant="h4" sx={{ fontWeight: 600, color: palette.textPrimary }}>
//                     42
//                   </Typography>
//                   <Typography variant="caption" sx={{ color: palette.textSecondary, display: 'block', mt: 1 }}>
//                     +5 from last month
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>

//             {/* Top Product */}
//             <Grid item xs={12}>
//               <Card sx={{ 
//                 backgroundColor: palette.paper,
//                 borderRadius: '12px'
//               }}>
//                 <CardContent>
//                   <Typography variant="h6" sx={{ 
//                     color: palette.primary,
//                     mb: 2,
//                     fontWeight: 500
//                   }}>
//                     Top Product
//                   </Typography>
//                   <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                     <Box sx={{ 
//                       width: 48,
//                       height: 48,
//                       backgroundColor: palette.background,
//                       borderRadius: '8px',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       mr: 2
//                     }}>
//                       <Typography sx={{ 
//                         color: palette.primary,
//                         fontWeight: 600
//                       }}>
//                         CS
//                       </Typography>
//                     </Box>
//                     <Box>
//                       <Typography sx={{ fontWeight: 600, color: palette.textPrimary }}>
//                         Cinnamon Sticks
//                       </Typography>
//                       <Typography variant="body2" sx={{ color: palette.textSecondary }}>
//                         $3,200 total sales
//                       </Typography>
//                     </Box>
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default Dashboard;


import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

// Define props for StatusBadge
interface StatusBadgeProps {
  status: 'Completed' | 'Confirmed' | 'Pending' | 'Cancelled';
  children: React.ReactNode;
}

// Custom styled components with proper TypeScript typing
const DashboardCard = styled(Card)(({ theme }) => ({
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)'
  }
}));

const StatusBadge = styled(Typography)<StatusBadgeProps>(({ theme, status }) => ({
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

const Dashboard = () => {
  const theme = useTheme();
  
  // Cinnamon-inspired color palette
  const colors = {
    cinnamonPrimary: '#B45309',       // Main cinnamon color
    cinnamonDark: '#92400E',         // Dark cinnamon
    cinnamonLight: '#FEF3C7',        // Light cinnamon
    accentGreen: '#10B981',          // For positive metrics
    accentRed: '#EF4444',            // For negative metrics
    accentBlue: '#3B82F6',           // For interactive elements
    textPrimary: '#1F2937',          // Primary text
    textSecondary: '#6B7280',        // Secondary text
    background: '#F8FAFC',           // Page background
    cardBackground: '#FFFFFF',       // Card background
  };

  // Sales Data
  const salesData = [
    { date: 'Oct 1', product: 'Cinnamon Sticks', sales: 120 },
    { date: 'Oct 2', product: 'Cinnamon Powder', sales: 80 },
    { date: 'Oct 3', product: 'Cinnamon Oil', sales: 200 },
    { date: 'Oct 4', product: 'Cinnamon Tea', sales: 50 },
    { date: 'Oct 5', product: 'Cinnamon Sticks', sales: 150 },
    { date: 'Oct 6', product: 'Cinnamon Powder', sales: 90 },
    { date: 'Oct 7', product: 'Cinnamon Oil', sales: 220 },
  ];

  // Recent Sales
  const recentSales = [
    { id: 1, product: 'Cinnamon Sticks (1kg)', customer: 'John Doe', amount: '$120', status: 'Completed' },
    { id: 2, product: 'Cinnamon Powder (500g)', customer: 'Jane Smith', amount: '$80', status: 'Pending' },
    { id: 3, product: 'Cinnamon Oil (100ml)', customer: 'Alice Johnson', amount: '$200', status: 'Cancelled' },
    { id: 4, product: 'Cinnamon Tea (20 bags)', customer: 'Robert Brown', amount: '$45', status: 'Completed' },
  ];

  // Booking Trends
  const bookingTrendsData = [
    { date: 'Oct 1', package: 'Estate Tour', bookings: 5 },
    { date: 'Oct 2', package: 'Cinnamon Workshop', bookings: 3 },
    { date: 'Oct 3', package: 'Luxury Stay', bookings: 7 },
    { date: 'Oct 4', package: 'Estate Tour', bookings: 6 },
    { date: 'Oct 5', package: 'Cinnamon Workshop', bookings: 4 },
    { date: 'Oct 6', package: 'Luxury Stay', bookings: 8 },
    { date: 'Oct 7', package: 'Estate Tour', bookings: 5 },
  ];

  // Product Performance
  const productPerformanceData = [
    { name: 'Cinnamon Sticks', value: 400 },
    { name: 'Cinnamon Powder', value: 300 },
    { name: 'Cinnamon Oil', value: 200 },
    { name: 'Cinnamon Tea', value: 100 },
  ];

  // Package Performance
  const packagePerformanceData = [
    { name: 'Estate Tour', value: 500 },
    { name: 'Cinnamon Workshop', value: 300 },
    { name: 'Luxury Stay', value: 200 },
  ];

  // Recent Bookings
  const recentBookings = [
    { id: 1, package: 'Estate Tour', customer: 'John Doe', date: 'Oct 1', guests: 2, status: 'Confirmed' },
    { id: 2, package: 'Luxury Stay', customer: 'Jane Smith', date: 'Oct 2', guests: 4, status: 'Pending' },
    { id: 3, package: 'Cinnamon Workshop', customer: 'Alice Johnson', date: 'Oct 3', guests: 3, status: 'Cancelled' },
    { id: 4, package: 'Estate Tour', customer: 'Michael Wilson', date: 'Oct 4', guests: 5, status: 'Confirmed' },
  ];

  return (
    <Box sx={{ 
      flexGrow: 1, 
      p: 3, 
      backgroundColor: colors.background,
      minHeight: '100vh'
    }}>
      <Typography variant="h4" gutterBottom sx={{ 
        color: colors.textPrimary,
        fontWeight: 600,
        mb: 4,
        display: 'flex',
        alignItems: 'center'
      }}>
       Dashboard
      </Typography>

      {/* Summary Cards Row */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <DashboardCard sx={{ borderLeft: `4px solid ${colors.cinnamonPrimary}` }}>
            <CardContent>
              <Typography variant="subtitle2" sx={{ color: colors.textSecondary }}>Total Revenue</Typography>
              <Typography variant="h5" sx={{ color: colors.textPrimary, fontWeight: 600 }}>$12,345</Typography>
              <Typography variant="caption" sx={{ color: colors.accentGreen }}>+12% from last month</Typography>
            </CardContent>
          </DashboardCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <DashboardCard sx={{ borderLeft: `4px solid ${colors.accentGreen}` }}>
            <CardContent>
              <Typography variant="subtitle2" sx={{ color: colors.textSecondary }}>Product Sales</Typography>
              <Typography variant="h5" sx={{ color: colors.textPrimary, fontWeight: 600 }}>1,234</Typography>
              <Typography variant="caption" sx={{ color: colors.accentGreen }}>+8% from last month</Typography>
            </CardContent>
          </DashboardCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <DashboardCard sx={{ borderLeft: `4px solid ${colors.accentBlue}` }}>
            <CardContent>
              <Typography variant="subtitle2" sx={{ color: colors.textSecondary }}>Bookings</Typography>
              <Typography variant="h5" sx={{ color: colors.textPrimary, fontWeight: 600 }}>156</Typography>
              <Typography variant="caption" sx={{ color: colors.accentGreen }}>+15% from last month</Typography>
            </CardContent>
          </DashboardCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <DashboardCard sx={{ borderLeft: `4px solid ${colors.cinnamonDark}` }}>
            <CardContent>
              <Typography variant="subtitle2" sx={{ color: colors.textSecondary }}>New Customers</Typography>
              <Typography variant="h5" sx={{ color: colors.textPrimary, fontWeight: 600 }}>87</Typography>
              <Typography variant="caption" sx={{ color: colors.accentGreen }}>+5% from last month</Typography>
            </CardContent>
          </DashboardCard>
        </Grid>
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Sales Chart */}
        <Grid item xs={12} md={6}>
          <DashboardCard>
            <CardContent>
              <Typography variant="h6" sx={{ color: colors.textPrimary, mb: 2, fontWeight: 600 }}>
                Product Sales
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <XAxis 
                    dataKey="date" 
                    tick={{ fill: colors.textSecondary }}
                    axisLine={{ stroke: '#E5E7EB' }}
                  />
                  <YAxis 
                    tick={{ fill: colors.textSecondary }}
                    axisLine={{ stroke: '#E5E7EB' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: colors.cardBackground,
                      borderColor: '#E5E7EB',
                      borderRadius: '8px',
                      boxShadow: theme.shadows[3]
                    }}
                  />
                  <Legend />
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
            </CardContent>
          </DashboardCard>
        </Grid>

        {/* Booking Trends */}
        <Grid item xs={12} md={6}>
          <DashboardCard>
            <CardContent>
              <Typography variant="h6" sx={{ color: colors.textPrimary, mb: 2, fontWeight: 600 }}>
                Booking Trends
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={bookingTrendsData}>
                  <XAxis 
                    dataKey="date" 
                    tick={{ fill: colors.textSecondary }}
                    axisLine={{ stroke: '#E5E7EB' }}
                  />
                  <YAxis 
                    tick={{ fill: colors.textSecondary }}
                    axisLine={{ stroke: '#E5E7EB' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: colors.cardBackground,
                      borderColor: '#E5E7EB',
                      borderRadius: '8px',
                      boxShadow: theme.shadows[3]
                    }}
                  />
                  <Legend />
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
            </CardContent>
          </DashboardCard>
        </Grid>
      </Grid>

      {/* Pie Charts Row */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Product Performance */}
        <Grid item xs={12} md={6}>
          <DashboardCard>
            <CardContent>
              <Typography variant="h6" sx={{ color: colors.textPrimary, mb: 2, fontWeight: 600 }}>
                Product Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={productPerformanceData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {productPerformanceData.map((entry, index) => (
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
                    formatter={(value) => [`${value} units`, 'Sales']}
                    contentStyle={{
                      backgroundColor: colors.cardBackground,
                      borderColor: '#E5E7EB',
                      borderRadius: '8px',
                      boxShadow: theme.shadows[3]
                    }}
                  />
                  <Legend 
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    wrapperStyle={{ paddingLeft: '20px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </DashboardCard>
        </Grid>

        {/* Package Performance */}
        <Grid item xs={12} md={6}>
          <DashboardCard>
            <CardContent>
              <Typography variant="h6" sx={{ color: colors.textPrimary, mb: 2, fontWeight: 600 }}>
                Booking Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={packagePerformanceData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {packagePerformanceData.map((entry, index) => (
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
                    formatter={(value) => [`${value} bookings`, 'Count']}
                    contentStyle={{
                      backgroundColor: colors.cardBackground,
                      borderColor: '#E5E7EB',
                      borderRadius: '8px',
                      boxShadow: theme.shadows[3]
                    }}
                  />
                  <Legend 
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    wrapperStyle={{ paddingLeft: '20px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </DashboardCard>
        </Grid>
      </Grid>

      {/* Tables Row */}
      <Grid container spacing={3}>
        {/* Recent Orders */}
        <Grid item xs={12} md={6}>
          <DashboardCard>
            <CardContent>
              <Typography variant="h6" sx={{ color: colors.textPrimary, mb: 2, fontWeight: 600 }}>
                Recent Orders
              </Typography>
              <TableContainer>
                <Table>
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
                          <StatusBadge variant="caption" status={sale.status as StatusBadgeProps['status']}>
                            {sale.status}
                          </StatusBadge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </DashboardCard>
        </Grid>

        {/* Recent Bookings */}
        <Grid item xs={12} md={6}>
          <DashboardCard>
            <CardContent>
              <Typography variant="h6" sx={{ color: colors.textPrimary, mb: 2, fontWeight: 600 }}>
                Recent Bookings
              </Typography>
              <TableContainer>
                <Table>
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
                          <StatusBadge variant="caption" status={booking.status as StatusBadgeProps['status']}>
                            {booking.status}
                          </StatusBadge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </DashboardCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;