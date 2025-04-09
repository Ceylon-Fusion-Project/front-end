// // // import React, { useState } from 'react';
// // // import {
// // //   Container, Typography, Button, Table, TableBody, TableCell,
// // //   TableContainer, TableHead, TableRow, Paper, IconButton, Snackbar,
// // //   Alert, Pagination, Dialog, DialogTitle, DialogContent, TextField,
// // //   Grid, MenuItem, Select, InputLabel, FormControl
// // // } from '@mui/material';
// // // import { Add, Edit, Delete, Visibility } from '@mui/icons-material';

// // // // Interfaces
// // // interface Event {
// // //   eventId: number;
// // //   eventName: string;
// // //   eventDescription: string;
// // //   pricePerEvent: number;
// // //   startTime: string;
// // //   endTime: string;
// // //   experienceId: number;
// // //   eventImageURLs: string[];
// // //   isAvailable: boolean;
// // // }

// // // interface Room {
// // //   roomId: number;
// // //   roomCode: string;
// // //   roomNumber: string;
// // //   roomType: string;
// // //   beds: number;
// // //   pricePerNight: number;
// // //   accommodationId: number;
// // //   roomImageURLs: string[];
// // // }

// // // interface Package {
// // //   packageId: number;
// // //   packageName: string;
// // //   description: string;
// // //   pricePerDay: number;
// // //   isPredefined: boolean;
// // //   packageRatingValue: number;
// // //   createdAt: string;
// // //   updatedAt: string;
// // //   events: Event[];
// // //   rooms: Room[];
// // // }

// // // // Mock Data
// // // const mockRooms: Room[] = [/* same as before */];
// // // const mockEvents: Event[] = [/* same as before */];
// // // const mockPackages: Package[] = [/* same as before */];

// // // const CombinedPackageManagement = () => {
// // //   const [packages, setPackages] = useState<Package[]>(mockPackages);
// // //   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
// // //   const [currentPage, setCurrentPage] = useState(1);
// // //   const [editDialogOpen, setEditDialogOpen] = useState(false);
// // //   const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
// // //   const rowsPerPage = 5;

// // //   const emptyPackage: Package = {
// // //     packageId: 0,
// // //     packageName: '',
// // //     description: '',
// // //     pricePerDay: 0,
// // //     isPredefined: false,
// // //     packageRatingValue: 0,
// // //     createdAt: new Date().toISOString(),
// // //     updatedAt: new Date().toISOString(),
// // //     events: [],
// // //     rooms: [],
// // //   };

// // //   const handleAddClick = () => {
// // //     setSelectedPackage(emptyPackage);
// // //     setEditDialogOpen(true);
// // //   };

// // //   const handleEditClick = (pkg: Package) => {
// // //     setSelectedPackage(pkg);
// // //     setEditDialogOpen(true);
// // //   };

// // //   const handleDeleteClick = (id: number) => {
// // //     setPackages(packages.filter((pkg) => pkg.packageId !== id));
// // //     setSnackbar({ open: true, message: 'Package deleted successfully!', severity: 'success' });
// // //   };

// // //   const handleSavePackage = () => {
// // //     if (!selectedPackage?.packageName || !selectedPackage.description || selectedPackage.pricePerDay <= 0 || selectedPackage.events.length === 0 || selectedPackage.rooms.length === 0) {
// // //       setSnackbar({ open: true, message: 'Please complete all fields', severity: 'error' });
// // //       return;
// // //     }

// // //     if (selectedPackage.packageId === 0) {
// // //       const newPkg = { ...selectedPackage, packageId: packages.length + 1 };
// // //       setPackages([...packages, newPkg]);
// // //       setSnackbar({ open: true, message: 'Package added successfully!', severity: 'success' });
// // //     } else {
// // //       const updatedList = packages.map(p => p.packageId === selectedPackage.packageId ? selectedPackage : p);
// // //       setPackages(updatedList);
// // //       setSnackbar({ open: true, message: 'Package updated successfully!', severity: 'success' });
// // //     }
// // //     setEditDialogOpen(false);
// // //     setSelectedPackage(null);
// // //   };

// // //   const paginatedData = packages.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

// // //   const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });

// // //   return (
// // //     <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
// // //       <Typography variant="h4" gutterBottom>Package Management</Typography>

// // //       <Button variant="contained" startIcon={<Add />} onClick={handleAddClick} style={{ backgroundColor: '#B45309', color: '#fff' }}>
// // //         Add Package
// // //       </Button>

// // //       <TableContainer component={Paper} style={{ marginTop: '1.5rem' }}>
// // //         <Table>
// // //           <TableHead>
// // //             <TableRow>
// // //               <TableCell>Package Name</TableCell>
// // //               <TableCell>Description</TableCell>
// // //               <TableCell>Price</TableCell>
// // //               <TableCell>Rating</TableCell>
// // //               <TableCell>Actions</TableCell>
// // //             </TableRow>
// // //           </TableHead>
// // //           <TableBody>
// // //             {paginatedData.map(pkg => (
// // //               <TableRow key={pkg.packageId}>
// // //                 <TableCell>{pkg.packageName}</TableCell>
// // //                 <TableCell>{pkg.description}</TableCell>
// // //                 <TableCell>${pkg.pricePerDay}</TableCell>
// // //                 <TableCell>{pkg.packageRatingValue}</TableCell>
// // //                 <TableCell>
// // //                   <IconButton onClick={() => handleEditClick(pkg)}><Edit /></IconButton>
// // //                   <IconButton onClick={() => handleDeleteClick(pkg.packageId)}><Delete style={{ color: '#EF4444' }} /></IconButton>
// // //                 </TableCell>
// // //               </TableRow>
// // //             ))}
// // //           </TableBody>
// // //         </Table>
// // //       </TableContainer>

// // //       <Pagination
// // //         count={Math.ceil(packages.length / rowsPerPage)}
// // //         page={currentPage}
// // //         onChange={(_, page) => setCurrentPage(page)}
// // //         sx={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}
// // //       />

