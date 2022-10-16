import React from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from "@material-ui/core";

const applications = [
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
];
const getBackgroundColor = (status) => {
  let color;
  if (status === "Accepted") {
      color = 'green';
  } else if (status  === "Rejected") {
      color = 'red';
  } else if (status  === "Applied") {
      color = 'orange';
  } else if (status  === "Wishlist") {
      color = 'green';
  }
  return color;
};

const ExTable = () => {
  return (
    <Table
      aria-label="simple table"
      sx={{
        mt: 3,
        whiteSpace: "nowrap",
      }}
    >
      <TableHead>
        <TableRow>
          
          <TableCell>
            <Typography color="textSecondary" variant="h6">
              Company
            </Typography>
          </TableCell>
          <TableCell>
            <Typography color="textSecondary" variant="h6">
              Company Link
            </Typography>
          </TableCell>
          <TableCell>
            <Typography color="textSecondary" variant="h6">
              Status
            </Typography>
          </TableCell>
          <TableCell align="right">
            <Typography color="textSecondary" variant="h6">
              Deadline
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {applications.map((application) => (
          <TableRow key={application.name}>
            <TableCell>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "600",
                    }}
                  >
                    {application.companyName}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    sx={{
                      fontSize: "13px",
                    }}
                  >
                    
                  </Typography>
                </Box>
              </Box>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                {application.companyLink}
              </Typography>
            </TableCell>
            <TableCell>
              <Chip
                sx={{
                  pl: "4px",
                  pr: "4px",
                  backgroundColor: getBackgroundColor(application.status),
                  color: "#fff",
                }}
                size="small"
                label={application.status}
              ></Chip>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6">{application.deadline}</Typography>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ExTable;
