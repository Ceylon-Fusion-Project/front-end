// Updated PackageForm.tsx
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
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { ImageUploader } from '@/components/AdminComponents/ImageUploader';
import { useNavigate } from 'react-router-dom';

// Event and Room types
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
  const [showRoomForm, setShowRoomForm] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleAddEvent = () => {
    setShowEventForm(true);
    setFormData({
      ...formData,
      events: [
        ...formData.events,
        {
          eventId: formData.events.length + 1,
          eventName: '',
          eventDescription: '',
          pricePerEvent: 0,
          startTime: '',
          endTime: '',
          experienceId: 0,
          eventImageURLs: [],
          isAvailable: true,
        },
      ],
    });
  };

  const handleAddRoom = () => {
    setShowRoomForm(true);
    setFormData({
      ...formData,
      rooms: [
        ...formData.rooms,
        {
          roomId: formData.rooms.length + 1,
          roomCode: '',
          roomNumber: '',
          roomType: '',
          beds: 0,
          pricePerNight: 0,
          accommodationId: 0,
          roomImageURLs: [],
        },
      ],
    });
  };

  const handleEventChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedEvents = [...formData.events];
    updatedEvents[index] = { ...updatedEvents[index], [name]: value };
    setFormData({ ...formData, events: updatedEvents });
  };

  const handleRoomChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedRooms = [...formData.rooms];
    updatedRooms[index] = { ...updatedRooms[index], [name]: value };
    setFormData({ ...formData, rooms: updatedRooms });
  };

  const handleRoomTypeChange = (index: number, value: string) => {
    const updatedRooms = [...formData.rooms];
    updatedRooms[index].roomType = value;
    setFormData({ ...formData, rooms: updatedRooms });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.packageName || !formData.description || formData.pricePerDay <= 0) {
      setSnackbarMessage('Please fill in all required fields.');
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

  const navigate = useNavigate(); // Move this to the top level

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
              <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={handleAddRoom}
                fullWidth
                sx={{
                  marginBottom: '1rem',
                  color: '#B45309',
                  borderColor: '#B45309',
                  '&:hover': {
                    backgroundColor: '#EDE0D4',
                    borderColor: '#B45309',
                  },
                }}
              >
                Add Room
              </Button>
              {showRoomForm &&
                formData.rooms.map((room, index) => (
                  <Paper key={index} elevation={2} style={{ padding: '1rem', marginBottom: '1rem' }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Room Code"
                          name="roomCode"
                          fullWidth
                          value={room.roomCode}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleRoomChange(index, e)}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Room Number"
                          name="roomNumber"
                          fullWidth
                          value={room.roomNumber}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleRoomChange(index, e)}
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          select
                          label="Room Type"
                          value={room.roomType}
                          onChange={(e) => handleRoomTypeChange(index, e.target.value as string)}
                          fullWidth
                          required
                          variant="outlined"
                        >
                          {roomTypes.map((type) => (
                            <MenuItem key={type.value} value={type.value}>
                              {type.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Beds"
                          name="beds"
                          type="number"
                          fullWidth
                          value={room.beds}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleRoomChange(index, e)}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Price Per Night"
                          name="pricePerNight"
                          type="number"
                          fullWidth
                          value={room.pricePerNight}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleRoomChange(index, e)}
                          required
                        />
                      </Grid>
                        <Grid item xs={12}>
                        <Typography variant="subtitle2" style={{ marginBottom: '0.5rem' }}>
                          Room Images
                        </Typography>
                        <ImageUploader
                          value={room.roomImageURLs || []}
                          onChange={(urls: string[]) => {
                          const updatedRooms: Room[] = [...formData.rooms];
                          updatedRooms[index].roomImageURLs = urls;
                          setFormData({ ...formData, rooms: updatedRooms });
                          }}
                        />
                        </Grid>
                    </Grid>
                  </Paper>
                ))}
            </Grid>

            {/* Right Column: Events Section */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" style={{ fontFamily: 'Poppins, sans-serif', color: '#1E293B', marginBottom: '1rem' }}>
                Events
              </Typography>
              <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={handleAddEvent}
                fullWidth
                sx={{
                  marginBottom: '1rem',
                  color: '#B45309',
                  borderColor: '#B45309',
                  '&:hover': {
                    backgroundColor: '#EDE0D4',
                    borderColor: '#B45309',
                  },
                }}
              >
                Add Event
              </Button>
              {showEventForm &&
                formData.events.map((event, index) => (
                  <Paper key={index} elevation={2} style={{ padding: '1rem', marginBottom: '1rem' }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Event Name"
                          name="eventName"
                          fullWidth
                          value={event.eventName}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEventChange(index, e)}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Event Description"
                          name="eventDescription"
                          fullWidth
                          value={event.eventDescription}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEventChange(index, e)}
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Price Per Event"
                          name="pricePerEvent"
                          type="number"
                          fullWidth
                          value={event.pricePerEvent}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEventChange(index, e)}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Start Time"
                          name="startTime"
                          type="datetime-local"
                          fullWidth
                          value={event.startTime}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEventChange(index, e)}
                          required
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="End Time"
                          name="endTime"
                          type="datetime-local"
                          fullWidth
                          value={event.endTime}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEventChange(index, e)}
                          required
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                        <Grid item xs={12}>
                        <Typography variant="subtitle2" style={{ marginBottom: '0.5rem' }}>
                          Event Images
                        </Typography>
                        <ImageUploader
                          value={event.eventImageURLs || []}
                          onChange={(urls: string[]) => {
                          const updatedEvents: Event[] = [...formData.events];
                          updatedEvents[index].eventImageURLs = urls;
                          setFormData({ ...formData, events: updatedEvents });
                          }}
                        />
                        </Grid>
                    </Grid>
                  </Paper>
                ))}
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