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
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

// Mock data for experience centers
const mockData = [
    {
      experienceCenterId: 1,
      experienceCenterCode: 'EXP001',
      experienceCenterName: 'Cinnamon Harvesting',
      experienceCenterDescription: 'Learn how to harvest cinnamon in traditional ways.',
      location: 'Kandy',
      totalPrice: 50.0,
    },
    {
      experienceCenterId: 2,
      experienceCenterCode: 'EXP002',
      experienceCenterName: 'Tea Tasting',
      experienceCenterDescription: 'Experience the finest tea flavors in Sri Lanka.',
      location: 'Nuwara Eliya',
      totalPrice: 30.0,
    },
    {
      experienceCenterId: 3,
      experienceCenterCode: 'EXP003',
      experienceCenterName: 'Coconut Plantation Tour',
      experienceCenterDescription: 'Discover the process of coconut farming and its uses.',
      location: 'Galle',
      totalPrice: 40.0,
    },
    {
      experienceCenterId: 4,
      experienceCenterCode: 'EXP004',
      experienceCenterName: 'Wildlife Safari',
      experienceCenterDescription: 'Explore the diverse wildlife of Sri Lanka in a guided safari.',
      location: 'Yala National Park',
      totalPrice: 75.0,
    },
    {
      experienceCenterId: 5,
      experienceCenterCode: 'EXP005',
      experienceCenterName: 'Traditional Pottery Making',
      experienceCenterDescription: 'Get hands-on experience in crafting traditional clay pottery.',
      location: 'Matale',
      totalPrice: 35.0,
    }
];

const ExperienceCenterManagement = () => {
  const [experienceCenters, setExperienceCenters] = useState(mockData);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentExperienceCenter, setCurrentExperienceCenter] = useState<typeof mockData[0] | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');

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
            {experienceCenters.map((experienceCenter) => (
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