import { createContext, useContext, useState, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { getUserById } from "../Features/Auth/Api/auth";
import { getSuperUser } from "../Api/Services/userService";
import { useNavigate } from "react-router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [superUser, setSuperUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const navigate = useNavigate();

  const showSnackbar = (message, severity = "info") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));

  // ----------------------------
  // LOGIN
  // ----------------------------
  const login = async (data, signup = false) => {
    console.log("LOGIN RESPONSE", data);

    const baseUser = data.user;
    setUser(baseUser);

    localStorage.setItem("accessToken", data.accessToken);

    // always use _id, not id
    console.log(baseUser);
    const su = await getSuperUser(baseUser._id || baseUser.id);
    console.log(su);
    setSuperUser(su);

    showSnackbar(!signup ? "Welcome Back!" : "Welcome Aboard!", "success");
  };

  // ----------------------------
  // LOGOUT
  // ----------------------------
  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    setSuperUser(null);
    navigate("/auth/login");
    showSnackbar("Farewell!", "info");
  };

  // ----------------------------
  // AUTO LOGIN ON REFRESH
  // ----------------------------
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setLoading(false);
      return;
    }

    const loadUser = async () => {
      try {
        const decoded = await jwtDecode(token);
        const res = await getUserById(decoded.id);
        console.log(res);
        const baseUser = res.user || res;
        setUser(baseUser);

        const su = await getSuperUser(baseUser._id || baseUser.id);
        setSuperUser(su);
      } catch (err) {
        console.error("Auto-login failed:", err);
        localStorage.removeItem("accessToken");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        superUser,
        loading,
        login,
        logout,
        showSnackbar,
      }}
    >
      {children}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
