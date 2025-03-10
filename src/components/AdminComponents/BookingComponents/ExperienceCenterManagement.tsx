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
      experienceId: 1,
      experienceCode: 'EXP001',
      experienceName: 'Cinnamon Harvesting',
      experienceDescription: 'Learn how to harvest cinnamon in traditional ways.',
      location: 'Kandy',
      totalPrice: 50.0,
    },
    {
      experienceId: 2,
      experienceCode: 'EXP002',
      experienceName: 'Tea Tasting',
      experienceDescription: 'Experience the finest tea flavors in Sri Lanka.',
      location: 'Nuwara Eliya',
      totalPrice: 30.0,
    },
    {
      experienceId: 3,
      experienceCode: 'EXP003',
      experienceName: 'Coconut Plantation Tour',
      experienceDescription: 'Discover the process of coconut farming and its uses.',
      location: 'Galle',
      totalPrice: 40.0,
    },
    {
      experienceId: 4,
      experienceCode: 'EXP004',
      experienceName: 'Wildlife Safari',
      experienceDescription: 'Explore the diverse wildlife of Sri Lanka in a guided safari.',
      location: 'Yala National Park',
      totalPrice: 75.0,
    },
    {
      experienceId: 5,
      experienceCode: 'EXP005',
      experienceName: 'Traditional Pottery Making',
      experienceDescription: 'Get hands-on experience in crafting traditional clay pottery.',
      location: 'Matale',
      totalPrice: 35.0,
    }
];

const ExperienceCenterManagement = () => {
  const [experiences, setExperiences] = useState(mockData);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentExperience, setCurrentExperience] = useState<typeof mockData[0] | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');

  // Handle add experience
  const handleAddClick = () => {
    setEditMode(false);
    setCurrentExperience(null);
    setOpenDialog(true);
  };

  // Handle edit experience
  const handleEditClick = (experience: SetStateAction<{ experienceId: number; experienceCode: string; experienceName: string; experienceDescription: string; location: string; totalPrice: number; } | null>) => {
    setEditMode(true);
    setCurrentExperience(experience);
    setOpenDialog(true);
  };

  // Handle delete experience
  const handleDeleteClick = (id: number) => {
    setExperiences(experiences.filter((experience) => experience.experienceId !== id));
    setSnackbarMessage('Experience deleted successfully!');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  // Handle save/update experience
  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    const newExperience = {
      experienceId: currentExperience ? currentExperience.experienceId : experiences.length + 1,
      experienceCode: String(formData.get('experienceCode')),
      experienceName: String(formData.get('experienceName')),
      experienceDescription: String(formData.get('experienceDescription')),
      location: String(formData.get('location')),
      totalPrice: parseFloat(String(formData.get('totalPrice'))),
    };

    if (currentExperience) {
      // Update existing experience
      setExperiences(
        experiences.map((experience) =>
          experience.experienceId === currentExperience.experienceId ? newExperience : experience
        )
      );
      setSnackbarMessage('Experience updated successfully!');
    } else {
      // Add new experience
      setExperiences([...experiences, newExperience]);
      setSnackbarMessage('Experience added successfully!');
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
        style={{ backgroundColor: '#291e10', color: '#FFFFFF' }}
      >
        Add Experience
      </Button>

      {/* Experiences Table */}
      <TableContainer component={Paper} style={{ marginTop: '1.5rem', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#F8FAFC' }}>
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Experience Code</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Experience Name</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Location</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Total Price</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {experiences.map((experience) => (
              <TableRow key={experience.experienceId}>
                <TableCell>{experience.experienceCode}</TableCell>
                <TableCell>{experience.experienceName}</TableCell>
                <TableCell>{experience.location}</TableCell>
                <TableCell>${experience.totalPrice.toFixed(2)}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEditClick(experience)}>
                    <Edit style={{ color: '#291e10' }} />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDeleteClick(experience.experienceId)}>
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
          {editMode ? 'Edit Experience' : 'Add Experience'}
        </DialogTitle>
        <DialogContent>
          <form id="experience-form" onSubmit={handleSave}>
            <TextField
              label="Experience Code"
              name="experienceCode"
              fullWidth
              margin="normal"
              defaultValue={currentExperience?.experienceCode}
              required
            />
            <TextField
              label="Experience Name"
              name="experienceName"
              fullWidth
              margin="normal"
              defaultValue={currentExperience?.experienceName}
              required
            />
            <TextField
              label="Experience Description"
              name="experienceDescription"
              fullWidth
              margin="normal"
              defaultValue={currentExperience?.experienceDescription}
              required
            />
            <TextField
              label="Location"
              name="location"
              fullWidth
              margin="normal"
              defaultValue={currentExperience?.location}
              required
            />
            <TextField
              label="Total Price"
              name="totalPrice"
              type="number"
              fullWidth
              margin="normal"
              defaultValue={currentExperience?.totalPrice}
              required
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} style={{ color: '#64748B' }}>
            Cancel
          </Button>
          <Button type="submit" form="experience-form" variant="contained" style={{ backgroundColor: '#291e10', color: '#FFFFFF' }}>
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