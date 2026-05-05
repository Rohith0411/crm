import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <h3>Mini CRM</h3>

      <p onClick={() => navigate("/dashboard")}>Dashboard</p>
      <p onClick={() => navigate("/leads")}>Leads</p>
      <p onClick={() => navigate("/companies")}>Companies</p>
      <p onClick={() => navigate("/tasks")}>Tasks</p>
    </div>
  );
}