import React, { useContext } from "react";
import {
  Avatar,
  Box,
  Container,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { UserContext } from "../App";

const About = () => {
  const { state } = useContext(UserContext);
  const user = state.userData.user;

  const updateGender = (value)=>{
      if(value===10) return "Male";
      else if(value===20) return "Female";
      else return "Prefer not to say";
  }
  if (user)
    var avatarText = user.name
      .split(" ")
      .map((word) => word[0])
      .join("");

  return (
    <Box
    height="100vh"
    
     sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: "#ffcfdf",
        backgroundImage: "linear-gradient(315deg, #ffcfdf 0%, #b0f3f1 74%)",
    }}>
    
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      
      p={5}
      width={400}
      marginX="auto"
      borderRadius={16}  
      boxShadow={10}     
    >
      <Avatar
        sx={{
          width: 80,
          height: 80,
          backgroundColor: deepPurple[500],
          fontSize: 32,
        }}
      >
        {avatarText}
      </Avatar>
      <Typography variant="h5" mt={2}>
        Profile Information
      </Typography>
      <Box >
        <TextField
          label="Name"
          value={user.name}
          InputProps={{
            readOnly: true,
          }}
          fullWidth
          variant="outlined"
          margin="normal"
          size="small"
          
        />
        <TextField
          label="Gender"
          value={updateGender(user.gender)}
          InputProps={{
            readOnly: true,
          }}
          fullWidth
          variant="outlined"
          margin="normal"
          size="small"
        />
        <TextField
          label="Age"
          value={user.age}
          InputProps={{
            readOnly: true,
          }}
          fullWidth
          variant="outlined"
          margin="normal"
          size="small"
        />
        <TextField
          label="Email"
          value={user.email}
          InputProps={{
            readOnly: true,
          }}
          fullWidth
          variant="outlined"
          margin="normal"
          size="small"
          
        />
        <TextField
          label="Phone Number"
          value={user.phonenumber}
          InputProps={{
            readOnly: true,
          }}
          fullWidth
          variant="outlined"
          margin="normal"
          size="small"
        />
        
      </Box>
    </Box>
    </Box>
  );
};

export default About;
