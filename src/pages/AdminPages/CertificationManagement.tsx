import { useState, useEffect, SyntheticEvent, useRef } from "react";
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
  Drawer,
  SnackbarCloseReason,
} from "@mui/material";
import { Add, Edit, Delete, FilterAlt, CloudUpload } from "@mui/icons-material";
import AutoCompleteSearchBar from "@/components/AutoCompletedSearchBar";
import {
  getAllCertifications,
  saveCertification,
  updateCertification,
  deleteCertification,
} from "@/services/certificationService";
import { v4 as uuidv4 } from "uuid";
import api from "@/api/axiosInstance";

export interface Certification {
  certificationID: number;
  productID: number;
  certificationName: string;
  issuer: string;
  issuedDate: string;
  expiryDate: string;
  certActiveState: boolean;
  createdDate: string;
  updatedDate: string;
  certURL: string;
}

const CertificationManagement = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [filteredCertifications, setFilteredCertifications] = useState<
    Certification[]
  >([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentCertification, setCurrentCertification] =
    useState<Certification | null>(null);
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<AlertColor>("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [file, setFile] = useState<File[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<any>({});
  const [_loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [pageSize] = useState<number>(10);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [_actionLoading, setActionLoading] = useState<boolean>(false);
  const idempotencyKeyRef = useRef<string | null>(null);

  const fetchCertifications = async () => {
    setLoading(true);
    try {
      const response = await getAllCertifications(page, pageSize);
      console.log("Certifications API response:", response); // 🪵 Check what's inside
      const data = response.data.data.data; // 👈 might need this

      setCertifications(data.certifications || []);
      setFilteredCertifications(data.certifications || []);
      setTotalItems(data.totalCertifications || 0);
    } catch (error) {
      console.error("Error fetching certifications:", error); // Debug error too
      setSnackbarMessage("Failed to fetch certifications.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertifications();
  }, [page]);

  // Apply filters and search
  useEffect(() => {
    let result = [...certifications];

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (cert) =>
          cert.certificationName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          cert.issuer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply issuer filter
    if (filters.issuer) {
      result = result.filter((cert) =>
        cert.issuer.toLowerCase().includes(filters.issuer.toLowerCase())
      );
    }

    // Apply product ID filter
    if (filters.productID) {
      result = result.filter((cert) =>
        cert.productID.toString().includes(filters.productID.toString())
      );
    }

    // Apply status filters
    if (filters.activeOnly) {
      result = result.filter((cert) => new Date(cert.expiryDate) >= new Date());
    }
    if (filters.expiredOnly) {
      result = result.filter((cert) => new Date(cert.expiryDate) < new Date());
    }
    if (filters.expiringSoon) {
      const today = new Date();
      const nextMonth = new Date();
      nextMonth.setMonth(today.getMonth() + 1);
      result = result.filter((cert) => {
        const expiryDate = new Date(cert.expiryDate);
        return expiryDate >= today && expiryDate <= nextMonth;
      });
    }

    setFilteredCertifications(result);
  }, [certifications, searchQuery, filters]);

  const handleAddClick = () => {
    setEditMode(false);
    setCurrentCertification(null);
    setFile([]);
    setOpenDialog(true);
  };

  const handleEditClick = (certification: Certification) => {
    setEditMode(true);
    setCurrentCertification(certification);
    setFile([]);
    setOpenDialog(true);
  };

  const handleDeleteClick = async (id: number) => {
    const confirmed = confirm("Are you sure to delete?");
    if (!confirmed) return;
    setActionLoading(true);

    try {
      if (!idempotencyKeyRef.current) {
        idempotencyKeyRef.current = uuidv4();
      }
      await deleteCertification(id, idempotencyKeyRef.current);
      setSnackbarMessage("Deleted successfully.");
      fetchCertifications();
    } catch (error) {
      setSnackbarMessage("Delete failed.");
      setSnackbarSeverity("error");
    } finally {
      setSnackbarOpen(true);
      setActionLoading(false);
      idempotencyKeyRef.current = null;
    }
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setActionLoading(true);
    try {
      if (!idempotencyKeyRef.current) {
        idempotencyKeyRef.current = uuidv4();
      }
      const formData = new FormData(event.target as HTMLFormElement);
      const certification = {
        productID: parseInt(formData.get("productID") as string),
        certificationName: formData.get("certificationName"),
        issuer: formData.get("issuer"),
        issuedDate: formData.get("issuedDate"),
        expiryDate: formData.get("expiryDate"),
        certURL: currentCertification?.certURL || "", // will set after upload
      };

      // Upload file first (if available)
      if (file.length > 0) {
        const uploadForm = new FormData();
        uploadForm.append("file", file[0]);
        uploadForm.append("type", "other"); // or "image" depending on logic

        const uploadRes = await api.post(
          "/upload/product",
          uploadForm,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        certification.certURL = "http://localhost:8080" + uploadRes.data.data;
      }

      if (editMode && currentCertification) {
        await updateCertification(
          currentCertification.certificationID,
          certification,
          idempotencyKeyRef.current
        );
        setSnackbarMessage("Certification updated successfully.");
      } else {
        await saveCertification(certification, idempotencyKeyRef.current);
        setSnackbarMessage("Certification added successfully.");
      }

      setSnackbarSeverity("success");
      fetchCertifications();
      setOpenDialog(false);
    } catch (error) {
      setSnackbarMessage("Operation failed.");
      setSnackbarSeverity("error");
    } finally {
      setSnackbarOpen(true);
      setActionLoading(false);
      idempotencyKeyRef.current = null;
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setFile([]);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const _handleApplyFilters = (newFilters: any) => {
    setFilters(newFilters);
    setShowFilters(false);
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setFilters({});
  };

  const handleSnackbarClose = (
    _event?: SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const certificationNames = certifications.map(
    (cert) => cert.certificationName
  );

  return (
    <Container maxWidth="lg" style={{ marginTop: "2rem" }}>
      <Typography
        variant="h4"
        gutterBottom
        style={{ fontFamily: "Poppins, sans-serif", color: "#1E293B" }}
      >
        Certification Management
      </Typography>

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
        {/* Add Certification Button - Left */}
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
          Add Certification
        </Button>

        {/* Search Bar - Middle */}
        <Box
          sx={{
            flexGrow: 1,
            maxWidth: "400px",
            order: 2,
          }}
        >
          <AutoCompleteSearchBar
            data={certificationNames}
            onSearch={handleSearch}
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
                  {key}: {String(value)}
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

      {/* Certifications Table */}
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
                Certification Name
              </TableCell>
              <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>
                Issuer
              </TableCell>
              <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>
                Issued Date
              </TableCell>
              <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>
                Expiry Date
              </TableCell>
              <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>
                Status
              </TableCell>
              <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>
                Product ID
              </TableCell>
              <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>
                File
              </TableCell>
              <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCertifications.map((cert) => (
              <TableRow key={cert.certificationID}>
                <TableCell>{cert.certificationName}</TableCell>
                <TableCell>{cert.issuer}</TableCell>
                <TableCell>{cert.issuedDate}</TableCell>
                <TableCell>{cert.expiryDate}</TableCell>
                <TableCell>
                  <Box
                    component="span"
                    sx={{
                      px: 1.5,
                      py: 0.5,
                      borderRadius: "12px",
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                      backgroundColor:
                        new Date(cert.expiryDate) >= new Date()
                          ? "#D1FAE5"
                          : "#FEE2E2",
                      color:
                        new Date(cert.expiryDate) >= new Date()
                          ? "#065F46"
                          : "#B91C1C",
                    }}
                  >
                    {new Date(cert.expiryDate) >= new Date()
                      ? "Active"
                      : "Expired"}
                  </Box>
                </TableCell>
                <TableCell>{cert.productID}</TableCell>
                <TableCell>
                  <a
                    href={cert.certURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#B45309", textDecoration: "none" }}
                  >
                    View File
                  </a>
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditClick(cert)}
                  >
                    <Edit style={{ color: "#291e10" }} />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDeleteClick(cert.certificationID)}
                  >
                    <Delete style={{ color: "#EF4444" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {filteredCertifications.length > 0 && (
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
      {/* Empty state */}
      {filteredCertifications.length === 0 && (
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
            No certifications found
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

      {/* Add/Edit Certification Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle
          style={{ fontFamily: "Poppins, sans-serif", color: "#1E293B" }}
        >
          {editMode ? "Edit Certification" : "Add Certification"}
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
              {/* <div>
                <label className="block font-semibold mb-1">
                  Certification File
                </label>
                <ImageUploader value={file} onChange={setFile} />
              </div> */}
              <div>
                <label className="block font-semibold mb-1">
                  Certification File
                </label>
                <ImageUploader value={file} onChange={setFile} />
                {currentCertification?.certURL && !file.length && (
                  <Box mt={1}>
                    <Typography variant="body2" color="textSecondary">
                      Existing File:{" "}
                      <a
                        href={currentCertification.certURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "#B45309",
                          textDecoration: "underline",
                        }}
                      >
                        View Current File
                      </a>
                    </Typography>
                  </Box>
                )}
              </div>
            </Box>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} style={{ color: "#64748B" }}>
            Cancel
          </Button>
          <Button
            type="submit"
            form="certification-form"
            variant="contained"
            style={{ backgroundColor: "#B45309", color: "#FFFFFF" }}
          >
            {editMode ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Filter Sidebar */}
      <Drawer
        anchor="right"
        open={showFilters}
        onClose={() => setShowFilters(false)}
      >
        <Box
          sx={{ width: 350, p: 3, backgroundColor: "#F8FAFC", height: "100%" }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: "#1E293B", mb: 3 }}
          >
            Filter Certifications
          </Typography>

          {/* Status Filter */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ color: "#64748B", mb: 1 }}>
              Status
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant={filters.activeOnly ? "contained" : "outlined"}
                onClick={() =>
                  setFilters({
                    ...filters,
                    activeOnly: !filters.activeOnly,
                    expiredOnly: false,
                  })
                }
                sx={{
                  backgroundColor: filters.activeOnly
                    ? "#a18658"
                    : "transparent",
                  color: filters.activeOnly ? "#FFFFFF" : "#a18658",
                  borderColor: "#3B82F6",
                  "&:hover": {
                    backgroundColor: filters.activeOnly ? "#a18658" : "#EFF6FF",
                    borderColor: "#a18658",
                  },
                }}
              >
                Active Only
              </Button>
              <Button
                variant={filters.expiredOnly ? "contained" : "outlined"}
                onClick={() =>
                  setFilters({
                    ...filters,
                    expiredOnly: !filters.expiredOnly,
                    activeOnly: false,
                  })
                }
                sx={{
                  backgroundColor: filters.expiredOnly
                    ? "#EF4444"
                    : "transparent",
                  color: filters.expiredOnly ? "#FFFFFF" : "#EF4444",
                  borderColor: "#EF4444",
                  "&:hover": {
                    backgroundColor: filters.expiredOnly
                      ? "#DC2626"
                      : "#FEE2E2",
                    borderColor: "#DC2626",
                  },
                }}
              >
                Expired Only
              </Button>
            </Box>
            <Button
              fullWidth
              variant={filters.expiringSoon ? "contained" : "outlined"}
              onClick={() =>
                setFilters({ ...filters, expiringSoon: !filters.expiringSoon })
              }
              sx={{
                mt: 1,
                backgroundColor: filters.expiringSoon
                  ? "#10B981"
                  : "transparent",
                color: filters.expiringSoon ? "#FFFFFF" : "#10B981",
                borderColor: "#10B981",
                "&:hover": {
                  backgroundColor: filters.expiringSoon ? "#059669" : "#ECFDF5",
                  borderColor: "#059669",
                },
              }}
            >
              Expiring Soon
            </Button>
          </Box>

          {/* Issuer Filter */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ color: "#64748B", mb: 1 }}>
              Issuer
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={filters.issuer || ""}
              onChange={(e) =>
                setFilters({ ...filters, issuer: e.target.value })
              }
              placeholder="Filter by issuer"
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

          {/* Product ID Filter */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ color: "#64748B", mb: 1 }}>
              Product ID
            </Typography>
            <TextField
              fullWidth
              size="small"
              type="number"
              value={filters.productID || ""}
              onChange={(e) =>
                setFilters({ ...filters, productID: e.target.value })
              }
              placeholder="Filter by product ID"
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
              onClick={() => setShowFilters(false)}
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

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={(event) => handleSnackbarClose(event, "timeout")}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

// ImageUploader component
const ImageUploader = ({
  value,
  onChange,
}: {
  value: File[];
  onChange: (files: File[]) => void;
}) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onChange([e.dataTransfer.files[0]]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onChange([e.target.files[0]]);
    }
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      style={{
        border: dragActive ? "2px dashed #B45309" : "2px dashed #CBD5E1",
        borderRadius: "8px",
        padding: "20px",
        textAlign: "center",
        backgroundColor: dragActive ? "#FFFBEB" : "#F8FAFC",
        cursor: "pointer",
      }}
    >
      <input
        type="file"
        id="file-upload"
        style={{ display: "none" }}
        onChange={handleChange}
      />
      <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
        <CloudUpload style={{ color: "#B45309", fontSize: "40px" }} />
        <p style={{ color: "#1E293B", marginTop: "10px" }}>
          Drag & drop a file or{" "}
          <span style={{ color: "#B45309", textDecoration: "underline" }}>
            browse
          </span>
        </p>
      </label>
      {value.length > 0 && (
        <div style={{ marginTop: "10px" }}>
          <p style={{ color: "#1E293B", fontWeight: "bold" }}>Uploaded File:</p>
          <p style={{ color: "#1E293B" }}>{value[0].name}</p>
        </div>
      )}
    </div>
  );
};

export default CertificationManagement;
