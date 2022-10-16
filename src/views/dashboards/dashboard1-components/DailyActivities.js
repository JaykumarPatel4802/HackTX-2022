import React from "react";
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

const applications = [
  {
    deadline: "October 20, 2022",
    companyName: "Amazon",
    companyLink: "www.amazon.com",
  },
  {
    deadline: "October 20, 2022",
    companyName: "Amazon",
    companyLink: "www.amazon.com",
  },
  {
    deadline: "October 20, 2022",
    companyName: "Amazon",
    companyLink: "www.amazon.com",
  },
  {
    deadline: "October 20, 2022",
    companyName: "Amazon",
    companyLink: "www.amazon.com",
  },
  {
    deadline: "October 20, 2022",
    companyName: "Amazon",
    companyLink: "www.amazon.com",
  },
];

const DailyActivities = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
            
            <Menu
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
            </Menu>
          </Box>
        </Box>
        <Timeline
          sx={{
            p: 0,
          }}
        >
          {applications.map((application) => (
            <TimelineItem key={application.companyName}>
              <TimelineOppositeContent
                sx={{
                  fontSize: "12px",
                  fontWeight: "700",
                  flex: "0",
                }}
              >
                {application.deadline}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot
                  variant="outlined"
                  sx={{
                    borderColor: application.color,
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
                {application.companyName}
              </TimelineContent>
              <TimelineContent
                color="text.secondary"
                sx={{
                  fontSize: "14px",
                }}
              >
                <Link to = '${application.companyLink}' > 
                  
                   Go to application
                 
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
