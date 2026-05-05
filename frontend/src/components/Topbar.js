import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // store user also
    setToken(null);
    navigate("/");
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <AppBar position="static" sx={{ ml: "200px", width: "calc(100% - 200px)" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Mini CRM</Typography>

        <div>
          <Typography variant="body1" sx={{ mr: 2, display: "inline" }}>
            {user?.name || "User"}
          </Typography>

          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}