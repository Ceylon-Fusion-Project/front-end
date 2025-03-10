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
import { RoomForm } from "./RoomForm";


export enum RoomType {
    SINGLE = "SINGLE",
    DOUBLE = "DOUBLE",
    SUITE = "SUITE",
    DELUXE = "DELUXE",
  }

// Define the Room type
export interface Room {
  roomId: number;
  roomCode: string;
  roomNumber: number;
  roomType: RoomType;
  roomImageURLs: string[];
  beds: number;
  pricePerNight: number;
  createdAt?: string;
  updatedAt?: string;
  accommodationId: number;
}

// Mock data for rooms
export const mockData: Room[] = [
  {
    roomId: 1,
    roomCode: "RM001",
    roomNumber: 101,
    roomType: RoomType.SINGLE,
    roomImageURLs: ["https://example.com/room1.jpg"],
    beds: 1,
    pricePerNight: 100.0,
    // isAvailable: true,
    createdAt: "2024-01-01T00:00:00",
    updatedAt: "2024-01-01T00:00:00",
    accommodationId: 1,
  },
  {
    roomId: 2,
    roomCode: "RM002",
    roomNumber: 102,
    roomType: RoomType.DOUBLE,
    roomImageURLs: ["https://example.com/room2.jpg"],
    beds: 2,
    pricePerNight: 150.0,
    // isAvailable: true,
    createdAt: "2024-01-01T00:00:00",
    updatedAt: "2024-01-01T00:00:00",
    accommodationId: 2,
  },
];

// Define a type for form input data (for new rooms, roomId is optional)
type RoomInput = Omit<Room, "roomId" | "createdAt" | "updatedAt"> & {
  roomId?: number;
  createdAt?: string;
  updatedAt?: string;
};

const RoomManagement = () => {
  const [rooms, setRooms] = useState<Room[]>(mockData);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>("success");
  const [showRoomForm, setShowRoomForm] = useState<boolean>(false);

  // Handle add room button click
  const handleAddClick = () => {
    setEditMode(false);
    setCurrentRoom(null);
    setShowRoomForm(true); // Show RoomForm instead of table
  };

  // Handle edit room button click
  const handleEditClick = (room: Room) => {
    setEditMode(true);
    setCurrentRoom(room);
    setShowRoomForm(true);
  };

  // Handle delete room
  const handleDeleteClick = (id: number) => {
    setRooms(rooms.filter((room) => room.roomId !== id));
    setSnackbarMessage("Room deleted successfully!");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  // Handle form submission: Ensure that the new room has a valid roomId, createdAt, and updatedAt.
  const handleSave = (roomData: RoomInput) => {
    const newRoom: Room = {
      ...roomData,
      roomId:
        roomData.roomId !== undefined
          ? roomData.roomId
          : rooms.length > 0
          ? Math.max(...rooms.map((r) => r.roomId)) + 1
          : 1,
      createdAt: roomData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (editMode && currentRoom) {
      // Update existing room
      setRooms(
        rooms.map((room) =>
          room.roomId === currentRoom.roomId ? newRoom : room
        )
      );
      setSnackbarMessage("Room updated successfully!");
    } else {
      // Add new room
      setRooms([...rooms, newRoom]);
      setSnackbarMessage("Room added successfully!");
    }

    setSnackbarSeverity("success");
    setSnackbarOpen(true);
    setShowRoomForm(false); // Return to room table after saving
  };

  // Handle cancel action (return to table)
  const handleCancel = () => {
    setShowRoomForm(false);
  };

  // Handle snackbar close
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
        Room Management
      </Typography>

      {showRoomForm ? (
        // Render RoomForm instead of table
        <RoomForm room={currentRoom} onSave={handleSave} onCancel={handleCancel} />
      ) : (
        <>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleAddClick}
            style={{ backgroundColor: "#B45309", color: "#FFFFFF" }}
          >
            Add Room
          </Button>

          {/* Rooms Table */}
          <TableContainer
            component={Paper}
            style={{ marginTop: "1.5rem", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}
          >
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: "#F8FAFC" }}>
                  <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>Room Code</TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>Room Number</TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>Room Type</TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>Beds</TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>Price/Night</TableCell>
                  {/* <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>Availability</TableCell> */}
                  <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rooms.map((room) => (
                  <TableRow key={room.roomId}>
                    <TableCell>{room.roomCode}</TableCell>
                    <TableCell>{room.roomNumber}</TableCell>
                    <TableCell>{room.roomType}</TableCell>
                    <TableCell>{room.beds}</TableCell>
                    <TableCell>${room.pricePerNight.toFixed(2)}</TableCell>
                    {/* <TableCell>{room.isAvailable ? "Available" : "Not Available"}</TableCell> */}
                    <TableCell>
                      <IconButton color="primary" onClick={() => handleEditClick(room)}>
                        <Edit style={{ color: "#291e10" }} />
                      </IconButton>
                      <IconButton color="secondary" onClick={() => handleDeleteClick(room.roomId)}>
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

      {/* Snackbar for notifications */}
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default RoomManagement;