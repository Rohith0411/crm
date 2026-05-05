import { useEffect, useState } from "react";
import {
  TextField, Button, MenuItem, Typography
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api";

export default function LeadForm() {
  const [lead, setLead] = useState({
    name: "", email: "", phone: "", status: "New"
  });

  const navigate = useNavigate();
  const { id } = useParams();

  // Load existing lead (EDIT)
  useEffect(() => {
    if (id) {
      API.get(`/leads?page=1&search=`).then(res => {
        const found = res.data.leads.find(l => l._id === id);
        if (found) setLead(found);
      });
    }
  }, [id]);

  const handleSave = async () => {
    if (id) {
      await API.put(`/leads/${id}`, lead);
    } else {
      await API.post("/leads", lead);
    }
    navigate("/leads");
  };

  return (
    <div>
      <Typography variant="h5">{id ? "Edit" : "Add"} Lead</Typography>

      <TextField label="Name" fullWidth margin="normal"
        value={lead.name}
        onChange={(e) => setLead({ ...lead, name: e.target.value })}
      />

      <TextField label="Email" fullWidth margin="normal"
        value={lead.email}
        onChange={(e) => setLead({ ...lead, email: e.target.value })}
      />

      <TextField label="Phone" fullWidth margin="normal"
        value={lead.phone}
        onChange={(e) => setLead({ ...lead, phone: e.target.value })}
      />

      <TextField
        select label="Status"
        value={lead.status}
        fullWidth margin="normal"
        onChange={(e) => setLead({ ...lead, status: e.target.value })}
      >
        <MenuItem value="New">New</MenuItem>
        <MenuItem value="Contacted">Contacted</MenuItem>
        <MenuItem value="Qualified">Qualified</MenuItem>
        <MenuItem value="Lost">Lost</MenuItem>
      </TextField>

      <Button variant="contained" onClick={handleSave}>
        Save
      </Button>
    </div>
  );
}