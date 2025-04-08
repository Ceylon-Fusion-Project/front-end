import { useState, lazy, Suspense, useRef, useEffect } from "react";
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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
  Grid,
  Box,
  InputAdornment,
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  Visibility,
  Place,
  Close,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Accommodation } from "../../../types/accommodation";
import {
  saveAccommodation,
  updateAccommodation,
  deleteAccommodation,
  //getAccommodationsByFilter,
  //getAccommodationById,
  getAllAccommodations,
} from "@/services/Booking-Service/accommodationService";
import { v4 as uuidv4 } from "uuid";
//import LoadingOverlay from "@/components/LoadingOverlay";
import NotificationService from "@/utils/NotificationService";

const MapWithNoSSR = lazy(() => import("../Map"));

export const mockData: Accommodation[] = [
  {
    accommodationId: 1,
    accommodationCode: "ACC002",
    accommodationName: "Cinnamon Shore Resort",
    accommodationType: "Resort",
    accommodationDescription:
      "A luxurious beachfront resort with stunning Gulf Coast views.",
    location: "Port Aransas, Texas",
    accommodationMapLink: "https://www.openstreetmap.org/#map=15/27.8333/-97.0611",
    accDemoVideoLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    isAvailable: true,
    rooms: [
      {
        roomId: 1,
        roomCode: "R101",
        roomNumber: "101",
        roomType: "Deluxe",
        beds: 2,
        pricePerNight: 200,
      },
      {
        roomId: 2,
        roomCode: "R102",
        roomNumber: "102",
        roomType: "Suite",
        beds: 3,
        pricePerNight: 350,
      },
    ],
  },
  // ... (rest of your mock data)
];

