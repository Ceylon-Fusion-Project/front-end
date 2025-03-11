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
  Box,
} from '@mui/material';
import { Add, Edit, Delete, CloudUpload } from '@mui/icons-material';

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

// Drag-and-drop file uploader component
const ImageUploader = ({ value, onChange }: { value: File[]; onChange: (files: File[]) => void }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onChange([e.dataTransfer.files[0]]); // Replace existing file
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onChange([e.target.files[0]]); // Replace existing file
    }
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      style={{
        border: dragActive ? '2px dashed #B45309' : '2px dashed #CBD5E1',
        borderRadius: '8px',
        padding: '20px',
        textAlign: 'center',
        backgroundColor: dragActive ? '#FFFBEB' : '#F8FAFC',
        cursor: 'pointer',
      }}
    >
      <input
        type="file"
        id="file-upload"
        style={{ display: 'none' }}
        onChange={handleChange}
      />
      <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
        <CloudUpload style={{ color: '#B45309', fontSize: '40px' }} />
        <p style={{ color: '#1E293B', marginTop: '10px' }}>
          Drag & drop a file or <span style={{ color: '#B45309', textDecoration: 'underline' }}>browse</span>
        </p>
      </label>
      {value.length > 0 && (
        <div style={{ marginTop: '10px' }}>
          <p style={{ color: '#1E293B', fontWeight: 'bold' }}>Uploaded File:</p>
          <p style={{ color: '#1E293B' }}>{value[0].name}</p>
        </div>
      )}
    </div>
  );
};

const CertificationManagement = () => {
  const [certifications, setCertifications] = useState(mockData);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentCertification, setCurrentCertification] = useState<typeof mockData[0] | null>(null);
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [file, setFile] = useState<File[]>([]);

  // Handle add certification
  const handleAddClick = () => {
    setEditMode(false);
    setCurrentCertification(null);
    setFile([]); // Reset file when adding a new certification
    setOpenDialog(true);
  };

  // Handle edit certification
  const handleEditClick = (certification: typeof mockData[0]) => {
    setEditMode(true);
    setCurrentCertification(certification);
    setFile([]); // Reset file when editing (optional, depending on your use case)
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
      certURL: file.length > 0 ? URL.createObjectURL(file[0]) : currentCertification?.certURL || '',
    };

    if (currentCertification) {
      // Update existing certification
      setCertifications(
        certifications.map((cert) =>
          cert.certificationID === currentCertification.certificationID ? newCertification : cert
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
    setFile([]); // Reset file after saving
  };

  // Handle dialog close
  const handleDialogClose = () => {
    setOpenDialog(false);
    setFile([]); // Reset file when dialog is closed without saving
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
        style={{ backgroundColor: '#B45309', color: '#FFFFFF' }}
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
                  <a href={cert.certURL} target="_blank" rel="noopener noreferrer" style={{ color: '#B45309', textDecoration: 'none' }}>
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
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle style={{ fontFamily: 'Poppins, sans-serif', color: '#1E293B' }}>
          {editMode ? 'Edit Certification' : 'Add Certification'}
        </DialogTitle>
        <DialogContent>
          <form id="certification-form" onSubmit={handleSave}>
            <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
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
              <div>
                <label className="block font-semibold mb-1">Certification File</label>
                <ImageUploader value={file} onChange={setFile} />
              </div>
            </Box>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} style={{ color: '#64748B' }}>
            Cancel
          </Button>
          <Button type="submit" form="certification-form" variant="contained" style={{ backgroundColor: '#B45309', color: '#FFFFFF' }}>
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