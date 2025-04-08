import { useState, useEffect } from "react";
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
import { EventForm } from "./EventForm";
import {
  saveEvent,
  updateEvent,
  deleteEvent,
  getAllEvents,
} from "@/services/Booking-Service/eventService";
import { v4 as uuidv4 } from "uuid";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import NotificationService from "@/utils/NotificationService";

// Define the Event type
export interface Event {
  eventId: number;
  eventName: string;
  eventImageURLs: string[];
  eventDescription: string;
  pricePerEvent: number;
  isAvailable: boolean;
  startDateTime: string; // DateTime as string (e.g., "2024-01-01T10:00")
  endDateTime: string; // DateTime as string (e.g., "2024-01-01T12:00")
  experienceId: number;
}

// Mock data for events
export const mockData: Event[] = [
  {
    eventId: 1,
    eventName: "Cinnamon Plantation Tour",
    eventImageURLs: ["https://example.com/cinnamon-plantation.jpg"],
    eventDescription:
      "Explore lush cinnamon plantations and learn about cultivation techniques.",
    pricePerEvent: 25.0,
    isAvailable: true,
    startDateTime: "2024-01-01T09:00",
    endDateTime: "2024-01-01T11:00",
    experienceId: 1,
  },
  {
    eventId: 2,
    eventName: "Cinnamon Bark Peeling Workshop",
    eventImageURLs: ["https://example.com/cinnamon-peeling.jpg"],
    eventDescription:
      "Hands-on experience in peeling cinnamon bark with expert guidance.",
    pricePerEvent: 20.0,
    isAvailable: true,
    startDateTime: "2024-01-02T11:30",
    endDateTime: "2024-01-02T13:00",
    experienceId: 2,
  },
  {
    eventId: 3,
    eventName: "Cinnamon Oil Extraction Demonstration",
    eventImageURLs: ["https://example.com/cinnamon-oil.jpg"],
    eventDescription:
      "Witness the traditional process of extracting pure cinnamon oil.",
    pricePerEvent: 30.0,
    isAvailable: true,
    startDateTime: "2024-01-03T14:00",
    endDateTime: "2024-01-03T15:30",
    experienceId: 3,
  },
  {
    eventId: 4,
    eventName: "Cinnamon Tea Tasting",
    eventImageURLs: ["https://example.com/cinnamon-tea.jpg"],
    eventDescription:
      "Enjoy a variety of cinnamon-infused teas and learn about their benefits.",
    pricePerEvent: 15.0,
    isAvailable: true,
    startDateTime: "2024-01-04T16:00",
    endDateTime: "2024-01-04T17:00",
    experienceId: 4,
  },
  {
    eventId: 5,
    eventName: "Cinnamon-Inspired Cooking Class",
    eventImageURLs: ["https://example.com/cinnamon-cooking.jpg"],
    eventDescription:
      "Learn to cook traditional dishes using cinnamon as a key ingredient.",
    pricePerEvent: 40.0,
    isAvailable: true,
    startDateTime: "2024-01-05T10:00",
    endDateTime: "2024-01-05T12:00",
    experienceId: 5,
  },
  {
    eventId: 6,
    eventName: "Cinnamon Handicrafts Workshop",
    eventImageURLs: ["https://example.com/cinnamon-handicrafts.jpg"],
    eventDescription: "Create unique cinnamon-based handicrafts to take home.",
    pricePerEvent: 35.0,
    isAvailable: true,
    startDateTime: "2024-01-06T13:30",
    endDateTime: "2024-01-06T15:00",
    experienceId: 6,
  },
  {
    eventId: 7,
    eventName: "Cinnamon Farm-to-Table Experience",
    eventImageURLs: ["https://example.com/cinnamon-farm.jpg"],
    eventDescription:
      "Harvest, process, and cook with fresh cinnamon from the farm.",
    pricePerEvent: 50.0,
    isAvailable: true,
    startDateTime: "2024-01-07T09:00",
    endDateTime: "2024-01-07T12:00",
    experienceId: 7,
  },
  {
    eventId: 8,
    eventName: "Cinnamon Spa Therapy",
    eventImageURLs: ["https://example.com/cinnamon-spa.jpg"],
    eventDescription:
      "Relax with a rejuvenating spa treatment using cinnamon-infused oils.",
    pricePerEvent: 60.0,
    isAvailable: true,
    startDateTime: "2024-01-08T14:00",
    endDateTime: "2024-01-08T16:00",
    experienceId: 8,
  },
  {
    eventId: 9,
    eventName: "Cinnamon History & Cultural Talk",
    eventImageURLs: ["https://example.com/cinnamon-history.jpg"],
    eventDescription:
      "Discover the rich history and cultural significance of cinnamon.",
    pricePerEvent: 10.0,
    isAvailable: true,
    startDateTime: "2024-01-09T17:30",
    endDateTime: "2024-01-09T18:30",
    experienceId: 9,
  },
];

