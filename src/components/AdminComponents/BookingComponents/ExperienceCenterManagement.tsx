import { useState } from 'react';
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
} from '@mui/material';
import { Add, Edit, Delete, Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Mock data for experience centers
export const mockData = [
  {
    experienceCenterId: 1,
    experienceCenterCode: 'CIN001',
    experienceCenterName: 'Cinnamon Harvesting Basics',
    experienceCenterDescription: 'Learn the traditional methods of harvesting cinnamon in a scenic setting.',
    location: 'Kandy',
    totalPrice: 50.0,
    events: [
      {
        eventId: 1,
        eventName: 'Morning Harvest Demonstration',
        eventDescription: 'Hands-on session to learn cinnamon harvesting techniques.',
        pricePerEvent: 25.0,
        startTime: '2025-03-11T09:00:00Z',
        endTime: '2025-03-11T11:00:00Z',
      },
      {
        eventId: 2,
        eventName: 'Afternoon Harvest Walk',
        eventDescription: 'Guided walk through cinnamon fields with harvesting insights.',
        pricePerEvent: 25.0,
        startTime: '2025-03-11T14:00:00Z',
        endTime: '2025-03-11T16:00:00Z',
      },
    ],
  },
  {
    experienceCenterId: 2,
    experienceCenterCode: 'CIN002',
    experienceCenterName: 'Cinnamon Processing Workshop',
    experienceCenterDescription: 'Discover the art of processing cinnamon bark into premium spices.',
    location: 'Matale',
    totalPrice: 45.0,
    events: [
      {
        eventId: 3,
        eventName: 'Bark Processing Session',
        eventDescription: 'Learn to process cinnamon bark step-by-step.',
        pricePerEvent: 30.0,
        startTime: '2025-03-11T10:00:00Z',
        endTime: '2025-03-11T12:00:00Z',
      },
      {
        eventId: 4,
        eventName: 'Spice Packaging Workshop',
        eventDescription: 'Create your own cinnamon spice packs.',
        pricePerEvent: 15.0,
        startTime: '2025-03-11T13:30:00Z',
        endTime: '2025-03-11T15:00:00Z',
      },
    ],
  },
  {
    experienceCenterId: 3,
    experienceCenterCode: 'CIN003',
    experienceCenterName: 'Cinnamon Plantation Tour',
    experienceCenterDescription: 'Explore lush cinnamon plantations and learn about their cultivation.',
    location: 'Galle',
    totalPrice: 40.0,
    events: [
      {
        eventId: 5,
        eventName: 'Plantation Guided Tour',
        eventDescription: 'Explore cinnamon cultivation with an expert guide.',
        pricePerEvent: 40.0,
        startTime: '2025-03-11T08:30:00Z',
        endTime: '2025-03-11T10:30:00Z',
      },
    ],
  },
  {
    experienceCenterId: 4,
    experienceCenterCode: 'CIN004',
    experienceCenterName: 'Cinnamon Cooking Class',
    experienceCenterDescription: 'Master the use of cinnamon in authentic Sri Lankan cuisine.',
    location: 'Colombo',
    totalPrice: 55.0,
    events: [
      {
        eventId: 6,
        eventName: 'Morning Cooking Class',
        eventDescription: 'Cook cinnamon-infused dishes with a local chef.',
        pricePerEvent: 30.0,
        startTime: '2025-03-11T09:30:00Z',
        endTime: '2025-03-11T12:00:00Z',
      },
      {
        eventId: 7,
        eventName: 'Dessert Making Session',
        eventDescription: 'Learn to make cinnamon desserts.',
        pricePerEvent: 25.0,
        startTime: '2025-03-11T14:00:00Z',
        endTime: '2025-03-11T16:00:00Z',
      },
    ],
  },
  {
    experienceCenterId: 5,
    experienceCenterCode: 'CIN005',
    experienceCenterName: 'Cinnamon Aromatherapy Session',
    experienceCenterDescription: 'Experience relaxation with cinnamon-infused aromatherapy treatments.',
    location: 'Nuwara Eliya',
    totalPrice: 60.0,
    events: [
      {
        eventId: 8,
        eventName: 'Aromatherapy Basics',
        eventDescription: 'Introduction to cinnamon oil relaxation techniques.',
        pricePerEvent: 30.0,
        startTime: '2025-03-11T10:00:00Z',
        endTime: '2025-03-11T11:30:00Z',
      },
      {
        eventId: 9,
        eventName: 'Advanced Aromatherapy',
        eventDescription: 'Deep dive into cinnamon-based treatments.',
        pricePerEvent: 30.0,
        startTime: '2025-03-11T13:00:00Z',
        endTime: '2025-03-11T14:30:00Z',
      },
    ],
  },
  {
    experienceCenterId: 6,
    experienceCenterCode: 'CIN006',
    experienceCenterName: 'Cinnamon History Walk',
    experienceCenterDescription: 'Walk through history while learning about cinnamon’s cultural significance.',
    location: 'Matara',
    totalPrice: 35.0,
    events: [
      {
        eventId: 10,
        eventName: 'Historical Tour',
        eventDescription: 'Explore cinnamon’s role in trade and culture.',
        pricePerEvent: 35.0,
        startTime: '2025-03-11T09:00:00Z',
        endTime: '2025-03-11T11:00:00Z',
      },
    ],
  },
  {
    experienceCenterId: 7,
    experienceCenterCode: 'CIN007',
    experienceCenterName: 'Cinnamon Craft Making',
    experienceCenterDescription: 'Create handmade crafts using cinnamon sticks and natural materials.',
    location: 'Ella',
    totalPrice: 45.0,
    events: [
      {
        eventId: 11,
        eventName: 'Craft Workshop',
        eventDescription: 'Make crafts with cinnamon sticks.',
        pricePerEvent: 25.0,
        startTime: '2025-03-11T10:30:00Z',
        endTime: '2025-03-11T12:30:00Z',
      },
      {
        eventId: 12,
        eventName: 'Advanced Craft Session',
        eventDescription: 'Create complex cinnamon crafts.',
        pricePerEvent: 20.0,
        startTime: '2025-03-11T14:00:00Z',
        endTime: '2025-03-11T16:00:00Z',
      },
    ],
  },
  {
    experienceCenterId: 8,
    experienceCenterCode: 'CIN008',
    experienceCenterName: 'Cinnamon Garden Exploration',
    experienceCenterDescription: 'Explore a cinnamon garden with guided insights into its ecosystem.',
    location: 'Pinnawala',
    totalPrice: 50.0,
    events: [
      {
        eventId: 13,
        eventName: 'Garden Tour',
        eventDescription: 'Guided exploration of cinnamon ecosystems.',
        pricePerEvent: 30.0,
        startTime: '2025-03-11T08:00:00Z',
        endTime: '2025-03-11T10:00:00Z',
      },
      {
        eventId: 14,
        eventName: 'Eco-Talk Session',
        eventDescription: 'Learn about cinnamon sustainability.',
        pricePerEvent: 20.0,
        startTime: '2025-03-11T11:00:00Z',
        endTime: '2025-03-11T12:00:00Z',
      },
    ],
  },
  {
    experienceCenterId: 9,
    experienceCenterCode: 'CIN009',
    experienceCenterName: 'Cinnamon Tea Blending',
    experienceCenterDescription: 'Learn to blend cinnamon with local teas for a unique flavor experience.',
    location: 'Arugam Bay',
    totalPrice: 40.0,
    events: [
      {
        eventId: 15,
        eventName: 'Tea Blending Class',
        eventDescription: 'Blend cinnamon with local teas.',
        pricePerEvent: 25.0,
        startTime: '2025-03-11T09:00:00Z',
        endTime: '2025-03-11T11:00:00Z',
      },
      {
        eventId: 16,
        eventName: 'Tasting Session',
        eventDescription: 'Taste and refine your cinnamon tea blends.',
        pricePerEvent: 15.0,
        startTime: '2025-03-11T11:30:00Z',
        endTime: '2025-03-11T12:30:00Z',
      },
    ],
  },
];

const ExperienceCenterManagement = () => {
  const [experienceCenters, setExperienceCenters] = useState(mockData);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentExperienceCenter, setCurrentExperienceCenter] = useState<typeof mockData[0] | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const pageCount = Math.ceil(experienceCenters.length / rowsPerPage);
  const navigate = useNavigate();

  // Handle add experience center
  const handleAddClick = () => {
    setEditMode(false);
    setCurrentExperienceCenter(null);
    setOpenDialog(true);
  };

  // Handle edit experience center
  const handleEditClick = (experienceCenter: typeof mockData[0]) => {
    setEditMode(true);
    setCurrentExperienceCenter(experienceCenter);
    setOpenDialog(true);
  };

  // Handle delete experience center
  const handleDeleteClick = (id: number) => {
    setExperienceCenters(experienceCenters.filter((experienceCenter) => experienceCenter.experienceCenterId !== id));
    setSnackbarMessage('Experience center deleted successfully!');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  // Handle save/update experience center
  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const newExperienceCenter = {
      experienceCenterId: currentExperienceCenter ? currentExperienceCenter.experienceCenterId : experienceCenters.length + 1,
      experienceCenterCode: String(formData.get('experienceCenterCode')),
      experienceCenterName: String(formData.get('experienceCenterName')),
      experienceCenterDescription: String(formData.get('experienceCenterDescription')),
      location: String(formData.get('location')),
      totalPrice: parseFloat(String(formData.get('totalPrice'))),
      events: currentExperienceCenter ? currentExperienceCenter.events : [], // Preserve events
    };

    if (currentExperienceCenter) {
      // Update existing experience center
      setExperienceCenters(
        experienceCenters.map((experienceCenter) =>
          experienceCenter.experienceCenterId === currentExperienceCenter.experienceCenterId ? newExperienceCenter : experienceCenter
        )
      );
      setSnackbarMessage('Experience center updated successfully!');
    } else {
      // Add new experience center
      setExperienceCenters([...experienceCenters, newExperienceCenter]);
      setSnackbarMessage('Experience center added successfully!');
    }

    setSnackbarSeverity('success');
    setSnackbarOpen(true);
    setOpenDialog(false);
  };

  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Handle page change for Pagination
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  // Get data for the current page
  const paginatedData = experienceCenters.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Handle view events
  const handleViewEvents = (experienceCenterId: number) => {
    navigate(`events/${experienceCenterId}`); // Navigate to events details page
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

      {/* Experience Centers Table */}
      <TableContainer component={Paper} style={{ marginTop: '1.5rem', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#F8FAFC' }}>
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Experience Center Code</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Experience Center Name</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Location</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Total Price</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Events</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((experienceCenter) => (
              <TableRow key={experienceCenter.experienceCenterId}>
                <TableCell>{experienceCenter.experienceCenterCode}</TableCell>
                <TableCell>{experienceCenter.experienceCenterName}</TableCell>
                <TableCell>{experienceCenter.location}</TableCell>
                <TableCell>${experienceCenter.totalPrice.toFixed(2)}</TableCell>
                <TableCell>
                  <span
                    style={{ cursor: 'pointer', color: '#B45309', display: 'flex', alignItems: 'center', gap: '4px' }}
                    onClick={() => handleViewEvents(experienceCenter.experienceCenterId)}
                  >
                    <Visibility fontSize="small" /> View Events
                  </span>
                </TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEditClick(experienceCenter)}>
                    <Edit style={{ color: '#291e10' }} />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDeleteClick(experienceCenter.experienceCenterId)}>
                    <Delete style={{ color: '#EF4444' }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
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

      {/* Add/Edit Experience Center Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle style={{ fontFamily: 'Poppins, sans-serif', color: '#1E293B' }}>
          {editMode ? 'Edit Experience Center' : 'Add Experience Center'}
        </DialogTitle>
        <DialogContent>
          <form id="experience-center-form" onSubmit={handleSave}>
            <TextField
              label="Experience Center Code"
              name="experienceCenterCode"
              fullWidth
              margin="normal"
              defaultValue={currentExperienceCenter?.experienceCenterCode}
              required
            />
            <TextField
              label="Experience Center Name"
              name="experienceCenterName"
              fullWidth
              margin="normal"
              defaultValue={currentExperienceCenter?.experienceCenterName}
              required
            />
            <TextField
              label="Experience Center Description"
              name="experienceCenterDescription"
              fullWidth
              margin="normal"
              defaultValue={currentExperienceCenter?.experienceCenterDescription}
              required
            />
            <TextField
              label="Location"
              name="location"
              fullWidth
              margin="normal"
              defaultValue={currentExperienceCenter?.location}
              required
            />
            <TextField
              label="Total Price"
              name="totalPrice"
              type="number"
              fullWidth
              margin="normal"
              defaultValue={currentExperienceCenter?.totalPrice}
              required
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} style={{ color: '#64748B' }}>
            Cancel
          </Button>
          <Button type="submit" form="experience-center-form" variant="contained" style={{ backgroundColor: '#B45309', color: '#FFFFFF' }}>
            {editMode ? 'Update' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ExperienceCenterManagement;