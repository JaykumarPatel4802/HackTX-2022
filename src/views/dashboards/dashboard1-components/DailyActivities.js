import React from "react";
import { useState, useEffect } from "react";

import {
  Card,
  CardContent,
  Typography,
  Box,
  Menu,
  MenuItem,
  IconButton,
} from "@material-ui/core";

import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";

import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import { Link } from "react-router-dom";

const options = ["Action", "Another Action", "Something else here"];

const getBackgroundColor = (status) => {
  let color;
  if (status === "Accepted") {
      color = 'green';
  } else if (status  === "Rejected") {
      color = 'red';
  } else if (status  === "Applied") {
      color = 'orange';
  } else if (status  === "Not Applied") {
      color = 'gray';
  } else if(status === "OA"){
    color = 'purple'
  }else if(status === "Offer"){
    color = 'blue'
  }
  return color;
};

const DailyActivities = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [applications, setdata] = useState(
    [
      {
        companyName: "Amazon",
        companyLink: "Amazon.com",
        deadline: "October 22, 2022",
        status: "Accepted"
      },
      {
        
        companyName: "Amazon",
        companyLink: "Amazon.com",
        deadline: "October 22, 2022",
        status: "Rejected"
      },
      {
        
        companyName: "Amazon",
        companyLink: "Amazon.com",
        deadline: "October 22, 2022",
        status: "Not Applied"
      },
      {
        
        companyName: "Amazon",
        companyLink: "Amazon.com",
        deadline: "October 22, 2022", 
        status: "Accepted"
      },
    ]
);

fetch("/get_documents/email").then((res) =>
        res.json().then((data) => {
            // Setting a data from api
            setdata(data["documents"]);
        })
    );
  
let filtered_applications = [];
for (let i = 0; i < applications.length; i++) {
  let row = applications[i];
  if (row["datetime"] != null) {
    filtered_applications.push(row);
  }
}

console.log("filtered_applicatons")
console.log(filtered_applications)

const sorted_applications = filtered_applications.sort((a, b) => Date.parse(a["datetime"]) - Date.parse(b["datetime"]));

console.log("sorted_applications")
console.log(sorted_applications)

  return (
    <Card
      variant="outlined"
      sx={{
        pb: 0,
      }}
    >
      <CardContent
        sx={{
          pb: "0 !important",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            mb: 5,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontWeight: "500",
                fontSize: "h3.fontSize",
                marginBottom: "0",
              }}
              gutterBottom
            >
              Deadlines Approaching
            </Typography>
           
          </Box>
          <Box
            sx={{
              marginLeft: "auto",
            }}
          >
            {/* <IconButton
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertOutlinedIcon />
            </IconButton> */}
            {/* <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              {options.map((option) => (
                <MenuItem
                  key={option}
                  selected={option === "Pyxis"}
                  onClick={handleClose}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu> */}
          </Box>
        </Box>
        <Timeline
          sx={{
            p: 0,
          }}
        >
          {sorted_applications.map((sorted_applications) => (
            <TimelineItem key={sorted_applications.company_name}>
              <TimelineOppositeContent
                sx={{
                  fontSize: "12px",
                  fontWeight: "700",
                  flex: "0",
                }}
              >
                {sorted_applications.datetime}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot
                  variant="outlined"
                  sx={{
                    // borderColor: application.color,
                    borderColor: getBackgroundColor(sorted_applications.status),
                  }}
                />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent
                color="text.primary"
                sx={{
                  fontSize: "14px",
                }}
              >
                {sorted_applications.company_name}
              </TimelineContent>
              <TimelineContent
                color="text.secondary"
                sx={{
                  fontSize: "14px",
                }}
              >
                <Link to = '${application.companyLink}' > 
                  
                   Link
                 
                </Link>
                
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
};

export default DailyActivities;