// // //       <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="md" fullWidth>
// // //         <DialogTitle>{selectedPackage?.packageId ? 'Edit Package' : 'Add Package'}</DialogTitle>
// // //         <DialogContent>
// // //           <Grid container spacing={2} mt={1}>
// // //             <Grid item xs={12} sm={6}>
// // //               <TextField
// // //                 fullWidth label="Package Name"
// // //                 value={selectedPackage?.packageName || ''}
// // //                 onChange={e => setSelectedPackage({ ...selectedPackage!, packageName: e.target.value })}
// // //               />
// // //             </Grid>
// // //             <Grid item xs={12} sm={6}>
// // //               <TextField
// // //                 fullWidth label="Price Per Day" type="number"
// // //                 value={selectedPackage?.pricePerDay || ''}
// // //                 onChange={e => setSelectedPackage({ ...selectedPackage!, pricePerDay: +e.target.value })}
// // //               />
// // //             </Grid>
// // //             <Grid item xs={12}>
// // //               <TextField
// // //                 fullWidth label="Description" multiline rows={3}
// // //                 value={selectedPackage?.description || ''}
// // //                 onChange={e => setSelectedPackage({ ...selectedPackage!, description: e.target.value })}
// // //               />
// // //             </Grid>
// // //             <Grid item xs={12} sm={6}>
// // //               <FormControl fullWidth>
// // //                 <InputLabel>Select Rooms</InputLabel>
// // //                 <Select
// // //                   multiple
// // //                   value={selectedPackage?.rooms.map(r => r.roomId) || []}
// // //                   onChange={e => {
// // //                     const rooms = mockRooms.filter(r => (e.target.value as number[]).includes(r.roomId));
// // //                     setSelectedPackage({ ...selectedPackage!, rooms });
// // //                   }}
// // //                 >
// // //                   {mockRooms.map(room => (
// // //                     <MenuItem key={room.roomId} value={room.roomId}>{room.roomType} ({room.roomNumber})</MenuItem>
// // //                   ))}
// // //                 </Select>
// // //               </FormControl>
// // //             </Grid>
// // //             <Grid item xs={12} sm={6}>
// // //               <FormControl fullWidth>
// // //                 <InputLabel>Select Events</InputLabel>
// // //                 <Select
// // //                   multiple
// // //                   value={selectedPackage?.events.map(e => e.eventId) || []}
// // //                   onChange={e => {
// // //                     const events = mockEvents.filter(ev => (e.target.value as number[]).includes(ev.eventId));
// // //                     setSelectedPackage({ ...selectedPackage!, events });
// // //                   }}
// // //                 >
// // //                   {mockEvents.map(event => (
// // //                     <MenuItem key={event.eventId} value={event.eventId}>{event.eventName}</MenuItem>
// // //                   ))}
// // //                 </Select>
// // //               </FormControl>
// // //             </Grid>
// // //           </Grid>
// // //           <Button onClick={handleSavePackage} variant="contained" style={{ marginTop: '1rem', backgroundColor: '#B45309', color: '#fff' }}>
// // //             {selectedPackage?.packageId ? 'Update Package' : 'Save Package'}
// // //           </Button>
// // //         </DialogContent>
// // //       </Dialog>

// // //       <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleSnackbarClose}>
// // //         <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>{snackbar.message}</Alert>
// // //       </Snackbar>
// // //     </Container>
// // //   );
// // // };

// // // export default CombinedPackageManagement;

// // import React, { useEffect, useState } from 'react';
// // import {
// //   Container, Typography, Button, Table, TableBody, TableCell,
// //   TableContainer, TableHead, TableRow, Paper, IconButton, Snackbar,
// //   Alert, Pagination, Dialog, DialogTitle, DialogContent, TextField,
// //   Grid, MenuItem, Select, InputLabel, FormControl
// // } from '@mui/material';
// // import { Add, Edit, Delete } from '@mui/icons-material';
// // import api from '@/api/axiosInstance';

// // // Interfaces
// // interface Event {
// //   eventId: number;
// //   eventName: string;
// //   eventDescription: string;
// //   pricePerEvent: number;
// //   startTime: string;
// //   endTime: string;
// //   experienceId: number;
// //   eventImageURLs: string[];
// //   isAvailable: boolean;
// // }

// // interface Room {
// //   roomId: number;
// //   roomCode: string;
// //   roomNumber: string;
// //   roomType: string;
// //   beds: number;
// //   pricePerNight: number;
// //   accommodationId: number;
// //   roomImageURLs: string[];
// // }

// // interface Package {
// //   packageId: number;
// //   packageName: string;
// //   description: string;
// //   pricePerDay: number;
// //   isPredefined: boolean;
// //   packageRatingValue: number;
// //   createdAt: string;
// //   updatedAt: string;
// //   events: Event[];
// //   rooms: Room[];
// // }

// // const CombinedPackageManagement = () => {
// //   const [packages, setPackages] = useState<Package[]>([]);
// //   const [rooms, setRooms] = useState<Room[]>([]);
// //   const [events, setEvents] = useState<Event[]>([]);
// //   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [editDialogOpen, setEditDialogOpen] = useState(false);
// //   const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
// //   const rowsPerPage = 5;

// //   const emptyPackage: Package = {
// //     packageId: 0,
// //     packageName: '',
// //     description: '',
// //     pricePerDay: 0,
// //     isPredefined: false,
// //     packageRatingValue: 0,
// //     createdAt: new Date().toISOString(),
// //     updatedAt: new Date().toISOString(),
// //     events: [],
// //     rooms: [],
// //   };

// //   const fetchPackages = async () => {
// //     const res = await api.get('/packages/get-entire-accommodations');
// //     setPackages(res.data.data);
// //   };

// //   const fetchRooms = async () => {
// //     const res = await api.get('/rooms/get-entire-rooms');
// //     setRooms(res.data.data);
// //   };

// //   const fetchEvents = async () => {
// //     const res = await api.get('/events/get-entire-events');
// //     setEvents(res.data.data);
// //   };

// //   useEffect(() => {
// //     fetchPackages();
// //     fetchRooms();
// //     fetchEvents();
// //   }, []);

// //   const savePackage = async (pkg: Package) => {
// //     await api.post('/packages/save-accommodation', pkg, {
// //       headers: { 'X-Idempotency-Key': crypto.randomUUID() },
// //     });
// //   };

// //   const updatePackage = async (pkg: Package) => {
// //     await api.patch('/packages/update-accommodation-details', pkg, {
// //       params: { id: pkg.packageId },
// //       headers: { 'X-Idempotency-Key': crypto.randomUUID() },
// //     });
// //   };

// //   const deletePackage = async (id: number) => {
// //     await api.delete('/packages/delete-accommodation-by-id', {
// //       params: { id },
// //     });
// //   };

// //   const handleAddClick = () => {
// //     setSelectedPackage(emptyPackage);
// //     setEditDialogOpen(true);
// //   };

// //   const handleEditClick = (pkg: Package) => {
// //     setSelectedPackage(pkg);
// //     setEditDialogOpen(true);
// //   };

// //   const handleDeleteClick = async (id: number) => {
// //     try {
// //       await deletePackage(id);
// //       setSnackbar({ open: true, message: 'Package deleted successfully!', severity: 'success' });
// //       fetchPackages();
// //     } catch (error) {
// //       setSnackbar({ open: true, message: 'Failed to delete package', severity: 'error' });
// //     }
// //   };

// //   const handleSavePackage = async () => {
// //     if (!selectedPackage?.packageName || !selectedPackage.description || selectedPackage.pricePerDay <= 0 || selectedPackage.events.length === 0 || selectedPackage.rooms.length === 0) {
// //       setSnackbar({ open: true, message: 'Please complete all fields', severity: 'error' });
// //       return;
// //     }

