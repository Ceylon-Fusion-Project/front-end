import { useEffect, useState, SyntheticEvent } from "react";
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
import { v4 as uuidv4 } from "uuid";
import {
  RoomForm,
  FormValues,
} from "@/components/AdminComponents/BookingComponents/RoomForm";
import {
  deleteRoom,
  saveRoom,
  updateRoom,
  getAllRooms,
} from "@/services/Booking-Service/roomService"; // use real service
//import { Room, RoomType } from "./RoomManagement";
import { LocalRoomType } from "@/components/AdminComponents/BookingComponents/RoomForm";

export enum RoomType {
  FAMILY = "FAMILY",
  STANDARD = "STANDARD",
  DELUXE = "DELUXE",
}

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

// Bridge function to convert a parent Room to form values.
// This uses a simple cast for the enum.
function toFormValues(parentRoom: Room): FormValues {
  return {
    roomCode: parentRoom.roomCode,
    roomNumber: parentRoom.roomNumber,
    // Cast parent's RoomType to the local enum:
    roomType:
    parentRoom.roomType as unknown as (typeof LocalRoomType)[keyof typeof LocalRoomType],
    roomImageURLs: parentRoom.roomImageURLs,
    beds: parentRoom.beds,
    pricePerNight: parentRoom.pricePerNight,
    accommodationId: parentRoom.accommodationId,
    isAvailable: true, // or adjust as needed
  };
}

// Bridge function to convert form values back to the parent's Room type.
function fromFormValues(localValues: FormValues, existingId?: number): Room {
  return {
    roomId: existingId || 0, // if 0 then it's a new room
    roomCode: localValues.roomCode,
    roomNumber: localValues.roomNumber,
    roomType: localValues.roomType as unknown as RoomType,
    roomImageURLs: localValues.roomImageURLs,
    beds: localValues.beds,
    pricePerNight: localValues.pricePerNight,
    createdAt: undefined,
    updatedAt: undefined,
    accommodationId: localValues.accommodationId,
  };
}

export const mockData: Room[] = [
  {
    roomId: 1,
    roomCode: "RM001",
    roomNumber: 101,
    roomType: RoomType.FAMILY,
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
    roomType: RoomType.FAMILY,
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
    roomType: RoomType.DELUXE,
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
    roomType: RoomType.STANDARD,
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
    roomType: RoomType.FAMILY,
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
    roomType: RoomType.DELUXE,
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
    roomType: RoomType.FAMILY,
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
    roomType: RoomType.STANDARD,
    roomImageURLs: ["https://example.com/room9.jpg"],
    beds: 1,
    pricePerNight: 100.0,
    createdAt: "2024-01-01T00:00:00",
    updatedAt: "2024-01-01T00:00:00",
    accommodationId: 4,
  },
];

// type RoomInput = Omit<Room, "roomId" | "createdAt" | "updatedAt"> & {
//   roomId?: number;
//   createdAt?: string;
//   updatedAt?: string;
// };

