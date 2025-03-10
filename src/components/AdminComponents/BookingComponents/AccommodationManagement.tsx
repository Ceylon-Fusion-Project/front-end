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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

// Mock data for accommodations
const mockData = [
  {
    accommodationId: 1,
    accommodationCode: 'ACC001',
    accommodationName: 'Luxury Resort',
    accommodationType: 'Resort',
    description: 'A luxurious resort with top-notch amenities.',
    location: 'Colombo',
  },
  {
    accommodationId: 2,
    accommodationCode: 'ACC002',
    accommodationName: 'Budget Hotel',
    accommodationType: 'Hotel',
    description: 'Affordable and comfortable stay.',
    location: 'Kandy',
  },
    {
      accommodationId: 3,
      accommodationCode: 'ACC003',
      accommodationName: 'Mountain View Resort',
      accommodationType: 'Resort',
      description: 'A peaceful resort with breathtaking mountain views.',
      location: 'Nuwara Eliya'
  },
  {
      accommodationId: 4,
      accommodationCode: 'ACC004',
      accommodationName: 'Seaside Villa',
      accommodationType: 'Villa',
      description: 'A beautiful villa right next to the beach.',
      location: 'Galle'
  },
  {
      accommodationId: 5,
      accommodationCode: 'ACC005',
      accommodationName: 'City Hotel',
      accommodationType: 'Hotel',
      description: 'A modern hotel in the heart of the city.',
      location: 'Colombo'
  }
];

const AccommodationManagement = () => {
  const [accommodations, setAccommodations] = useState(mockData);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentAccommodation, setCurrentAccommodation] = useState<typeof mockData[0] | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');

  // Handle add accommodation
  const handleAddClick = () => {
    setEditMode(false);
    setCurrentAccommodation(null);
    setOpenDialog(true);
  };

  // Handle edit accommodation
  const handleEditClick = (accommodation: SetStateAction<{ accommodationId: number; accommodationCode: string; accommodationName: string; accommodationType: string; description: string; location: string; } | null>) => {
    setEditMode(true);
    setCurrentAccommodation(accommodation);
    setOpenDialog(true);
  };

  // Handle delete accommodation
  const handleDeleteClick = (id: number) => {
    setAccommodations(accommodations.filter((accommodation) => accommodation.accommodationId !== id));
    setSnackbarMessage('Accommodation deleted successfully!');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  // Handle save/update accommodation
  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    const newAccommodation = {
      accommodationId: currentAccommodation ? currentAccommodation.accommodationId : accommodations.length + 1,
      accommodationCode: String(formData.get('accommodationCode')),
      accommodationName: String(formData.get('accommodationName')),
      accommodationType: String(formData.get('accommodationType')),
      description: String(formData.get('description')),
      location: String(formData.get('location')),
    };

    if (currentAccommodation) {
      // Update existing accommodation
      setAccommodations(
        accommodations.map((accommodation) =>
          accommodation.accommodationId === currentAccommodation.accommodationId ? newAccommodation : accommodation
        )
      );
      setSnackbarMessage('Accommodation updated successfully!');
    } else {
      // Add new accommodation
      setAccommodations([...accommodations, newAccommodation]);
      setSnackbarMessage('Accommodation added successfully!');
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
        Accommodation Management
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={handleAddClick}
        style={{ backgroundColor: '#291e10', color: '#FFFFFF' }}
      >
        Add Accommodation
      </Button>

      {/* Accommodations Table */}
      <TableContainer component={Paper} style={{ marginTop: '1.5rem', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#F8FAFC' }}>
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Accommodation Code</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Accommodation Name</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Accommodation Type</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Location</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accommodations.map((accommodation) => (
              <TableRow key={accommodation.accommodationId}>
                <TableCell>{accommodation.accommodationCode}</TableCell>
                <TableCell>{accommodation.accommodationName}</TableCell>
                <TableCell>{accommodation.accommodationType}</TableCell>
                <TableCell>{accommodation.location}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEditClick(accommodation)}>
                    <Edit style={{ color: '#291e10' }} />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDeleteClick(accommodation.accommodationId)}>
                    <Delete style={{ color: '#EF4444' }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Accommodation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle style={{ fontFamily: 'Poppins, sans-serif', color: '#1E293B' }}>
          {editMode ? 'Edit Accommodation' : 'Add Accommodation'}
        </DialogTitle>
        <DialogContent>
          <form id="accommodation-form" onSubmit={handleSave}>
            <TextField
              label="Accommodation Code"
              name="accommodationCode"
              fullWidth
              margin="normal"
              defaultValue={currentAccommodation?.accommodationCode}
              required
            />
            <TextField
              label="Accommodation Name"
              name="accommodationName"
              fullWidth
              margin="normal"
              defaultValue={currentAccommodation?.accommodationName}
              required
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Accommodation Type</InputLabel>
              <Select
                label="Accommodation Type"
                name="accommodationType"
                defaultValue={currentAccommodation?.accommodationType || ''}
                required
              >
                <MenuItem value="Hotel">Hotel</MenuItem>
                <MenuItem value="Resort">Resort</MenuItem>
                <MenuItem value="Villa">Villa</MenuItem>
                <MenuItem value="Guest House">Guest House</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Description"
              name="description"
              fullWidth
              margin="normal"
              defaultValue={currentAccommodation?.description}
              required
            />
            <TextField
              label="Location"
              name="location"
              fullWidth
              margin="normal"
              defaultValue={currentAccommodation?.location}
              required
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} style={{ color: '#64748B' }}>
            Cancel
          </Button>
          <Button type="submit" form="accommodation-form" variant="contained" style={{ backgroundColor: '#291e10', color: '#FFFFFF' }}>
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

export default AccommodationManagement;