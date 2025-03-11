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
import { mockData } from './ExperienceCenterManagement'; // Import mockData
import { useState } from 'react';

const EventDetails = () => {
  const { experienceCenterId } = useParams(); // Get experienceCenterId from URL
  const [editMode, setEditMode] = useState(false); // State to toggle edit mode
  const [currentEvent, setCurrentEvent] = useState<{
    eventId: number;
    eventName: string;
    eventDescription: string;
    pricePerEvent: number;
    startTime: string;
    endTime: string;
  } | null>(null); // State to store the event being edited
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Snackbar message
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success'); // Snackbar severity

  // Find the experience center by ID
  const experienceCenter = mockData.find((exp) => exp.experienceCenterId === parseInt(experienceCenterId || '', 10));

  // If experience center is not found, display a message
  if (!experienceCenter) {
    return (
      <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
        <Typography variant="h6">Experience Center not found</Typography>
      </Container>
    );
  }

  // Convert ISO string to local datetime string for the datetime-local input
  const toLocalDateTime = (isoString: string) => {
    const date = new Date(isoString);
    const offset = date.getTimezoneOffset() * 60000; // Offset in milliseconds
    const localDate = new Date(date.getTime() - offset);
    return localDate.toISOString().slice(0, 16); // Format as "YYYY-MM-DDTHH:MM"
  };

  // Convert local datetime string back to ISO string
  const toISODateTime = (localDateTime: string) => {
    const date = new Date(localDateTime);
    return date.toISOString();
  };

  // Handle edit event
  const handleEditEvent = (event: {
    eventId: number;
    eventName: string;
    eventDescription: string;
    pricePerEvent: number;
    startTime: string;
    endTime: string;
  }) => {
    setCurrentEvent(event); // Set the event to edit
    setEditMode(true); // Enable edit mode
  };

  // Handle save changes
  const handleSaveChanges = () => {
    if (!currentEvent) return;

    // Update the event in the experience center
    const updatedEvents = experienceCenter.events.map((event) =>
      event.eventId === currentEvent.eventId ? currentEvent : event
    );
    experienceCenter.events = updatedEvents;

    setEditMode(false); // Disable edit mode
    setCurrentEvent(null); // Clear the current event
    setSnackbarMessage('Event updated successfully!');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditMode(false); // Disable edit mode
    setCurrentEvent(null); // Clear the current event
  };

  // Handle delete event
  const handleDeleteEvent = (eventId: number) => {
    const updatedEvents = experienceCenter.events.filter((event) => event.eventId !== eventId);
    experienceCenter.events = updatedEvents; // Update the events array
    setSnackbarMessage('Event deleted successfully!');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Handle form field changes
  const handleFormChange = (field: string, value: string | number) => {
    if (!currentEvent) return;
    setCurrentEvent({ ...currentEvent, [field]: value });
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom style={{ fontFamily: 'Poppins, sans-serif', color: '#1E293B' }}>
        {experienceCenter.experienceCenterName}
      </Typography>
      <Typography variant="h6" gutterBottom style={{ fontFamily: 'Poppins, sans-serif', color: '#1E293B' }}>
        {experienceCenter.experienceCenterDescription}
      </Typography>
      <br />
      <TableContainer component={Paper} style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
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
            {experienceCenter.events.map((event) => (
              <TableRow key={event.eventId}>
                <TableCell>{event.eventName}</TableCell>
                <TableCell>{event.eventDescription}</TableCell>
                <TableCell>${event.pricePerEvent}</TableCell>
                <TableCell>{new Date(event.startTime).toLocaleString()}</TableCell> {/* Formatted Start Time */}
                <TableCell>{new Date(event.endTime).toLocaleString()}</TableCell> {/* Formatted End Time */}
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditEvent(event)} // Open edit dialog
                  >
                    <Edit style={{ color: '#291e10' }} />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDeleteEvent(event.eventId)} // Delete event
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
      <Dialog open={editMode} onClose={handleCancelEdit}>
        <DialogTitle style={{ fontFamily: 'Poppins, sans-serif', color: '#1E293B' }}>
          Edit Event {currentEvent?.eventName}
        </DialogTitle>
        <DialogContent>
          <form>
            <TextField
              label="Event Name"
              value={currentEvent?.eventName || ''}
              fullWidth
              margin="normal"
              onChange={(e) => handleFormChange('eventName', e.target.value)}
              required
            />
            <TextField
              label="Event Description"
              value={currentEvent?.eventDescription || ''}
              fullWidth
              margin="normal"
              onChange={(e) => handleFormChange('eventDescription', e.target.value)}
              required
            />
            <TextField
              label="Price Per Event"
              value={currentEvent?.pricePerEvent || 0}
              type="number"
              fullWidth
              margin="normal"
              onChange={(e) => handleFormChange('pricePerEvent', parseFloat(e.target.value))}
              required
            />
            <TextField
              label="Start Time"
              type="datetime-local"
              value={currentEvent?.startTime ? toLocalDateTime(currentEvent.startTime) : ''}
              fullWidth
              margin="normal"
              onChange={(e) => handleFormChange('startTime', toISODateTime(e.target.value))}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="End Time"
              type="datetime-local"
              value={currentEvent?.endTime ? toLocalDateTime(currentEvent.endTime) : ''}
              fullWidth
              margin="normal"
              onChange={(e) => handleFormChange('endTime', toISODateTime(e.target.value))}
              required
              InputLabelProps={{
                shrink: true,
              }}
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

export default EventDetails;