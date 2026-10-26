import React, { useState } from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Avatar,
  Badge,
  Switch,
  Button,
  Box,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";

function App() {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: darkMode ? "#222" : "#f5f5f5",
        color: darkMode ? "white" : "black",
      }}
    >
      {/* AppBar */}
      <AppBar position="static">
        <Toolbar>
          {/* Menu Button */}
          <IconButton
            color="inherit"
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            sx={{ flexGrow: 1 }}
          >
            My Dashboard
          </Typography>

          {/* Badge + Notification */}
          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* Avatar */}
          <Avatar
            sx={{ marginLeft: 2 }}
            alt="Sakshi"
            src="https://i.pravatar.cc/150?img=5"
          />
        </Toolbar>
      </AppBar>

      {/* Drawer / Sidebar */}
      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box sx={{ width: 250 }}>
          <Typography
            variant="h6"
            sx={{ padding: 2 }}
          >
            Sidebar
          </Typography>

          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Settings" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome 👋
        </Typography>

        <Typography variant="body1" sx={{ marginBottom: 3 }}>
          This is a simple MUI dashboard using different components.
        </Typography>

        {/* Avatar Section */}
        <Typography variant="h6">
          User
        </Typography>

        <Avatar
          sx={{ marginTop: 1, marginBottom: 3 }}
          alt="User"
          src="https://i.pravatar.cc/150?img=12"
        />

        {/* Switch */}
        <Box sx={{ marginBottom: 3 }}>
          <Typography>
            Dark Mode
            <Switch
              checked={darkMode}
              onChange={(e) => setDarkMode(e.target.checked)}
            />
          </Typography>
        </Box>

        {/* Badge */}
        <Box sx={{ marginBottom: 3 }}>
          <Badge badgeContent={10} color="primary">
            <Button variant="outlined">
              Messages
            </Button>
          </Badge>
        </Box>

        {/* Button */}
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
        >
          Open Sidebar
        </Button>
      </Box>
    </Box>
  );
}

export default App;