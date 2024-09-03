import React, { createContext, useState, useContext, useEffect } from "react";
import { getUser } from "../services/authService";
import { getAllProjects, getUserProjects } from "../services/projectService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(true);
  const [selectedDev, setSelectedDev] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      try {
        const userData = await getUser();
        console.log("userData :>> ", userData);
        setUser(userData);
      } catch (error) {
        console.error("Failed to load user:", error);
        setError("Failed to load user");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  useEffect(() => {
 

    fetchProjects();
  }, [user]); // Add user as a dependency
   const fetchProjects = async () => {
     if (!user) return; // Ensure user is loaded before fetching projects
     console.log("fetch projects called", user);
     setLoading(true);
     try {
       const data =
         user?.role === "admin"
           ? await getAllProjects()
           : await getUserProjects();
       console.log("data in fetch projects:>> ", data);
       setProjects(data);
     } catch (error) {
       setError("Failed to fetch projects");
     } finally {
       setLoading(false);
     }
   };
  const saveUser = (userData) => {
    setUser(userData);
  };
  const saveDev = (DevData) => {
    setSelectedDev(DevData);
  };

  const logout = () => {
    setUser(null);
    setProjects([]); // Clear projects on logout
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        saveUser,
        logout,
        loading,
        saveDev,
        projects,
        setProjects,
        error,
        setError,
        fetchProjects,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
