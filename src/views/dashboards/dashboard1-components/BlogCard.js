import React from "react";
import { Card, CardContent, Typography, Button, Grid } from "@material-ui/core";

import user1 from "../../../assets/images/backgrounds/u2.jpg";
import user2 from "../../../assets/images/backgrounds/u3.jpg";
import user3 from "../../../assets/images/backgrounds/u4.jpg";

const blogs = [
  {
    img: user1,
    title: "CS Careers Dev",
    subtitle: "Find where companies are in their recruitment process!",
    link:
      "https://www.cscareers.dev/process-tracking/2023-summer-intern",
    btncolor: "error",
  },
  {
    img: user2,
    title: "Levels Fyi",
    subtitle: "Find what salaries companies are paying!",
    link:
      "https://www.levels.fyi/internships/",
    btncolor: "warning",
  },
  {
    img: user3,
    title: "Summer 2023 Tech Internship - Pitt CSC",
    subtitle: "Check out some of the most popular internships!",
    link:
      "https://github.com/pittcsc/Summer2023-Internships",
    btncolor: "primary",
  },
];

const BlogCard = () => {
  return (
    <Grid container>
      {blogs.map((blog, index) => (
        <Grid
          key={index}
          item
          xs={12}
          lg={4}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <Card
            variant="outlined"
            sx={{
              p: 0,
              width: "100%",
            }}
          >
            {/* <img src={blog.img} alt="img" width="100%" /> */}
            <CardContent
              sx={{
                paddingLeft: "30px",
                paddingRight: "30px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "h4.fontSize",
                  fontWeight: "500",
                }}
              >
                {blog.title}
              </Typography>
              <Typography
                color="textSecondary"
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  mt: 1,
                }}
              >
                {blog.subtitle}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  mt: "15px",
                }}
                color={blog.btncolor}
                href={blog.link}
              >
                Access Site
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default BlogCard;