// Define a type for form input data (for new events, eventId is optional)
type EventInput = Omit<Event, "eventId"> & {
  eventId?: number;
};

const EventManagement = () => {
  // const [events, setEvents] = useState<Event[]>(mockData);
  // const [editMode, setEditMode] = useState<boolean>(false);
  // const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  // const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  // const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  // const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>("success");
  // const [showEventForm, setShowEventForm] = useState<boolean>(false);

  // // Pagination state
  // const [currentPage, setCurrentPage] = useState(1);
  // const rowsPerPage = 5; // Number of rows per page

  // // Calculate the total number of pages
  // const pageCount = Math.ceil(events.length / rowsPerPage);

  // // Get data for the current page
  // const paginatedData = events.slice(
  //   (currentPage - 1) * rowsPerPage,
  //   currentPage * rowsPerPage
  // );
  const [events, setEvents] = useState<Event[]>([]);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<AlertColor>("success");
  const [showEventForm, setShowEventForm] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<number | null>(null);

  const rowsPerPage = 5;

  const pageCount = Math.ceil(events.length / rowsPerPage);
  const paginatedData = events.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const fetchEvents = async () => {
    try {
      const response = await getAllEvents();
      console.log("FULL EVENT RESPONSE:", response);

      const rawEvents = response?.data?.data?.eventGetResponseDTOS || [];
      console.log("Fetched events:", rawEvents);

      // const transformedEvents: Event[] = rawEvents.map((event: any) => ({
      //   eventId: event.eventId,
      //   eventName: event.eventName,
      //   eventImageURLs: event.eventImageURLs,
      //   eventDescription: event.eventDescription,
      //   pricePerEvent: event.pricePerEvent,
      //   isAvailable: event.available,
      //   experienceId: event.experienceId,
      //   startDateTime: `2025-01-01T${event.startTime}`,
      //   endDateTime: `2025-01-01T${event.endTime}`,
      // }));
      const transformedEvents: Event[] = rawEvents.map((event: any) => ({
        eventId: event.eventId,
        eventName: event.eventName,
        eventImageURLs: event.eventImageURLs,
        eventDescription: event.eventDescription,
        pricePerEvent: event.pricePerEvent,
        isAvailable: event.available,
        experienceId: event.experienceId,
        startDateTime: event.startTime, // full ISO string
        endDateTime: event.endTime,     // full ISO string
      }));      
      
      console.log("Transformed events:", transformedEvents);
      setEvents(transformedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
      setSnackbarMessage("Failed to load events");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle page change
  // const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
  //   setCurrentPage(page);
  // };

  // Handle add event button click
  const handleAddClick = () => {
    setEditMode(false);
    setCurrentEvent(null);
    setShowEventForm(true); // Show EventForm instead of table
  };

  // Handle edit event button click
  const handleEditClick = (event: Event) => {
    setEditMode(true);
    setCurrentEvent(event);
    setShowEventForm(true);
  };

  // Handle delete event
  // const handleDeleteClick = (id: number) => {
  //   setEvents(events.filter((event) => event.eventId !== id));
  //   setSnackbarMessage("Event deleted successfully!");
  //   setSnackbarSeverity("success");
  //   setSnackbarOpen(true);
  // };
  // const handleDeleteClick = async (id: number) => {
  //   const idempotencyKey = uuidv4();
  //   try {
  //     await deleteEvent(id, idempotencyKey);
  //     setSnackbarMessage("Event deleted successfully!");
  //     setSnackbarSeverity("success");
  //     fetchEvents();
  //   } catch (error) {
  //     console.error("Delete error:", error);
  //     setSnackbarMessage("Failed to delete event");
  //     setSnackbarSeverity("error");
  //   } finally {
  //     setSnackbarOpen(true);
  //   }
  // };
  const handleDeleteClick = (id: number) => {
    setEventToDelete(id);
    setConfirmDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (eventToDelete === null) return;

    const idempotencyKey = uuidv4();
    try {
      await deleteEvent(eventToDelete, idempotencyKey);
      // setSnackbarMessage("Event deleted successfully!");
      // setSnackbarSeverity("success");
      NotificationService.success("Event deleted successfully!");
      fetchEvents();
    } catch (error) {
      console.error("Delete error:", error);
      // setSnackbarMessage("Failed to delete event");
      // setSnackbarSeverity("error");
      NotificationService.error("Failed to delete event");
    } finally {
      setSnackbarOpen(true);
      setConfirmDeleteOpen(false);
      setEventToDelete(null);
    }
  };

  // Handle form submission: Ensure that the new event has a valid eventId
  // const handleSave = (eventData: EventInput) => {
  //   const newEvent: Event = {
  //     ...eventData,
  //     eventId:
  //       eventData.eventId !== undefined
  //         ? eventData.eventId
  //         : events.length > 0
  //         ? Math.max(...events.map((e) => e.eventId)) + 1
  //         : 1,
  //   };

  //   if (editMode && currentEvent) {
  //     // Update existing event
  //     setEvents(
  //       events.map((event) =>
  //         event.eventId === currentEvent.eventId ? newEvent : event
  //       )
  //     );
  //     setSnackbarMessage("Event updated successfully!");
  //   } else {
  //     // Add new event
  //     setEvents([...events, newEvent]);
  //     setSnackbarMessage("Event added successfully!");
  //   }

  //   setSnackbarSeverity("success");
  //   setSnackbarOpen(true);
  //   setShowEventForm(false); // Return to event table after saving
  // };
  const handleSave = async (eventData: EventInput) => {
    const idempotencyKey = uuidv4();
    try {
      if (eventData.eventId) {
        await updateEvent(eventData.eventId, eventData, idempotencyKey);
        // setSnackbarMessage("Event updated successfully!");
        NotificationService.success("Event updated successfully!");
      } else {
        await saveEvent(eventData, idempotencyKey);
        NotificationService.success("Event added successfully!");
      }
      //setSnackbarSeverity("success");
      fetchEvents();
      setShowEventForm(false);
    } catch (error) {
      console.error("Save error:", error);
      setSnackbarMessage("Failed to save/update event");
      setSnackbarSeverity("error");
    } finally {
      setSnackbarOpen(true);
    }
  };

  // Handle cancel action (return to table)
  const handleCancel = () => {
    setShowEventForm(false);
  };

  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) =>
    setCurrentPage(page);

  return (
    <Container maxWidth="lg" style={{ marginTop: "2rem" }}>
      <Typography
        variant="h4"
        gutterBottom
        style={{ fontFamily: "Poppins, sans-serif", color: "#1E293B" }}
      >
        Event Management
      </Typography>

      {showEventForm ? (
        // Render EventForm instead of table
        <EventForm
          event={currentEvent ?? undefined}
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
            Add Event
          </Button>

          {/* Events Table */}
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
                    Event Name
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>
                    Description
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>
                    Price
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>
                    Availability
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>
                    Start Date & Time
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>
                    End Date & Time
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.map((event) => (
                  <TableRow key={event.eventId}>
                    <TableCell>{event.eventName}</TableCell>
                    <TableCell>{event.eventDescription}</TableCell>
                    <TableCell>${event.pricePerEvent.toFixed(2)}</TableCell>
                    <TableCell>
                      {event.isAvailable ? "Available" : "Not Available"}
                    </TableCell>
                    <TableCell>
                      {new Date(event.startDateTime).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {new Date(event.endDateTime).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleEditClick(event)}
                      >
                        <Edit style={{ color: "#291e10" }} />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => handleDeleteClick(event.eventId)}
                      >
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
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this event? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default EventManagement;
