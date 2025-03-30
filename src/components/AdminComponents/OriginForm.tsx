// // OriginForm.tsx
// import { useState } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField,
//   Grid,
// } from "@mui/material";
// import { MapComponent } from "./MapComponent";

// interface Origin {
//   originID?: number;
//   stateLocation: string;
//   stateMapLink: string;
//   partOfPlant: string;
//   originDescription: string;
//   factoryName: string;
//   factoryAddress: string;
//   factoryMapLink: string;
//   demoVideoLink: string;
//   createdDate?: string;
//   updatedDate?: string;
//   originCode: string;
// }

// interface OriginFormProps {
//   origin: Origin | null;
//   onSave: (originData: Origin) => void;
//   onCancel: () => void;
// }

// export const OriginForm = ({ origin, onSave, onCancel }: OriginFormProps) => {
//   const [stateLocation, setStateLocation] = useState(origin?.stateLocation || "");
//   const [stateMapLink, setStateMapLink] = useState(origin?.stateMapLink || "");
//   const [partOfPlant, setPartOfPlant] = useState(origin?.partOfPlant || "");
//   const [originDescription, setOriginDescription] = useState(origin?.originDescription || "");
//   const [factoryName, setFactoryName] = useState(origin?.factoryName || "");
//   const [factoryAddress, setFactoryAddress] = useState(origin?.factoryAddress || "");
//   const [factoryMapLink, setFactoryMapLink] = useState(origin?.factoryMapLink || "");
//   const [demoVideoLink, setDemoVideoLink] = useState(origin?.demoVideoLink || "");
//   const [originCode, setOriginCode] = useState(origin?.originCode || "");
//   const [errors, setErrors] = useState<Record<string, string>>({});

//   // Parse the factoryMapLink to get initial latitude and longitude
//   const parseFactoryMapLink = (link: string) => {
//     const parts = link.split("/");
//     const lat = parseFloat(parts[parts.length - 2]);
//     const lng = parseFloat(parts[parts.length - 1]);
//     return { lat, lng };
//   };

//   const initialLocation = origin?.factoryMapLink ? parseFactoryMapLink(origin.factoryMapLink) : undefined;

//   const validateForm = () => {
//     const newErrors: Record<string, string> = {};
//     if (!stateLocation) newErrors.stateLocation = "State Location is required";
//     if (!partOfPlant) newErrors.partOfPlant = "Part of Plant is required";
//     if (!originDescription) newErrors.originDescription = "Origin Description is required";
//     if (!factoryName) newErrors.factoryName = "Factory Name is required";
//     if (!factoryAddress) newErrors.factoryAddress = "Factory Address is required";
//     if (!originCode) newErrors.originCode = "Origin Code is required";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = () => {
//     if (!validateForm()) return;

//     const originData: Origin = {
//       originID: origin?.originID,
//       stateLocation,
//       stateMapLink,
//       partOfPlant,
//       originDescription,
//       factoryName,
//       factoryAddress,
//       factoryMapLink,
//       demoVideoLink,
//       originCode,
//     };
//     onSave(originData);
//   };

