import React, { useState } from 'react';
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
  Snackbar,
  Alert,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import { Add, Edit, Delete, Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import PackageForm from './PackageForm'; // Import the PackageForm component

// Define the Event and Room interfaces
export interface Event {
  eventId: number;
  eventName: string;
  eventImageURLs: string[];
  eventDescription: string;
  pricePerEvent: number;
  isAvailable: boolean;
  startTime: string;
  endTime: string;
  experienceId: number;
}

export interface Room {
  roomId: number;
  roomCode: string;
  roomNumber: string; // Changed to string to match the expected type
  roomType: string;
  roomImageURLs: string[];
  beds: number;
  pricePerNight: number;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
  accommodationId: number;
}

export interface Package {
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

// Mock data for packages
export const mockPackages: Package[] = [
  {
    packageId: 1,
    packageName: 'Cinnamon Beach Retreat',
    description: 'Relax by the pristine beaches with our exclusive package.',
    pricePerDay: 180.0,
    isPredefined: true,
    packageRatingValue: 4.7,
    createdAt: '2023-02-01',
    updatedAt: '2023-02-10',
    events: [
      {
        eventId: 1,
        eventName: 'Sunset Yoga',
        eventImageURLs: ['yoga1.jpg', 'yoga2.jpg'],
        eventDescription: 'Calm your mind with yoga at sunset.',
        pricePerEvent: 40.0,
        isAvailable: true,
        startTime: '17:00',
        endTime: '18:30',
        experienceId: 201,
      },
    ],
    rooms: [
      {
        roomId: 1,
        roomCode: 'CB101',
        roomNumber: '101', // Fixed: Ensure this is a string
        roomType: 'Beachfront Deluxe',
        roomImageURLs: ['room1.jpg', 'room2.jpg'],
        beds: 1,
        pricePerNight: 220.0,
        isAvailable: true,
        createdAt: '2023-02-01',
        updatedAt: '2023-02-10',
        accommodationId: 1,
      },
    ],
  },
  {
    packageId: 2,
    packageName: 'Mountain Peak Adventure',
    description: 'Experience the thrill of mountain climbing and hiking.',
    pricePerDay: 200.0,
    isPredefined: true,
    packageRatingValue: 4.6,
    createdAt: '2023-03-05',
    updatedAt: '2023-03-15',
    events: [
      {
        eventId: 2,
        eventName: 'Summit Hike',
        eventImageURLs: ['hike1.jpg', 'hike2.jpg'],
        eventDescription: 'Reach the peak with expert guides.',
        pricePerEvent: 50.0,
        isAvailable: true,
        startTime: '08:00',
        endTime: '14:00',
        experienceId: 202,
      },
    ],
    rooms: [
      {
        roomId: 2,
        roomCode: 'MP201',
        roomNumber: '201',
        roomType: 'Mountain View Suite',
        roomImageURLs: ['room3.jpg', 'room4.jpg'],
        beds: 2,
        pricePerNight: 250.0,
        isAvailable: true,
        createdAt: '2023-03-05',
        updatedAt: '2023-03-15',
        accommodationId: 2,
      },
    ],
  },
  {
    packageId: 3,
    packageName: 'Urban City Escape',
    description: 'Explore the vibrant city life with curated experiences.',
    pricePerDay: 150.0,
    isPredefined: true,
    packageRatingValue: 4.4,
    createdAt: '2023-04-10',
    updatedAt: '2023-04-20',
    events: [
      {
        eventId: 3,
        eventName: 'City Lights Tour',
        eventImageURLs: ['city1.jpg', 'city2.jpg'],
        eventDescription: 'Discover the city’s iconic landmarks at night.',
        pricePerEvent: 30.0,
        isAvailable: true,
        startTime: '19:00',
        endTime: '21:00',
        experienceId: 203,
      },
    ],
    rooms: [
      {
        roomId: 3,
        roomCode: 'UC301',
        roomNumber: '301',
        roomType: 'Executive Suite',
        roomImageURLs: ['room5.jpg', 'room6.jpg'],
        beds: 1,
        pricePerNight: 180.0,
        isAvailable: true,
        createdAt: '2023-04-10',
        updatedAt: '2023-04-20',
        accommodationId: 3,
      },
    ],
  },
  {
    packageId: 4,
    packageName: 'Tropical Island Paradise',
    description: 'Relax on a private island with crystal-clear waters.',
    pricePerDay: 220.0,
    isPredefined: true,
    packageRatingValue: 4.8,
    createdAt: '2023-05-01',
    updatedAt: '2023-05-10',
    events: [
      {
        eventId: 4,
        eventName: 'Snorkeling Adventure',
        eventImageURLs: ['snorkel1.jpg', 'snorkel2.jpg'],
        eventDescription: 'Explore vibrant coral reefs and marine life.',
        pricePerEvent: 60.0,
        isAvailable: true,
        startTime: '11:00',
        endTime: '13:00',
        experienceId: 204,
      },
    ],
    rooms: [
      {
        roomId: 4,
        roomCode: 'TIP401',
        roomNumber: '401',
        roomType: 'Oceanfront Villa',
        roomImageURLs: ['room7.jpg', 'room8.jpg'],
        beds: 2,
        pricePerNight: 280.0,
        isAvailable: true,
        createdAt: '2023-05-01',
        updatedAt: '2023-05-10',
        accommodationId: 4,
      },
    ],
  },
  {
    packageId: 5,
    packageName: 'Safari Wilderness Expedition',
    description: 'Embark on a thrilling safari in the heart of the wild.',
    pricePerDay: 250.0,
    isPredefined: true,
    packageRatingValue: 4.7,
    createdAt: '2023-06-01',
    updatedAt: '2023-06-10',
    events: [
      {
        eventId: 5,
        eventName: 'Wildlife Safari',
        eventImageURLs: ['safari1.jpg', 'safari2.jpg'],
        eventDescription: 'Spot lions, elephants, and more in their natural habitat.',
        pricePerEvent: 70.0,
        isAvailable: true,
        startTime: '06:00',
        endTime: '12:00',
        experienceId: 205,
      },
    ],
    rooms: [
      {
        roomId: 5,
        roomCode: 'SWE501',
        roomNumber: '501',
        roomType: 'Luxury Safari Tent',
        roomImageURLs: ['room9.jpg', 'room10.jpg'],
        beds: 2,
        pricePerNight: 300.0,
        isAvailable: true,
        createdAt: '2023-06-01',
        updatedAt: '2023-06-10',
        accommodationId: 5,
      },
    ],
  },
  {
    packageId: 6,
    packageName: 'Cultural Heritage Journey',
    description: 'Immerse yourself in the rich history and traditions.',
    pricePerDay: 170.0,
    isPredefined: true,
    packageRatingValue: 4.5,
    createdAt: '2023-07-01',
    updatedAt: '2023-07-10',
    events: [
      {
        eventId: 6,
        eventName: 'Historical Walk',
        eventImageURLs: ['history1.jpg', 'history2.jpg'],
        eventDescription: 'Explore ancient ruins and museums.',
        pricePerEvent: 35.0,
        isAvailable: true,
        startTime: '10:00',
        endTime: '16:00',
        experienceId: 206,
      },
    ],
    rooms: [
      {
        roomId: 6,
        roomCode: 'CHJ601',
        roomNumber: '601',
        roomType: 'Heritage Suite',
        roomImageURLs: ['room11.jpg', 'room12.jpg'],
        beds: 1,
        pricePerNight: 200.0,
        isAvailable: true,
        createdAt: '2023-07-01',
        updatedAt: '2023-07-10',
        accommodationId: 6,
      },
    ],
  },
  {
    packageId: 7,
    packageName: 'Ski Resort Getaway',
    description: 'Hit the slopes with our winter sports package.',
    pricePerDay: 300.0,
    isPredefined: true,
    packageRatingValue: 4.9,
    createdAt: '2023-08-01',
    updatedAt: '2023-08-10',
    events: [
      {
        eventId: 7,
        eventName: 'Skiing Lessons',
        eventImageURLs: ['ski1.jpg', 'ski2.jpg'],
        eventDescription: 'Learn to ski with professional instructors.',
        pricePerEvent: 80.0,
        isAvailable: true,
        startTime: '09:00',
        endTime: '12:00',
        experienceId: 207,
      },
    ],
    rooms: [
      {
        roomId: 7,
        roomCode: 'SRG701',
        roomNumber: '701',
        roomType: 'Ski Chalet',
        roomImageURLs: ['room13.jpg', 'room14.jpg'],
        beds: 2,
        pricePerNight: 350.0,
        isAvailable: true,
        createdAt: '2023-08-01',
        updatedAt: '2023-08-10',
        accommodationId: 7,
      },
    ],
  },
  {
    packageId: 8,
    packageName: 'Desert Oasis Retreat',
    description: 'Experience the tranquility of the desert landscape.',
    pricePerDay: 190.0,
    isPredefined: true,
    packageRatingValue: 4.3,
    createdAt: '2023-09-01',
    updatedAt: '2023-09-10',
    events: [
      {
        eventId: 8,
        eventName: 'Camel Trekking',
        eventImageURLs: ['camel1.jpg', 'camel2.jpg'],
        eventDescription: 'Journey through the dunes on camelback.',
        pricePerEvent: 45.0,
        isAvailable: true,
        startTime: '16:00',
        endTime: '18:00',
        experienceId: 208,
      },
    ],
    rooms: [
      {
        roomId: 8,
        roomCode: 'DOR801',
        roomNumber: '801',
        roomType: 'Desert Tent',
        roomImageURLs: ['room15.jpg', 'room16.jpg'],
        beds: 1,
        pricePerNight: 210.0,
        isAvailable: true,
        createdAt: '2023-09-01',
        updatedAt: '2023-09-10',
        accommodationId: 8,
      },
    ],
  },
  {
    packageId: 9,
    packageName: 'Lakeside Serenity',
    description: 'Unwind by the tranquil lakeside with scenic views.',
    pricePerDay: 160.0,
    isPredefined: true,
    packageRatingValue: 4.6,
    createdAt: '2023-10-01',
    updatedAt: '2023-10-10',
    events: [
      {
        eventId: 9,
        eventName: 'Kayaking',
        eventImageURLs: ['kayak1.jpg', 'kayak2.jpg'],
        eventDescription: 'Paddle through serene waters.',
        pricePerEvent: 25.0,
        isAvailable: true,
        startTime: '10:00',
        endTime: '12:00',
        experienceId: 209,
      },
    ],
    rooms: [
      {
        roomId: 9,
        roomCode: 'LS901',
        roomNumber: '901',
        roomType: 'Lakefront Cabin',
        roomImageURLs: ['room17.jpg', 'room18.jpg'],
        beds: 2,
        pricePerNight: 190.0,
        isAvailable: true,
        createdAt: '2023-10-01',
        updatedAt: '2023-10-10',
        accommodationId: 9,
      },
    ],
  },
];

const PackageManagement = () => {
  const [packages, setPackages] = useState<Package[]>(mockPackages);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [currentPage, setCurrentPage] = useState(1);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const rowsPerPage = 5;
  const navigate = useNavigate();

  const pageCount = Math.ceil(packages.length / rowsPerPage);

  const handleAddClick = () => {
    navigate('add-package');
  };

  const handleEditClick = (pkg: Package) => {
    setSelectedPackage(pkg);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    setPackages(packages.filter((pkg) => pkg.packageId !== id));
    setSnackbarMessage('Package deleted successfully!');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  const handleViewDetails = (packageId: number) => {
    navigate(`package-details/${packageId}`);
  };

  const handleSavePackage = (pkg: Package) => {
    if (pkg.packageId) {
      // Update existing package
      setPackages(packages.map((p) => (p.packageId === pkg.packageId ? pkg : p)));
      setSnackbarMessage('Package updated successfully!');
    } else {
      // Add new package
      const newPackage = { ...pkg, packageId: packages.length + 1 };
      setPackages([...packages, newPackage]);
      setSnackbarMessage('Package added successfully!');
    }
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
    setEditDialogOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  const paginatedData = packages.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom style={{ fontFamily: 'Poppins, sans-serif', color: '#1E293B' }}>
        Package Management
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={handleAddClick}
        style={{ backgroundColor: '#B45309', color: '#FFFFFF' }}
      >
        Add Package
      </Button>

      <TableContainer component={Paper} style={{ marginTop: '1.5rem', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#F8FAFC' }}>
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Package Name</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Description</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Price Per Day</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Rating</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Details</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((pkg) => (
              <TableRow key={pkg.packageId}>
                <TableCell>{pkg.packageName}</TableCell>
                <TableCell>{pkg.description}</TableCell>
                <TableCell>${pkg.pricePerDay}</TableCell>
                <TableCell>{pkg.packageRatingValue}</TableCell>
                <TableCell>
                  <span
                    style={{ cursor: 'pointer', color: '#B45309', display: 'flex', alignItems: 'center', gap: '4px' }}
                    onClick={() => handleViewDetails(pkg.packageId)}
                  >
                    <Visibility fontSize="small" /> View Details
                  </span>
                </TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEditClick(pkg)}>
                    <Edit style={{ color: '#291e10' }} />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDeleteClick(pkg.packageId)}>
                    <Delete style={{ color: '#EF4444' }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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

      {/* Edit Package Dialog */}
      <Dialog open={editDialogOpen} onClose={handleCloseEditDialog} maxWidth="md" fullWidth>
        <DialogTitle>Edit Package</DialogTitle>
        <DialogContent>
          {selectedPackage && (
            <PackageForm
              packageData={selectedPackage}
              onSave={(pkg) => handleSavePackage(pkg as Package)}
              onCancel={handleCloseEditDialog}
            />
          )}
        </DialogContent>
      </Dialog>

      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default PackageManagement;