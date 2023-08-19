import {
  Box,
  Button,
  Container,
  FormControl,
  Paper,
  Stack,
  TextField,
  InputLabel,
  OutlinedInput,
  IconButton,
  InputAdornment,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React from "react";

import bgvedio from "../assests/vedios/_import_61a46b3620cdd2.53815004_FPpreview.mp4";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { NavLink, useNavigate } from "react-router-dom";

// const customTheme = (outerTheme) =>
//   createTheme({
//     palette: {
//       mode: outerTheme.palette.mode,
//     },
//     components: {
//       MuiTextField: {
//         styleOverrides: {
//           root: {
//             '--TextField-brandBorderColor': '#E0E3E7',
//             '--TextField-brandBorderHoverColor': '#B2BAC2',
//             '--TextField-brandBorderFocusedColor': '#6F7E8C',
//             '& label.Mui-focused': {
//               color: 'var(--TextField-brandBorderFocusedColor)',
//             },
//           },
//         },
//       },
//       MuiOutlinedInput: {
//         styleOverrides: {
//           notchedOutline: {
//             borderColor: 'var(--TextField-brandBorderColor)',
//           },
//           root: {
//             [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
//               borderColor: 'var(--TextField-brandBorderHoverColor)',
//             },
//             [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
//               borderColor: 'var(--TextField-brandBorderFocusedColor)',
//             },
//           },
//         },
//       },
//       MuiFilledInput: {
//         styleOverrides: {
//           root: {
//             '&:before, &:after': {
//               borderBottom: '2px solid var(--TextField-brandBorderColor)',
//             },
//             '&:hover:not(.Mui-disabled, .Mui-error):before': {
//               borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
//             },
//             '&.Mui-focused:after': {
//               borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
//             },
//           },
//         },
//       },
//       MuiInput: {
//         styleOverrides: {
//           root: {
//             '&:before': {
//               borderBottom: '2px solid var(--TextField-brandBorderColor)',
//             },
//             '&:hover:not(.Mui-disabled, .Mui-error):before': {
//               borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
//             },
//             '&.Mui-focused:after': {
//               borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
//             },
//           },
//         },
//       },
//     },
//   });

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState({
    name: "",
    email: "",
    phonenumber: "",
    gender: "",
    age: "",
    password: "",
    confirmpassword: "",
  });

  let name, value;

  const handleInputs = (e) => {
    // console.log(e);
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();
    const { name, email, phonenumber, gender, age, password, confirmpassword } =
      user;

    // Email format validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      window.alert("Please enter a valid email address.");
      return;
    }

    // Phone number validation
    const phoneNumberRegex = /^\d{10}$/; // 10 digits
    if (!phoneNumberRegex.test(phonenumber)) {
      window.alert("Please enter a valid 10-digit phone number.");
      return;
    }

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phonenumber,
        gender,
        age,
        password,
        confirmpassword,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 400 || res.status === 500) {
      window.alert(data.error);
    } else if (res.status === 201) {
      navigate("/login");
      window.alert("Registration successful.");
    } else {
      window.alert("An error occurred. Please try again later.");
    }
  };

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          position: "fixed",
          zIndex: "-1",
          flexDirection: "column",
          top: "0px",
        }}
      >
        <video autoPlay loop muted>
          <source src={bgvedio} type="video/mp4" />
          <source src={bgvedio} type="video/ogg" />
        </video>
      </Box>
      <Container
        maxWidth="sm"
        sx={{
          mt: "100px",
          bgcolor: "rgb(10 25 41 / 0%)",
        }}
      >
        <Paper
          elevation={2}
          sx={{
            padding: "20px",
            textAlign: "center",
            bgcolor: "rgb(10 24 41 / 49%)",
            opacity: "1.5",
            boxShadow: "none",
            backdropFilter: "blur(8px)",
            color: "rgb(204 254 255)",
          }}
        >
          <>
            <ThemeProvider theme={darkTheme}>
              <Box component="form" autoComplete="off" method="post">
                <Stack spacing={3} width={350} sx={{ marginX: "auto" }}>
                  <TextField
                    label="Name"
                    size="small"
                    name="name"
                    value={user.name}
                    onChange={handleInputs}
                    required
                  />
                  <TextField
                    label="Email"
                    size="small"
                    name="email"
                    value={user.email}
                    onChange={handleInputs}
                    placeholder="fitquest@gmail.com"
                    required
                  />
                  <TextField
                    label="Phone Number"
                    size="small"
                    placeholder="XXXXXXXXXX"
                    type="number"
                    required
                    name="phonenumber"
                    value={user.phonenumber}
                    onChange={handleInputs}
                    // helperText={
                    //   value ? 'Required' : 'Do not share your password with anyone'
                    // }
                  />
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small-label">Gender</InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={user.gender}
                      onChange={handleInputs}
                      name="gender"
                      label="Gender"
                    >
                      <MenuItem value={10}>Male</MenuItem>
                      <MenuItem value={20}>Female</MenuItem>
                      <MenuItem value={30}>Prefer not to say</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    label="Age"
                    size="small"
                    type="number"
                    name="age"
                    value={user.age}
                    onChange={handleInputs}
                  />
                  <>
                    <FormControl sx={{ m: 1 }} variant="outlined">
                      <InputLabel
                        htmlFor="outlined-adornment-password"
                        sx={{ mt: "-0.5rem" }}
                      >
                        Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        size="small"
                        required
                        name="password"
                        value={user.password}
                        onChange={handleInputs}
                        className="register-password"
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </FormControl>
                    <FormControl sx={{ m: 1 }} variant="outlined">
                      <InputLabel
                        htmlFor="outlined-adornment-password"
                        sx={{ mt: "-0.5rem" }}
                      >
                        Confirm Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        size="small"
                        required
                        name="confirmpassword"
                        value={user.confirmpassword}
                        onChange={handleInputs}
                        className="register-password"
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Confirm Password"
                      />
                    </FormControl>
                  </>
                  <Button variant="contained" onClick={postData}>
                    SignUp
                  </Button>
                </Stack>
              </Box>
            </ThemeProvider>
          </>
        </Paper>
      </Container>
    </>
  );
};

export default Register;
