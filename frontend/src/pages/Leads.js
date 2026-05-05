import { useEffect, useState } from "react";
import API from "../api";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Pagination
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  const fetchLeads = async () => {
    try {
      const res = await API.get(
        `/leads?search=${search}&status=${status}&page=${page}`
      );
      setLeads(res.data.leads);
      setTotalPages(res.data.totalPages);
    } catch {
      alert("Error loading leads");
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [search, status, page]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this lead?")) return;

    try {
      await API.delete(`/leads/${id}`);
      fetchLeads();
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Leads
      </Typography>

      {/* TOP BAR */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
        mb={3}
      >
        {/* LEFT SIDE */}
        <Box display="flex" gap={2}>
          <TextField
            label="Search"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <TextField
            select
            label="Status"
            size="small"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            sx={{ width: 150 }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="New">New</MenuItem>
            <MenuItem value="Contacted">Contacted</MenuItem>
            <MenuItem value="Qualified">Qualified</MenuItem>
            <MenuItem value="Lost">Lost</MenuItem>
          </TextField>
        </Box>

        {/* ADD BUTTON */}
        <Button
          variant="contained"
          onClick={() => navigate("/add-lead")}
        >
          + Add Lead
        </Button>
      </Box>

      {/* TABLE */}
      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>Assigned To</b></TableCell>
              <TableCell><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {leads.length > 0 ? (
              leads.map((lead) => (
                <TableRow key={lead._id}>
                  <TableCell>{lead.name}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>{lead.status}</TableCell>
                  <TableCell>
                    {lead.assignedTo?.name || "—"}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      onClick={() =>
                        navigate(`/edit-lead/${lead._id}`)
                      }
                    >
                      Edit
                    </Button>

                    <Button
                      color="error"
                      size="small"
                      onClick={() => handleDelete(lead._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No leads found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* PAGINATION */}
      <Box mt={3} display="flex" justifyContent="center">
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </Box>
  );
}