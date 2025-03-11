import { useParams } from 'react-router-dom';
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
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { mockData } from './AccommodationManagement'; // Import mockData
import { useState } from 'react';

const RoomDetails = () => {
  const { accommodationId } = useParams(); // Get accommodationId from URL
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

  // Find the accommodation by ID
  const accommodation = mockData.find((acc) => acc.accommodationId === parseInt(accommodationId || '', 10));

  // If accommodation is not found, display a message
  if (!accommodation) {
    return (
      <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
        <Typography variant="h6">Accommodation not found</Typography>
      </Container>
    );
  }

  // Handle edit room
  const handleEditRoom = (room: {
    roomId: number;
    roomCode: string;
    roomNumber: string;
    roomType: string;
    beds: number;
    pricePerNight: number;
  }) => {
    setCurrentRoom(room); // Set the room to edit
    setEditMode(true); // Enable edit mode
  };

  // Handle save changes
  const handleSaveChanges = () => {
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
  };

  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom style={{ fontFamily: 'Poppins, sans-serif', color: '#1E293B' }}>
        {accommodation.accommodationName}
      </Typography>
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
            {accommodation.rooms.map((room) => (
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Room Dialog */}
      <Dialog open={editMode} onClose={handleCancelEdit}>
        <DialogTitle style={{ fontFamily: 'Poppins, sans-serif', color: '#1E293B' }}>
          Edit Room {currentRoom?.roomNumber}
        </DialogTitle>
        <DialogContent>
          <form>
            <TextField
              label="Room Code"
              defaultValue={currentRoom?.roomCode}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Room Number"
              defaultValue={currentRoom?.roomNumber}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Room Type"
              defaultValue={currentRoom?.roomType}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Beds"
              defaultValue={currentRoom?.beds}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Price Per Night"
              defaultValue={currentRoom?.pricePerNight}
              fullWidth
              margin="normal"
              required
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelEdit} style={{ color: '#64748B' }}>
            Cancel
          </Button>
          <Button
            onClick={handleSaveChanges}
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