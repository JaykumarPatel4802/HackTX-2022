import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";

import ExTable from "./ExTable";

const ProductPerformance = () => {
  const [age, setAge] = React.useState("'");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <Card variant="outlined">
      <CardContent>
        <Box
          sx={{
            display: {
              sm: "flex",
              xs: "block",
            },
            alignItems: "flex-start",
          }}
        >
          <Box>
            <Typography
              variant="h3"
              sx={{
                marginBottom: "0",
              }}
              gutterBottom
            >
              Applications
            </Typography>
          </Box>

          <Box
            sx={{
              marginLeft: "auto",
              mt: {
                lg: 0,
                xs: 2,
              },
            }}
          >
            <FormControl variant="standard" sx={{ minWidth: 120 }}>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={age}
                onChange={handleChange}
                label="Age"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Applied</MenuItem>
                <MenuItem value={20}>Accepted</MenuItem>
                <MenuItem value={30}>Rejected</MenuItem>
                <MenuItem value={30}>Wishlist</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box
          sx={{
            overflow: "auto",
            mt: 3,
          }}
        >
          <ExTable />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductPerformance;
