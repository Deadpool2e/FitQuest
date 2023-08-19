import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Divider,
  MenuItem,
  Paper,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import axios from "axios";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";

const baseURL =
  "https://health.gov/myhealthfinder/api/v3/itemlist.json?lang=en&type=topic";
const baseURL1 =
  "https://health.gov/myhealthfinder/api/v3/topicsearch.json?lang=en&topicId=";

const Wellness = () => {
  const [category, setCategory] = React.useState([]);
  const [value, setValue] = React.useState("");
  const [id, setId] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [result, setResult] = React.useState(null);
  const [iframeLoaded, setIframeLoaded] = React.useState(false);

  const handleIframeLoad = () => {
    setIframeLoaded(true);
  };

  const getCategory = async () => {
    try {
      const response = await axios.get(baseURL);
      setCategory(response.data.Result.Items.Item);
      // console.log(category);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${baseURL1}${id}`);
      setTimeout(() => {
        const resData = response.data;
        setResult(resData.Result.Resources.Resource);
        setIsLoading(false);
      }, 3500);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  React.useEffect(() => {
    getCategory();
  }, []);

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    setValue(selectedValue);

    const selectedOption = category.find(
      (option) => option.Title === selectedValue
    );
    if (selectedOption) {
      setId(selectedOption.Id);
    }
  };

  return (
    <Box>
      <Container>
        <Paper
          sx={{
            marginTop: 12,
            padding: "38px 20px",
            backgroundColor: "#F0F0F0",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Box
              width={700}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h4"
                style={{ fontFamily: "Kanit", color: "#007BFF" }}
              >
                Empowering Healthy Choices:
              </Typography>
              <Typography
                variant="h5"
                mt={1}
                style={{ fontFamily: "Kanit", color: "#008080" }}
              >
                Discover Your Age-specific Health Guidelines.
              </Typography>
            </Box>
            <Paper
              sx={{
                marginLeft: "100px",
                padding: "20px 20px 0px 20px",
              }}
            >
              <iframe
                src="https://www.health.gov/myhealthfinder?badge=true"
                name="myhealthfinderframe"
                frameBorder="0"
                id="myhealthfinderframe"
                scrolling="yes"
                height="250"
                width="178"
                marginHeight="0"
                title="myhealthfinder widget"
                marginWidth="0"
                onLoad={handleIframeLoad}
                style={{ display: iframeLoaded ? "block" : "none" }}
              />
              {!iframeLoaded && (
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  height={250}
                  width={178}
                />
              )}
            </Paper>
          </Box>
        </Paper>
        <Paper
          sx={{
            marginY: 3,
            padding: 5,
            backgroundColor: "#E0F2F7",
          }}
        >
          <Typography
            variant="h5"
            style={{
              fontFamily: "Kanit",
              color: "#006400",
              textDecoration: "underline",
            }}
            textAlign="center"
          >
            <HealthAndSafetyIcon
              sx={{
                marginRight: 1,
              }}
            />
            Explore a World of Wellness: Search Our Health Library for
            Informative Articles and Insights
          </Typography>
          <Box
            sx={{
              padding: "45px 80px",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Box width={500}>
              <TextField
                select
                label="Select"
                helperText={value ? "" : "Please select category"}
                value={value}
                onChange={handleChange}
                sx={{
                  width: "100%",
                }}
              >
                {category.map((option) => (
                  <MenuItem key={option.Id} value={option.Title}>
                    {option.Title}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box ml={10}>
              <Button variant="contained" onClick={fetchData}>
                Search
              </Button>
            </Box>
          </Box>
          {isLoading ? (
            <Box
              p={3}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Skeleton
                variant="rectangular"
                width={345}
                height={345}
                animation="wave"
              />
            </Box>
          ) : result !== null ? (
            <>
              <Box
                p={3}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Card sx={{ maxWidth: 345 }}>
                  <a
                    href={result[0].AccessibleVersion}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="100%"
                        image={result[0].ImageUrl}
                        alt={result[0].ImageAlt}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {result[0].Title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {result[0].Categories}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </a>
                </Card>
              </Box>
              <Box mt={3}>
                <Typography
                  variant="h6"
                  mb={1}
                  textAlign="center"
                  fontWeight="bold"
                >
                  Related Topics
                </Typography>
                <Divider />
                <Stack
                  direction="row"
                  spacing={1}
                  mt={2}
                  sx={{ justifyContent: "center" }}
                >
                  {result[0].RelatedItems.RelatedItem.slice(0, 5).map(
                    (item) => (
                      <Card
                        sx={{
                          maxWidth: 300,
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <CardContent>
                          <Typography gutterBottom variant="subtitle1">
                            {item.Title}
                          </Typography>
                        </CardContent>
                        <div style={{ flexGrow: 1 }}></div>
                        <CardActions>
                          <a
                            href={item.Url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <Button size="small">Learn More</Button>
                          </a>
                        </CardActions>
                      </Card>
                    )
                  )}
                </Stack>
              </Box>
            </>
          ) : null}
        </Paper>
      </Container>
    </Box>
  );
};

export default Wellness;
