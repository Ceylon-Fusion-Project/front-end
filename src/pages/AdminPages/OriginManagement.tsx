import { useState, useEffect, useRef } from "react";
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
  Box,
  Drawer,
  TextField,
  InputAdornment,
  Autocomplete,
  //Grid,
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  FilterAlt,
  Search,
  Close,
} from "@mui/icons-material";
import { OriginForm } from "../../components/AdminComponents/OriginForm";
import {
  saveOrigin,
  updateOrigin,
  deleteOrigin,
  getAllOrigins,
  //getOriginsByFilter,
} from "@/services/originService";
import { v4 as uuidv4 } from "uuid";
import NotificationService from "@/utils/NotificationService";
//import dynamic from "next/dynamic";
//import React, { lazy, Suspense } from "react";

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

// Dynamic import for the Map component to avoid SSR issues
// const MapWithNoSSR = dynamic(() => import("../../components/AdminComponents/Map"), {
//   ssr: false,
// });
//const MapWithNoSSR = lazy(() => import("../../components/AdminComponents/Map"));

const OriginManagement = () => {
  const [origins, setOrigins] = useState<Origin[]>([]);
  const [filteredOrigins, setFilteredOrigins] = useState<Origin[]>([]);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [currentOrigin, setCurrentOrigin] = useState<Origin | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<AlertColor>("success");
  const [showOriginForm, setShowOriginForm] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<any>({});
  const [page, setPage] = useState(0);
  const [pageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [_actionLoading, setActionLoading] = useState<boolean>(false);

  const idempotencyKeyRef = useRef<string | null>(null);

  // const fetchOrigins = async () => {
  //   try {
  //     const hasFilters = searchQuery || Object.keys(filters).some((val) => val);

  //     const response = hasFilters
  //       ? await getOriginsByFilter(filters, page, pageSize)
  //       : await getAllOrigins(page, pageSize);

  //     const originList = response?.data?.data?.origins || [];
  //     const total = response?.data?.data?.totalOrigins || 0;

  //     setOrigins(originList);
  //     setFilteredOrigins(originList);
  //     setTotalItems(total);
  //   } catch (error) {
  //     console.error("Error fetching origins:", error);
  //     setSnackbarMessage("Failed to load origins.");
  //     setSnackbarSeverity("error");
  //     setSnackbarOpen(true);
  //   }
  // };

  const fetchOrigins = async () => {
    setLoading(true);
    try {
      const response = await getAllOrigins();
      const originList = response?.data?.data?.origins || [];
      setTotalItems(response?.data?.data?.totalOrigins || 0);

      setOrigins(originList);
      setFilteredOrigins(originList);
    } catch (error) {
      console.error("Error fetching origins:", error);
      setSnackbarMessage("Failed to load origins.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrigins();
  }, [page, searchQuery, filters]);

  // Generate search suggestions based on origin fields
  const generateSearchSuggestions = () => {
    const suggestions = new Set<string>();

    origins.forEach((origin) => {
      suggestions.add(origin.stateLocation);
      suggestions.add(origin.partOfPlant);
      suggestions.add(origin.factoryName);
      suggestions.add(origin.originCode);
    });

    return Array.from(suggestions);
  };

  // Apply filters and search
  useEffect(() => {
    let result = [...origins];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (origin) =>
          origin.stateLocation.toLowerCase().includes(query) ||
          origin.partOfPlant.toLowerCase().includes(query) ||
          origin.factoryName.toLowerCase().includes(query) ||
          origin.originCode.toLowerCase().includes(query) ||
          origin.originDescription.toLowerCase().includes(query)
      );
    }

    // Apply all other filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        result = result.filter((origin) =>
          String(origin[key as keyof Origin])
            .toLowerCase()
            .includes(String(value).toLowerCase())
        );
      }
    });

    setFilteredOrigins(result);
  }, [origins, searchQuery, filters]);

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

  const handleDeleteClick = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this origin?"
    );
    if (!confirmed) return;
    setActionLoading(true);
    try {
      // Generate only once
      if (!idempotencyKeyRef.current) {
        idempotencyKeyRef.current = uuidv4();
        console.log("Generated idempotency key:", idempotencyKeyRef.current);
      } else {
        console.log("Reusing idempotency key:", idempotencyKeyRef.current);
      }

      const usedKey = idempotencyKeyRef.current;

      await deleteOrigin(id, usedKey); //call BFF through originService
      setOrigins((prev) => prev.filter((origin) => origin.originID !== id));
      setSnackbarMessage("Origin deleted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      idempotencyKeyRef.current = null; // Reset after successful delete
    } catch (error) {
      console.error("Error deleting origin:", error);
      setSnackbarMessage("Failed to delete origin.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setActionLoading(false);
    }
  };

  // const handleSave = (originData: Origin) => {
  //   const newOrigin: Origin = {
  //     ...originData,
  //     originID:
  //       originData.originID !== undefined
  //         ? originData.originID
  //         : origins.length > 0
  //         ? Math.max(...origins.map((o) => o.originID || 0)) + 1
  //         : 1,
  //     createdDate: originData.createdDate || new Date().toISOString().split("T")[0],
  //     updatedDate: new Date().toISOString().split("T")[0],
  //   };

  //   if (editMode && currentOrigin) {
  //     setOrigins(
  //       origins.map((origin) =>
  //         origin.originID === currentOrigin.originID ? newOrigin : origin
  //       )
  //     );
  //     setSnackbarMessage("Origin updated successfully!");
  //   } else {
  //     setOrigins([...origins, newOrigin]);
  //     setSnackbarMessage("Origin added successfully!");
  //   }

  //   setSnackbarSeverity("success");
  //   setSnackbarOpen(true);
  //   setShowOriginForm(false);
  // };

  const handleSave = async (originData: Origin) => {
    setActionLoading(true);
    try {
      // Generate only once
      if (!idempotencyKeyRef.current) {
        idempotencyKeyRef.current = uuidv4();
        console.log("Generated idempotency key:", idempotencyKeyRef.current);
      } else {
        console.log("Reusing idempotency key:", idempotencyKeyRef.current);
      }

      const usedKey = idempotencyKeyRef.current;
      if (editMode && currentOrigin) {
        await updateOrigin(currentOrigin.originID!, originData, usedKey); // call through originService
        NotificationService.success("Origin updated successfully!");
      } else {
        await saveOrigin(originData, usedKey); // call through originService
        NotificationService.success("Origin added successfully!");
      }

      setShowOriginForm(false);
      fetchOrigins(); // Trigger refresh

      // Optionally refresh origins from backend here if integrated
    } catch (error) {
      console.error("Failed to save origin:", error);
      NotificationService.error("Failed to save origin");
    } finally {
      idempotencyKeyRef.current = null;
      setActionLoading(false);
    }
  };

  const handleCancel = () => {
    setShowOriginForm(false);
    idempotencyKeyRef.current = null;
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleApplyFilters = () => {
    setShowFilters(false);
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setFilters({});
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const getFilterLabel = (key: string) => {
    switch (key) {
      case "stateLocation":
        return "Estate Location";
      case "partOfPlant":
        return "Part of Plant";
      case "factoryName":
        return "Factory Name";
      case "originCode":
        return "Origin Code";
      default:
        return key;
    }
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
          editMode={editMode}
        />
      ) : (
        <>
          {/* Search and Filter Bar */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 3,
              flexWrap: "wrap",
            }}
          >
            {/* Add Origin Button - Left */}
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={handleAddClick}
              style={{
                backgroundColor: "#B45309",
                color: "#FFFFFF",
                minWidth: "150px",
                order: 1,
              }}
            >
              Add Origin
            </Button>

            {/* Custom Search Bar - Middle */}
            <Box
              sx={{
                flexGrow: 1,
                maxWidth: "400px",
                order: 2,
              }}
            >
              <Autocomplete
                freeSolo
                options={generateSearchSuggestions()}
                value={searchQuery}
                onChange={(_event, newValue) => handleSearch(newValue || "")}
                onInputChange={(_event, newInputValue) =>
                  handleSearch(newInputValue)
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Search by estate, plant part, factory..."
                    variant="outlined"
                    size="small"
                    fullWidth
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search color="action" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <>
                          {searchQuery && (
                            <IconButton
                              size="small"
                              onClick={() => handleSearch("")}
                              edge="end"
                            >
                              <Close fontSize="small" />
                            </IconButton>
                          )}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                      sx: {
                        backgroundColor: "#FFFFFF",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#CBD5E1",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#94A3B8",
                        },
                      },
                    }}
                  />
                )}
                sx={{
                  "& .MuiAutocomplete-popupIndicator": {
                    color: "#64748B",
                  },
                }}
              />
            </Box>

            {/* Filter Button - Right */}
            <Button
              variant="outlined"
              startIcon={<FilterAlt />}
              onClick={() => setShowFilters(true)}
              sx={{
                backgroundColor: "#F8FAFC",
                borderColor: "#CBD5E1",
                color: "#1E293B",
                order: 3,
                marginLeft: "auto",
                "&:hover": {
                  backgroundColor: "#F1F5F9",
                  borderColor: "#94A3B8",
                },
              }}
            >
              Filters
            </Button>
          </Box>

          {/* Filter Chips */}
          {(searchQuery || Object.keys(filters).length > 0) && (
            <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
              {searchQuery && (
                <Box
                  component="span"
                  sx={{
                    px: 2,
                    py: 1,
                    bgcolor: "#E2E8F0",
                    borderRadius: "16px",
                    fontSize: "0.875rem",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  Search: "{searchQuery}"
                  <IconButton size="small" onClick={() => setSearchQuery("")}>
                    <Delete fontSize="small" style={{ color: "#64748B" }} />
                  </IconButton>
                </Box>
              )}
              {Object.entries(filters).map(
                ([key, value]) =>
                  value !== undefined && (
                    <Box
                      key={key}
                      component="span"
                      sx={{
                        px: 2,
                        py: 1,
                        bgcolor: "#E2E8F0",
                        borderRadius: "16px",
                        fontSize: "0.875rem",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      {getFilterLabel(key)}: {String(value)}
                      <IconButton
                        size="small"
                        onClick={() =>
                          setFilters((prev: typeof filters) => ({
                            ...prev,
                            [key]: undefined,
                          }))
                        }
                      >
                        <Delete fontSize="small" style={{ color: "#64748B" }} />
                      </IconButton>
                    </Box>
                  )
              )}
              <Button
                size="small"
                onClick={clearAllFilters}
                sx={{
                  color: "#3B82F6",
                  "&:hover": {
                    backgroundColor: "#EFF6FF",
                  },
                }}
              >
                Clear all
              </Button>
            </Box>
          )}
          {loading ? (
          <Typography
            align="center"
            color="textSecondary"
            sx={{ mt: 4 }}
          >
            Loading origins...
          </Typography>
          ) : (

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
                    Estate Location
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>
                    Part of Plant
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>
                    Factory Name
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>
                    Origin Code
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOrigins.map((origin) => (
                  <TableRow key={origin.originID}>
                    <TableCell>{origin.stateLocation}</TableCell>
                    <TableCell>{origin.partOfPlant}</TableCell>
                    <TableCell>{origin.factoryName}</TableCell>
                    <TableCell>{origin.originCode}</TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleEditClick(origin)}
                      >
                        <Edit style={{ color: "#291e10" }} />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => handleDeleteClick(origin.originID!)}
                      >
                        <Delete style={{ color: "#EF4444" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          )}
          {/* Empty state */}
          {filteredOrigins.length === 0 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                p: 4,
                mt: 2,
                backgroundColor: "#F8FAFC",
                borderRadius: 1,
              }}
            >
              <Typography variant="h6" color="textSecondary" gutterBottom>
                No origins found
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Try adjusting your search or filters
              </Typography>
              <Button
                variant="outlined"
                onClick={clearAllFilters}
                startIcon={<FilterAlt />}
                sx={{
                  borderColor: "#CBD5E1",
                  color: "#1E293B",
                  "&:hover": {
                    borderColor: "#94A3B8",
                    backgroundColor: "#F1F5F9",
                  },
                }}
              >
                Clear filters
              </Button>
            </Box>
          )}
        </>
      )}

      {/* Filter Sidebar */}
      <Drawer
        anchor="right"
        open={showFilters}
        onClose={() => setShowFilters(false)}
      >
        <Box
          sx={{ width: 350, px: 3, py: 3, pt:10, backgroundColor: "#F8FAFC", height: "100%",boxSizing: "border-box", }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: "#1E293B", mb: 3 }}
          >
            Filter Origins
          </Typography>

          {/* Estate Location Filter */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ color: "#64748B", mb: 1 }}>
              Estate Location
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={filters.stateLocation || ""}
              onChange={(e) =>
                setFilters({ ...filters, stateLocation: e.target.value })
              }
              placeholder="Filter by estate"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#CBD5E1",
                  },
                  "&:hover fieldset": {
                    borderColor: "#94A3B8",
                  },
                },
              }}
            />
          </Box>

          {/* Part of Plant Filter */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ color: "#64748B", mb: 1 }}>
              Part of Plant
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={filters.partOfPlant || ""}
              onChange={(e) =>
                setFilters({ ...filters, partOfPlant: e.target.value })
              }
              placeholder="Filter by plant part"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#CBD5E1",
                  },
                  "&:hover fieldset": {
                    borderColor: "#94A3B8",
                  },
                },
              }}
            />
          </Box>

          {/* Factory Name Filter */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ color: "#64748B", mb: 1 }}>
              Factory Name
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={filters.factoryName || ""}
              onChange={(e) =>
                setFilters({ ...filters, factoryName: e.target.value })
              }
              placeholder="Filter by factory name"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#CBD5E1",
                  },
                  "&:hover fieldset": {
                    borderColor: "#94A3B8",
                  },
                },
              }}
            />
          </Box>

          {/* Origin Code Filter */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ color: "#64748B", mb: 1 }}>
              Origin Code
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={filters.originCode || ""}
              onChange={(e) =>
                setFilters({ ...filters, originCode: e.target.value })
              }
              placeholder="Filter by origin code"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#CBD5E1",
                  },
                  "&:hover fieldset": {
                    borderColor: "#94A3B8",
                  },
                },
              }}
            />
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => setFilters({})}
              sx={{
                color: "#64748B",
                borderColor: "#CBD5E1",
                "&:hover": {
                  borderColor: "#94A3B8",
                  backgroundColor: "#F1F5F9",
                },
              }}
            >
              Clear All
            </Button>
            <Button
              fullWidth
              variant="contained"
              onClick={handleApplyFilters}
              sx={{
                backgroundColor: "#B45309",
                color: "#FFFFFF",
                "&:hover": {
                  backgroundColor: "#92400E",
                },
              }}
            >
              Apply Filters
            </Button>
          </Box>
        </Box>
      </Drawer>

      {filteredOrigins.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3, gap: 2 }}>
          <Button
            variant="outlined"
            disabled={page === 0}
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          >
            Previous
          </Button>
          <Typography>
            Page {page + 1} of {Math.ceil(totalItems / pageSize)}
          </Typography>
          <Button
            variant="outlined"
            disabled={page >= Math.ceil(totalItems / pageSize) - 1}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </Box>
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

export default OriginManagement;
