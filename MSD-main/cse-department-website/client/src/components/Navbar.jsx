// Navigation bar - MUI AppBar + Toolbar, responsive Drawer for mobile.
import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Container,
  Chip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ComputerIcon from "@mui/icons-material/Computer";

const links = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Academics", path: "/academics" },
  { label: "Faculty", path: "/faculty" },
  { label: "Activities", path: "/activities" },
  { label: "Projects", path: "/projects" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  // State: controls the mobile side menu (open/close)
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <ComputerIcon sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ flexGrow: 1, textDecoration: "none", color: "inherit", fontWeight: 700 }}
          >
            CSE <Box component="span" sx={{ display: { xs: "none", md: "inline" } }}>| D. Y. Patil College, Kolhapur</Box>
          </Typography>

          {/* Desktop links */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 0.5 }}>
            {links.map((link) => (
              <Button
                key={link.path}
                component={NavLink}
                to={link.path}
                color="inherit"
                sx={{
                  borderBottom:
                    location.pathname === link.path ? "2px solid #e8a020" : "2px solid transparent",
                }}
              >
                {link.label}
              </Button>
            ))}
          </Box>

          {/* Mobile menu button */}
          <IconButton
            color="inherit"
            edge="end"
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={() => setDrawerOpen(true)}
            aria-label="open menu"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile drawer menu */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 240, pt: 1 }}>
          <List>
            {links.map((link) => (
              <ListItemButton
                key={link.path}
                component={Link}
                to={link.path}
                selected={location.pathname === link.path}
                onClick={() => setDrawerOpen(false)}
              >
                <ListItemText primary={link.label} />
              </ListItemButton>
            ))}
            <ListItemButton component={Link} to="/admin/login" onClick={() => setDrawerOpen(false)}>
              <ListItemText primary="Admin" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>

      {/* Small sample banner so visitors know content is editable */}
      <Box sx={{ display: "flex", justifyContent: "center", py: 0.5, bgcolor: "#fff8e6" }}>
        <Chip
          size="small"
          color="warning"
          variant="outlined"
          label="Demo website - sample content is clearly marked and can be edited later"
        />
      </Box>
    </>
  );
}
