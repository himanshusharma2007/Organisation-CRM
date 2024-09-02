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
import { useAuth } from "../../context/AuthContext"; // Assuming you have an AuthContext
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
    <div className="flex flex-col justify-between h-full ">
      <List className="">
        {user?.role === "admin" && (
          <ListItem
            button
            onClick={() => handleNavigation("/admin")}
            selected={
              location.pathname === "/admin" ||
              location.pathname === "/admin/users" ||
              location.pathname === "/admin/user/:id"
            }
            className={`cursor-pointer ${
              location.pathname === "/admin" ||
              location.pathname === "/admin/users" ||
              location.pathname === "/admin/user/:id"
                ? "bg-blue-500 text-white hover:bg-blue-600 !important"
                : "hover:bg-gray-100"
            }`}
          >
            <ListItemIcon className="text-inherit">
              <FaTachometerAlt />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        )}
        <ListItem
          button
          onClick={() => handleNavigation("/todo")}
          selected={location.pathname === "/todo"}
          className={`cursor-pointer hover:bg-blue-600 ${
            location.pathname === "/todo"
              ? "bg-blue-500 text-white "
              : "hover:bg-gray-100"
          }`}
        >
          <ListItemIcon className="text-inherit">
            <FaClipboardList />
          </ListItemIcon>
          <ListItemText primary="Todos" />
        </ListItem>
        <ListItem
          button
          onClick={() => handleNavigation("/projects")}
          selected={location.pathname === "/projects"}
          className={`cursor-pointer ${
            location.pathname === "/projects"
              ? " hover:bg-blue-600  bg-blue-500 text-white !important"
              : "hover:bg-gray-100"
          }`}
        >
          <ListItemIcon className="text-inherit">
            <FaFolderOpen />
          </ListItemIcon>
          <ListItemText primary="Projects" />
        </ListItem>
      </List>
      <List className="mt-auto ">
        <ListItem
          button
          onClick={handleLogout}
          className="cursor-pointer hover:bg-blue-600"
        >
          <ListItemIcon className="text-inherit">
            <FaSignOutAlt />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className="flex min-h-screen">
      <AppBar
        position="fixed"
        className="z-10 bg-blue-600 "
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar className="flex justify-between">
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className="mr-2"
            >
              <FiMenu />
            </IconButton>
          )}
          <Typography variant="h6" noWrap component="div" className="text-center flex-grow">
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
      <main className="flex-grow p-6 mt-16  md:pl-[240px] ">{children}</main>
    </div>
  );
};

export default Layout;
