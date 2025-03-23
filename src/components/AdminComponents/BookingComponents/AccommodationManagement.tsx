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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
} from '@mui/material';
import { Add, Edit, Delete, Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'; // For navigation

// Mock data for accommodations
export const mockData = [
  {
    accommodationId: 1,
    accommodationCode: 'ACC001',
    accommodationName: 'Cinnamon Shore Resort',
    accommodationType: 'Resort',
    description: 'A luxurious beachfront resort with stunning Gulf Coast views.',
    location: 'Port Aransas, Texas',
    rooms: [
      { roomId: 1, roomCode: 'R101', roomNumber: '101', roomType: 'Deluxe', beds: 2, pricePerNight: 200 },
      { roomId: 2, roomCode: 'R102', roomNumber: '102', roomType: 'Suite', beds: 3, pricePerNight: 350 },
    ],
  },
  {
    accommodationId: 2,
    accommodationCode: 'ACC002',
    accommodationName: 'Cinnamon County Inn',
    accommodationType: 'Hotel',
    description: 'A cozy hotel offering a warm, family-like atmosphere.',
    location: 'Thodupuzha, India',
    rooms: [
      { roomId: 3, roomCode: 'R201', roomNumber: '201', roomType: 'Standard', beds: 1, pricePerNight: 40 },
      { roomId: 4, roomCode: 'R202', roomNumber: '202', roomType: 'Double', beds: 2, pricePerNight: 60 },
    ],
  },
  {
    accommodationId: 3,
    accommodationCode: 'ACC003',
    accommodationName: 'Cinnamon Ridge Apartments',
    accommodationType: 'Apartment',
    description: 'Spacious apartments with modern amenities and a pool.',
    location: 'Fullerton, California',
    rooms: [
      { roomId: 5, roomCode: 'R301', roomNumber: '301', roomType: 'One-Bedroom', beds: 1, pricePerNight: 100 },
      { roomId: 6, roomCode: 'R302', roomNumber: '302', roomType: 'Two-Bedroom', beds: 2, pricePerNight: 150 },
    ],
  },
  {
    accommodationId: 4,
    accommodationCode: 'ACC004',
    accommodationName: 'Cinnamon Life Luxury Apartments',
    accommodationType: 'Apartment',
    description: 'Premium apartments with city views and top-tier facilities.',
    location: 'Colombo, Sri Lanka',
    rooms: [
      { roomId: 7, roomCode: 'R401', roomNumber: '401', roomType: 'Studio', beds: 1, pricePerNight: 120 },
      { roomId: 8, roomCode: 'R402', roomNumber: '402', roomType: 'Two-Bedroom', beds: 2, pricePerNight: 200 },
    ],
  },
  {
    accommodationId: 5,
    accommodationCode: 'ACC005',
    accommodationName: 'Cinnamon Springs Retreat',
    accommodationType: 'Apartment',
    description: 'Comfortable apartments near parks and shopping centers.',
    location: 'Taylorsville, Utah',
    rooms: [
      { roomId: 9, roomCode: 'R501', roomNumber: '501', roomType: 'One-Bedroom', beds: 1, pricePerNight: 90 },
      { roomId: 10, roomCode: 'R502', roomNumber: '502', roomType: 'Two-Bedroom', beds: 2, pricePerNight: 130 },
    ],
  },
  {
    accommodationId: 6,
    accommodationCode: 'ACC006',
    accommodationName: 'Cinnamon Tree Guest House',
    accommodationType: 'Guest House',
    description: 'A tranquil retreat with lush gardens and mountain views.',
    location: 'Albuquerque, New Mexico',
    rooms: [
      { roomId: 11, roomCode: 'R601', roomNumber: '601', roomType: 'Standard', beds: 1, pricePerNight: 70 },
      { roomId: 12, roomCode: 'R602', roomNumber: '602', roomType: 'Family', beds: 3, pricePerNight: 120 },
    ],
  },
  {
    accommodationId: 7,
    accommodationCode: 'ACC007',
    accommodationName: 'Cinnamon Eco Lodge',
    accommodationType: 'Lodge',
    description: 'Authentic rural experience with private bungalows.',
    location: 'North Vietnam',
    rooms: [
      { roomId: 13, roomCode: 'R701', roomNumber: '701', roomType: 'Bungalow', beds: 1, pricePerNight: 80 },
      { roomId: 14, roomCode: 'R702', roomNumber: '702', roomType: 'Bungalow Twin', beds: 2, pricePerNight: 100 },
    ],
  },
  {
    accommodationId: 8,
    accommodationCode: 'ACC008',
    accommodationName: 'Cinnamon Boutique Villa',
    accommodationType: 'Villa',
    description: 'Luxurious villa with ocean views and private amenities.',
    location: 'Wilderness, South Africa',
    rooms: [
      { roomId: 15, roomCode: 'R801', roomNumber: '801', roomType: 'Suite', beds: 2, pricePerNight: 180 },
      { roomId: 16, roomCode: 'R802', roomNumber: '802', roomType: 'Deluxe Suite', beds: 3, pricePerNight: 250 },
    ],
  },
  {
    accommodationId: 9,
    accommodationCode: 'ACC009',
    accommodationName: 'Cinnamon Bay Cottage',
    accommodationType: 'Cottage',
    description: 'Beachfront cottages with a rustic, nature-inspired stay.',
    location: 'St. John, Virgin Islands',
    rooms: [
      { roomId: 17, roomCode: 'R901', roomNumber: '901', roomType: 'Cottage', beds: 2, pricePerNight: 110 },
      { roomId: 18, roomCode: 'R902', roomNumber: '902', roomType: 'Family Cottage', beds: 4, pricePerNight: 160 },
    ],
  },
];

const AccommodationManagement = () => {
  const [accommodations, setAccommodations] = useState(mockData);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentAccommodation, setCurrentAccommodation] = useState<typeof mockData[0] | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');
  const [currentPage, setCurrentPage] = useState(1); // Current page for Pagination
  const rowsPerPage = 5; // Number of rows per page
  const navigate = useNavigate(); // For navigation

  // Calculate the total number of pages
  const pageCount = Math.ceil(accommodations.length / rowsPerPage);

  // Handle add accommodation
  const handleAddClick = () => {
    setEditMode(false);
    setCurrentAccommodation(null);
    setOpenDialog(true);
  };

  // Handle edit accommodation
  const handleEditClick = (accommodation: { accommodationId: number; accommodationCode: string; accommodationName: string; accommodationType: string; description: string; location: string; rooms: { roomId: number; roomCode: string; roomNumber: string; roomType: string; beds: number; pricePerNight: number; }[]; }) => {
    setEditMode(true);
    setCurrentAccommodation(accommodation as typeof mockData[0]);
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
      rooms: currentAccommodation ? currentAccommodation.rooms : [], // Preserve rooms
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

  // Handle page change for Pagination
  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  // Get data for the current page
  const paginatedData = accommodations.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Handle view rooms
  const handleViewRooms = (accommodationId: number) => {
    navigate(`/admin/accommodation-management/rooms/${accommodationId}`); // Navigate to room details page
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
        style={{ backgroundColor: '#B45309', color: '#FFFFFF' }}
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
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Rooms</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((accommodation) => (
              <TableRow key={accommodation.accommodationId}>
                <TableCell>{accommodation.accommodationCode}</TableCell>
                <TableCell>{accommodation.accommodationName}</TableCell>
                <TableCell>{accommodation.accommodationType}</TableCell>
                <TableCell>{accommodation.location}</TableCell>
                <TableCell>
                  <span
                    style={{ cursor: 'pointer', color: '#B45309', display: 'flex', alignItems: 'center', gap: '4px' }}
                    onClick={() => handleViewRooms(accommodation.accommodationId)}
                  >
                    <Visibility fontSize="small" /> View Rooms
                  </span>
                </TableCell>
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
          <Button type="submit" form="accommodation-form" variant="contained" style={{ backgroundColor: '#B45309', color: '#FFFFFF' }}>
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