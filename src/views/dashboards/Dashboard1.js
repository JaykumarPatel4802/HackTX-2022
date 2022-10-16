import React from "react";
import { Grid, Box } from "@material-ui/core";

import {
  ProductPerformance,
  DailyActivities,
  BlogCard,
} from "./dashboard1-components";

const Dashboard1 = () => {
  // 2

  return (
    <Box>
      <Grid container spacing={0}>
        
        <Grid item xs={12} lg={4}>
          <DailyActivities />
        </Grid>
        <Grid item xs={12} lg={8}>
          <ProductPerformance />
        </Grid>
        <Grid>
          <BlogCard />
        </Grid>
        {/* ------------------------- row 3 ------------------------- */}
        
      </Grid>
    </Box>
  );
};

export default Dashboard1;
