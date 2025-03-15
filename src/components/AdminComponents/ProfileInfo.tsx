import React, { useState, useRef } from 'react';
import {
  Box, Card, CardContent, Typography, Button, TextField, Avatar, Grid, Snackbar, Alert,
  Accordion, AccordionSummary, AccordionDetails, Switch, FormControlLabel, Divider
} from '@mui/material';
import { Person, Edit, ExpandMore, Lock, Security, Notifications, Delete, CloudDownload } from '@mui/icons-material';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { useDropzone } from 'react-dropzone';

const ProfileInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>({ unit: '%', width: 30, height: 30, x: 0, y: 0 });
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Mock user data - would come from API
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+94 71 234 5678',
    address: '123 Temple Road, Colombo',
  });

  const [formData, setFormData] = useState({ ...userData });

  // Handle file upload
  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: { 'image/*': [] } });

  // Handle image crop
  const onImageLoad = (img: HTMLImageElement) => {
    imgRef.current = img;
  };

  const onCropComplete = (crop: Crop) => {
    if (imgRef.current && crop.width && crop.height) {
      const canvas = document.createElement('canvas');
      const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
      const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        ctx.drawImage(
          imgRef.current,
          crop.x! * scaleX,
          crop.y! * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height
        );

        const croppedImageUrl = canvas.toDataURL('image/jpeg');
        setCroppedImage(croppedImageUrl);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    // Here you would make an API call to update the user data
    setUserData({ ...formData });
    setIsEditing(false);
    setNotification({
      open: true,
      message: 'Profile updated successfully!',
      severity: 'success',
    });
  };

  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2, backgroundColor: '#F8FAFC', p: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" component="h2" sx={{ flexGrow: 1, color: '#4c381e', fontWeight: 'bold' }}>
            Profile Information
          </Typography>
          <Button
            variant="outlined"
            startIcon={isEditing ? null : <Edit />}
            onClick={() => setIsEditing(!isEditing)}
            sx={{ mr: 1, color: '#A0522D', borderColor: '#A0522D', '&:hover': { borderColor: '#8B4513' } }}
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </Button>
          {isEditing && (
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{ backgroundColor: '#A0522D', '&:hover': { backgroundColor: '#8B4513' } }}
            >
              Save Changes
            </Button>
          )}
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {isEditing ? (
              <Box>
                <Box {...getRootProps()} sx={{ textAlign: 'center', cursor: 'pointer' }}>
                  <input {...getInputProps()} />
                  <Avatar sx={{ width: 120, height: 120, bgcolor: '#D2691E', mb: 2 }}>
                    {croppedImage ? (
                      <img src={croppedImage} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <Person sx={{ fontSize: 80 }} />
                    )}
                  </Avatar>
                  <Typography variant="body2" color="#4c381e">
                    Click to upload a photo
                  </Typography>
                </Box>
                {imageSrc && (
                  <Box sx={{ mt: 2 }}>
                    <ReactCrop
                      crop={crop}
                      onChange={(newCrop: Crop) => setCrop(newCrop)}
                      onComplete={onCropComplete}
                    >
                      <img
                        src={imageSrc}
                        alt="Crop me"
                        onLoad={(e) => onImageLoad(e.currentTarget)}
                        style={{ maxWidth: '100%', borderRadius: '8px' }}
                      />
                    </ReactCrop>
                  </Box>
                )}
              </Box>
            ) : (
              <Avatar sx={{ width: 120, height: 120, bgcolor: '#D2691E', mb: 2 }}>
                {croppedImage ? (
                  <img src={croppedImage} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <Person sx={{ fontSize: 80 }} />
                )}
              </Avatar>
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
                    sx={{ mb: 2 }}
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
                    sx={{ mb: 2 }}
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
                    sx={{ mb: 2 }}
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
                    sx={{ mb: 2 }}
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

        {/* Additional Features
        <Accordion sx={{ mt: 3 }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">Security Settings</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              <Typography variant="subtitle1" gutterBottom>Change Password</Typography>
              <TextField
                fullWidth
                label="Current Password"
                type="password"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="New Password"
                type="password"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Confirm New Password"
                type="password"
                sx={{ mb: 2 }}
              />
              <Button variant="contained" sx={{ backgroundColor: '#A0522D', '&:hover': { backgroundColor: '#8B4513' } }}>
                Update Password
              </Button>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box>
              <Typography variant="subtitle1" gutterBottom>Two-Factor Authentication</Typography>
              <FormControlLabel
                control={<Switch checked={twoFactorEnabled} onChange={() => setTwoFactorEnabled(!twoFactorEnabled)} />}
                label="Enable Two-Factor Authentication"
              />
            </Box>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ mt: 3 }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">Account Management</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              <Typography variant="subtitle1" gutterBottom>Export Data</Typography>
              <Button variant="outlined" startIcon={<CloudDownload />} sx={{ mb: 2 }}>
                Export Profile Data
              </Button>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box>
              <Typography variant="subtitle1" gutterBottom>Delete Account</Typography>
              <Button variant="outlined" color="error" startIcon={<Delete />}>
                Delete Account
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion> */}
      </CardContent>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, open: false })}
      >
        <Alert severity={notification.severity}>{notification.message}</Alert>
      </Snackbar>
    </Card>
  );
};

export default ProfileInfo;