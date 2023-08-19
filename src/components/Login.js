import React, { useContext, useState } from "react";
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
  Avatar,
} from "@mui/material";
import image from "../assests/images/wet_petals.jpg";
import person from "../assests/images/key.png";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Login = () => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  let name, value;

  const handleChange = (e) => {
    // console.log(e.target);
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };


  const postData = async (e) => {
    
    e.preventDefault();
    const { email, password } = user;

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      window.alert("Please enter a valid email address.");
      return;
    }

    
    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (res.status === 400) {
      window.alert("Incorrect Password");
    } else if (res.status === 404) {
      window.alert("User not found");
    } else if (res.status === 422) {
      window.alert("Fields cannot be empty");
    } else if (res.status === 200) {
      dispatch({ type: "LOGIN", payload: data });
      window.alert("Login successful");
      navigate("/");
    } else {
      window.alert("An error occurred. Please try again later.");
    }
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
        <img src={`${image}`} alt={"item.title"} />
      </Box>
      <Container
        sx={{
          width: 500,
          mt: 18,
          bgcolor: "rgb(10 25 41 / 0%)",
        }}
      >
        <ThemeProvider theme={darkTheme}>
          <Paper
            elevation={2}
            sx={{
              padding: "30px",
              bgcolor: "rgb(10 24 41 / 49%)",
              opacity: "1.5",
              boxShadow: "none",
              backdropFilter: "blur(8px)",
              color: "rgb(204 254 255)",
              borderRadius: "50px",
            }}
          >
            <Stack
              spacing={3}
              sx={{
                alignItems: "center",
              }}
            >
              <Avatar
                sx={{ width: 80, height: 80, padding: 3, bgcolor: "grey" }}
                alt="personimage"
                src={person}
              />

              <Box component="form" autoComplete="off" method="POST">
                <Stack spacing={2}>
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <EmailIcon
                      sx={{ color: "action.active", mr: 2, my: 0.5 }}
                    />
                    <TextField
                      label="Email"
                      size="small"
                      placeholder="fitquest@gmail.com"
                      variant="standard"
                      name="email"
                      required
                      className="login-input"
                      value={user.email}
                      onChange={handleChange}
                      sx={{ width: 250 }}
                    />
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <LockIcon sx={{ color: "action.active", mr: 2, my: 0.5 }} />
                    <TextField
                      label="Password"
                      size="small"
                      type="password"
                      variant="standard"
                      name="password"
                      required
                      className="login-input"
                      value={user.password}
                      onChange={handleChange}
                      sx={{ width: 250 }}
                    />
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{
                      display: "flex",
                      fontSize: "12px",
                      justifyContent: "flex-end",
                      color: "#c4c1c1e3",
                    }}
                  >
                    Forget Password?
                  </Typography>
                  <Button variant="contained" onClick={postData}>
                    Login
                  </Button>
                  <Button
                    variant="text"
                    color="primary"
                    onClick={() => {
                      navigate("/register");
                    }}
                  >
                    New User? Register
                  </Button>
                </Stack>
              </Box>
            </Stack>
          </Paper>
        </ThemeProvider>
      </Container>
    </>
  );
};

export default Login;
