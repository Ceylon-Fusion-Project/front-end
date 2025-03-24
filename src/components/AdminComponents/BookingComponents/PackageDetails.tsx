import { useState } from 'react';
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
} from '@mui/material';
import { Edit, Delete, ArrowBack } from '@mui/icons-material';
import { mockPackages } from './PackageManagement';

const PackageDetails = () => {
  const { packageId } = useParams();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<{
    eventId: number;
    eventName: string;
    eventDescription: string;
    pricePerEvent: number;
    startTime: string;
    endTime: string;
  } | null>(null);
  const [currentRoom, setCurrentRoom] = useState<{
    roomId: number;
    roomCode: string;
    roomNumber: string;
    roomType: string;
    beds: number;
    pricePerNight: number;
  } | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  // Find the package by ID
  const pkg = mockPackages.find((p) => p.packageId === parseInt(packageId || '', 10));

  // If package is not found, display a message
  if (!pkg) {
    return (
      <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
        <Typography variant="h6">Package not found</Typography>
        <Button
          variant="contained"
          startIcon={<ArrowBack />}
          onClick={() => navigate('/package-management')}
          style={{ marginTop: '1rem', backgroundColor: '#B45309', color: '#FFFFFF' }}
        >
          Back to Package Management
        </Button>
      </Container>
    );
  }

  // Handle edit event
  const handleEditEvent = (event: {
    eventId: number;
    eventName: string;
    eventDescription: string;
    pricePerEvent: number;
    startTime: string;
    endTime: string;
  }) => {
    setCurrentEvent(event);
    setEditMode(true);
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
    setCurrentRoom(room);
    setEditMode(true);
  };

  // Handle save changes
  const handleSaveChanges = () => {
    setEditMode(false);
    setCurrentEvent(null);
    setCurrentRoom(null);
    setSnackbarMessage('Changes saved successfully!');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditMode(false);
    setCurrentEvent(null);
    setCurrentRoom(null);
  };

  // Handle delete event
  const handleDeleteEvent = (eventId: number) => {
    const updatedEvents = pkg.events.filter((event) => event.eventId !== eventId);
    pkg.events = updatedEvents;
    setSnackbarMessage('Event deleted successfully!');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  // Handle delete room
  const handleDeleteRoom = (roomId: number) => {
    const updatedRooms = pkg.rooms.filter((room) => room.roomId !== roomId);
    pkg.rooms = updatedRooms;
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
        {pkg.packageName}
      </Typography>
      <Typography variant="h6" gutterBottom style={{ fontFamily: 'Poppins, sans-serif', color: '#1E293B' }}>
        {pkg.description}
      </Typography>

      <Typography variant="h5" gutterBottom style={{ fontFamily: 'Poppins, sans-serif', color: '#1E293B', marginTop: '2rem' }}>
        Events
      </Typography>
      <TableContainer component={Paper} style={{ marginBottom: '2rem', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#F8FAFC' }}>
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Event Name</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Description</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Price</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Start Time</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>End Time</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pkg.events.map((event) => (
              <TableRow key={event.eventId}>
                <TableCell>{event.eventName}</TableCell>
                <TableCell>{event.eventDescription}</TableCell>
                <TableCell>${event.pricePerEvent}</TableCell>
                <TableCell>{event.startTime}</TableCell>
                <TableCell>{event.endTime}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditEvent(event)}
                  >
                    <Edit style={{ color: '#291e10' }} />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDeleteEvent(event.eventId)}
                  >
                    <Delete style={{ color: '#EF4444' }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h5" gutterBottom style={{ fontFamily: 'Poppins, sans-serif', color: '#1E293B' }}>
        Rooms
      </Typography>
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
            {pkg.rooms.map((room) => (
              <TableRow key={room.roomId}>
                <TableCell>{room.roomCode}</TableCell>
                <TableCell>{room.roomNumber}</TableCell>
                <TableCell>{room.roomType}</TableCell>
                <TableCell>{room.beds}</TableCell>
                <TableCell>${room.pricePerNight}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditRoom({ ...room, roomNumber: room.roomNumber.toString() })}
                  >
                    <Edit style={{ color: '#291e10' }} />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDeleteRoom(room.roomId)}
                  >
                    <Delete style={{ color: '#EF4444' }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Event Dialog */}
      <Dialog open={editMode && currentEvent !== null} onClose={handleCancelEdit}>
        <DialogTitle style={{ fontFamily: 'Poppins, sans-serif', color: '#1E293B' }}>
          Edit Event {currentEvent?.eventName}
        </DialogTitle>
        <DialogContent>
          <form>
            <TextField
              label="Event Name"
              defaultValue={currentEvent?.eventName}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Event Description"
              defaultValue={currentEvent?.eventDescription}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Price"
              defaultValue={currentEvent?.pricePerEvent}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Start Time"
              defaultValue={currentEvent?.startTime}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="End Time"
              defaultValue={currentEvent?.endTime}
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

      {/* Edit Room Dialog */}
      <Dialog open={editMode && currentRoom !== null} onClose={handleCancelEdit}>
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

export default PackageDetails;