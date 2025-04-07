// import { useState } from 'react';
// import {
//   Container,
//   Typography,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   Snackbar,
//   Alert,
//   AlertColor,
//   Pagination,
//   Grid,
// } from '@mui/material';
// import { Add, Edit, Delete, Visibility } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';

// // Mock data for experience centers
// export const mockData = [
//   {
//     experienceCenterId: 1,
//     experienceCenterCode: 'CIN001',
//     experienceCenterName: 'Cinnamon Harvesting Basics',
//     experienceCenterDescription: 'Learn the traditional methods of harvesting cinnamon in a scenic setting.',
//     location: 'Kandy',
//     totalPrice: 50.0,
//     events: [
//       {
//         eventId: 1,
//         eventName: 'Morning Harvest Demonstration',
//         eventDescription: 'Hands-on session to learn cinnamon harvesting techniques.',
//         pricePerEvent: 25.0,
//         startTime: '2025-03-11T09:00:00Z',
//         endTime: '2025-03-11T11:00:00Z',
//       },
//       {
//         eventId: 2,
//         eventName: 'Afternoon Harvest Walk',
//         eventDescription: 'Guided walk through cinnamon fields with harvesting insights.',
//         pricePerEvent: 25.0,
//         startTime: '2025-03-11T14:00:00Z',
//         endTime: '2025-03-11T16:00:00Z',
//       },
//     ],
//   },
//   {
//     experienceCenterId: 2,
//     experienceCenterCode: 'CIN002',
//     experienceCenterName: 'Cinnamon Processing Workshop',
//     experienceCenterDescription: 'Discover the art of processing cinnamon bark into premium spices.',
//     location: 'Matale',
//     totalPrice: 45.0,
//     events: [
//       {
//         eventId: 3,
//         eventName: 'Bark Processing Session',
//         eventDescription: 'Learn to process cinnamon bark step-by-step.',
//         pricePerEvent: 30.0,
//         startTime: '2025-03-11T10:00:00Z',
//         endTime: '2025-03-11T12:00:00Z',
//       },
//       {
//         eventId: 4,
//         eventName: 'Spice Packaging Workshop',
//         eventDescription: 'Create your own cinnamon spice packs.',
//         pricePerEvent: 15.0,
//         startTime: '2025-03-11T13:30:00Z',
//         endTime: '2025-03-11T15:00:00Z',
//       },
//     ],
//   },
//   {
//     experienceCenterId: 3,
//     experienceCenterCode: 'CIN003',
//     experienceCenterName: 'Cinnamon Plantation Tour',
//     experienceCenterDescription: 'Explore lush cinnamon plantations and learn about their cultivation.',
//     location: 'Galle',
//     totalPrice: 40.0,
//     events: [
//       {
//         eventId: 5,
//         eventName: 'Plantation Guided Tour',
//         eventDescription: 'Explore cinnamon cultivation with an expert guide.',
//         pricePerEvent: 40.0,
//         startTime: '2025-03-11T08:30:00Z',
//         endTime: '2025-03-11T10:30:00Z',
//       },
//     ],
//   },
//   {
//     experienceCenterId: 4,
//     experienceCenterCode: 'CIN004',
//     experienceCenterName: 'Cinnamon Cooking Class',
//     experienceCenterDescription: 'Master the use of cinnamon in authentic Sri Lankan cuisine.',
//     location: 'Colombo',
//     totalPrice: 55.0,
//     events: [
//       {
//         eventId: 6,
//         eventName: 'Morning Cooking Class',
//         eventDescription: 'Cook cinnamon-infused dishes with a local chef.',
//         pricePerEvent: 30.0,
//         startTime: '2025-03-11T09:30:00Z',
//         endTime: '2025-03-11T12:00:00Z',
//       },
//       {
//         eventId: 7,
//         eventName: 'Dessert Making Session',
//         eventDescription: 'Learn to make cinnamon desserts.',
//         pricePerEvent: 25.0,
//         startTime: '2025-03-11T14:00:00Z',
//         endTime: '2025-03-11T16:00:00Z',
//       },
//     ],
//   },
//   {
//     experienceCenterId: 5,
//     experienceCenterCode: 'CIN005',
//     experienceCenterName: 'Cinnamon Aromatherapy Session',
//     experienceCenterDescription: 'Experience relaxation with cinnamon-infused aromatherapy treatments.',
//     location: 'Nuwara Eliya',
//     totalPrice: 60.0,
//     events: [
//       {
//         eventId: 8,
//         eventName: 'Aromatherapy Basics',
//         eventDescription: 'Introduction to cinnamon oil relaxation techniques.',
//         pricePerEvent: 30.0,
//         startTime: '2025-03-11T10:00:00Z',
//         endTime: '2025-03-11T11:30:00Z',
//       },
//       {
//         eventId: 9,
//         eventName: 'Advanced Aromatherapy',
//         eventDescription: 'Deep dive into cinnamon-based treatments.',
//         pricePerEvent: 30.0,
//         startTime: '2025-03-11T13:00:00Z',
//         endTime: '2025-03-11T14:30:00Z',
//       },
//     ],
//   },
//   {
//     experienceCenterId: 6,
//     experienceCenterCode: 'CIN006',
//     experienceCenterName: 'Cinnamon History Walk',
//     experienceCenterDescription: 'Walk through history while learning about cinnamon’s cultural significance.',
//     location: 'Matara',
//     totalPrice: 35.0,
//     events: [
//       {
//         eventId: 10,
//         eventName: 'Historical Tour',
//         eventDescription: 'Explore cinnamon’s role in trade and culture.',
//         pricePerEvent: 35.0,
//         startTime: '2025-03-11T09:00:00Z',
//         endTime: '2025-03-11T11:00:00Z',
//       },
//     ],
//   },
//   {
//     experienceCenterId: 7,
//     experienceCenterCode: 'CIN007',
//     experienceCenterName: 'Cinnamon Craft Making',
//     experienceCenterDescription: 'Create handmade crafts using cinnamon sticks and natural materials.',
//     location: 'Ella',
//     totalPrice: 45.0,
//     events: [
//       {
//         eventId: 11,
//         eventName: 'Craft Workshop',
//         eventDescription: 'Make crafts with cinnamon sticks.',
//         pricePerEvent: 25.0,
//         startTime: '2025-03-11T10:30:00Z',
//         endTime: '2025-03-11T12:30:00Z',
//       },
//       {
//         eventId: 12,
//         eventName: 'Advanced Craft Session',
//         eventDescription: 'Create complex cinnamon crafts.',
//         pricePerEvent: 20.0,
//         startTime: '2025-03-11T14:00:00Z',
//         endTime: '2025-03-11T16:00:00Z',
//       },
//     ],
//   },
//   {
//     experienceCenterId: 8,
//     experienceCenterCode: 'CIN008',
//     experienceCenterName: 'Cinnamon Garden Exploration',
//     experienceCenterDescription: 'Explore a cinnamon garden with guided insights into its ecosystem.',
//     location: 'Pinnawala',
//     totalPrice: 50.0,
//     events: [
//       {
//         eventId: 13,
//         eventName: 'Garden Tour',
//         eventDescription: 'Guided exploration of cinnamon ecosystems.',
//         pricePerEvent: 30.0,
//         startTime: '2025-03-11T08:00:00Z',
//         endTime: '2025-03-11T10:00:00Z',
//       },
//       {
//         eventId: 14,
//         eventName: 'Eco-Talk Session',
//         eventDescription: 'Learn about cinnamon sustainability.',
//         pricePerEvent: 20.0,
//         startTime: '2025-03-11T11:00:00Z',
//         endTime: '2025-03-11T12:00:00Z',
//       },
//     ],
//   },
//   {
//     experienceCenterId: 9,
//     experienceCenterCode: 'CIN009',
//     experienceCenterName: 'Cinnamon Tea Blending',
//     experienceCenterDescription: 'Learn to blend cinnamon with local teas for a unique flavor experience.',
//     location: 'Arugam Bay',
//     totalPrice: 40.0,
//     events: [
//       {
//         eventId: 15,
//         eventName: 'Tea Blending Class',
//         eventDescription: 'Blend cinnamon with local teas.',
//         pricePerEvent: 25.0,
//         startTime: '2025-03-11T09:00:00Z',
//         endTime: '2025-03-11T11:00:00Z',
//       },
//       {
//         eventId: 16,
//         eventName: 'Tasting Session',
//         eventDescription: 'Taste and refine your cinnamon tea blends.',
//         pricePerEvent: 15.0,
//         startTime: '2025-03-11T11:30:00Z',
//         endTime: '2025-03-11T12:30:00Z',
//       },
//     ],
//   },
// ];

