import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/companies")
      .then((res) => setCompanies(res.data))
      .catch(console.error);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      {/* Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px"
      }}>
        <h2>Companies</h2>
        <button
          onClick={() => navigate("/companies/new")}
          style={btnPrimary}
        >
          + Add Company
        </button>
      </div>

      {/* Table */}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={th}>Company Name</th>
            <th style={th}>Industry</th>
            <th style={th}>Location</th>
            <th style={th}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {companies.map((c) => (
            <tr key={c._id} style={tr}>
              <td style={td}>{c.name}</td>
              <td style={td}>{c.industry}</td>
              <td style={td}>{c.location}</td>

              {/* ✅ ACTION BUTTONS */}
              <td style={td}>
                <button
                  onClick={() => navigate(`/companies/${c._id}`)}
                  style={btnView}
                >
                  View
                </button>

                <button
                  onClick={() => navigate(`/companies/edit/${c._id}`)}
                  style={btnEdit}
                >
                  Edit
                </button>

                <button
                  onClick={async () => {
                    if (!window.confirm("Delete this company?")) return;
                    await API.delete(`/companies/${c._id}`);
                    setCompanies(companies.filter((x) => x._id !== c._id));
                  }}
                  style={btnDelete}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Companies;

//////////////////////////////////////////////////
// 🎨 STYLES (INLINE)
//////////////////////////////////////////////////

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  background: "#fff",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
};

const th = {
  padding: "12px",
  textAlign: "left",
  borderBottom: "2px solid #ddd",
  background: "#f4f6f8"
};

const td = {
  padding: "12px",
  borderBottom: "1px solid #eee"
};

const tr = {
  transition: "0.2s"
};

const btnPrimary = {
  background: "#007bff",
  color: "#fff",
  border: "none",
  padding: "8px 12px",
  borderRadius: "5px",
  cursor: "pointer"
};

const btnView = {
  marginRight: "5px",
  padding: "5px 10px",
  background: "#17a2b8",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer"
};

const btnEdit = {
  marginRight: "5px",
  padding: "5px 10px",
  background: "#ffc107",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer"
};

const btnDelete = {
  padding: "5px 10px",
  background: "#dc3545",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer"
};