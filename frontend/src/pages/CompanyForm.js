import React, { useState, useEffect } from "react";
import API from "../api";
import { useNavigate, useParams } from "react-router-dom";

const CompanyForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    industry: "",
    location: "",
  });

  useEffect(() => {
    if (id) {
      API.get(`/companies/${id}`).then((res) => {
        setForm(res.data.company);
      });
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id) {
      await API.put(`/companies/${id}`, form);
    } else {
      await API.post("/companies", form);
    }

    navigate("/companies");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{id ? "Edit" : "Create"} Company</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" /><br /><br />
        <input name="industry" value={form.industry} onChange={handleChange} placeholder="Industry" /><br /><br />
        <input name="location" value={form.location} onChange={handleChange} placeholder="Location" /><br /><br />

        <button type="submit">
          {id ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default CompanyForm;