import React, { useEffect, useState } from "react";
import API from "../api";
import { useParams, useNavigate } from "react-router-dom";

const CompanyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [company, setCompany] = useState(null);
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    API.get(`/companies/${id}`)
      .then((res) => {
        setCompany(res.data.company);
        setLeads(res.data.leads);
      })
      .catch(console.error);
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this company?")) return;

    await API.delete(`/companies/${id}`);
    navigate("/companies");
  };

  if (!company) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{company.name}</h2>
      <p>{company.industry}</p>
      <p>{company.location}</p>

      <button onClick={() => navigate(`/companies/edit/${id}`)}>
        Edit
      </button>

      <button onClick={handleDelete} style={{ marginLeft: 10 }}>
        Delete
      </button>

      <h3>Leads</h3>
      {leads.map((l) => (
        <div key={l._id}>{l.name}</div>
      ))}
    </div>
  );
};

export default CompanyDetail;