import React, { useState, useEffect } from "react";
import { Box, Button, Chip, Grid, Stack, Typography } from "@mui/material";
import Typewriter from "typewriter-effect";
import { UserContext } from "../App";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { NavLink } from "react-router-dom";

const Home = () => {
  const { state, dispatch } = React.useContext(UserContext);
  let username = "";
  if (state.isLoggedIn) username = state.userData.user.name;

  // console.log(state);
  const handleClick = () => {};
  return (
    <>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
          backgroundColor: "#21d190",
          backgroundImage: "linear-gradient(315deg, #21d190 0%, #d65bca 74%)",
        }}
      >
        <Typography variant="h4" sx={{ fontFamily: "Itim" }}>
          {state.isLoggedIn ? `Hello ${username}, You're in! ` : ""}
        </Typography>
        {state.isLoggedIn ? (
          <Typography variant="h3" sx={{ fontFamily: "Itim" }}>
            The path to a healthier lifestyle begins with you !!
          </Typography>
        ) : (
          <Typography variant="h3" sx={{ fontFamily: "Barriecito" }}>
            Welcome to FitQuest !!
          </Typography>
        )}

        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={1}>
            <Typography component="span" variant="h4" color="Blue">
              Stay
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typewriter
              options={{
                deleteSpeed: 70,
                loop: true,
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString("Fit")
                  .deleteChars(3)
                  .typeString("Healthy")
                  .deleteChars(7)
                  .typeString("Robust")
                  .deleteChars(6)
                  .typeString("Toned")
                  .deleteChars(5)
                  .typeString("Thriving")
                  .deleteChars(8)
                  .typeString("Vibrant")
                  .deleteChars(7)
                  .typeString("Flourishing")
                  .deleteChars(11)
                  .typeString("Resilient")
                  .deleteChars(9)
                  .typeString("Stalwart")
                  .deleteChars(8)
                  .typeString("Wholesome")
                  .deleteChars(9)
                  .typeString("Dynamic")
                  .deleteChars(7)
                  .typeString("Invigorated")
                  .deleteChars(11)
                  .start();
              }}
            />
          </Grid>
        </Grid>
        <Box mt={1}>
          {state.isLoggedIn ? (
            <NavLink to="/wellness">
              <Button
                variant="contained"
                sx={{
                  borderRadius: "40px",
                }}
                endIcon={<ArrowCircleRightIcon />}
              >
                Visit Wellness Center
              </Button>
            </NavLink>
          ) : (
            <NavLink to="/login">
              <Button
                variant="contained"
                sx={{
                  borderRadius: "40px",
                }}
                endIcon={<ArrowCircleRightIcon />}
              >
                Please log in to access the features
              </Button>
            </NavLink>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Home;
