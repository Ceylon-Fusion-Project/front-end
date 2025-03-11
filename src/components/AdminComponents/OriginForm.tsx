// OriginForm.tsx
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import { MapComponent } from "./MapComponent";

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
}

export const OriginForm = ({ origin, onSave, onCancel }: OriginFormProps) => {
  const [stateLocation, setStateLocation] = useState(origin?.stateLocation || "");
  const [stateMapLink, setStateMapLink] = useState(origin?.stateMapLink || "");
  const [partOfPlant, setPartOfPlant] = useState(origin?.partOfPlant || "");
  const [originDescription, setOriginDescription] = useState(origin?.originDescription || "");
  const [factoryName, setFactoryName] = useState(origin?.factoryName || "");
  const [factoryAddress, setFactoryAddress] = useState(origin?.factoryAddress || "");
  const [factoryMapLink, setFactoryMapLink] = useState(origin?.factoryMapLink || "");
  const [demoVideoLink, setDemoVideoLink] = useState(origin?.demoVideoLink || "");
  const [originCode, setOriginCode] = useState(origin?.originCode || "");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Parse the factoryMapLink to get initial latitude and longitude
  const parseFactoryMapLink = (link: string) => {
    const parts = link.split("/");
    const lat = parseFloat(parts[parts.length - 2]);
    const lng = parseFloat(parts[parts.length - 1]);
    return { lat, lng };
  };

  const initialLocation = origin?.factoryMapLink ? parseFactoryMapLink(origin.factoryMapLink) : undefined;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!stateLocation) newErrors.stateLocation = "State Location is required";
    if (!partOfPlant) newErrors.partOfPlant = "Part of Plant is required";
    if (!originDescription) newErrors.originDescription = "Origin Description is required";
    if (!factoryName) newErrors.factoryName = "Factory Name is required";
    if (!factoryAddress) newErrors.factoryAddress = "Factory Address is required";
    if (!originCode) newErrors.originCode = "Origin Code is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const originData: Origin = {
      originID: origin?.originID,
      stateLocation,
      stateMapLink,
      partOfPlant,
      originDescription,
      factoryName,
      factoryAddress,
      factoryMapLink,
      demoVideoLink,
      originCode,
    };
    onSave(originData);
  };

  return (
    <Dialog open onClose={onCancel} maxWidth="md" fullWidth>
      <DialogTitle style={{ fontFamily: "Poppins, sans-serif", color: "#1E293B" }}>
        {origin ? "Edit Origin" : "Add Origin"}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="State Location"
              fullWidth
              margin="normal"
              value={stateLocation}
              onChange={(e) => setStateLocation(e.target.value)}
              error={!!errors.stateLocation}
              helperText={errors.stateLocation}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="State Map Link"
              fullWidth
              margin="normal"
              value={stateMapLink}
              onChange={(e) => setStateMapLink(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Part of Plant"
              fullWidth
              margin="normal"
              value={partOfPlant}
              onChange={(e) => setPartOfPlant(e.target.value)}
              error={!!errors.partOfPlant}
              helperText={errors.partOfPlant}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Origin Description"
              fullWidth
              margin="normal"
              value={originDescription}
              onChange={(e) => setOriginDescription(e.target.value)}
              error={!!errors.originDescription}
              helperText={errors.originDescription}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Factory Name"
              fullWidth
              margin="normal"
              value={factoryName}
              onChange={(e) => setFactoryName(e.target.value)}
              error={!!errors.factoryName}
              helperText={errors.factoryName}
            />
          </Grid>
          <Grid item xs={12}>
            <MapComponent
              onLocationSelect={(location) => {
                setFactoryAddress(location.address);
                setFactoryMapLink(`https://www.openstreetmap.org/#map=15/${location.lat}/${location.lng}`);
              }}
              initialLocation={initialLocation}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Factory Address"
              fullWidth
              margin="normal"
              value={factoryAddress}
              onChange={(e) => setFactoryAddress(e.target.value)}
              error={!!errors.factoryAddress}
              helperText={errors.factoryAddress}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Factory Map Link"
              fullWidth
              margin="normal"
              value={factoryMapLink}
              onChange={(e) => setFactoryMapLink(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Demo Video Link"
              fullWidth
              margin="normal"
              value={demoVideoLink}
              onChange={(e) => setDemoVideoLink(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Origin Code"
              fullWidth
              margin="normal"
              value={originCode}
              onChange={(e) => setOriginCode(e.target.value)}
              error={!!errors.originCode}
              helperText={errors.originCode}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} style={{ color: "#64748B" }}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" style={{ backgroundColor: "#B45309", color: "#FFFFFF" }}>
          {origin ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};