//   return (
//     <Dialog open onClose={onCancel} maxWidth="md" fullWidth>
//       <DialogTitle style={{ fontFamily: "Poppins, sans-serif", color: "#1E293B" }}>
//         {origin ? "Edit Origin" : "Add Origin"}
//       </DialogTitle>
//       <DialogContent>
//         <Grid container spacing={2}>
//           <Grid item xs={12} md={6}>
//             <TextField
//               label="State Location"
//               fullWidth
//               margin="normal"
//               value={stateLocation}
//               onChange={(e) => setStateLocation(e.target.value)}
//               error={!!errors.stateLocation}
//               helperText={errors.stateLocation}
//             />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <TextField
//               label="State Map Link"
//               fullWidth
//               margin="normal"
//               value={stateMapLink}
//               onChange={(e) => setStateMapLink(e.target.value)}
//             />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <TextField
//               label="Part of Plant"
//               fullWidth
//               margin="normal"
//               value={partOfPlant}
//               onChange={(e) => setPartOfPlant(e.target.value)}
//               error={!!errors.partOfPlant}
//               helperText={errors.partOfPlant}
//             />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <TextField
//               label="Origin Description"
//               fullWidth
//               margin="normal"
//               value={originDescription}
//               onChange={(e) => setOriginDescription(e.target.value)}
//               error={!!errors.originDescription}
//               helperText={errors.originDescription}
//             />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <TextField
//               label="Factory Name"
//               fullWidth
//               margin="normal"
//               value={factoryName}
//               onChange={(e) => setFactoryName(e.target.value)}
//               error={!!errors.factoryName}
//               helperText={errors.factoryName}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <MapComponent
//               onLocationSelect={(location) => {
//                 setFactoryAddress(location.address);
//                 setFactoryMapLink(`https://www.openstreetmap.org/#map=15/${location.lat}/${location.lng}`);
//               }}
//               initialLocation={initialLocation}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Factory Address"
//               fullWidth
//               margin="normal"
//               value={factoryAddress}
//               onChange={(e) => setFactoryAddress(e.target.value)}
//               error={!!errors.factoryAddress}
//               helperText={errors.factoryAddress}
//             />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <TextField
//               label="Factory Map Link"
//               fullWidth
//               margin="normal"
//               value={factoryMapLink}
//               onChange={(e) => setFactoryMapLink(e.target.value)}
//             />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <TextField
//               label="Demo Video Link"
//               fullWidth
//               margin="normal"
//               value={demoVideoLink}
//               onChange={(e) => setDemoVideoLink(e.target.value)}
//             />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <TextField
//               label="Origin Code"
//               fullWidth
//               margin="normal"
//               value={originCode}
//               onChange={(e) => setOriginCode(e.target.value)}
//               error={!!errors.originCode}
//               helperText={errors.originCode}
//             />
//           </Grid>
//         </Grid>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onCancel} style={{ color: "#64748B" }}>
//           Cancel
//         </Button>
//         <Button onClick={handleSubmit} variant="contained" style={{ backgroundColor: "#B45309", color: "#FFFFFF" }}>
//           {origin ? "Update" : "Save"}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

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
import dynamic from "next/dynamic";
import { Close, Place } from "@mui/icons-material";

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

interface OriginFormProps {
  origin: Origin | null;
  onSave: (originData: Origin) => void;
  onCancel: () => void;
}

interface OriginFormProps {
  origin: Origin | null;
  onSave: (originData: Origin) => void;
  onCancel: () => void;
  editMode?: boolean; // Make it optional since we can infer it from 'origin'
}

const MapWithNoSSR = dynamic(() => import("./Map"), {
  ssr: false,
  loading: () => <div style={{ height: "500px", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading map...</div>
});

export const OriginForm = ({ origin, onCancel, onSave }: OriginFormProps) => {
  const [formData, setFormData] = useState<Origin>({
    estateLocation: origin?.estateLocation || "",
    estateMapLink: origin?.estateMapLink || "",
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
    if (!formData.estateLocation) newErrors.estateLocation = "Estate Location is required";
    if (!formData.estateMapLink) newErrors.estateMapLink = "Estate Map Link is required";
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
        estateMapLink: url,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        factoryMapLink: url,
      }));
    }
    setMapDialogOpen(false);
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
                name="estateLocation"
                fullWidth
                margin="normal"
                value={formData.estateLocation}
                onChange={handleChange}
                error={!!errors.estateLocation}
                helperText={errors.estateLocation}
              />
            </Grid>
            
            {/* Estate Map Link (Map Selection) */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Estate Map Link"
                name="estateMapLink"
                fullWidth
                margin="normal"
                value={formData.estateMapLink}
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
              '&:hover': {
                backgroundColor: '#F1F5F9'
              }
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
              '&:hover': {
                backgroundColor: '#92400E'
              }
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
        <DialogTitle sx={{ fontFamily: "Poppins, sans-serif", color: "#1E293B" }}>
          Select {mapSelectionType === "estate" ? "Estate" : "Factory"} Location on Map
        </DialogTitle>
        <DialogContent>
          <Box sx={{ height: "500px", mt: 2 }}>
            <MapWithNoSSR
              onLocationSelect={handleMapSelection}
              initialLocation={
                mapSelectionType === "estate" 
                  ? parseMapLink(formData.estateMapLink)
                  : parseMapLink(formData.factoryMapLink)
              }
              markerColor={mapSelectionType === "estate" ? "#92400E" : "#B45309"}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setMapDialogOpen(false)}
            sx={{ 
              color: "#64748B",
              '&:hover': {
                backgroundColor: '#F1F5F9'
              }
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};