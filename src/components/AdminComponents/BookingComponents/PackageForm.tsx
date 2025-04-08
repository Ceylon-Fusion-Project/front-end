import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Snackbar,
  Alert,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Mock data for rooms and events
const mockRooms: Room[] = [
  {
    roomId: 1,
    roomCode: 'STD001',
    roomNumber: '101',
    roomType: 'Standard',
    beds: 2,
    pricePerNight: 100,
    accommodationId: 1,
    roomImageURLs: [],
  },
  {
    roomId: 2,
    roomCode: 'DLX001',
    roomNumber: '201',
    roomType: 'Deluxe',
    beds: 2,
    pricePerNight: 150,
    accommodationId: 1,
    roomImageURLs: [],
  },
  {
    roomId: 3,
    roomCode: 'SUI001',
    roomNumber: '301',
    roomType: 'Suite',
    beds: 3,
    pricePerNight: 250,
    accommodationId: 1,
    roomImageURLs: [],
  },
];

const mockEvents: Event[] = [
  {
    eventId: 1,
    eventName: 'City Tour',
    eventDescription: 'Guided city tour',
    pricePerEvent: 50,
    startTime: '2025-04-10T09:00',
    endTime: '2025-04-10T12:00',
    experienceId: 1,
    eventImageURLs: [],
    isAvailable: true,
  },
  {
    eventId: 2,
    eventName: 'Wine Tasting',
    eventDescription: 'Local wine tasting experience',
    pricePerEvent: 75,
    startTime: '2025-04-10T15:00',
    endTime: '2025-04-10T17:00',
    experienceId: 1,
    eventImageURLs: [],
    isAvailable: true,
  },
  {
    eventId: 3,
    eventName: 'Cooking Class',
    eventDescription: 'Learn local cuisine',
    pricePerEvent: 60,
    startTime: '2025-04-11T10:00',
    endTime: '2025-04-11T12:00',
    experienceId: 1,
    eventImageURLs: [],
    isAvailable: true,
  },
];

// Interface definitions remain the same
interface Room {
  roomId: number;
  roomCode: string;
  roomNumber: string;
  roomType: string;
  beds: number;
  pricePerNight: number;
  accommodationId: number;
  roomImageURLs: string[];
}

interface Event {
  eventId: number;
  eventName: string;
  eventDescription: string;
  pricePerEvent: number;
  startTime: string;
  endTime: string;
  experienceId: number;
  eventImageURLs: string[];
  isAvailable: boolean;
}

interface LocalPackage {
  packageId: number;
  packageName: string;
  description: string;
  pricePerDay: number;
  isPredefined: boolean;
  packageRatingValue: number;
  createdAt: string;
  updatedAt: string;
  events: Event[];
  rooms: Room[];
}

interface PackageFormProps {
  packageData?: LocalPackage;
  onSave?: (pkg: LocalPackage) => void;
  onCancel?: () => void;
}

const roomTypes = [
  { value: 'Standard', label: 'Standard' },
  { value: 'Deluxe', label: 'Deluxe' },
  { value: 'Suite', label: 'Suite' },
  { value: 'Villa', label: 'Villa' },
];

const PackageForm: React.FC<PackageFormProps> = ({ packageData, onSave, onCancel }) => {
  const [formData, setFormData] = useState<LocalPackage>(
    packageData || {
      packageId: 0,
      packageName: '',
      description: '',
      pricePerDay: 0,
      isPredefined: false,
      packageRatingValue: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      events: [],
      rooms: [],
    }
  );

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleRoomsChange = (event: any) => {
    const selectedRoomIds = event.target.value as number[];
    const selectedRooms = mockRooms.filter(room => selectedRoomIds.includes(room.roomId));
    setFormData({
      ...formData,
      rooms: selectedRooms,
    });
  };

  const handleEventsChange = (event: any) => {
    const selectedEventIds = event.target.value as number[];
    const selectedEvents = mockEvents.filter(evt => selectedEventIds.includes(evt.eventId));
    setFormData({
      ...formData,
      events: selectedEvents,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.packageName || !formData.description || formData.pricePerDay <= 0 ||
        formData.rooms.length === 0 || formData.events.length === 0) {
      setSnackbarMessage('Please fill in all required fields and select at least one room and event.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    if (onSave) {
      onSave(formData);
    }
    setSnackbarMessage(packageData ? 'Package updated successfully!' : 'Package added successfully!');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate('/admin/package-management');
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom style={{ fontFamily: 'Poppins, sans-serif', color: '#1E293B' }}>
        {packageData ? 'Edit Package' : 'Add Package'}
      </Typography>
      <Paper elevation={3} style={{ padding: '1.5rem', marginTop: '1rem' }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Package Details */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Package Name"
                name="packageName"
                fullWidth
                value={formData.packageName}
                onChange={handleInputChange}
                required
                style={{ marginBottom: '1rem' }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Price Per Day"
                name="pricePerDay"
                type="number"
                fullWidth
                value={formData.pricePerDay}
                onChange={handleInputChange}
                required
                style={{ marginBottom: '1rem' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                fullWidth
                multiline
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                required
                style={{ marginBottom: '1rem' }}
              />
            </Grid>

            {/* Left Column: Rooms Section */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" style={{ fontFamily: 'Poppins, sans-serif', color: '#1E293B', marginBottom: '1rem' }}>
                Rooms
              </Typography>
              <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
                <InputLabel>Select Rooms</InputLabel>
                <Select
                  multiple
                  value={formData.rooms.map(room => room.roomId)}
                  onChange={handleRoomsChange}
                  renderValue={(selected) => (
                    mockRooms
                      .filter(room => selected.includes(room.roomId))
                      .map(room => `${room.roomNumber} (${room.roomType})`)
                      .join(', ')
                  )}
                >
                  {mockRooms.map((room) => (
                    <MenuItem key={room.roomId} value={room.roomId}>
                      {`${room.roomNumber} - ${room.roomType} (${room.roomCode})`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Right Column: Events Section */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" style={{ fontFamily: 'Poppins, sans-serif', color: '#1E293B', marginBottom: '1rem' }}>
                Events
              </Typography>
              <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
                <InputLabel>Select Events</InputLabel>
                <Select
                  multiple
                  value={formData.events.map(event => event.eventId)}
                  onChange={handleEventsChange}
                  renderValue={(selected) => (
                    mockEvents
                      .filter(event => selected.includes(event.eventId))
                      .map(event => event.eventName)
                      .join(', ')
                  )}
                >
                  {mockEvents.map((event) => (
                    <MenuItem key={event.eventId} value={event.eventId}>
                      {`${event.eventName} (${event.startTime})`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Form Buttons */}
            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <Button
                onClick={handleCancel}
                style={{ color: '#64748B', borderColor: '#64748B' }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                style={{ backgroundColor: '#B45309', color: '#FFFFFF' }}
              >
                {packageData ? 'Update Package' : 'Save Package'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Snackbar for Notifications */}
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default PackageForm;