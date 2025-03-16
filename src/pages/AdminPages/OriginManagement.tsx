// OriginManagement.tsx
import { useState } from "react";
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
  AlertColor,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import { OriginForm } from "../../components/AdminComponents/OriginForm";

// Define the Origin type
interface Origin {
  originID?: number;
  stateLocation: string;
  stateMapLink: string;
  partOfPlant: string;
  originDescription: string;
  factoryName: string;
  factoryAddress: string;
  factoryMapLink: string;
  demoVideoLink: string;
  createdDate?: string;
  updatedDate?: string;
  originCode: string;
}

// Mock data for origins
const mockData: Origin[] = [
  {
    originID: 1,
    stateLocation: "Kandy",
    stateMapLink: "https://www.openstreetmap.org/#map=15/7.2906/80.6337",
    partOfPlant: "Bark",
    originDescription: "High-quality cinnamon from Kandy",
    factoryName: "Kandy Cinnamon Factory",
    factoryAddress: "123 Kandy Road, Kandy",
    factoryMapLink: "https://www.openstreetmap.org/#map=15/7.2906/80.6337",
    demoVideoLink: "https://youtube.com/kandy-cinnamon",
    createdDate: "2024-01-01",
    updatedDate: "2024-01-01",
    originCode: "KANDY001",
  },
];

const OriginManagement = () => {
  const [origins, setOrigins] = useState<Origin[]>(mockData);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [currentOrigin, setCurrentOrigin] = useState<Origin | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>("success");
  const [showOriginForm, setShowOriginForm] = useState<boolean>(false);

  const handleAddClick = () => {
    setEditMode(false);
    setCurrentOrigin(null);
    setShowOriginForm(true);
  };

  const handleEditClick = (origin: Origin) => {
    setEditMode(true);
    setCurrentOrigin(origin);
    setShowOriginForm(true);
  };

  const handleDeleteClick = (id: number) => {
    setOrigins(origins.filter((origin) => origin.originID !== id));
    setSnackbarMessage("Origin deleted successfully!");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

// OriginManagement.tsx
const handleSave = (originData: Origin) => {
  const newOrigin: Origin = {
    ...originData,
    originID:
      originData.originID !== undefined
        ? originData.originID
        : origins.length > 0
        ? Math.max(...origins.map((o) => o.originID || 0)) + 1
        : 1,
    createdDate: originData.createdDate || new Date().toISOString().split("T")[0],
    updatedDate: new Date().toISOString().split("T")[0],
  };

  if (editMode && currentOrigin) {
    setOrigins(
      origins.map((origin) =>
        origin.originID === currentOrigin.originID ? newOrigin : origin
      )
    );
    setSnackbarMessage("Origin updated successfully!");
  } else {
    setOrigins([...origins, newOrigin]);
    setSnackbarMessage("Origin added successfully!");
  }

  setSnackbarSeverity("success");
  setSnackbarOpen(true);
  setShowOriginForm(false);
};

  const handleCancel = () => {
    setShowOriginForm(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "2rem" }}>
      <Typography
        variant="h4"
        gutterBottom
        style={{ fontFamily: "Poppins, sans-serif", color: "#1E293B" }}
      >
        Origin Management
      </Typography>

      {showOriginForm ? (
        <OriginForm
          origin={currentOrigin}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleAddClick}
            style={{ backgroundColor: "#B45309", color: "#FFFFFF" }}
          >
            Add Origin
          </Button>

          <TableContainer
            component={Paper}
            style={{ marginTop: "1.5rem", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}
          >
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: "#F8FAFC" }}>
                  <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>State Location</TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>Part of Plant</TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>Factory Name</TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>Origin Code</TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {origins.map((origin) => (
                  <TableRow key={origin.originID}>
                    <TableCell>{origin.stateLocation}</TableCell>
                    <TableCell>{origin.partOfPlant}</TableCell>
                    <TableCell>{origin.factoryName}</TableCell>
                    <TableCell>{origin.originCode}</TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => handleEditClick(origin)}>
                        <Edit style={{ color: "#291e10" }} />
                      </IconButton>
                      <IconButton color="secondary" onClick={() => handleDeleteClick(origin.originID!)}>
                        <Delete style={{ color: "#EF4444" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default OriginManagement;