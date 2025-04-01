import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import { Close, Place } from "@mui/icons-material";
import { lazy, Suspense } from "react";

const MapWithNoSSR = lazy(() => import("./Map"));

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

interface OriginFormProps {
  origin: Origin | null;
  onSave: (originData: Origin) => void;
  onCancel: () => void;
  editMode?: boolean;
}

export const OriginForm = ({ origin, onCancel, onSave }: OriginFormProps) => {
  const [formData, setFormData] = useState<Origin>({
    stateLocation: origin?.stateLocation || "",
    stateMapLink: origin?.stateMapLink || "",
    partOfPlant: origin?.partOfPlant || "",
    originDescription: origin?.originDescription || "",
    factoryName: origin?.factoryName || "",
    factoryAddress: origin?.factoryAddress || "",
    factoryMapLink: origin?.factoryMapLink || "",
    demoVideoLink: origin?.demoVideoLink || "",
    originCode: origin?.originCode || "",
    ...(origin?.originID && { originID: origin.originID }),
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [mapDialogOpen, setMapDialogOpen] = useState(false);
  const [mapSelectionType, setMapSelectionType] = useState<"estate" | "factory">("estate");

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.stateLocation) newErrors.estateLocation = "Estate Location is required";
    if (!formData.stateMapLink) newErrors.estateMapLink = "Estate Map Link is required";
    if (!formData.partOfPlant) newErrors.partOfPlant = "Part of Plant is required";
    if (!formData.originDescription) newErrors.originDescription = "Origin Description is required";
    if (!formData.factoryName) newErrors.factoryName = "Factory Name is required";
    if (!formData.factoryAddress) newErrors.factoryAddress = "Factory Address is required";
    if (!formData.factoryMapLink) newErrors.factoryMapLink = "Factory Map Link is required";
    if (!formData.originCode) newErrors.originCode = "Origin Code is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    onSave(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMapSelection = (lat: number, lng: number) => {
    const url = `https://www.openstreetmap.org/#map=15/${lat.toFixed(4)}/${lng.toFixed(4)}`;

    if (mapSelectionType === "estate") {
      setFormData((prev) => ({
        ...prev,
        stateMapLink: url,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        factoryMapLink: url,
      }));
    }
  };

  const openMapDialog = (type: "estate" | "factory") => {
    setMapSelectionType(type);
    setMapDialogOpen(true);
  };

  const parseMapLink = (link: string) => {
    if (!link) return undefined;
    const parts = link.split("/");
    const lat = parseFloat(parts[parts.length - 2]);
    const lng = parseFloat(parts[parts.length - 1]);
    return { lat, lng };
  };

  return (
    <>
      <Dialog open onClose={onCancel} maxWidth="md" fullWidth>
        <DialogTitle style={{ fontFamily: "Poppins, sans-serif", color: "#1E293B" }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">
              {origin ? "Edit Origin" : "Add Origin"}
            </Typography>
            <IconButton onClick={onCancel}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {/* Estate Location (Text Input) */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Estate Location"
                name="stateLocation"
                fullWidth
                margin="normal"
                value={formData.stateLocation}
                onChange={handleChange}
                error={!!errors.estateLocation}
                helperText={errors.estateLocation}
              />
            </Grid>

            {/* Estate Map Link (Map Selection) */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Estate Map Link"
                name="stateMapLink"
                fullWidth
                margin="normal"
                value={formData.stateMapLink}
                onChange={handleChange}
                error={!!errors.estateMapLink}
                helperText={errors.estateMapLink}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => openMapDialog("estate")}
                      sx={{ color: "#92400E" }}
                    >
                      <Place />
                    </IconButton>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Part of Plant"
                name="partOfPlant"
                fullWidth
                margin="normal"
                value={formData.partOfPlant}
                onChange={handleChange}
                error={!!errors.partOfPlant}
                helperText={errors.partOfPlant}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Origin Description"
                name="originDescription"
                fullWidth
                margin="normal"
                value={formData.originDescription}
                onChange={handleChange}
                error={!!errors.originDescription}
                helperText={errors.originDescription}
                multiline
                rows={3}
              />
            </Grid>

            {/* Factory Name (Text Input) */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Factory Name"
                name="factoryName"
                fullWidth
                margin="normal"
                value={formData.factoryName}
                onChange={handleChange}
                error={!!errors.factoryName}
                helperText={errors.factoryName}
              />
            </Grid>

            {/* Factory Address (Text Input) */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Factory Address"
                name="factoryAddress"
                fullWidth
                margin="normal"
                value={formData.factoryAddress}
                onChange={handleChange}
                error={!!errors.factoryAddress}
                helperText={errors.factoryAddress}
              />
            </Grid>

            {/* Factory Map Link (Map Selection) */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Factory Map Link"
                name="factoryMapLink"
                fullWidth
                margin="normal"
                value={formData.factoryMapLink}
                onChange={handleChange}
                error={!!errors.factoryMapLink}
                helperText={errors.factoryMapLink}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => openMapDialog("factory")}
                      sx={{ color: "#B45309" }}
                    >
                      <Place />
                    </IconButton>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Demo Video Link"
                name="demoVideoLink"
                fullWidth
                margin="normal"
                value={formData.demoVideoLink}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Origin Code"
                name="originCode"
                fullWidth
                margin="normal"
                value={formData.originCode}
                onChange={handleChange}
                error={!!errors.originCode}
                helperText={errors.originCode}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={onCancel}
            sx={{
              color: "#64748B",
              "&:hover": {
                backgroundColor: "#F1F5F9",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              backgroundColor: "#B45309",
              color: "#FFFFFF",
              "&:hover": {
                backgroundColor: "#92400E",
              },
            }}
          >
            {origin ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Map Selection Dialog */}
      <Dialog
        open={mapDialogOpen}
        onClose={() => setMapDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ 
          fontFamily: "Poppins, sans-serif", 
          color: "#1E293B",
          paddingBottom: "8px"
        }}>
          <Box display="flex" alignItems="center">
            <Place sx={{ 
              color: mapSelectionType === "estate" ? "#92400E" : "#B45309",
              marginRight: "8px"
            }} />
            <Typography variant="h6">
              {mapSelectionType === "estate" ? "Estate" : "Factory"} Location
            </Typography>
          </Box>
          <Typography variant="body2" color="textSecondary">
            Drag the place marker to select location
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ height: "500px", mt: 1 }}>
            <Suspense fallback={<div style={{ textAlign: "center", paddingTop: "200px" }}>Loading map...</div>}>
              <MapWithNoSSR
                onLocationSelect={handleMapSelection}
                initialLocation={
                  mapSelectionType === "estate"
                    ? parseMapLink(formData.stateMapLink)
                    : parseMapLink(formData.factoryMapLink)
                }
                markerColor={
                  mapSelectionType === "estate" ? "#92400E" : "#B45309"
                }
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
    </>
  );
};