// const ExperienceCenterManagement = () => {
//   const [experienceCenters, setExperienceCenters] = useState(mockData);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [currentExperienceCenter, setCurrentExperienceCenter] = useState<typeof mockData[0] | null>(null);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');
//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 5;

//   const pageCount = Math.ceil(experienceCenters.length / rowsPerPage);
//   const navigate = useNavigate();

//   // Handle add experience center
//   const handleAddClick = () => {
//     setEditMode(false);
//     setCurrentExperienceCenter(null);
//     setOpenDialog(true);
//   };

//   // Handle edit experience center
//   const handleEditClick = (experienceCenter: typeof mockData[0]) => {
//     setEditMode(true);
//     setCurrentExperienceCenter(experienceCenter);
//     setOpenDialog(true);
//   };

//   // Handle delete experience center
//   const handleDeleteClick = (id: number) => {
//     setExperienceCenters(experienceCenters.filter((experienceCenter) => experienceCenter.experienceCenterId !== id));
//     setSnackbarMessage('Experience center deleted successfully!');
//     setSnackbarSeverity('success');
//     setSnackbarOpen(true);
//   };

//   // Handle save/update experience center
//   const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const formData = new FormData(event.currentTarget);

//     const newExperienceCenter = {
//       experienceCenterId: currentExperienceCenter ? currentExperienceCenter.experienceCenterId : experienceCenters.length + 1,
//       experienceCenterCode: String(formData.get('experienceCenterCode')),
//       experienceCenterName: String(formData.get('experienceCenterName')),
//       experienceCenterDescription: String(formData.get('experienceCenterDescription')),
//       location: String(formData.get('location')),
//       totalPrice: parseFloat(String(formData.get('totalPrice'))),
//       events: currentExperienceCenter ? currentExperienceCenter.events : [], // Preserve events
//     };

