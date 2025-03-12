import { useState } from 'react';
import { Box, Card, CardContent, Typography, Button, TextField, Avatar, Grid, Snackbar, Alert } from '@mui/material';
import { Person, Edit } from '@mui/icons-material';

const ProfileInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  
  // Mock user data - would come from API
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+94 71 234 5678',
    address: '123 Temple Road, Colombo',
  });
  
  const [formData, setFormData] = useState({...userData});
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmit = () => {
    // Here you would make an API call to update the user data
    setUserData({...formData});
    setIsEditing(false);
    setNotification({
      open: true,
      message: 'Profile updated successfully!',
      severity: 'success'
    });
  };
  
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" component="h2" sx={{ flexGrow: 1 }}>
            Profile Information
          </Typography>
          <Button 
            variant="outlined" 
            startIcon={isEditing ? null : <Edit />}
            onClick={() => setIsEditing(!isEditing)}
            sx={{ mr: 1 }}
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </Button>
          {isEditing && (
            <Button 
              variant="contained" 
              onClick={handleSubmit}
              sx={{ backgroundColor: '#A0522D' }}
            >
              Save Changes
            </Button>
          )}
        </Box>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ width: 120, height: 120, bgcolor: '#D2691E', mb: 2 }}>
              <Person sx={{ fontSize: 80 }} />
            </Avatar>
            {isEditing && (
              <Button variant="outlined" size="small">
                Upload Photo
              </Button>
            )}
          </Grid>
          
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {isEditing ? (
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                ) : (
                  <>
                    <Typography variant="subtitle2" color="text.secondary">Full Name</Typography>
                    <Typography variant="body1" gutterBottom>{userData.name}</Typography>
                  </>
                )}
              </Grid>
              
              <Grid item xs={12}>
                {isEditing ? (
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                ) : (
                  <>
                    <Typography variant="subtitle2" color="text.secondary">Email</Typography>
                    <Typography variant="body1" gutterBottom>{userData.email}</Typography>
                  </>
                )}
              </Grid>
              
              <Grid item xs={12}>
                {isEditing ? (
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                ) : (
                  <>
                    <Typography variant="subtitle2" color="text.secondary">Phone</Typography>
                    <Typography variant="body1" gutterBottom>{userData.phone}</Typography>
                  </>
                )}
              </Grid>
              
              <Grid item xs={12}>
                {isEditing ? (
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                ) : (
                  <>
                    <Typography variant="subtitle2" color="text.secondary">Address</Typography>
                    <Typography variant="body1" gutterBottom>{userData.address}</Typography>
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      
      <Snackbar 
        open={notification.open} 
        autoHideDuration={6000} 
        onClose={() => setNotification({...notification, open: false})}
      >
        <Alert severity={notification.severity}>{notification.message}</Alert>
      </Snackbar>
    </Card>
  );
};

export default ProfileInfo;