// //     try {
// //       if (selectedPackage.packageId === 0) {
// //         await savePackage(selectedPackage);
// //         setSnackbar({ open: true, message: 'Package added successfully!', severity: 'success' });
// //       } else {
// //         await updatePackage(selectedPackage);
// //         setSnackbar({ open: true, message: 'Package updated successfully!', severity: 'success' });
// //       }
// //       fetchPackages();
// //       setEditDialogOpen(false);
// //       setSelectedPackage(null);
// //     } catch (error) {
// //       setSnackbar({ open: true, message: 'Failed to save package', severity: 'error' });
// //     }
// //   };

// //   const paginatedData = packages.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
// //   const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });

// //   return (
// //     <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
// //       <Typography variant="h4" gutterBottom>Package Management</Typography>

// //       <Button variant="contained" startIcon={<Add />} onClick={handleAddClick} style={{ backgroundColor: '#B45309', color: '#fff' }}>
// //         Add Package
// //       </Button>

// //       <TableContainer component={Paper} style={{ marginTop: '1.5rem' }}>
// //         <Table>
// //           <TableHead>
// //             <TableRow>
// //               <TableCell>Package Name</TableCell>
// //               <TableCell>Description</TableCell>
// //               <TableCell>Price</TableCell>
// //               <TableCell>Rating</TableCell>
// //               <TableCell>Actions</TableCell>
// //             </TableRow>
// //           </TableHead>
// //           <TableBody>
// //             {paginatedData.map(pkg => (
// //               <TableRow key={pkg.packageId}>
// //                 <TableCell>{pkg.packageName}</TableCell>
// //                 <TableCell>{pkg.description}</TableCell>
// //                 <TableCell>${pkg.pricePerDay}</TableCell>
// //                 <TableCell>{pkg.packageRatingValue}</TableCell>
// //                 <TableCell>
// //                   <IconButton onClick={() => handleEditClick(pkg)}><Edit /></IconButton>
// //                   <IconButton onClick={() => handleDeleteClick(pkg.packageId)}><Delete style={{ color: '#EF4444' }} /></IconButton>
// //                 </TableCell>
// //               </TableRow>
// //             ))}
// //           </TableBody>
// //         </Table>
// //       </TableContainer>

// //       <Pagination
// //         count={Math.ceil(packages.length / rowsPerPage)}
// //         page={currentPage}
// //         onChange={(_, page) => setCurrentPage(page)}
// //         sx={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}
// //       />

// //       <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="md" fullWidth>
// //         <DialogTitle>{selectedPackage?.packageId ? 'Edit Package' : 'Add Package'}</DialogTitle>
// //         <DialogContent>
// //           <Grid container spacing={2} mt={1}>
// //             <Grid item xs={12} sm={6}>
// //               <TextField
// //                 fullWidth label="Package Name"
// //                 value={selectedPackage?.packageName || ''}
// //                 onChange={e => setSelectedPackage({ ...selectedPackage!, packageName: e.target.value })}
// //               />
// //             </Grid>
// //             <Grid item xs={12} sm={6}>
// //               <TextField
// //                 fullWidth label="Price Per Day" type="number"
// //                 value={selectedPackage?.pricePerDay || ''}
// //                 onChange={e => setSelectedPackage({ ...selectedPackage!, pricePerDay: +e.target.value })}
// //               />
// //             </Grid>
// //             <Grid item xs={12}>
// //               <TextField
// //                 fullWidth label="Description" multiline rows={3}
// //                 value={selectedPackage?.description || ''}
// //                 onChange={e => setSelectedPackage({ ...selectedPackage!, description: e.target.value })}
// //               />
// //             </Grid>
// //             <Grid item xs={12} sm={6}>
// //               <FormControl fullWidth>
// //                 <InputLabel>Select Rooms</InputLabel>
// //                 <Select
// //                   multiple
// //                   value={selectedPackage?.rooms.map(r => r.roomId) || []}
// //                   onChange={e => {
// //                     const selected = e.target.value as number[];
// //                     const selectedRooms = rooms.filter(r => selected.includes(r.roomId));
// //                     setSelectedPackage({ ...selectedPackage!, rooms: selectedRooms });
// //                   }}
// //                 >
// //                   {rooms.map(room => (
// //                     <MenuItem key={room.roomId} value={room.roomId}>{room.roomType} ({room.roomNumber})</MenuItem>
// //                   ))}
// //                 </Select>
// //               </FormControl>
// //             </Grid>
// //             <Grid item xs={12} sm={6}>
// //               <FormControl fullWidth>
// //                 <InputLabel>Select Events</InputLabel>
// //                 <Select
// //                   multiple
// //                   value={selectedPackage?.events.map(e => e.eventId) || []}
// //                   onChange={e => {
// //                     const selected = e.target.value as number[];
// //                     const selectedEvents = events.filter(ev => selected.includes(ev.eventId));
// //                     setSelectedPackage({ ...selectedPackage!, events: selectedEvents });
// //                   }}
// //                 >
// //                   {events.map(event => (
// //                     <MenuItem key={event.eventId} value={event.eventId}>{event.eventName}</MenuItem>
// //                   ))}
// //                 </Select>
// //               </FormControl>
// //             </Grid>
// //           </Grid>
// //           <Button onClick={handleSavePackage} variant="contained" style={{ marginTop: '1rem', backgroundColor: '#B45309', color: '#fff' }}>
// //             {selectedPackage?.packageId ? 'Update Package' : 'Save Package'}
// //           </Button>
// //         </DialogContent>
// //       </Dialog>

// //       <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleSnackbarClose}>
// //         <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>{snackbar.message}</Alert>
// //       </Snackbar>
// //     </Container>
// //   );
// // };

// // export default CombinedPackageManagement;

// import React, { useEffect, useState } from 'react';
// import {
//   Container, Typography, Button, Table, TableBody, TableCell,
//   TableContainer, TableHead, TableRow, Paper, IconButton, Snackbar,
//   Alert, Pagination, Dialog, DialogTitle, DialogContent, TextField,
//   Grid, MenuItem, Select, InputLabel, FormControl
// } from '@mui/material';
// import { Add, Edit, Delete } from '@mui/icons-material';
// import api from '@/api/axiosInstance';

// interface Event {
//   eventId: number;
//   eventName: string;
//   eventDescription: string;
//   pricePerEvent: number;
//   startTime: string;
//   endTime: string;
//   experienceId: number;
//   eventImageURLs: string[];
//   isAvailable: boolean;
// }

// interface Room {
//   roomId: number;
//   roomCode: string;
//   roomNumber: string;
//   roomType: string;
//   beds: number;
//   pricePerNight: number;
//   accommodationId: number;
//   roomImageURLs: string[];
// }

// interface Package {
//   packageId: number;
//   packageName: string;
//   description: string;
//   pricePerDay: number;
//   packageRatingValue: number;
//   createdAt: string;
//   updatedAt: string;
//   events: Event[];
//   rooms: Room[];
//   isPredefined: boolean;
// }