const RoomManagement = () => {
  const [rooms, setRooms] = useState<Room[]>(mockData);
  const [_editMode, setEditMode] = useState<boolean>(false);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<AlertColor>("success");
  const [showRoomForm, setShowRoomForm] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentFormValues, setCurrentFormValues] = useState<FormValues | null>(
    null
  );

  const rowsPerPage = 5;

  const pageCount = Math.ceil(rooms.length / rowsPerPage);

  const fetchRooms = async () => {
    try {
      const response = await getAllRooms();
      console.log("Fetched rooms:", response);
      setRooms(response.data.roomGetResponseDTOS || []);
    } catch (error) {
      console.error(error);
      setSnackbarMessage("Failed to load rooms");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // const handleAddClick = () => {
  //   setEditMode(false);
  //   setCurrentRoom(null);
  //   setShowRoomForm(true);
  // };
  const handleAddClick = () => {
    setCurrentFormValues(null);
    setShowRoomForm(true);
  };

  // const handleEditClick = (room: Room) => {
  //   setEditMode(true);
  //   setCurrentRoom(room);
  //   setShowRoomForm(true);
  // };
  const handleEditClick = (parentRoom: Room) => {
    const localValues = toFormValues(parentRoom);
    // Optionally attach roomId to form values
    // setCurrentFormValues({ ...localValues, roomId: parentRoom.roomId });
    setCurrentFormValues({ ...localValues, roomId: parentRoom.roomId } as FormValues & { roomId?: number });
    setShowRoomForm(true);
  };

  // const handleDeleteClick = (id: number) => {
  //   setRooms(rooms.filter((room) => room.roomId !== id));
  //   setSnackbarMessage("Room deleted successfully!");
  //   setSnackbarSeverity("success");
  //   setSnackbarOpen(true);
  // };
  const handleDelete = async (id: number) => {
    const idempotencyKey = uuidv4();
    try {
      await deleteRoom(id, idempotencyKey);
      setSnackbarMessage("Room deleted successfully!");
      setSnackbarSeverity("success");
      fetchRooms();
    } catch (error) {
      console.error(error);
      setSnackbarMessage("Failed to delete room");
      setSnackbarSeverity("error");
    } finally {
      setSnackbarOpen(true);
    }
  };

  // const handleSave = (roomData: RoomInput) => {
  //   const newRoom: Room = {
  //     ...roomData,
  //     roomId:
  //       roomData.roomId !== undefined
  //         ? roomData.roomId
  //         : rooms.length > 0
  //         ? Math.max(...rooms.map((r) => r.roomId)) + 1
  //         : 1,
  //     createdAt: roomData.createdAt || new Date().toISOString(),
  //     updatedAt: new Date().toISOString(),
  //   };

  //   if (editMode && currentRoom) {
  //     setRooms(
  //       rooms.map((room) =>
  //         room.roomId === currentRoom.roomId ? newRoom : room
  //       )
  //     );
  //     setSnackbarMessage("Room updated successfully!");
  //   } else {
  //     setRooms([...rooms, newRoom]);
  //     setSnackbarMessage("Room added successfully!");
  //   }

  //   setSnackbarSeverity("success");
  //   setSnackbarOpen(true);
  //   setShowRoomForm(false);
  // };
  // const handleSave = async (data: FormValues & { roomId?: number }) => {
  //   const idempotencyKey = uuidv4();
  //   try {
  //     if (data.roomId) {
  //       await updateRoom(data.roomId, data, idempotencyKey);
  //       setSnackbarMessage("Room updated successfully!");
  //     } else {
  //       await saveRoom(data, idempotencyKey);
  //       setSnackbarMessage("Room saved successfully!");
  //     }
  //     setSnackbarSeverity("success");
  //     fetchRooms();
  //     setShowRoomForm(false);
  //   } catch (error) {
  //     console.error(error);
  //     setSnackbarMessage("Failed to save room");
  //     setSnackbarSeverity("error");
  //   } finally {
  //     setSnackbarOpen(true);
  //   }
  // };

  // const handleSave = async (data: FormValues & { roomId?: number }) => {
  //   console.log("📦 Room saving payload:", data); // <-- ADD THIS
  //   const idempotencyKey = uuidv4();
  //   try {
  //     if (data.roomId) {
  //       await updateRoom(data.roomId, data, idempotencyKey);
  //       setSnackbarMessage("Room updated successfully!");
  //     } else {
  //       await saveRoom(data, idempotencyKey);
  //       setSnackbarMessage("Room saved successfully!");
  //     }
  //     setSnackbarSeverity("success");
  //     fetchRooms();
  //     setShowRoomForm(false);
  //   } catch (error) {
  //     console.error("❌ Save/Update Error:", error);
  //     setSnackbarMessage("Failed to save room");
  //     setSnackbarSeverity("error");
  //   } finally {
  //     setSnackbarOpen(true);
  //   }
  // };
  const handleSave = async (data: FormValues & { roomId?: number }) => {
    console.log("📦 Room saving payload:", data);
    const idempotencyKey = uuidv4();
    const payload = {
      ...fromFormValues(data, data.roomId),
      isAvailable: data.isAvailable ?? true,   // ← here!
    };
    try {
      //const parentRoom = fromFormValues(data, data.roomId);
      if (data.roomId) {
        await updateRoom(payload.roomId, payload, idempotencyKey);
        setSnackbarMessage("Room updated successfully!");
      } else {
        await saveRoom(payload, idempotencyKey);
        setSnackbarMessage("Room saved successfully!");
      }
      setSnackbarSeverity("success");
      fetchRooms();
      setShowRoomForm(false);
    } catch (error) {
      console.error("❌ Save/Update Error:", error);
      setSnackbarMessage("Failed to save room");
      setSnackbarSeverity("error");
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleCancel = () => {
    setShowRoomForm(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

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

      {/* {showRoomForm ? (
        <RoomForm 
          room={currentRoom} 
          onSave={handleSave} 
          onCancel={handleCancel} 
        /> */}
      {showRoomForm ? (
        <RoomForm
          room={currentFormValues} // currentFormValues now holds form values
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
            Add Room
          </Button>

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
                    Room Code
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>
                    Room Number
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>
                    Room Type
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>
                    Beds
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>
                    Price/Night
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>
                    Actions
                  </TableCell>
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
                      <IconButton
                        color="primary"
                        onClick={() => handleEditClick(room)}
                      >
                        <Edit style={{ color: "#291e10" }} />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => handleDelete(room.roomId)}
                      >
                        <Delete style={{ color: "#EF4444" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

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

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default RoomManagement;
