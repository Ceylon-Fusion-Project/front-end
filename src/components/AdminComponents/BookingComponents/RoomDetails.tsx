import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
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
  Button,
  Snackbar,
  Alert,
  Box,
  Pagination,
  Grid,
  MenuItem,
} from '@mui/material';
import { Edit, Delete, ArrowBack } from '@mui/icons-material'; // Removed KeyboardArrowUp and KeyboardArrowDown
import { mockData } from './AccommodationManagement';
import { roomTypes } from '../../../lib/data'; // Import roomTypes from data.ts
import { useState } from 'react';

const RoomDetails = () => {
  const { accommodationId } = useParams(); // Get accommodationId from URL
  const navigate = useNavigate(); // Navigate hook for back functionality
  const [editMode, setEditMode] = useState(false); // State to toggle edit mode
  const [currentRoom, setCurrentRoom] = useState<{
    roomId: number;
    roomCode: string;
    roomNumber: string;
    roomType: string;
    beds: number;
    pricePerNight: number;
  } | null>(null); // State to store the room being edited
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Snackbar message
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success'); // Snackbar severity
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const rowsPerPage = 5; // Default to 5 items per page

  // Find the accommodation by ID
  const accommodation = mockData.find((acc) => acc.accommodationId === parseInt(accommodationId || '', 10));

  // If accommodation is not found, display a message
  if (!accommodation) {
    return (
      <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
        <Typography variant="h6">Accommodation not found</Typography>
        <Button
          variant="contained"
          startIcon={<ArrowBack />}
          onClick={() => navigate('/admin/accommodation-management')}
          style={{ marginTop: '1rem', backgroundColor: '#B45309', color: '#FFFFFF' }}
        >
          Back to Accommodation Management
        </Button>
      </Container>
    );
  }

  // Calculate total pages based on the number of rooms
  const totalPages = Math.ceil(accommodation.rooms.length / rowsPerPage);

  // Get the rooms for the current page
  const paginatedRooms = accommodation.rooms.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Handle back navigation
  const handleBackClick = () => {
    navigate('/admin/accommodation-management');
  };

  // Handle edit room
  const handleEditRoom = (room: {
    roomId: number;
    roomCode: string;
    roomNumber: string;
    roomType: string;
    beds: number;
    pricePerNight: number;
  }) => {
    // Ensure roomType matches an option in roomTypes, or set a fallback
    const validRoomType = roomTypes.some((type) => type.value === room.roomType)
      ? room.roomType
      : roomTypes[0]?.value || ''; // Fallback to first option or empty string if no match
    setCurrentRoom({ ...room, roomType: validRoomType }); // Set the room with validated roomType
    setEditMode(true); // Enable edit mode
  };

  // Handle save changes
  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission from refreshing the page
    // Add logic to save changes to the room
    setEditMode(false); // Disable edit mode
    setCurrentRoom(null); // Clear the current room
    setSnackbarMessage('Room updated successfully!');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditMode(false); // Disable edit mode
    setCurrentRoom(null); // Clear the current room
  };

  // Handle delete room
  const handleDeleteRoom = (roomId: number) => {
    const updatedRooms = accommodation.rooms.filter((room) => room.roomId !== roomId);
    accommodation.rooms = updatedRooms; // Update the rooms array
    setSnackbarMessage('Room deleted successfully!');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
    // Adjust page if necessary after deletion
    const newTotalPages = Math.ceil(updatedRooms.length / rowsPerPage);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    } else if (newTotalPages === 0) {
      setCurrentPage(1); // Reset to page 1 if no rooms remain
    }
  };

  // Handle page change
  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
      <Box display="flex" alignItems="center" marginBottom={2}>
        <IconButton
          onClick={handleBackClick}
          style={{ marginRight: '8px', color: '#B45309' }}
        >
          <ArrowBack />
        </IconButton>
        <Typography
          variant="h4"
          style={{ fontFamily: 'Poppins, sans-serif', color: '#1E293B' }}
        >
          {accommodation.accommodationName}
        </Typography>
      </Box>
      <Typography variant="h6" gutterBottom style={{ fontFamily: 'Poppins, sans-serif', color: '#1E293B' }}>
        {accommodation.description}
      </Typography>
      <br />
      <TableContainer component={Paper} style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#F8FAFC' }}>
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Room Code</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Room Number</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Room Type</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Beds</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Price Per Night</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRooms.length > 0 ? (
              paginatedRooms.map((room) => (
                <TableRow key={room.roomId}>
                  <TableCell>{room.roomCode}</TableCell>
                  <TableCell>{room.roomNumber}</TableCell>
                  <TableCell>{room.roomType}</TableCell>
                  <TableCell>{room.beds}</TableCell>
                  <TableCell>${room.pricePerNight}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditRoom(room)} // Open edit dialog
                    >
                      <Edit style={{ color: '#291e10' }} />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDeleteRoom(room.roomId)} // Delete room
                    >
                      <Delete style={{ color: '#EF4444' }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} style={{ textAlign: 'center', color: '#1E293B' }}>
                  No rooms available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        sx={{
          marginTop: '1.5rem',
          display: 'flex',
          justifyContent: 'center',
          '& .MuiPaginationItem-root.Mui-selected': {
            backgroundColor: '#B45309', // Match your theme color
            color: 'white',
          },
        }}
      />

      {/* Edit Room Dialog */}
      <Dialog open={editMode} onClose={handleCancelEdit}>
        <DialogTitle style={{ fontFamily: 'Poppins, sans-serif', color: '#1E293B' }}>
          Edit Room {currentRoom?.roomNumber}
        </DialogTitle>
        <DialogContent>
          <form id="room-form" onSubmit={handleSaveChanges}>
            <Grid container spacing={2}>
              {/* Left Column */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Room Code"
                  name="roomCode"
                  fullWidth
                  margin="normal"
                  defaultValue={currentRoom?.roomCode}
                  required
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  select
                  label="Room Type"
                  name="roomType"
                  value={currentRoom?.roomType || ''} // Controlled component
                  fullWidth
                  margin="normal"
                  required
                  onChange={(e) =>
                    setCurrentRoom((prev) =>
                      prev ? { ...prev, roomType: e.target.value } : null
                    )
                  }
                  InputLabelProps={{ shrink: true }}
                >
                  {roomTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              {/* Right Column */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Room Number"
                  name="roomNumber"
                  fullWidth
                  margin="normal"
                  defaultValue={currentRoom?.roomNumber}
                  required
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="Beds"
                  name="beds"
                  fullWidth
                  margin="normal"
                  defaultValue={currentRoom?.beds}
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              {/* Full-width field */}
              <Grid item xs={12}>
                <TextField
                  label="Price Per Night"
                  name="pricePerNight"
                  type="number"
                  fullWidth
                  margin="normal"
                  value={currentRoom?.pricePerNight || ''} // Controlled component
                  onChange={(e) =>
                    setCurrentRoom((prev) =>
                      prev ? { ...prev, pricePerNight: parseFloat(e.target.value) } : null
                    )
                  }
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelEdit} style={{ color: '#64748B' }}>
            Cancel
          </Button>
          <Button
            type="submit"
            form="room-form"
            variant="contained"
            style={{ backgroundColor: '#B45309', color: '#FFFFFF' }}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default RoomDetails;