import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FiMenu } from "react-icons/fi"; // Menu icon
import {
  FaTachometerAlt,
  FaClipboardList,
  FaFolderOpen,
  FaSignOutAlt,
} from "react-icons/fa"; // Dashboard, Todos, Projects, Logout icons
import { useAuth } from "../context/AuthContext"; // Assuming you have an AuthContext
import { logout } from "../../services/authService";
const Layout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const drawerContent = (
    <>
      <List>
        {user?.role === "admin" && (
          <ListItem
            button
            onClick={() => handleNavigation("/admin")}
            selected={location.pathname === "/admin"}
          >
            <ListItemIcon>
              <FaTachometerAlt />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        )}
        <ListItem
          button
          onClick={() => handleNavigation("/todo")}
          selected={location.pathname === "/todo"}
        >
          <ListItemIcon>
            <FaClipboardList />
          </ListItemIcon>
          <ListItemText primary="Todos" />
        </ListItem>
        <ListItem
          button
          onClick={() => handleNavigation("/projects")}
          selected={location.pathname === "/projects"}
        >
          <ListItemIcon>
            <FaFolderOpen />
          </ListItemIcon>
          <ListItemText primary="Projects" />
        </ListItem>
      </List>
      <List style={{ marginTop: "auto" }}>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <FaSignOutAlt />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <FiMenu />
            </IconButton>
          )}
          <Typography variant="h6" noWrap component="div">
            Team Task Manager
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
          },
        }}
      >
        <Toolbar />
        {drawerContent}
      </Drawer>
      <main style={{ flexGrow: 1, padding: theme.spacing(3), marginTop: 64 }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
