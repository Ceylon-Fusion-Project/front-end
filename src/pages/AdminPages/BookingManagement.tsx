import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardContent, CardActionArea, Box } from '@mui/material';
import {
  LocalActivity as PackageIcon,
  Hotel as AccommodationIcon,
  MeetingRoom as RoomIcon,
  Explore as ExperienceIcon,
  Event as EventIcon,
} from '@mui/icons-material';

// Styles for the cards
const cardStyle = {
  height: '200px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  backgroundColor: '#F8FAFC',
  borderRadius: '12px',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.2)',
  },
};

const iconStyle = {
  fontSize: '48px',
  color: '#B45309',
  marginBottom: '16px',
};

const BookingManagement = () => {
  const navigate = useNavigate();

  // Navigation handlers
  const navigateToPackageManagement = () => navigate('/package-management');
  const navigateToAccommodationManagement = () => navigate('/accommodation-management');
  const navigateToRoomManagement = () => navigate('/room-management');
  const navigateToExperienceCenterManagement = () => navigate('/admin/experience-center-management');
  const navigateToEventManagement = () => navigate('/event-management');

  return (
    <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom style={{ fontFamily: 'Poppins, sans-serif', color: '#1E293B' }}>
        Booking Management
      </Typography>

      <Grid container spacing={4}>
        {/* Package Management Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={cardStyle}>
            <CardActionArea onClick={navigateToPackageManagement}>
              <CardContent>
                <PackageIcon sx={iconStyle} />
                <Typography variant="h6" style={{ color: '#1E293B' }}>
                  Package Management
                </Typography>
                <Typography variant="body2" style={{ color: '#64748B' }}>
                  Manage travel packages and offers.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        {/* Accommodation Management Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={cardStyle}>
            <CardActionArea onClick={navigateToAccommodationManagement}>
              <CardContent>
                <AccommodationIcon sx={iconStyle} />
                <Typography variant="h6" style={{ color: '#1E293B' }}>
                  Accommodation Management
                </Typography>
                <Typography variant="body2" style={{ color: '#64748B' }}>
                  Manage hotels and accommodations.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        {/* Room Management Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={cardStyle}>
            <CardActionArea onClick={navigateToRoomManagement}>
              <CardContent>
                <RoomIcon sx={iconStyle} />
                <Typography variant="h6" style={{ color: '#1E293B' }}>
                  Room Management
                </Typography>
                <Typography variant="body2" style={{ color: '#64748B' }}>
                  Manage room availability and bookings.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        {/* Experience Center Management Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={cardStyle}>
            <CardActionArea onClick={navigateToExperienceCenterManagement}>
              <CardContent>
                <ExperienceIcon sx={iconStyle} />
                <Typography variant="h6" style={{ color: '#1E293B' }}>
                  Experience Center Management
                </Typography>
                <Typography variant="body2" style={{ color: '#64748B' }}>
                  Manage experience center activities.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        {/* Event Management Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={cardStyle}>
            <CardActionArea onClick={navigateToEventManagement}>
              <CardContent>
                <EventIcon sx={iconStyle} />
                <Typography variant="h6" style={{ color: '#1E293B' }}>
                  Event Management
                </Typography>
                <Typography variant="body2" style={{ color: '#64748B' }}>
                  Manage events and schedules.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BookingManagement;