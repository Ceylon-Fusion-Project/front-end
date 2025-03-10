import { useState } from 'react';
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar,
  Alert,
  AlertColor,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

// Mock data for certifications
const mockData = [
  {
    certificationID: 1,
    productID: 101,
    certificationName: 'Organic Certification',
    issuer: 'Certified Org',
    issuedDate: '2024-03-01',
    expiryDate: '2025-03-01',
    certActiveState: true,
    createdDate: '2024-01-01',
    updatedDate: '2024-01-01',
    certURL: 'cert1.pdf',
  },
  {
    certificationID: 2,
    productID: 102,
    certificationName: 'Fair Trade',
    issuer: 'Fair Trade Intl',
    issuedDate: '2024-02-15',
    expiryDate: '2025-02-15',
    certActiveState: true,
    createdDate: '2024-01-01',
    updatedDate: '2024-01-01',
    certURL: 'cert2.pdf',
  },
];

const CertificationManagement = () => {
  const [certifications, setCertifications] = useState(mockData);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentCertification, setCurrentCertification] = useState<null | typeof mockData[0]>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');

  // Handle add certification
  const handleAddClick = () => {
    setEditMode(false);
    setCurrentCertification(null);
    setOpenDialog(true);
  };

  // Handle edit certification
  const handleEditClick = (certification: typeof mockData[0]) => {
    setEditMode(true);
    setCurrentCertification(certification);
    setOpenDialog(true);
  };

  // Handle delete certification
  const handleDeleteClick = (id: number) => {
    setCertifications(certifications.filter((cert) => cert.certificationID !== id));
    setSnackbarMessage('Certification deleted successfully!');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  // Handle save/update certification
  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const newCertification = {
      certificationID: currentCertification ? currentCertification.certificationID : certifications.length + 1,
      productID: parseInt(formData.get('productID') as string),
      certificationName: formData.get('certificationName') as string,
      issuer: formData.get('issuer') as string,
      issuedDate: formData.get('issuedDate') as string,
      expiryDate: formData.get('expiryDate') as string,
      certActiveState: true,
      createdDate: new Date().toISOString().split('T')[0],
      updatedDate: new Date().toISOString().split('T')[0],
      certURL: formData.get('certURL') as string,
    };

    if (currentCertification) {
      // Update existing certification
      setCertifications(
        certifications.map((cert) =>
          cert.certificationID === (currentCertification ? currentCertification.certificationID : -1) ? newCertification : cert
        )
      );
      setSnackbarMessage('Certification updated successfully!');
    } else {
      // Add new certification
      setCertifications([...certifications, newCertification]);
      setSnackbarMessage('Certification added successfully!');
    }

    setSnackbarSeverity('success');
    setSnackbarOpen(true);
    setOpenDialog(false);
  };

  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom style={{ fontFamily: 'Poppins, sans-serif', color: '#1E293B' }}>
        Certification Management
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={handleAddClick}
        style={{ backgroundColor: '#291e10', color: '#FFFFFF' }}
      >
        Add Certification
      </Button>

      {/* Certifications Table */}
      <TableContainer component={Paper} style={{ marginTop: '1.5rem', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#F8FAFC' }}>
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Certification Name</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Issuer</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Issued Date</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Expiry Date</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Product ID</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>File</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {certifications.map((cert) => (
              <TableRow key={cert.certificationID}>
                <TableCell>{cert.certificationName}</TableCell>
                <TableCell>{cert.issuer}</TableCell>
                <TableCell>{cert.issuedDate}</TableCell>
                <TableCell>{cert.expiryDate}</TableCell>
                <TableCell>{cert.productID}</TableCell>
                <TableCell>
                  <a href={cert.certURL} target="_blank" rel="noopener noreferrer" style={{ color: '#3B82F6', textDecoration: 'none' }}>
                    View File
                  </a>
                </TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEditClick(cert)}>
                    <Edit style={{ color: '#291e10' }} />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDeleteClick(cert.certificationID)}>
                    <Delete style={{ color: '#EF4444' }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Certification Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle style={{ fontFamily: 'Poppins, sans-serif', color: '#1E293B' }}>
          {editMode ? 'Edit Certification' : 'Add Certification'}
        </DialogTitle>
        <DialogContent>
          <form id="certification-form" onSubmit={handleSave}>
            <TextField
              label="Certification Name"
              name="certificationName"
              fullWidth
              margin="normal"
              defaultValue={currentCertification?.certificationName}
              required
            />
            <TextField
              label="Issuer"
              name="issuer"
              fullWidth
              margin="normal"
              defaultValue={currentCertification?.issuer}
              required
            />
            <TextField
              label="Issued Date"
              name="issuedDate"
              type="date"
              fullWidth
              margin="normal"
              defaultValue={currentCertification?.issuedDate}
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              label="Expiry Date"
              name="expiryDate"
              type="date"
              fullWidth
              margin="normal"
              defaultValue={currentCertification?.expiryDate}
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              label="Product ID"
              name="productID"
              type="number"
              fullWidth
              margin="normal"
              defaultValue={currentCertification?.productID}
              required
            />
            <TextField
              label="File URL"
              name="certURL"
              fullWidth
              margin="normal"
              defaultValue={currentCertification?.certURL}
              required
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} style={{ color: '#64748B' }}>
            Cancel
          </Button>
          <Button type="submit" form="certification-form" variant="contained" style={{ backgroundColor: '#291e10', color: '#FFFFFF' }}>
            {editMode ? 'Update' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CertificationManagement;