// const CombinedPackageManagement = () => {
//   const [packages, setPackages] = useState<Package[]>([]);
//   const [events, setEvents] = useState<Event[]>([]);
//   const [rooms, setRooms] = useState<Room[]>([]);
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
//   const [currentPage, setCurrentPage] = useState(1);
//   const [editDialogOpen, setEditDialogOpen] = useState(false);
//   const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
//   const rowsPerPage = 5;

//   const emptyPackage: Package = {
//     packageId: 0,
//     packageName: '',
//     description: '',
//     pricePerDay: 0,
//     isPredefined: false,
//     packageRatingValue: 0,
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//     events: [],
//     rooms: [],
//   };

//   useEffect(() => {
//     api.get('/events/get-entire-events')
//       .then((res) => {
//         console.log('Events Response:', res.data);
//         setEvents(res.data.data.data || []);
//       })
//       .catch((err) => {
//         console.error('Error fetching events:', err);
//       });
  
//     api.get('/rooms/get-entire-rooms')
//       .then((res) => {
//         console.log('Rooms Response:', res.data);
//         setRooms(res.data.data.data || []);
//       })
//       .catch((err) => {
//         console.error('Error fetching rooms:', err);
//       });
//   }, []);
  
  

//   const handleAddClick = () => {
//     setSelectedPackage(emptyPackage);
//     setEditDialogOpen(true);
//   };

//   const handleEditClick = (pkg: Package) => {
//     setSelectedPackage(pkg);
//     setEditDialogOpen(true);
//   };

//   const handleDeleteClick = async (id: number) => {
//     try {
//       await api.delete('/packages/delete-accommodation-by-id', { params: { id } });
//       setPackages(prev => prev.filter(pkg => pkg.packageId !== id));
//       setSnackbar({ open: true, message: 'Package deleted successfully!', severity: 'success' });
//     } catch {
//       setSnackbar({ open: true, message: 'Failed to delete package', severity: 'error' });
//     }
//   };

//   const handleSavePackage = async () => {
//     if (!selectedPackage?.packageName || !selectedPackage.description || selectedPackage.pricePerDay <= 0 || selectedPackage.events.length === 0 || selectedPackage.rooms.length === 0) {
//       setSnackbar({ open: true, message: 'Please complete all fields', severity: 'error' });
//       return;
//     }

//     try {
//       const idempotencyKey = crypto.randomUUID();
//       if (selectedPackage.packageId === 0) {
//         const res = await api.post('/packages/save-accommodation', selectedPackage, {
//           headers: { 'X-Idempotency-Key': idempotencyKey }
//         });
//         setPackages(prev => [...prev, res.data.data]);
//         setSnackbar({ open: true, message: 'Package added successfully!', severity: 'success' });
//       } else {
//         const res = await api.patch('/packages/update-accommodation-details', selectedPackage, {
//           params: { id: selectedPackage.packageId },
//           headers: { 'X-Idempotency-Key': idempotencyKey }
//         });
//         setPackages(prev => prev.map(p => p.packageId === selectedPackage.packageId ? res.data.data : p));
//         setSnackbar({ open: true, message: 'Package updated successfully!', severity: 'success' });
//       }
//       setEditDialogOpen(false);
//       setSelectedPackage(null);
//     } catch {
//       setSnackbar({ open: true, message: 'Failed to save package', severity: 'error' });
//     }
//   };

//   const paginatedData = packages.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
//   const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4 }}>
//       <Typography variant="h4" gutterBottom>Package Management</Typography>

//       <Button variant="contained" startIcon={<Add />} onClick={handleAddClick} sx={{ backgroundColor: '#B45309', color: 'white' }}>
//         Add Package
//       </Button>

//       <TableContainer component={Paper} sx={{ mt: 3 }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Package Name</TableCell>
//               <TableCell>Description</TableCell>
//               <TableCell>Price</TableCell>
//               <TableCell>Rating</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {paginatedData.map(pkg => (
//               <TableRow key={pkg.packageId}>
//                 <TableCell>{pkg.packageName}</TableCell>
//                 <TableCell>{pkg.description}</TableCell>
//                 <TableCell>${pkg.pricePerDay}</TableCell>
//                 <TableCell>{pkg.packageRatingValue}</TableCell>
//                 <TableCell>
//                   <IconButton onClick={() => handleEditClick(pkg)}><Edit /></IconButton>
//                   <IconButton onClick={() => handleDeleteClick(pkg.packageId)}><Delete sx={{ color: '#EF4444' }} /></IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Pagination
//         count={Math.ceil(packages.length / rowsPerPage)}
//         page={currentPage}
//         onChange={(_, page) => setCurrentPage(page)}
//         sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
//       />

//       <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="md" fullWidth>
//         <DialogTitle>{selectedPackage?.packageId ? 'Edit Package' : 'Add Package'}</DialogTitle>
//         <DialogContent>
//           <Grid container spacing={2} mt={1}>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth label="Package Name"
//                 value={selectedPackage?.packageName || ''}
//                 onChange={e => setSelectedPackage({ ...selectedPackage!, packageName: e.target.value })}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth label="Price Per Day" type="number"
//                 value={selectedPackage?.pricePerDay || ''}
//                 onChange={e => setSelectedPackage({ ...selectedPackage!, pricePerDay: +e.target.value })}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth label="Description" multiline rows={3}
//                 value={selectedPackage?.description || ''}
//                 onChange={e => setSelectedPackage({ ...selectedPackage!, description: e.target.value })}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth>
//                 <InputLabel>Select Rooms</InputLabel>
//                 <Select
//                   multiple
//                   value={selectedPackage?.rooms.map(r => r.roomId) || []}
//                   onChange={e => {
//                     const ids = e.target.value as number[];
//                     const selected = rooms.filter(r => ids.includes(r.roomId));
//                     setSelectedPackage({ ...selectedPackage!, rooms: selected });
//                   }}
//                 >
//                   {rooms.map(room => (
//                     <MenuItem key={room.roomId} value={room.roomId}>
//                       {room.roomType} ({room.roomNumber})
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth>
//                 <InputLabel>Select Events</InputLabel>
//                 <Select
//                   multiple
//                   value={selectedPackage?.events.map(e => e.eventId) || []}
//                   onChange={e => {
//                     const ids = e.target.value as number[];
//                     const selected = events.filter(ev => ids.includes(ev.eventId));
//                     setSelectedPackage({ ...selectedPackage!, events: selected });
//                   }}
//                 >
//                   {events.map(ev => (
//                     <MenuItem key={ev.eventId} value={ev.eventId}>
//                       {ev.eventName}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//           </Grid>
//           <Button onClick={handleSavePackage} variant="contained" sx={{ mt: 2, backgroundColor: '#B45309', color: 'white' }}>
//             {selectedPackage?.packageId ? 'Update Package' : 'Save Package'}
//           </Button>
//         </DialogContent>
//       </Dialog>

//       <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleSnackbarClose}>
//         <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default CombinedPackageManagement;

////////////////////////////////////////////////////////////////