//     if (currentExperienceCenter) {
//       // Update existing experience center
//       setExperienceCenters(
//         experienceCenters.map((experienceCenter) =>
//           experienceCenter.experienceCenterId === currentExperienceCenter.experienceCenterId ? newExperienceCenter : experienceCenter
//         )
//       );
//       setSnackbarMessage('Experience center updated successfully!');
//     } else {
//       // Add new experience center
//       setExperienceCenters([...experienceCenters, newExperienceCenter]);
//       setSnackbarMessage('Experience center added successfully!');
//     }

//     setSnackbarSeverity('success');
//     setSnackbarOpen(true);
//     setOpenDialog(false);
//   };

//   // Handle snackbar close
//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   // Handle page change for Pagination
//   const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
//     setCurrentPage(page);
//   };

//   // Get data for the current page
//   const paginatedData = experienceCenters.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage
//   );

//   // Handle view events
//   const handleViewEvents = (experienceCenterId: number) => {
//     navigate(`/admin/experience-center-management/events/${experienceCenterId}`); // Navigate to events details page
//   };

//   return (
//     <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
//       <Typography variant="h4" gutterBottom style={{ fontFamily: 'Poppins, sans-serif', color: '#1E293B' }}>
//         Experience Center Management
//       </Typography>
//       <Button
//         variant="contained"
//         color="primary"
//         startIcon={<Add />}
//         onClick={handleAddClick}
//         style={{ backgroundColor: '#B45309', color: '#FFFFFF' }}
//       >
//         Add Experience Center
//       </Button>

