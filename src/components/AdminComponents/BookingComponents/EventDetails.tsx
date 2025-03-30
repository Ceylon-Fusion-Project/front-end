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
  Grid,
} from '@mui/material';
import { Edit, Delete, ArrowBack } from '@mui/icons-material';
import { mockData } from './ExperienceCenterManagement'; // Import mockData
import { useState } from 'react';

const EventDetails = () => {
  const { experienceCenterId } = useParams(); // Get experienceCenterId from URL
  const navigate = useNavigate(); // Navigate hook for back functionality
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

  // If experience center is not found, display a message with back button
  if (!experienceCenter) {
    return (
      <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
        <Typography variant="h6">Experience Center not found</Typography>
        <Button
          variant="contained"
          startIcon={<ArrowBack />}
          onClick={() => navigate('/admin/experience-center-management')} // Adjust path as needed
          style={{ marginTop: '1rem', backgroundColor: '#B45309', color: '#FFFFFF' }}
        >
          Back to Experience Center Management
        </Button>
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

  // Handle back navigation
  const handleBackClick = () => {
    navigate('/admin/experience-center-management'); // Adjust path as needed
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
  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission from refreshing the page
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
          {experienceCenter.experienceCenterName}
        </Typography>
      </Box>
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
          <form id="event-form" onSubmit={handleSaveChanges}>
            <Grid container spacing={2}>
              {/* First Row: Event Name and Event Description */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Event Name"
                  value={currentEvent?.eventName || ''}
                  fullWidth
                  margin="normal"
                  onChange={(e) => handleFormChange('eventName', e.target.value)}
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Event Description"
                  value={currentEvent?.eventDescription || ''}
                  fullWidth
                  margin="normal"
                  onChange={(e) => handleFormChange('eventDescription', e.target.value)}
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              {/* Second Row: Price Per Event and Start Time */}
              <Grid item xs={12}>
                <TextField
                  label="Price Per Event"
                  value={currentEvent?.pricePerEvent || 0}
                  type="number"
                  fullWidth
                  margin="normal"
                  onChange={(e) => handleFormChange('pricePerEvent', parseFloat(e.target.value))}
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
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
              </Grid>
              {/* Third Row: End Time (Full Width) */}
              <Grid item xs={6}>
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
            form="event-form"
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