// import React, { useEffect, useState } from 'react';
// import {
//   Container, Typography, Button, Table, TableBody, TableCell,
//   TableContainer, TableHead, TableRow, Paper, IconButton, Snackbar,
//   Alert, Pagination, Dialog, DialogTitle, DialogContent, TextField,
//   Grid, MenuItem, Select, InputLabel, FormControl
// } from '@mui/material';
// import { Add, Edit, Delete } from '@mui/icons-material';
// import api from '@/api/axiosInstance';

// interface Event {
//   eventId: number;
//   eventName: string;
//   eventDescription: string;
//   pricePerEvent: number;
//   startTime: string;
//   endTime: string;
//   experienceId: number;
//   eventImageURLs: string[];
//   isAvailable: boolean;
// }

// interface Room {
//   roomId: number;
//   roomCode: string;
//   roomNumber: string;
//   roomType: string;
//   beds: number;
//   pricePerNight: number;
//   accommodationId: number;
//   roomImageURLs: string[];
// }

// interface Package {
//   packageId: number;
//   packageCode: string;
//   packageName: string;
//   description: string;
//   pricePerDay: number;
//   packageRatingValue: number;
//   createdAt: string;
//   updatedAt: string;
//   events: Event[];
//   rooms: Room[];
//   isPredefined: boolean;
// }

// const CombinedPackageManagement = () => {
//   const [packages, setPackages] = useState<Package[]>([]);
//   const [events, setEvents] = useState<Event[]>([]);
//   const [rooms, setRooms] = useState<Room[]>([]);
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
//   const [currentPage, setCurrentPage] = useState(1);
//   const [editDialogOpen, setEditDialogOpen] = useState(false);
//   const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
//   const rowsPerPage = 5;

//   const emptyPackage: Package = {
//     packageId: 0,
//     packageCode: '',
//     packageName: '',
//     description: '',
//     pricePerDay: 0,
//     isPredefined: false,
//     packageRatingValue: 0,
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//     events: [],
//     rooms: [],
//   };

//   useEffect(() => {
//     api.get('/events/get-entire-events')
//       .then((res) => {
//         console.log('✅ Events response:', res.data);
//         setEvents(res.data.data?.data || []);
//       })
//       .catch((err) => console.error('❌ Error fetching events:', err));
  
//     api.get('/rooms/get-entire-rooms')
//       .then((res) => {
//         console.log('✅ Rooms response:', res.data);
//         setRooms(res.data.data?.data || []);
//       })
//       .catch((err) => console.error('❌ Error fetching rooms:', err));
  
//     api.get('/packages/get-entire-package')
//       .then((res) => {
//         console.log('✅ Packages response:', res.data);
//         setPackages(res.data.data?.data || []);
//       })
//       .catch((err) => console.error('❌ Error fetching packages:', err));
//   }, []);
  
//   const handleAddClick = () => {
//     setSelectedPackage(emptyPackage);
//     setEditDialogOpen(true);
//   };

//   const handleEditClick = (pkg: Package) => {
//     setSelectedPackage(pkg);
//     setEditDialogOpen(true);
//   };

//   const handleDeleteClick = async (id: number) => {
//     try {
//       await api.delete('/packages/delete-accommodation-by-id', { params: { id } });
//       setPackages(prev => prev.filter(pkg => pkg.packageId !== id));
//       setSnackbar({ open: true, message: 'Package deleted successfully!', severity: 'success' });
//     } catch {
//       setSnackbar({ open: true, message: 'Failed to delete package', severity: 'error' });
//     }
//   };

//   const handleSavePackage = async () => {
//     if (
//       !selectedPackage?.packageCode ||
//       !selectedPackage.packageName ||
//       !selectedPackage.description ||
//       selectedPackage.pricePerDay <= 0 ||
//       selectedPackage.events.length === 0 ||
//       selectedPackage.rooms.length === 0
//     ) {
//       setSnackbar({ open: true, message: 'Please complete all fields', severity: 'error' });
//       return;
//     }

//     const payload = {
//       packageCode: selectedPackage.packageCode,
//       packageName: selectedPackage.packageName,
//       description: selectedPackage.description,
//       pricePerDay: selectedPackage.pricePerDay,
//       eventIds: selectedPackage.events.map(e => e.eventId),
//       roomIds: selectedPackage.rooms.map(r => r.roomId),
//       predefined: selectedPackage.isPredefined,
//     };

//     try {
//       const idempotencyKey = crypto.randomUUID();

//       if (selectedPackage.packageId === 0) {
//         const res = await api.post('/packages/save-package', payload, {
//           headers: { 'X-Idempotency-Key': idempotencyKey }
//         });
//         setPackages(prev => [...prev, res.data.data]);
//         setSnackbar({ open: true, message: 'Package added successfully!', severity: 'success' });
//       } else {
//         const res = await api.patch('/packages/update-package-details', payload, {
//           params: { id: selectedPackage.packageId },
//           headers: { 'X-Idempotency-Key': idempotencyKey }
//         });
//         setPackages(prev => prev.map(p => p.packageId === selectedPackage.packageId ? res.data.data : p));
//         setSnackbar({ open: true, message: 'Package updated successfully!', severity: 'success' });
//       }

//       setEditDialogOpen(false);
//       setSelectedPackage(null);
//     } catch {
//       setSnackbar({ open: true, message: 'Failed to save package', severity: 'error' });
//     }
//   };

//   const paginatedData = packages.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
//   const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4 }}>
//       <Typography variant="h4" gutterBottom>Package Management</Typography>

//       <Button variant="contained" startIcon={<Add />} onClick={handleAddClick} sx={{ backgroundColor: '#B45309', color: 'white' }}>
//         Add Package
//       </Button>

//       <TableContainer component={Paper} sx={{ mt: 3 }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Package Name</TableCell>
//               <TableCell>Description</TableCell>
//               <TableCell>Price</TableCell>
//               <TableCell>Rating</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {paginatedData.map(pkg => (
//               <TableRow key={pkg.packageId}>
//                 <TableCell>{pkg.packageName}</TableCell>
//                 <TableCell>{pkg.description}</TableCell>
//                 <TableCell>${pkg.pricePerDay}</TableCell>
//                 <TableCell>{pkg.packageRatingValue}</TableCell>
//                 <TableCell>
//                   <IconButton onClick={() => handleEditClick(pkg)}><Edit /></IconButton>
//                   <IconButton onClick={() => handleDeleteClick(pkg.packageId)}><Delete sx={{ color: '#EF4444' }} /></IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Pagination
//         count={Math.ceil(packages.length / rowsPerPage)}
//         page={currentPage}
//         onChange={(_, page) => setCurrentPage(page)}
//         sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
//       />

