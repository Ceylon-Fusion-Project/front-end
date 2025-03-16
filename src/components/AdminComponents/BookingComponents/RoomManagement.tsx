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
  Pagination,
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
    createdAt: "2024-01-01T00:00:00",
    updatedAt: "2024-01-01T00:00:00",
    accommodationId: 1,
  },
  {
    roomId: 3,
    roomCode: "RM003",
    roomNumber: 103,
    roomType: RoomType.SUITE,
    roomImageURLs: ["https://example.com/room3.jpg"],
    beds: 3,
    pricePerNight: 200.0,
    createdAt: "2024-01-01T00:00:00",
    updatedAt: "2024-01-01T00:00:00",
    accommodationId: 1,
  },
  {
    roomId: 4,
    roomCode: "RM004",
    roomNumber: 104,
    roomType: RoomType.DELUXE,
    roomImageURLs: ["https://example.com/room4.jpg"],
    beds: 2,
    pricePerNight: 250.0,
    createdAt: "2024-01-01T00:00:00",
    updatedAt: "2024-01-01T00:00:00",
    accommodationId: 2,
  },
  {
    roomId: 5,
    roomCode: "RM005",
    roomNumber: 105,
    roomType: RoomType.SINGLE,
    roomImageURLs: ["https://example.com/room5.jpg"],
    beds: 1,
    pricePerNight: 100.0,
    createdAt: "2024-01-01T00:00:00",
    updatedAt: "2024-01-01T00:00:00",
    accommodationId: 2,
  },
  {
    roomId: 6,
    roomCode: "RM006",
    roomNumber: 106,
    roomType: RoomType.DOUBLE,
    roomImageURLs: ["https://example.com/room6.jpg"],
    beds: 2,
    pricePerNight: 150.0,
    createdAt: "2024-01-01T00:00:00",
    updatedAt: "2024-01-01T00:00:00",
    accommodationId: 3,
  },
  {
    roomId: 7,
    roomCode: "RM007",
    roomNumber: 107,
    roomType: RoomType.SUITE,
    roomImageURLs: ["https://example.com/room7.jpg"],
    beds: 3,
    pricePerNight: 200.0,
    createdAt: "2024-01-01T00:00:00",
    updatedAt: "2024-01-01T00:00:00",
    accommodationId: 3,
  },
  {
    roomId: 8,
    roomCode: "RM008",
    roomNumber: 108,
    roomType: RoomType.DELUXE,
    roomImageURLs: ["https://example.com/room8.jpg"],
    beds: 2,
    pricePerNight: 250.0,
    createdAt: "2024-01-01T00:00:00",
    updatedAt: "2024-01-01T00:00:00",
    accommodationId: 4,
  },
  {
    roomId: 9,
    roomCode: "RM009",
    roomNumber: 109,
    roomType: RoomType.SINGLE,
    roomImageURLs: ["https://example.com/room9.jpg"],
    beds: 1,
    pricePerNight: 100.0,
    createdAt: "2024-01-01T00:00:00",
    updatedAt: "2024-01-01T00:00:00",
    accommodationId: 4,
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
  const [currentPage, setCurrentPage] = useState<number>(1); // Current page for pagination
  const rowsPerPage = 5; // Number of rows per page

  // Calculate the total number of pages
  const pageCount = Math.ceil(rooms.length / rowsPerPage);

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

  // Handle page change for pagination
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  // Get data for the current page
  const paginatedData = rooms.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

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
                  <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.map((room) => (
                  <TableRow key={room.roomId}>
                    <TableCell>{room.roomCode}</TableCell>
                    <TableCell>{room.roomNumber}</TableCell>
                    <TableCell>{room.roomType}</TableCell>
                    <TableCell>{room.beds}</TableCell>
                    <TableCell>${room.pricePerNight.toFixed(2)}</TableCell>
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

          {/* Pagination */}
          <Pagination
            count={pageCount}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            sx={{
              marginTop: "1.5rem",
              display: "flex",
              justifyContent: "center",
              "& .MuiPaginationItem-root.Mui-selected": {
                backgroundColor: "#A0522D",
                color: "white",
              },
            }}
          />
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