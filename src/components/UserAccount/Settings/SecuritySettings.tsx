// "use client"

// import type React from "react"

// import { useState } from "react"
// import {
//   Box,
//   Typography,
//   Grid,
//   TextField,
//   Button,
//   Card,
//   CardContent,
//   Snackbar,
//   Alert,
//   FormControlLabel,
//   Switch,
// } from "@mui/material"
// import { KeyRound, Shield, Smartphone } from "lucide-react"

// const SecuritySettings = () => {
//   const [notification, setNotification] = useState({
//     open: false,
//     message: "",
//     severity: "success" as "success" | "error",
//   })

//   const [passwordForm, setPasswordForm] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   })

//   const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)

//   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setPasswordForm({
//       ...passwordForm,
//       [name]: value,
//     })
//   }

//   const handlePasswordSubmit = (e: React.FormEvent) => {
//     e.preventDefault()

//     // Validation
//     if (passwordForm.newPassword !== passwordForm.confirmPassword) {
//       setNotification({
//         open: true,
//         message: "New passwords do not match",
//         severity: "error",
//       })
//       return
//     }

//     // Here you would make an API call to update the password
//     setNotification({
//       open: true,
//       message: "Password updated successfully!",
//       severity: "success",
//     })

//     // Reset form
//     setPasswordForm({
//       currentPassword: "",
//       newPassword: "",
//       confirmPassword: "",
//     })
//   }

//   const handleTwoFactorToggle = () => {
//     // In a real app, this would open a setup flow for 2FA
//     setTwoFactorEnabled(!twoFactorEnabled)

//     setNotification({
//       open: true,
//       message: !twoFactorEnabled ? "Two-factor authentication enabled!" : "Two-factor authentication disabled",
//       severity: "success",
//     })
//   }

//   return (
//     <Box>
//       <Typography variant="h6" gutterBottom>
//         Security Settings
//       </Typography>
//       <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
//         Manage your account security and authentication methods
//       </Typography>

//       <Grid container spacing={3}>
//         <Grid item xs={12}>
//           <Card variant="outlined">
//             <CardContent>
//               <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     bgcolor: "rgba(160, 82, 45, 0.1)",
//                     borderRadius: "50%",
//                     p: 1,
//                     color: "#A0522D",
//                   }}
//                 >
//                   <KeyRound size={20} />
//                 </Box>
//                 <Typography variant="h6">Change Password</Typography>
//               </Box>

//               <form onSubmit={handlePasswordSubmit}>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12}>
//                     <TextField
//                       fullWidth
//                       type="password"
//                       label="Current Password"
//                       name="currentPassword"
//                       value={passwordForm.currentPassword}
//                       onChange={handlePasswordChange}
//                       required
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={6}>
//                     <TextField
//                       fullWidth
//                       type="password"
//                       label="New Password"
//                       name="newPassword"
//                       value={passwordForm.newPassword}
//                       onChange={handlePasswordChange}
//                       required
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={6}>
//                     <TextField
//                       fullWidth
//                       type="password"
//                       label="Confirm New Password"
//                       name="confirmPassword"
//                       value={passwordForm.confirmPassword}
//                       onChange={handlePasswordChange}
//                       required
//                     />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
//                       <Button
//                         type="submit"
//                         variant="contained"
//                         sx={{
//                           backgroundColor: "#A0522D",
//                           "&:hover": {
//                             backgroundColor: "#8B4513",
//                           },
//                         }}
//                       >
//                         Update Password
//                       </Button>
//                     </Box>
//                   </Grid>
//                 </Grid>
//               </form>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12}>
//           <Card variant="outlined">
//             <CardContent>
//               <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     bgcolor: "rgba(160, 82, 45, 0.1)",
//                     borderRadius: "50%",
//                     p: 1,
//                     color: "#A0522D",
//                   }}
//                 >
//                   <Smartphone size={20} />
//                 </Box>
//                 <Box sx={{ flexGrow: 1 }}>
//                   <Typography variant="h6">Two-Factor Authentication</Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Add an extra layer of security to your account
//                   </Typography>
//                 </Box>
//                 <FormControlLabel
//                   control={
//                     <Switch
//                       checked={twoFactorEnabled}
//                       onChange={handleTwoFactorToggle}
//                       sx={{
//                         "& .MuiSwitch-switchBase.Mui-checked": {
//                           color: "#A0522D",
//                           "&:hover": {
//                             backgroundColor: "rgba(160, 82, 45, 0.08)",
//                           },
//                         },
//                         "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
//                           backgroundColor: "#A0522D",
//                         },
//                       }}
//                     />
//                   }
//                   label=""
//                 />
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12}>
//           <Card variant="outlined">
//             <CardContent>
//               <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     bgcolor: "rgba(160, 82, 45, 0.1)",
//                     borderRadius: "50%",
//                     p: 1,
//                     color: "#A0522D",
//                   }}
//                 >
//                   <Shield size={20} />
//                 </Box>
//                 <Box sx={{ flexGrow: 1 }}>
//                   <Typography variant="h6">Login Sessions</Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Manage your active sessions and sign out from other devices
//                   </Typography>
//                 </Box>
//                 <Button
//                   variant="outlined"
//                   color="error"
//                   onClick={() => {
//                     setNotification({
//                       open: true,
//                       message: "Logged out from all other devices",
//                       severity: "success",
//                     })
//                   }}
//                 >
//                   Sign Out All Devices
//                 </Button>
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       <Snackbar
//         open={notification.open}
//         autoHideDuration={6000}
//         onClose={() => setNotification({ ...notification, open: false })}
//       >
//         <Alert severity={notification.severity}>{notification.message}</Alert>
//       </Snackbar>
//     </Box>
//   )
// }

// export default SecuritySettings