//       <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="md" fullWidth>
//         <DialogTitle>{selectedPackage?.packageId ? 'Edit Package' : 'Add Package'}</DialogTitle>
//         <DialogContent>
//           <Grid container spacing={2} mt={1}>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth label="Package Code"
//                 value={selectedPackage?.packageCode || ''}
//                 onChange={e => setSelectedPackage({ ...selectedPackage!, packageCode: e.target.value })}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth label="Package Name"
//                 value={selectedPackage?.packageName || ''}
//                 onChange={e => setSelectedPackage({ ...selectedPackage!, packageName: e.target.value })}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth label="Description" multiline rows={3}
//                 value={selectedPackage?.description || ''}
//                 onChange={e => setSelectedPackage({ ...selectedPackage!, description: e.target.value })}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth label="Price Per Day" type="number"
//                 value={selectedPackage?.pricePerDay || ''}
//                 onChange={e => setSelectedPackage({ ...selectedPackage!, pricePerDay: +e.target.value })}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth>
//                 <InputLabel>Predefined</InputLabel>
//                 <Select
//                   value={selectedPackage?.isPredefined ? 'true' : 'false'}
//                   onChange={e => setSelectedPackage({ ...selectedPackage!, isPredefined: e.target.value === 'true' })}
//                 >
//                   <MenuItem value="true">Yes</MenuItem>
//                   <MenuItem value="false">No</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth>
//                 <InputLabel>Select Rooms</InputLabel>
//                 <Select
//                   multiple
//                   value={selectedPackage?.rooms.map(r => r.roomId) || []}
//                   onChange={e => {
//                     const ids = e.target.value as number[];
//                     const selected = rooms.filter(r => ids.includes(r.roomId));
//                     setSelectedPackage({ ...selectedPackage!, rooms: selected });
//                   }}
//                 >
//                   {rooms.map(room => (
//                     <MenuItem key={room.roomId} value={room.roomId}>
//                       {room.roomType} ({room.roomNumber})
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth>
//                 <InputLabel>Select Events</InputLabel>
//                 <Select
//                   multiple
//                   value={selectedPackage?.events.map(e => e.eventId) || []}
//                   onChange={e => {
//                     const ids = e.target.value as number[];
//                     const selected = events.filter(ev => ids.includes(ev.eventId));
//                     setSelectedPackage({ ...selectedPackage!, events: selected });
//                   }}
//                 >
//                   {events.map(ev => (
//                     <MenuItem key={ev.eventId} value={ev.eventId}>
//                       {ev.eventName}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//           </Grid>
//           <Button onClick={handleSavePackage} variant="contained" sx={{ mt: 2, backgroundColor: '#B45309', color: 'white' }}>
//             {selectedPackage?.packageId ? 'Update Package' : 'Save Package'}
//           </Button>
//         </DialogContent>
//       </Dialog>

//       <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleSnackbarClose}>
//         <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default CombinedPackageManagement;

//working one
// import React, { useEffect, useState } from 'react';
// import {
//   Container, Typography, Button, Table, TableBody, TableCell,
//   TableContainer, TableHead, TableRow, Paper, IconButton, Snackbar,
//   Alert, Pagination, Dialog, DialogTitle, DialogContent, TextField,
//   Grid, MenuItem, Select, InputLabel, FormControl
// } from '@mui/material';
// import { Add, Edit, Delete } from '@mui/icons-material';
// import api from '@/api/axiosInstance';

// interface Event {
//   eventId: number;
//   eventName: string;
//   eventDescription: string;
//   pricePerEvent: number;
//   startTime: string;
//   endTime: string;
//   experienceId: number;
//   eventImageURLs: string[];
//   isAvailable: boolean;
// }

// interface Room {
//   roomId: number;
//   roomCode: string;
//   roomNumber: string;
//   roomType: string;
//   beds: number;
//   pricePerNight: number;
//   accommodationId: number;
//   roomImageURLs: string[];
// }

// interface Package {
//   packageId: number;
//   packageCode: string;
//   packageName: string;
//   description: string;
//   pricePerDay: number;
//   packageRatingValue: number;
//   createdAt: string;
//   updatedAt: string;
//   events: Event[];
//   rooms: Room[];
//   isPredefined: boolean;
// }

// const CombinedPackageManagement = () => {
//   const [packages, setPackages] = useState<Package[]>([]);
//   const [events, setEvents] = useState<Event[]>([]);
//   const [rooms, setRooms] = useState<Room[]>([]);
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
//   const [currentPage, setCurrentPage] = useState(1);
//   const [editDialogOpen, setEditDialogOpen] = useState(false);
//   const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
//   const rowsPerPage = 5;

//   const emptyPackage: Package = {
//     packageId: 0,
//     packageCode: '',
//     packageName: '',
//     description: '',
//     pricePerDay: 0,
//     packageRatingValue: 0,
//     isPredefined: false,
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//     events: [],
//     rooms: [],
//   };

//   const fetchPackages = async () => {
//     try {
//       const res = await api.get('/packages/get-entire-package');
//       const raw = res.data.data?.data || [];

//       const mappedPackages: Package[] = raw.map((p: any, index: number) => ({
//         packageId: p.packageId || index + 1,
//         packageCode: p.packageCode || '',
//         packageName: p.packageName || '',
//         description: p.description || '',
//         pricePerDay: p.price || 0,
//         packageRatingValue: p.packageRatingValue || 0,
//         createdAt: p.createdAt || new Date().toISOString(),
//         updatedAt: p.updatedAt || new Date().toISOString(),
//         isPredefined: p.predefined || false,
//         events: (p.eventIds || []).map((id: number) => events.find(e => e.eventId === id)).filter(Boolean),
//         rooms: (p.roomIds || []).map((id: number) => rooms.find(r => r.roomId === id)).filter(Boolean),
//       }));

//       setPackages(mappedPackages);
//     } catch (error) {
//       console.error('❌ Error fetching packages:', error);
//     }
//   };

//   const fetchInitialData = async () => {
//     try {
//       const [eventRes, roomRes] = await Promise.all([
//         api.get('/events/get-entire-events'),
//         api.get('/rooms/get-entire-rooms')
//       ]);
//       setEvents(eventRes.data.data?.data || []);
//       setRooms(roomRes.data.data?.data || []);
//     } catch (error) {
//       console.error('❌ Error fetching events or rooms:', error);
//     } finally {
//       fetchPackages(); // must come after rooms & events
//     }
//   };

//   useEffect(() => {
//     fetchInitialData();
//   }, []);

//   const handleAddClick = () => {
//     setSelectedPackage(emptyPackage);
//     setEditDialogOpen(true);
//   };

//   const handleEditClick = (pkg: Package) => {
//     setSelectedPackage(pkg);
//     setEditDialogOpen(true);
//   };

//   const handleDeleteClick = async (id: number) => {
//     try {
//       await api.delete('/packages/delete-accommodation-by-id', { params: { id } });
//       setPackages(prev => prev.filter(pkg => pkg.packageId !== id));
//       setSnackbar({ open: true, message: 'Package deleted successfully!', severity: 'success' });
//     } catch {
//       setSnackbar({ open: true, message: 'Failed to delete package', severity: 'error' });
//     }
//   };

