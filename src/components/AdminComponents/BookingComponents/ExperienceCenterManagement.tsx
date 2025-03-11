import { SetStateAction, useState } from 'react';
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
  Pagination, // Import Pagination
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

// Mock data for experience centers
const mockData = [
  {
    experienceCenterId: 1,
    experienceCenterCode: 'CIN001',
    experienceCenterName: 'Cinnamon Harvesting Basics',
    experienceCenterDescription: 'Learn the traditional methods of harvesting cinnamon in a scenic setting.',
    location: 'Kandy',
    totalPrice: 50.0,
  },
  {
    experienceCenterId: 2,
    experienceCenterCode: 'CIN002',
    experienceCenterName: 'Cinnamon Processing Workshop',
    experienceCenterDescription: 'Discover the art of processing cinnamon bark into premium spices.',
    location: 'Matale',
    totalPrice: 45.0,
  },
  {
    experienceCenterId: 3,
    experienceCenterCode: 'CIN003',
    experienceCenterName: 'Cinnamon Plantation Tour',
    experienceCenterDescription: 'Explore lush cinnamon plantations and learn about their cultivation.',
    location: 'Galle',
    totalPrice: 40.0,
  },
  {
    experienceCenterId: 4,
    experienceCenterCode: 'CIN004',
    experienceCenterName: 'Cinnamon Cooking Class',
    experienceCenterDescription: 'Master the use of cinnamon in authentic Sri Lankan cuisine.',
    location: 'Colombo',
    totalPrice: 55.0,
  },
  {
    experienceCenterId: 5,
    experienceCenterCode: 'CIN005',
    experienceCenterName: 'Cinnamon Aromatherapy Session',
    experienceCenterDescription: 'Experience relaxation with cinnamon-infused aromatherapy treatments.',
    location: 'Nuwara Eliya',
    totalPrice: 60.0,
  },
  {
    experienceCenterId: 6,
    experienceCenterCode: 'CIN006',
    experienceCenterName: 'Cinnamon History Walk',
    experienceCenterDescription: 'Walk through history while learning about cinnamon’s cultural significance.',
    location: 'Matara',
    totalPrice: 35.0,
  },
  {
    experienceCenterId: 7,
    experienceCenterCode: 'CIN007',
    experienceCenterName: 'Cinnamon Craft Making',
    experienceCenterDescription: 'Create handmade crafts using cinnamon sticks and natural materials.',
    location: 'Ella',
    totalPrice: 45.0,
  },
  {
    experienceCenterId: 8,
    experienceCenterCode: 'CIN008',
    experienceCenterName: 'Cinnamon Garden Exploration',
    experienceCenterDescription: 'Explore a cinnamon garden with guided insights into its ecosystem.',
    location: 'Pinnawala',
    totalPrice: 50.0,
  },
  {
    experienceCenterId: 9,
    experienceCenterCode: 'CIN009',
    experienceCenterName: 'Cinnamon Tea Blending',
    experienceCenterDescription: 'Learn to blend cinnamon with local teas for a unique flavor experience.',
    location: 'Arugam Bay',
    totalPrice: 40.0,
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
  const [currentPage, setCurrentPage] = useState(1); // Current page for Pagination
  const rowsPerPage = 5; // Number of rows per page

  // Calculate the total number of pages
  const pageCount = Math.ceil(experienceCenters.length / rowsPerPage);

  // Handle add experience
  const handleAddClick = () => {
    setEditMode(false);
    setCurrentExperienceCenter(null);
    setOpenDialog(true);
  };

  // Handle edit experience
  const handleEditClick = (experienceCenter: SetStateAction<{ experienceCenterId: number; experienceCenterCode: string; experienceCenterName: string; experienceCenterDescription: string; location: string; totalPrice: number; } | null>) => {
    setEditMode(true);
    setCurrentExperienceCenter(experienceCenter);
    setOpenDialog(true);
  };

  // Handle delete experience
  const handleDeleteClick = (id: number) => {
    setExperienceCenters(experienceCenters.filter((experienceCenter) => experienceCenter.experienceCenterId !== id));
    setSnackbarMessage('Experience deleted successfully!');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  // Handle save/update experience
  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    const newExperienceCenter = {
      experienceCenterId: currentExperienceCenter ? currentExperienceCenter.experienceCenterId : experienceCenters.length + 1,
      experienceCenterCode: String(formData.get('experienceCenterCode')),
      experienceCenterName: String(formData.get('experienceCenterName')),
      experienceCenterDescription: String(formData.get('experienceCenterDescription')),
      location: String(formData.get('location')),
      totalPrice: parseFloat(String(formData.get('totalPrice'))),
    };

    if (currentExperienceCenter) {
      // Update existing experience
      setExperienceCenters(
        experienceCenters.map((experienceCenter) =>
          experienceCenter.experienceCenterId === currentExperienceCenter.experienceCenterId ? newExperienceCenter : experienceCenter
        )
      );
      setSnackbarMessage('Experience center updated successfully!');
    } else {
      // Add new experience
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

      {/* Experiences Table */}
      <TableContainer component={Paper} style={{ marginTop: '1.5rem', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#F8FAFC' }}>
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Experience Center Code</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Experience Center Name</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Location</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Total Price</TableCell>
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

      {/* Add/Edit Experience Dialog */}
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