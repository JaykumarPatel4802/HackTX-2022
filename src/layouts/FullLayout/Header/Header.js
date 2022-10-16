import React from "react";
//import { Link } from 'react-router-dom';
import MenuOutlinedIcon from "@material-ui/icons/MenuOutlined";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import AddToPhotosOutlinedIcon from "@material-ui/icons/AddToPhotosOutlined";

import PersonAdd from "@material-ui/icons/PersonAdd";
import Settings from "@material-ui/icons/Settings";
import Logout from "@material-ui/icons/Logout";


import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Menu,
  MenuItem,
  Button,
  Avatar,
  Divider,
  ListItemIcon,
  Modal,
  Typography,
  Grid,
  TextField,
} from "@material-ui/core";

import userimg from "../../../assets/images/users/user.jpg";

const Header = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openApplication, setOpenApplication] = React.useState(false);
  const handleOpenApplication = () => setOpenApplication(true);
  const handleClosepApplicatoin= () => setOpenApplication(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // 4
  const [anchorEl4, setAnchorEl4] = React.useState(null);

  const handleClick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };

  const handleClose4 = () => {
    setAnchorEl4(null);
  };

  // 5
  const [anchorEl5, setAnchorEl5] = React.useState(null);

  const handleClick5 = (event) => {
    setOpenApplication(true)
    console.log("Pressed add button")
  };

  const handleClose5 = () => {
    setAnchorEl5(null);
  };

  return (
    <AppBar sx={props.sx} elevation={0} className={props.customClass}>
      <Toolbar>
        
        <IconButton
          aria-label="menu"
          color="inherit"
          aria-controls="dd-menu"
          aria-haspopup="true"
          onClick={handleClick5}
        >
          <AddToPhotosOutlinedIcon />
        </IconButton>
        <Modal
        open={openApplication}
        onClose={handleClosepApplicatoin}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableScrollLock>
          <Box sx={{
                    
                    justifyContent: "center",
                    alignItems: "center",
                    maxWidth: (500),
                    minWidth: (500),
                    maxHeight: (300),
                    minHeight: (300),
                    top: 0, left: 0, 
                    right: 0, bottom: 0, 
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    top: '50%',
                    left: '50%',
                    p: 4,
                    transform: 'translate(-50%, -50%)',
                    overflow: 'scroll',
                    position: "absolute"
                }}>
          <Grid container direction = "column" sx={{justifyContent: "center",
                    alignItems: "center",}} >
              <Grid item xs={2}>
                  <Typography variant="h5" sx={{
                      display: 'flex', justifyContent: 'center', mt:(5)
                  }} >
                      Add Application
                  </Typography>
                  </Grid>
                  <Grid item xs={2} sx={{display: 'flex', justifyContent: 'center', mt:(5)}}>
                      <TextField sx={{ minWidth: (250), mt: (3) }} id="outlined-basic" label="Company Name" variant="outlined" />
                  </Grid>
                  <Grid item xs={2} sx={{display: 'flex', justifyContent: 'center', mt:(1)}}>
                      <TextField sx={{ minWidth: (250), mt: (3) }} id="outlined-basic" label="Company Link" variant="outlined" />
                  </Grid>
                  <Grid item xs={2} sx={{display: 'flex', justifyContent: 'center', mt:(1)}}>
                      <TextField sx={{ minWidth: (250), mt: (3) }} id="outlined-basic" label="Deadline" variant="outlined" />
                  </Grid>
                  <Grid item xs={2} sx={{display: 'flex', justifyContent: 'center', mt:(1)}}>
                      <TextField sx={{ minWidth: (250), mt: (3) }} id="outlined-basic" label="Status" variant="outlined" style = {{width: 100}}/>
                  </Grid>
                  <Grid item xs={2} sx={{
                            position:"flex" , justifyContent: 'center', alignItems: "center" ,mt: (6)
                        }}>
                            <Button href="/"  variant="contained" size="small" color="primary" sx={{
                                borderRadius: 0,
                                pt:(2),
                                pb: (2),
                                pl:(4),
                                pr: (4),
                                
                            }}>Add</Button>

                        </Grid>
                       
             
          </Grid>
          </Box>
        </Modal>
        <Menu
          id="dd-menu"
          anchorEl={anchorEl5}
          keepMounted
          open={Boolean(anchorEl5)}
          onClose={handleClose5}
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
          transformOrigin={{ horizontal: "left", vertical: "top" }}
          sx={{
            "& .MuiMenu-paper": {
              width: "250px",
              right: 0,
              top: "70px !important",
            },
          }}
        >
          <MenuItem onClick={handleClose5}>
            <Avatar
              sx={{
                width: "35px",
                height: "35px",
              }}
            />
            <Box
              sx={{
                ml: 2,
              }}
            >
              New Application
            </Box>
          </MenuItem>
        
        
         
        </Menu>
        <Box flexGrow={1} />

        {/* ------------------------------------------- */}
        {/* Notifications Dropdown */}
        {/* ------------------------------------------- */}
        
        
        {/* ------------------------------------------- */}
        {/* End Notifications Dropdown */}
        {/* ------------------------------------------- */}
        {/* ------------------------------------------- */}
        {/* Profile Dropdown */}
        {/* ------------------------------------------- */}
        <Box
          sx={{
            width: "1px",
            backgroundColor: "rgba(0,0,0,0.1)",
            height: "25px",
            ml: 1,
          }}
        ></Box>
        <Button
          aria-label="menu"
          color="inherit"
          aria-controls="profile-menu"
          aria-haspopup="true"
          onClick={handleClick4}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar
              src={userimg}
              alt={userimg}
              sx={{
                width: "30px",
                height: "30px",
              }}
            />
          </Box>
        </Button>
        <Menu
          id="profile-menu"
          anchorEl={anchorEl4}
          keepMounted
          open={Boolean(anchorEl4)}
          onClose={handleClose4}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          sx={{
            "& .MuiMenu-paper": {
              width: "250px",
              right: 0,
              top: "70px !important",
            },
          }}
        >
          <MenuItem onClick={handleClose4}>
            <Avatar
              sx={{
                width: "35px",
                height: "35px",
              }}
            />
            <Box
              sx={{
                ml: 2,
              }}
            >
              My account
            </Box>
          </MenuItem>
          <Divider />
          {/* <MenuItem onClick={handleClose4}>
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            Add another account
          </MenuItem> */}
          <MenuItem onClick={handleClose4}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={handleClose4}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
