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
  Box,
  Drawer,
  TextField,
  InputAdornment,
  Autocomplete,
  Grid,
} from "@mui/material";
import { Add, Edit, Delete, FilterAlt, Search, Close } from "@mui/icons-material";
import { OriginForm } from "../../components/AdminComponents/OriginForm";
import dynamic from "next/dynamic";

// Define the Origin type
interface Origin {
  originID?: number;
  estateLocation: string;
  estateMapLink: string;
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
    estateLocation: "Kandy",
    estateMapLink: "https://www.openstreetmap.org/#map=15/7.2906/80.6337",
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
  {
    originID: 2,
    estateLocation: "Colombo",
    estateMapLink: "https://www.openstreetmap.org/#map=15/6.9271/79.8612",
    partOfPlant: "Leaves",
    originDescription: "Premium cinnamon leaves from Colombo",
    factoryName: "Colombo Cinnamon Leaves",
    factoryAddress: "456 Colombo Street, Colombo",
    factoryMapLink: "https://www.openstreetmap.org/#map=15/6.9271/79.8612",
    demoVideoLink: "https://youtube.com/colombo-cinnamon",
    createdDate: "2024-02-01",
    updatedDate: "2024-02-01",
    originCode: "COLOMBO002",
  },
];

// Dynamic import for the Map component to avoid SSR issues
const MapWithNoSSR = dynamic(() => import("../../components/AdminComponents/Map"), {
  ssr: false,
});