//       {/* Experience Centers Table */}
//       <TableContainer component={Paper} style={{ marginTop: '1.5rem', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
//         <Table>
//           <TableHead>
//             <TableRow style={{ backgroundColor: '#F8FAFC' }}>
//               <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Experience Center Code</TableCell>
//               <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Experience Center Name</TableCell>
//               <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Location</TableCell>
//               <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Total Price</TableCell>
//               <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Events</TableCell>
//               <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {paginatedData.map((experienceCenter) => (
//               <TableRow key={experienceCenter.experienceCenterId}>
//                 <TableCell>{experienceCenter.experienceCenterCode}</TableCell>
//                 <TableCell>{experienceCenter.experienceCenterName}</TableCell>
//                 <TableCell>{experienceCenter.location}</TableCell>
//                 <TableCell>${experienceCenter.totalPrice.toFixed(2)}</TableCell>
//                 <TableCell>
//                   <span
//                     style={{ cursor: 'pointer', color: '#B45309', display: 'flex', alignItems: 'center', gap: '4px' }}
//                     onClick={() => handleViewEvents(experienceCenter.experienceCenterId)}
//                   >
//                     <Visibility fontSize="small" /> View Events
//                   </span>
//                 </TableCell>
//                 <TableCell>
//                   <IconButton color="primary" onClick={() => handleEditClick(experienceCenter)}>
//                     <Edit style={{ color: '#291e10' }} />
//                   </IconButton>
//                   <IconButton color="secondary" onClick={() => handleDeleteClick(experienceCenter.experienceCenterId)}>
//                     <Delete style={{ color: '#EF4444' }} />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Pagination */}
//       <Pagination
//         count={pageCount}
//         page={currentPage}
//         onChange={handlePageChange}
//         color="primary"
//         sx={{
//           marginTop: '1.5rem',
//           display: 'flex',
//           justifyContent: 'center',
//           "& .MuiPaginationItem-root.Mui-selected": {
//             backgroundColor: "#A0522D",
//             color: "white",
//           },
//         }}
//       />

//       {/* Add/Edit Experience Center Dialog */}
//       <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
//         <DialogTitle style={{ fontFamily: 'Poppins, sans-serif', color: '#1E293B' }}>
//           {editMode ? 'Edit Experience Center' : 'Add Experience Center'}
//         </DialogTitle>
//         <DialogContent>
//           <form id="experience-center-form" onSubmit={handleSave}>
//             <Grid container spacing={2}> {/* Use Grid container with spacing */}
//               <Grid item xs={12} sm={6}> {/* First column */}
//                 <TextField
//                   label="Experience Center Code"
//                   name="experienceCenterCode"
//                   fullWidth
//                   margin="normal"
//                   defaultValue={currentExperienceCenter?.experienceCenterCode}
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}> {/* Second column */}
//                 <TextField
//                   label="Experience Center Name"
//                   name="experienceCenterName"
//                   fullWidth
//                   margin="normal"
//                   defaultValue={currentExperienceCenter?.experienceCenterName}
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12}> {/* Full-width description field */}
//                 <TextField
//                   label="Experience Center Description"
//                   name="experienceCenterDescription"
//                   fullWidth
//                   margin="normal"
//                   defaultValue={currentExperienceCenter?.experienceCenterDescription}
//                   required
//                   multiline
//                   rows={4}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Location"
//                   name="location"
//                   fullWidth
//                   margin="normal"
//                   defaultValue={currentExperienceCenter?.location}
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Total Price"
//                   name="totalPrice"
//                   type="number"
//                   fullWidth
//                   margin="normal"
//                   defaultValue={currentExperienceCenter?.totalPrice}
//                   required
//                 />
//               </Grid>
//             </Grid>
//           </form>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenDialog(false)} style={{ color: '#64748B' }}>
//             Cancel
//           </Button>
//           <Button
//             type="submit"
//             form="experience-center-form"
//             variant="contained"
//             style={{ backgroundColor: '#B45309', color: '#FFFFFF' }}
//           >
//             {editMode ? 'Update' : 'Save'}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Snackbar for notifications */}
//       <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
//         <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default ExperienceCenterManagement;

import { useState, lazy, Suspense } from 'react';
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar,
  Alert,
  AlertColor,
  Pagination,
  Grid,
  Box,
  InputAdornment,
} from '@mui/material';
import { Add, Edit, Delete, Visibility, Place, Close } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ExperienceCenter} from '../../../types/experienceCenterTypes';

