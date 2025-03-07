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

// Mock data for origins
const mockData = [
  {
    originID: 1,
    stateLocation: 'Kandy',
    stateMapLink: 'https://maps.google.com/kandy',
    partOfPlant: 'Bark',
    originDescription: 'High-quality cinnamon from Kandy',
    factoryName: 'Kandy Cinnamon Factory',
    factoryAddress: '123 Kandy Road, Kandy',
    factoryMapLink: 'https://maps.google.com/kandy-factory',
    demoVideoLink: 'https://youtube.com/kandy-cinnamon',
    createdDate: '2024-01-01',
    updatedDate: '2024-01-01',
    originCode: 'KANDY001',
  },
  {
    originID: 2,
    stateLocation: 'Galle',
    stateMapLink: 'https://maps.google.com/galle',
    partOfPlant: 'Leaves',
    originDescription: 'Organic cinnamon from Galle',
    factoryName: 'Galle Cinnamon Factory',
    factoryAddress: '456 Galle Road, Galle',
    factoryMapLink: 'https://maps.google.com/galle-factory',
    demoVideoLink: 'https://youtube.com/galle-cinnamon',
    createdDate: '2024-01-01',
    updatedDate: '2024-01-01',
    originCode: 'GALLE001',
  },
];

const OriginManagement = () => {
  const [origins, setOrigins] = useState(mockData);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentOrigin, setCurrentOrigin] = useState<typeof mockData[0] | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');

  // Handle add origin
  const handleAddClick = () => {
    setEditMode(false);
    setCurrentOrigin(null);
    setOpenDialog(true);
  };

  // Handle edit origin
  const handleEditClick = (origin: SetStateAction<{ originID: number; stateLocation: string; stateMapLink: string; partOfPlant: string; originDescription: string; factoryName: string; factoryAddress: string; factoryMapLink: string; demoVideoLink: string; createdDate: string; updatedDate: string; originCode: string; } | null>) => {
    setEditMode(true);
    setCurrentOrigin(origin);
    setOpenDialog(true);
  };

  // Handle delete origin
  const handleDeleteClick = (id: number) => {
    setOrigins(origins.filter((origin) => origin.originID !== id));
    setSnackbarMessage('Origin deleted successfully!');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  // Handle save/update origin
  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    // Convert FormData values to strings
    const newOrigin = {
      originID: currentOrigin ? currentOrigin.originID : origins.length + 1,
      stateLocation: String(formData.get('stateLocation')),
      stateMapLink: String(formData.get('stateMapLink')),
      partOfPlant: String(formData.get('partOfPlant')),
      originDescription: String(formData.get('originDescription')),
      factoryName: String(formData.get('factoryName')),
      factoryAddress: String(formData.get('factoryAddress')),
      factoryMapLink: String(formData.get('factoryMapLink')),
      demoVideoLink: String(formData.get('demoVideoLink')),
      createdDate: new Date().toISOString().split('T')[0],
      updatedDate: new Date().toISOString().split('T')[0],
      originCode: String(formData.get('originCode')),
    };

    if (currentOrigin) {
      // Update existing origin
      setOrigins(
        origins.map((origin) =>
          origin.originID === currentOrigin.originID ? newOrigin : origin
        )
      );
      setSnackbarMessage('Origin updated successfully!');
    } else {
      // Add new origin
      setOrigins([...origins, newOrigin]);
      setSnackbarMessage('Origin added successfully!');
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
        Origin Management
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={handleAddClick}
        style={{ backgroundColor: '#3B82F6', color: '#FFFFFF' }}
      >
        Add Origin
      </Button>

      {/* Origins Table */}
      <TableContainer component={Paper} style={{ marginTop: '1.5rem', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#F8FAFC' }}>
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>State Location</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Part of Plant</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Factory Name</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Origin Code</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {origins.map((origin) => (
              <TableRow key={origin.originID}>
                <TableCell>{origin.stateLocation}</TableCell>
                <TableCell>{origin.partOfPlant}</TableCell>
                <TableCell>{origin.factoryName}</TableCell>
                <TableCell>{origin.originCode}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEditClick(origin)}>
                    <Edit style={{ color: '#3B82F6' }} />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDeleteClick(origin.originID)}>
                    <Delete style={{ color: '#EF4444' }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Origin Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle style={{ fontFamily: 'Poppins, sans-serif', color: '#1E293B' }}>
          {editMode ? 'Edit Origin' : 'Add Origin'}
        </DialogTitle>
        <DialogContent>
          <form id="origin-form" onSubmit={handleSave}>
            <TextField
              label="State Location"
              name="stateLocation"
              fullWidth
              margin="normal"
              defaultValue={currentOrigin?.stateLocation}
              required
            />
            <TextField
              label="State Map Link"
              name="stateMapLink"
              fullWidth
              margin="normal"
              defaultValue={currentOrigin?.stateMapLink}
              required
            />
            <TextField
              label="Part of Plant"
              name="partOfPlant"
              fullWidth
              margin="normal"
              defaultValue={currentOrigin?.partOfPlant}
              required
            />
            <TextField
              label="Origin Description"
              name="originDescription"
              fullWidth
              margin="normal"
              defaultValue={currentOrigin?.originDescription}
              required
            />
            <TextField
              label="Factory Name"
              name="factoryName"
              fullWidth
              margin="normal"
              defaultValue={currentOrigin?.factoryName}
              required
            />
            <TextField
              label="Factory Address"
              name="factoryAddress"
              fullWidth
              margin="normal"
              defaultValue={currentOrigin?.factoryAddress}
              required
            />
            <TextField
              label="Factory Map Link"
              name="factoryMapLink"
              fullWidth
              margin="normal"
              defaultValue={currentOrigin?.factoryMapLink}
              required
            />
            <TextField
              label="Demo Video Link"
              name="demoVideoLink"
              fullWidth
              margin="normal"
              defaultValue={currentOrigin?.demoVideoLink}
              required
            />
            <TextField
              label="Origin Code"
              name="originCode"
              fullWidth
              margin="normal"
              defaultValue={currentOrigin?.originCode}
              required
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} style={{ color: '#64748B' }}>
            Cancel
          </Button>
          <Button type="submit" form="origin-form" variant="contained" style={{ backgroundColor: '#3B82F6', color: '#FFFFFF' }}>
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

export default OriginManagement;