const OriginManagement = () => {
  const [origins, setOrigins] = useState<Origin[]>(mockData);
  const [filteredOrigins, setFilteredOrigins] = useState<Origin[]>(mockData);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [currentOrigin, setCurrentOrigin] = useState<Origin | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>("success");
  const [showOriginForm, setShowOriginForm] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<any>({});

  // Generate search suggestions based on origin fields
  const generateSearchSuggestions = () => {
    const suggestions = new Set<string>();
    
    origins.forEach(origin => {
      suggestions.add(origin.estateLocation);
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
      result = result.filter(origin => 
        origin.estateLocation.toLowerCase().includes(query) ||
        origin.partOfPlant.toLowerCase().includes(query) ||
        origin.factoryName.toLowerCase().includes(query) ||
        origin.originCode.toLowerCase().includes(query) ||
        origin.originDescription.toLowerCase().includes(query)
      );
    }
    
    // Apply all other filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        result = result.filter(origin => 
          String(origin[key as keyof Origin]).toLowerCase().includes(String(value).toLowerCase())
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

  const handleDeleteClick = (id: number) => {
    setOrigins(origins.filter((origin) => origin.originID !== id));
    setSnackbarMessage("Origin deleted successfully!");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

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
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: 2, 
            mb: 3,
            flexWrap: 'wrap'
          }}>
            {/* Add Origin Button - Left */}
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={handleAddClick}
              style={{ 
                backgroundColor: "#B45309", 
                color: "#FFFFFF",
                minWidth: '150px',
                order: 1
              }}
            >
              Add Origin
            </Button>

            {/* Custom Search Bar - Middle */}
            <Box sx={{ 
              flexGrow: 1,
              maxWidth: '400px',
              order: 2
            }}>
              <Autocomplete
                freeSolo
                options={generateSearchSuggestions()}
                value={searchQuery}
                onChange={(event, newValue) => handleSearch(newValue || "")}
                onInputChange={(event, newInputValue) => handleSearch(newInputValue)}
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
                        backgroundColor: '#FFFFFF',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#CBD5E1',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#94A3B8',
                        },
                      }
                    }}
                  />
                )}
                sx={{
                  '& .MuiAutocomplete-popupIndicator': {
                    color: '#64748B',
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
                marginLeft: 'auto',
                '&:hover': {
                  backgroundColor: '#F1F5F9',
                  borderColor: '#94A3B8'
                }
              }}
            >
              Filters
            </Button>
          </Box>

          {/* Filter Chips */}
          {(searchQuery || Object.keys(filters).length > 0) && (
            <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
              {searchQuery && (
                <Box
                  component="span"
                  sx={{
                    px: 2,
                    py: 1,
                    bgcolor: '#E2E8F0',
                    borderRadius: '16px',
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  Search: "{searchQuery}"
                  <IconButton size="small" onClick={() => setSearchQuery("")}>
                    <Delete fontSize="small" style={{ color: "#64748B" }} />
                  </IconButton>
                </Box>
              )}
              {Object.entries(filters).map(([key, value]) => (
                value !== undefined && (
                  <Box
                    key={key}
                    component="span"
                    sx={{
                      px: 2,
                      py: 1,
                      bgcolor: '#E2E8F0',
                      borderRadius: '16px',
                      fontSize: '0.875rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    {key}: {String(value)}
                    <IconButton 
                      size="small" 
                      onClick={() => setFilters((prev: typeof filters) => ({ ...prev, [key]: undefined }))}
                    >
                      <Delete fontSize="small" style={{ color: "#64748B" }} />
                    </IconButton>
                  </Box>
                )
              ))}
              <Button 
                size="small" 
                onClick={clearAllFilters}
                sx={{ 
                  color: '#3B82F6',
                  '&:hover': {
                    backgroundColor: '#EFF6FF'
                  }
                }}
              >
                Clear all
              </Button>
            </Box>
          )}

          <TableContainer
            component={Paper}
            style={{ marginTop: "1.5rem", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}
          >
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: "#F8FAFC" }}>
                  <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>Estate Location</TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>Part of Plant</TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>Factory Name</TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>Origin Code</TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOrigins.map((origin) => (
                  <TableRow key={origin.originID}>
                    <TableCell>{origin.estateLocation}</TableCell>
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

          {/* Empty state */}
          {filteredOrigins.length === 0 && (
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              p: 4,
              mt: 2,
              backgroundColor: '#F8FAFC',
              borderRadius: 1
            }}>
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
                  borderColor: '#CBD5E1',
                  color: '#1E293B',
                  '&:hover': {
                    borderColor: '#94A3B8',
                    backgroundColor: '#F1F5F9'
                  }
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
        <Box sx={{ width: 350, p: 3, backgroundColor: '#F8FAFC', height: '100%' }}>
          <Typography variant="h6" gutterBottom sx={{ color: '#1E293B', mb: 3 }}>
            Filter Origins
          </Typography>
          
          {/* Estate Location Filter */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ color: '#64748B', mb: 1 }}>
              Estate Location
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={filters.estateLocation || ''}
              onChange={(e) => setFilters({ ...filters, estateLocation: e.target.value })}
              placeholder="Filter by estate"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#CBD5E1',
                  },
                  '&:hover fieldset': {
                    borderColor: '#94A3B8',
                  },
                }
              }}
            />
          </Box>

          {/* Part of Plant Filter */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ color: '#64748B', mb: 1 }}>
              Part of Plant
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={filters.partOfPlant || ''}
              onChange={(e) => setFilters({ ...filters, partOfPlant: e.target.value })}
              placeholder="Filter by plant part"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#CBD5E1',
                  },
                  '&:hover fieldset': {
                    borderColor: '#94A3B8',
                  },
                }
              }}
            />
          </Box>

          {/* Factory Name Filter */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ color: '#64748B', mb: 1 }}>
              Factory Name
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={filters.factoryName || ''}
              onChange={(e) => setFilters({ ...filters, factoryName: e.target.value })}
              placeholder="Filter by factory name"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#CBD5E1',
                  },
                  '&:hover fieldset': {
                    borderColor: '#94A3B8',
                  },
                }
              }}
            />
          </Box>

          {/* Origin Code Filter */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ color: '#64748B', mb: 1 }}>
              Origin Code
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={filters.originCode || ''}
              onChange={(e) => setFilters({ ...filters, originCode: e.target.value })}
              placeholder="Filter by origin code"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#CBD5E1',
                  },
                  '&:hover fieldset': {
                    borderColor: '#94A3B8',
                  },
                }
              }}
            />
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => setFilters({})}
              sx={{
                color: '#64748B',
                borderColor: '#CBD5E1',
                '&:hover': {
                  borderColor: '#94A3B8',
                  backgroundColor: '#F1F5F9'
                }
              }}
            >
              Clear All
            </Button>
            <Button
              fullWidth
              variant="contained"
              onClick={handleApplyFilters}
              sx={{
                backgroundColor: '#B45309',
                color: '#FFFFFF',
                '&:hover': {
                  backgroundColor: '#92400E'
                }
              }}
            >
              Apply Filters
            </Button>
          </Box>
        </Box>
      </Drawer>

      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default OriginManagement;