const MapWithNoSSR = lazy(() => import('../Map'));

export const mockData: ExperienceCenter[] = [
  {
    experienceCenterId: 1,
    experienceCenterCode: 'CIN001',
    experienceCenterName: 'Cinnamon Harvesting Basics',
    experienceCenterDescription: 'Learn the traditional methods of harvesting cinnamon in a scenic setting.',
    location: 'Kandy',
    locationMapLink: 'https://www.openstreetmap.org/#map=15/7.2906/80.6337',
    demoVideoLink: '',
    events: [
      {
        eventId: 1,
        eventName: 'Morning Harvest Demonstration',
        eventDescription: 'Hands-on session to learn cinnamon harvesting techniques.',
        pricePerEvent: 25.0,
        startTime: '2025-03-11T09:00:00Z',
        endTime: '2025-03-11T11:00:00Z',
      },
      // ... other events
    ],
  },
  // ... other experience centers
];

const ExperienceCenterManagement = () => {
  const [experienceCenters, setExperienceCenters] = useState<ExperienceCenter[]>(mockData);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentExperienceCenter, setCurrentExperienceCenter] = useState<ExperienceCenter | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');
  const [currentPage, setCurrentPage] = useState(1);
  const [mapDialogOpen, setMapDialogOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const rowsPerPage = 5;
  const navigate = useNavigate();

  const pageCount = Math.ceil(experienceCenters.length / rowsPerPage);

  const handleAddClick = () => {
    setEditMode(false);
    setCurrentExperienceCenter(null);
    setSelectedLocation('');
    setOpenDialog(true);
  };

  const handleEditClick = (experienceCenter: ExperienceCenter) => {
    setEditMode(true);
    setCurrentExperienceCenter(experienceCenter);
    setSelectedLocation(experienceCenter.locationMapLink);
    setOpenDialog(true);
  };

  const handleDeleteClick = (id: number) => {
    setExperienceCenters(experienceCenters.filter((ec) => ec.experienceCenterId !== id));
    setSnackbarMessage('Experience center deleted successfully!');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  const handleMapSelection = (lat: number, lng: number) => {
    const url = `https://www.openstreetmap.org/#map=15/${lat.toFixed(4)}/${lng.toFixed(4)}`;
    setSelectedLocation(url);
  };

  const parseMapLink = (link: string) => {
    if (!link) return undefined;
    const parts = link.split('/');
    const lat = parseFloat(parts[parts.length - 2]);
    const lng = parseFloat(parts[parts.length - 1]);
    return { lat, lng };
  };

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const newExperienceCenter: ExperienceCenter = {
      experienceCenterId: currentExperienceCenter ? currentExperienceCenter.experienceCenterId : experienceCenters.length + 1,
      experienceCenterCode: String(formData.get('experienceCenterCode')),
      experienceCenterName: String(formData.get('experienceCenterName')),
      experienceCenterDescription: String(formData.get('experienceCenterDescription')),
      location: String(formData.get('location')),
      locationMapLink: selectedLocation || String(formData.get('locationMapLink')),
      demoVideoLink: String(formData.get('demoVideoLink')),
      events: currentExperienceCenter ? currentExperienceCenter.events : [],
    };

    if (currentExperienceCenter) {
      setExperienceCenters(
        experienceCenters.map((ec) =>
          ec.experienceCenterId === currentExperienceCenter.experienceCenterId ? newExperienceCenter : ec
        )
      );
      setSnackbarMessage('Experience center updated successfully!');
    } else {
      setExperienceCenters([...experienceCenters, newExperienceCenter]);
      setSnackbarMessage('Experience center added successfully!');
    }

    setSnackbarSeverity('success');
    setSnackbarOpen(true);
    setOpenDialog(false);
    setSelectedLocation('');
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const paginatedData = experienceCenters.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleViewEvents = (experienceCenterId: number) => {
    navigate(`/admin/experience-center-management/events/${experienceCenterId}`);
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom style={{ fontFamily: 'Poppins, sans-serif', color: '#1E293B' }}>
        Experience Center Management
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={handleAddClick}
        style={{ backgroundColor: '#B45309', color: '#FFFFFF' }}
      >
        Add Experience Center
      </Button>

      <TableContainer component={Paper} style={{ marginTop: '1.5rem', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#F8FAFC' }}>
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Code</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Name</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Location</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Events</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((ec) => (
              <TableRow key={ec.experienceCenterId}>
                <TableCell>{ec.experienceCenterCode}</TableCell>
                <TableCell>{ec.experienceCenterName}</TableCell>
                <TableCell>{ec.location}</TableCell>
                <TableCell>
                  <span
                    style={{ cursor: 'pointer', color: '#B45309', display: 'flex', alignItems: 'center', gap: '4px' }}
                    onClick={() => handleViewEvents(ec.experienceCenterId)}
                  >
                    <Visibility fontSize="small" /> View Events
                  </span>
                </TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEditClick(ec)}>
                    <Edit style={{ color: '#291e10' }} />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDeleteClick(ec.experienceCenterId)}>
                    <Delete style={{ color: '#EF4444' }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={pageCount}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        sx={{
          marginTop: '1.5rem',
          display: 'flex',
          justifyContent: 'center',
          "& .MuiPaginationItem-root.Mui-selected": {
            backgroundColor: "#A0522D",
            color: "white",
          },
        }}
      />

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle style={{ fontFamily: 'Poppins, sans-serif', color: '#1E293B' }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">
              {editMode ? 'Edit Experience Center' : 'Add Experience Center'}
            </Typography>
            <IconButton onClick={() => setOpenDialog(false)}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <form id="experience-center-form" onSubmit={handleSave}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Experience Center Code"
                  name="experienceCenterCode"
                  fullWidth
                  margin="normal"
                  defaultValue={currentExperienceCenter?.experienceCenterCode}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Experience Center Name"
                  name="experienceCenterName"
                  fullWidth
                  margin="normal"
                  defaultValue={currentExperienceCenter?.experienceCenterName}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  name="experienceCenterDescription"
                  fullWidth
                  margin="normal"
                  defaultValue={currentExperienceCenter?.experienceCenterDescription}
                  required
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Location"
                  name="location"
                  fullWidth
                  margin="normal"
                  defaultValue={currentExperienceCenter?.location}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Demo Video Link"
                  name="demoVideoLink"
                  fullWidth
                  margin="normal"
                  defaultValue={currentExperienceCenter?.demoVideoLink || ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Location Map Link"
                  name="locationMapLink"
                  fullWidth
                  margin="normal"
                  value={selectedLocation || currentExperienceCenter?.locationMapLink || ''}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setMapDialogOpen(true)}
                          edge="end"
                          sx={{ color: '#B45309' }}
                        >
                          <Place />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} style={{ color: '#64748B' }}>
            Cancel
          </Button>
          <Button
            type="submit"
            form="experience-center-form"
            variant="contained"
            style={{ backgroundColor: '#B45309', color: '#FFFFFF' }}
          >
            {editMode ? 'Update' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={mapDialogOpen}
        onClose={() => setMapDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ 
          fontFamily: "Poppins, sans-serif", 
          color: "#1E293B",
          paddingBottom: "8px"
        }}>
          <Box display="flex" alignItems="center">
            <Place sx={{ 
              color: "#B45309",
              marginRight: "8px"
            }} />
            <Typography variant="h6">
              Experience Center Location
            </Typography>
          </Box>
          <Typography variant="body2" color="textSecondary">
            Drag the place marker to select location
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ height: "500px", mt: 1 }}>
            <Suspense fallback={<div style={{ textAlign: "center", paddingTop: "200px" }}>Loading map...</div>}>
              <MapWithNoSSR
                onLocationSelect={handleMapSelection}
                initialLocation={
                  selectedLocation ? 
                    parseMapLink(selectedLocation) : 
                    (currentExperienceCenter?.locationMapLink ? 
                      parseMapLink(currentExperienceCenter.locationMapLink) : undefined)
                }
                markerColor="#B45309"
              />
            </Suspense>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setMapDialogOpen(false)}
            sx={{
              color: "#64748B",
              "&:hover": {
                backgroundColor: "#F1F5F9",
              },
            }}
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ExperienceCenterManagement;