//   const handleSavePackage = async () => {
//     if (
//       !selectedPackage?.packageCode ||
//       !selectedPackage.packageName ||
//       !selectedPackage.description ||
//       selectedPackage.pricePerDay <= 0 ||
//       selectedPackage.events.length === 0 ||
//       selectedPackage.rooms.length === 0
//     ) {
//       setSnackbar({ open: true, message: 'Please complete all fields', severity: 'error' });
//       return;
//     }

//     const payload = {
//       packageCode: selectedPackage.packageCode,
//       packageName: selectedPackage.packageName,
//       description: selectedPackage.description,
//       pricePerDay: selectedPackage.pricePerDay,
//       eventIds: selectedPackage.events.map(e => e.eventId),
//       roomIds: selectedPackage.rooms.map(r => r.roomId),
//       predefined: selectedPackage.isPredefined,
//     };

//     try {
//       const idempotencyKey = crypto.randomUUID();

//       if (selectedPackage.packageId === 0) {
//         const res = await api.post('/packages/save-package', payload, {
//           headers: { 'X-Idempotency-Key': idempotencyKey }
//         });
//         setPackages(prev => [...prev, res.data.data]);
//         setSnackbar({ open: true, message: 'Package added successfully!', severity: 'success' });
//       } else {
//         const res = await api.patch('/packages/update-package-details', payload, {
//           params: { id: selectedPackage.packageId },
//           headers: { 'X-Idempotency-Key': idempotencyKey }
//         });
//         setPackages(prev => prev.map(p => p.packageId === selectedPackage.packageId ? res.data.data : p));
//         setSnackbar({ open: true, message: 'Package updated successfully!', severity: 'success' });
//       }

//       setEditDialogOpen(false);
//       setSelectedPackage(null);
//     } catch {
//       setSnackbar({ open: true, message: 'Failed to save package', severity: 'error' });
//     }
//   };

//   const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });
//   const paginatedData = packages.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4 }}>
//       <Typography variant="h4" gutterBottom>Package Management</Typography>

//       <Button variant="contained" startIcon={<Add />} onClick={handleAddClick} sx={{ backgroundColor: '#B45309', color: 'white' }}>
//         Add Package
//       </Button>

//       <TableContainer component={Paper} sx={{ mt: 3 }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Package Name</TableCell>
//               <TableCell>Description</TableCell>
//               <TableCell>Price</TableCell>
//               <TableCell>Rating</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {paginatedData.map(pkg => (
//               <TableRow key={pkg.packageId}>
//                 <TableCell>{pkg.packageName}</TableCell>
//                 <TableCell>{pkg.description}</TableCell>
//                 <TableCell>${pkg.pricePerDay}</TableCell>
//                 <TableCell>{pkg.packageRatingValue}</TableCell>
//                 <TableCell>
//                   <IconButton onClick={() => handleEditClick(pkg)}><Edit /></IconButton>
//                   <IconButton onClick={() => handleDeleteClick(pkg.packageId)}><Delete sx={{ color: '#EF4444' }} /></IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Pagination
//         count={Math.ceil(packages.length / rowsPerPage)}
//         page={currentPage}
//         onChange={(_, page) => setCurrentPage(page)}
//         sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
//       />

//       <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="md" fullWidth>
//         <DialogTitle>{selectedPackage?.packageId ? 'Edit Package' : 'Add Package'}</DialogTitle>
//         <DialogContent>
//           <Grid container spacing={2} mt={1}>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth label="Package Code"
//                 value={selectedPackage?.packageCode || ''}
//                 onChange={e => setSelectedPackage({ ...selectedPackage!, packageCode: e.target.value })}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth label="Package Name"
//                 value={selectedPackage?.packageName || ''}
//                 onChange={e => setSelectedPackage({ ...selectedPackage!, packageName: e.target.value })}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth label="Description" multiline rows={3}
//                 value={selectedPackage?.description || ''}
//                 onChange={e => setSelectedPackage({ ...selectedPackage!, description: e.target.value })}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth label="Price Per Day" type="number"
//                 value={selectedPackage?.pricePerDay || ''}
//                 onChange={e => setSelectedPackage({ ...selectedPackage!, pricePerDay: +e.target.value })}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth>
//                 <InputLabel>Predefined</InputLabel>
//                 <Select
//                   value={selectedPackage?.isPredefined ? 'true' : 'false'}
//                   onChange={e => setSelectedPackage({ ...selectedPackage!, isPredefined: e.target.value === 'true' })}
//                 >
//                   <MenuItem value="true">Yes</MenuItem>
//                   <MenuItem value="false">No</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth>
//                 <InputLabel>Select Rooms</InputLabel>
//                 <Select
//                   multiple
//                   value={selectedPackage?.rooms.map(r => r.roomId) || []}
//                   onChange={e => {
//                     const ids = e.target.value as number[];
//                     const selected = rooms.filter(r => ids.includes(r.roomId));
//                     setSelectedPackage({ ...selectedPackage!, rooms: selected });
//                   }}
//                 >
//                   {rooms.map(room => (
//                     <MenuItem key={room.roomId} value={room.roomId}>
//                       {room.roomType} ({room.roomNumber})
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth>
//                 <InputLabel>Select Events</InputLabel>
//                 <Select
//                   multiple
//                   value={selectedPackage?.events.map(e => e.eventId) || []}
//                   onChange={e => {
//                     const ids = e.target.value as number[];
//                     const selected = events.filter(ev => ids.includes(ev.eventId));
//                     setSelectedPackage({ ...selectedPackage!, events: selected });
//                   }}
//                 >
//                   {events.map(ev => (
//                     <MenuItem key={ev.eventId} value={ev.eventId}>
//                       {ev.eventName}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//           </Grid>
//           <Button onClick={handleSavePackage} variant="contained" sx={{ mt: 2, backgroundColor: '#B45309', color: 'white' }}>
//             {selectedPackage?.packageId ? 'Update Package' : 'Save Package'}
//           </Button>
//         </DialogContent>
//       </Dialog>

//       <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleSnackbarClose}>
//         <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default CombinedPackageManagement;

import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, IconButton, Snackbar,
  Alert, Pagination, Dialog, DialogTitle, DialogContent, TextField,
  Grid, MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import api from '@/api/axiosInstance';

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

interface Package {
  packageId: number;
  packageCode: string;
  packageName: string;
  description: string;
  pricePerDay: number;
  packageRatingValue: number;
  createdAt: string;
  updatedAt: string;
  events: Event[];
  rooms: Room[];
  isPredefined: boolean;
}

