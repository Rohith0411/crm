import { useNavigate } from "react-router-dom";

export default function Layout({ children }) {
  const navigate = useNavigate();

  return (
    <div className="app">
      
      {/* SIDEBAR */}
      <div className="sidebar">
  <h2 className="logo">Mini CRM</h2>

  <div className="menu">
    <p onClick={() => navigate("/dashboard")}>📊 Dashboard</p>
    <p onClick={() => navigate("/leads")}>📋 Leads</p>
    <p onClick={() => navigate("/companies")}>🏢 Companies</p>
    <p onClick={() => navigate("/tasks")}>✅ Tasks</p>
  </div>
</div>

      {/* RIGHT SIDE */}
      <div className="main">

        {/* TOPBAR */}
        <div className="topbar">
          <span>Mini CRM</span>

          <div>
            Admin |
            <span
              style={{ cursor: "pointer", marginLeft: "10px" }}
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
              }}
            >
              Logout
            </span>
          </div>
        </div>

        {/* CONTENT */}
        <div className="content">{children}</div>

      </div>
    </div>
  );
}