const AccommodationManagement = () => {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentAccommodation, setCurrentAccommodation] =
    useState<Accommodation | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, _setSnackbarMessage] = useState("");
  const [snackbarSeverity, _setSnackbarSeverity] =
    useState<AlertColor>("success");
  const [currentPage, setCurrentPage] = useState(0);
  const [mapDialogOpen, setMapDialogOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [loading, setLoading] = useState(false); // For LoadingOverlay
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [accommodationToDelete, setAccommodationToDelete] =
    useState<Accommodation | null>(null);
  const idempotencyKeyRef = useRef<string | null>(null);
  const rowsPerPage = 7;
  const navigate = useNavigate();

  const pageCount = Math.ceil(totalItems / rowsPerPage);

  const handleAddClick = () => {
    setEditMode(false);
    setCurrentAccommodation(null);
    setSelectedLocation("");
    idempotencyKeyRef.current = uuidv4(); 
    setOpenDialog(true);
  };

  useEffect(() => {
    if (!openDialog) {
      idempotencyKeyRef.current = null;
    }
  }, [openDialog]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getAllAccommodations(currentPage, rowsPerPage);
      // The backend response structure is:
      // response.data.data = { accommodationGetResponseDTOS: [...], total: 1 }
      console.log("Fetched accommodations:", response?.data?.data);

      // Map backend field `accommodationMapLink` to frontend `locationMapLink`
      const accommodations = (
        response?.data?.data?.accommodationGetResponseDTOS || []
      ).map((item: any) => ({
        ...item,
        locationMapLink: item.accommodationMapLink,
        accommodationDescription: item.description,
      }));
      const total = response?.data?.data?.total || 0;
      setAccommodations(accommodations);
      setTotalItems(total);
    } catch (error) {
      console.error("Failed to fetch accommodations:", error);
      NotificationService.error("Failed to load accommodations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  // ✅ ADD THIS BELOW
  useEffect(() => {
    if (openDialog && editMode && currentAccommodation?.accommodationMapLink) {
      setSelectedLocation(currentAccommodation.accommodationMapLink);
    }
  }, [openDialog, editMode, currentAccommodation]);

  const handleEditClick = (accommodation: Accommodation) => {
    setEditMode(true);
    setCurrentAccommodation(accommodation);
    setSelectedLocation(accommodation.accommodationMapLink);
    idempotencyKeyRef.current = uuidv4();
    setOpenDialog(true);
  };

  const confirmDelete = (accommodation: Accommodation) => {
    setAccommodationToDelete(accommodation);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!accommodationToDelete) return;

    setLoading(true);
    const idempotencyKey = uuidv4();

    try {
      await deleteAccommodation(
        accommodationToDelete.accommodationId,
        idempotencyKey
      );
      setAccommodations((prev) =>
        prev.filter(
          (acc) => acc.accommodationId !== accommodationToDelete.accommodationId
        )
      );
      NotificationService.success("Accommodation deleted successfully!");
      await fetchData(); // refetch accommodations
    } catch (err) {
      NotificationService.error("Failed to delete accommodation.");
      console.error("Delete error:", err);
    } finally {
      setLoading(false);
      setDeleteDialogOpen(false);
      setAccommodationToDelete(null);
    }
  };

  const handleMapSelection = (lat: number, lng: number) => {
    const url = `https://www.openstreetmap.org/#map=15/${lat.toFixed(4)}/${lng.toFixed(4)}`;
    setSelectedLocation(url);
  };

  const parseMapLink = (link: string) => {
    if (!link) return undefined;
    const parts = link.split("/");
    const lat = parseFloat(parts[parts.length - 2]);
    const lng = parseFloat(parts[parts.length - 1]);
    return { lat, lng };
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
  
    const usedKey = idempotencyKeyRef.current ?? uuidv4(); // Use existing or fallback
  
    const formData = new FormData(event.currentTarget);
  
    const newAccommodation: Accommodation = {
      accommodationId: currentAccommodation?.accommodationId || 0,
      accommodationCode: String(formData.get("accommodationCode")),
      accommodationName: String(formData.get("accommodationName")),
      accommodationType: String(formData.get("accommodationType")),
      accommodationDescription: String(formData.get("accommodationDescription")),
      location: String(formData.get("location")),
      accommodationMapLink:
        selectedLocation || String(formData.get("locationMapLink")),
      accDemoVideoLink: String(formData.get("accDemoVideoLink")),
      isAvailable: true,
      rooms: currentAccommodation?.rooms || [],
    };
  
    try {
      if (editMode) {
        await updateAccommodation(newAccommodation.accommodationId, newAccommodation, usedKey);
        NotificationService.success("Accommodation updated successfully!");
      } else {
        await saveAccommodation(newAccommodation, usedKey);
        NotificationService.success("Accommodation added successfully!");
      }
  
      setOpenDialog(false);
      setSelectedLocation("");
      idempotencyKeyRef.current = null;
      await fetchData();
    } catch (error) {
      NotificationService.error("Operation failed. Please try again.");
      console.error("Accommodation save/update error:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const paginatedData = accommodations || [];

  const handleViewRooms = (accommodationId: number) => {
    navigate(`/admin/accommodation-management/rooms/${accommodationId}`);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, px: { xs: 2, sm: 4 } }}>
      <Typography
        variant="h4"
        gutterBottom
        style={{ fontFamily: "Poppins, sans-serif", color: "#1E293B" }}
      >
        Accommodation Management
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={handleAddClick}
        style={{ backgroundColor: "#B45309", color: "#FFFFFF" }}
      >
        Add Accommodation
      </Button>
      <Box sx={{ width: "100%", overflowX: "auto" }}>
        <TableContainer
          component={Paper}
          style={{
            marginTop: "1.5rem",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#F8FAFC" }}>
                <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>
                  Accommodation Code
                </TableCell>
                <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>
                  Accommodation Name
                </TableCell>
                <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>
                  Accommodation Type
                </TableCell>
                <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>
                  Location
                </TableCell>
                <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>
                  Rooms
                </TableCell>
                <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Typography variant="body2" color="textSecondary">
                      Loading accommodations...
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : paginatedData.length > 0 ? (
                paginatedData.map((accommodation) => (
                  <TableRow key={accommodation.accommodationId}>
                    <TableCell>{accommodation.accommodationCode}</TableCell>
                    <TableCell>{accommodation.accommodationName}</TableCell>
                    <TableCell>{accommodation.accommodationType}</TableCell>
                    <TableCell
                      sx={{
                        whiteSpace: "nowrap",
                        maxWidth: 200,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {accommodation.location}
                    </TableCell>
                    <TableCell>
                      <span
                        style={{
                          cursor: "pointer",
                          color: "#B45309",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                        onClick={() =>
                          handleViewRooms(accommodation.accommodationId)
                        }
                      >
                        <Visibility fontSize="small" /> View Rooms
                      </span>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleEditClick(accommodation)}
                      >
                        <Edit style={{ color: "#291e10" }} />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => confirmDelete(accommodation)}
                      >
                        <Delete style={{ color: "#EF4444" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No accommodations found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Pagination
        count={pageCount}
        page={currentPage + 1}
        onChange={(_, newPage) => setCurrentPage(newPage - 1)}
        color="primary"
        sx={{
          mt: 3,
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          "& .MuiPaginationItem-root.Mui-selected": {
            backgroundColor: "#A0522D",
            color: "white",
          },
        }}
      />

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle
          style={{ fontFamily: "Poppins, sans-serif", color: "#1E293B" }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">
              {editMode ? "Edit Accommodation" : "Add Accommodation"}
            </Typography>
            <IconButton onClick={() => setOpenDialog(false)}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <form id="accommodation-form" onSubmit={handleSave}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Accommodation Code"
                  name="accommodationCode"
                  fullWidth
                  margin="normal"
                  defaultValue={currentAccommodation?.accommodationCode}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Accommodation Name"
                  name="accommodationName"
                  fullWidth
                  margin="normal"
                  defaultValue={currentAccommodation?.accommodationName}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Accommodation Type</InputLabel>
                  <Select
                    label="Accommodation Type"
                    name="accommodationType"
                    defaultValue={currentAccommodation?.accommodationType || ""}
                    required
                  >
                    <MenuItem value="HOTEL">Hotel</MenuItem>
                    <MenuItem value="RESORT">Resort</MenuItem>
                    <MenuItem value="VILLA">Villa</MenuItem>
                    <MenuItem value="GUESTHOUSE">Guest House</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Location"
                  name="location"
                  fullWidth
                  margin="normal"
                  defaultValue={currentAccommodation?.location}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Location Map Link"
                  name="accommodationMapLink"
                  fullWidth
                  margin="normal"
                  value={
                    selectedLocation ||
                    currentAccommodation?.accommodationMapLink ||
                    ""
                  }
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setMapDialogOpen(true)}
                          edge="end"
                          sx={{ color: "#B45309" }}
                        >
                          <Place />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Demo Video Link"
                  name="accDemoVideoLink"
                  fullWidth
                  margin="normal"
                  defaultValue={currentAccommodation?.accDemoVideoLink || ""}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  name="accommodationDescription"
                  fullWidth
                  margin="normal"
                  defaultValue={currentAccommodation?.accommodationDescription}
                  required
                  multiline
                  rows={4}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDialog(false)}
            style={{ color: "#64748B" }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="accommodation-form"
            variant="contained"
            style={{ backgroundColor: "#B45309", color: "#FFFFFF" }}
            disabled={loading} 
          >
            {editMode ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={mapDialogOpen}
        onClose={() => setMapDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle
          sx={{
            fontFamily: "Poppins, sans-serif",
            color: "#1E293B",
            paddingBottom: "8px",
          }}
        >
          <Box display="flex" alignItems="center">
            <Place
              sx={{
                color: "#B45309",
                marginRight: "8px",
              }}
            />
            <Typography variant="h6">Accommodation Location</Typography>
          </Box>
          <Typography variant="body2" color="textSecondary">
            Drag the place marker to select location
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ height: "500px", mt: 1 }}>
            <Suspense
              fallback={
                <div style={{ textAlign: "center", paddingTop: "200px" }}>
                  Loading map...
                </div>
              }
            >
              <MapWithNoSSR
                onLocationSelect={handleMapSelection}
                initialLocation={
                  selectedLocation
                    ? parseMapLink(selectedLocation)
                    : currentAccommodation?.accommodationMapLink
                      ? parseMapLink(currentAccommodation.accommodationMapLink)
                      : undefined
                }
                markerColor="#B45309"
              />
            </Suspense>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setMapDialogOpen(false)}
            sx={{
              color: "#64748B",
              "&:hover": {
                backgroundColor: "#F1F5F9",
              },
            }}
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this accommodation?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
          >
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AccommodationManagement;