const CombinedPackageManagement = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const [currentPage, setCurrentPage] = useState(1);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const rowsPerPage = 5;

  const emptyPackage: Package = {
    packageId: 0,
    packageCode: '',
    packageName: '',
    description: '',
    pricePerDay: 0,
    packageRatingValue: 0,
    isPredefined: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    events: [],
    rooms: [],
  };

  const fetchPackages = async () => {
    try {
      const res = await api.get('/packages/get-entire-package');
      const raw = res.data.data?.data || [];

      const mappedPackages: Package[] = raw.map((p: any, index: number) => ({
        packageId: p.packageId || index + 1,
        packageCode: p.packageCode || '',
        packageName: p.packageName || '',
        description: p.description || '',
        pricePerDay: p.price || 0,
        packageRatingValue: p.packageRatingValue || 0,
        createdAt: p.createdAt || new Date().toISOString(),
        updatedAt: p.updatedAt || new Date().toISOString(),
        isPredefined: p.predefined || false,
        events: (p.eventIds || []).map((id: number) => events.find(e => e.eventId === id)).filter(Boolean),
        rooms: (p.roomIds || []).map((id: number) => rooms.find(r => r.roomId === id)).filter(Boolean),
      }));

      setPackages(mappedPackages);
    } catch (error) {
      console.error('❌ Error fetching packages:', error);
    }
  };

  const fetchInitialData = async () => {
    try {
      const [eventRes, roomRes] = await Promise.all([
        api.get('/events/get-entire-events'),
        api.get('/rooms/get-entire-rooms')
      ]);
      setEvents(eventRes.data.data?.data || []);
      setRooms(roomRes.data.data?.data || []);
    } catch (error) {
      console.error('❌ Error fetching events or rooms:', error);
    } finally {
      fetchPackages(); // must come after rooms & events
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const handleAddClick = () => {
    setSelectedPackage(emptyPackage);
    setEditDialogOpen(true);
  };

  const handleEditClick = (pkg: Package) => {
    setSelectedPackage(pkg);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = async (id: number) => {
    try {
      await api.delete('/packages/delete-package-by-id', { params: { id } });
      setPackages(prev => prev.filter(pkg => pkg.packageId !== id));
      setSnackbar({ open: true, message: 'Package deleted successfully!', severity: 'success' });
    } catch {
      setSnackbar({ open: true, message: 'Failed to delete package', severity: 'error' });
    }
  };

  const handleSavePackage = async () => {
    if (
      !selectedPackage?.packageCode ||
      !selectedPackage.packageName ||
      !selectedPackage.description ||
      selectedPackage.pricePerDay <= 0 ||
      selectedPackage.events.length === 0 ||
      selectedPackage.rooms.length === 0
    ) {
      setSnackbar({ open: true, message: 'Please complete all fields', severity: 'error' });
      return;
    }

    const payload = {
      packageCode: selectedPackage.packageCode,
      packageName: selectedPackage.packageName,
      description: selectedPackage.description,
      pricePerDay: selectedPackage.pricePerDay,
      eventIds: selectedPackage.events.map(e => e.eventId),
      roomIds: selectedPackage.rooms.map(r => r.roomId),
      predefined: selectedPackage.isPredefined,
    };

    try {
      const idempotencyKey = crypto.randomUUID();

      if (selectedPackage.packageId === 0) {
        const res = await api.post('/packages/save-package', payload, {
          headers: { 'X-Idempotency-Key': idempotencyKey }
        });
        setPackages(prev => [...prev, res.data.data]);
        setSnackbar({ open: true, message: 'Package added successfully!', severity: 'success' });
        window.location.reload(); // Refresh the page to reflect changes
      } else {
        const res = await api.patch('/packages/update-package-details', payload, {
          params: { id: selectedPackage.packageId },
          headers: { 'X-Idempotency-Key': idempotencyKey }
        });
        setPackages(prev => prev.map(p => p.packageId === selectedPackage.packageId ? res.data.data : p));
        setSnackbar({ open: true, message: 'Package updated successfully!', severity: 'success' });
      }

      setEditDialogOpen(false);
      setSelectedPackage(null);
    } catch {
      setSnackbar({ open: true, message: 'Failed to save package', severity: 'error' });
    }
  };

  const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });
  const paginatedData = packages.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Package Management</Typography>

      <Button variant="contained" startIcon={<Add />} onClick={handleAddClick} sx={{ backgroundColor: '#B45309', color: 'white' }}>
        Add Package
      </Button>

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Package Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map(pkg => (
              <TableRow key={pkg.packageId}>
                <TableCell>{pkg.packageName}</TableCell>
                <TableCell>{pkg.description}</TableCell>
                <TableCell>${pkg.pricePerDay}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditClick(pkg)}><Edit /></IconButton>
                  <IconButton onClick={() => handleDeleteClick(pkg.packageId)}><Delete sx={{ color: '#EF4444' }} /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={Math.ceil(packages.length / rowsPerPage)}
        page={currentPage}
        onChange={(_, page) => setCurrentPage(page)}
        sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
      />

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>{selectedPackage?.packageId ? 'Edit Package' : 'Add Package'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth label="Package Code"
                value={selectedPackage?.packageCode || ''}
                onChange={e => setSelectedPackage({ ...selectedPackage!, packageCode: e.target.value })}
                disabled={selectedPackage?.packageId !== 0} // Disable if editing
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth label="Package Name"
                value={selectedPackage?.packageName || ''}
                onChange={e => setSelectedPackage({ ...selectedPackage!, packageName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth label="Description" multiline rows={3}
                value={selectedPackage?.description || ''}
                onChange={e => setSelectedPackage({ ...selectedPackage!, description: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth label="Price Per Day" type="number"
                value={selectedPackage?.pricePerDay || ''}
                onChange={e => setSelectedPackage({ ...selectedPackage!, pricePerDay: +e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Predefined</InputLabel>
                <Select
                  value={selectedPackage?.isPredefined ? 'true' : 'false'}
                  onChange={e => setSelectedPackage({ ...selectedPackage!, isPredefined: e.target.value === 'true' })}
                >
                  <MenuItem value="true">Yes</MenuItem>
                  <MenuItem value="false">No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Select Rooms</InputLabel>
                <Select
                  multiple
                  value={selectedPackage?.rooms.map(r => r.roomId) || []}
                  onChange={e => {
                    const ids = e.target.value as number[];
                    const selected = rooms.filter(r => ids.includes(r.roomId));
                    setSelectedPackage({ ...selectedPackage!, rooms: selected });
                  }}
                >
                  {rooms.map(room => (
                    <MenuItem key={room.roomId} value={room.roomId}>
                      {room.roomType} ({room.roomNumber})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Select Events</InputLabel>
                <Select
                  multiple
                  value={selectedPackage?.events.map(e => e.eventId) || []}
                  onChange={e => {
                    const ids = e.target.value as number[];
                    const selected = events.filter(ev => ids.includes(ev.eventId));
                    setSelectedPackage({ ...selectedPackage!, events: selected });
                  }}
                >
                  {events.map(ev => (
                    <MenuItem key={ev.eventId} value={ev.eventId}>
                      {ev.eventName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button onClick={handleSavePackage} variant="contained" sx={{ mt: 2, backgroundColor: '#B45309', color: 'white' }}>
            {selectedPackage?.packageId ? 'Update Package' : 'Save Package'}
          </Button>
        </DialogContent>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CombinedPackageManagement;
