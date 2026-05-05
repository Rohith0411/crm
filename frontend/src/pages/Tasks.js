import { useEffect, useState } from "react";
import API from "../api";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
  Button,
  TextField,
  MenuItem
} from "@mui/material";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    lead: "",
    assignedTo: "",
    dueDate: ""
  });

  const [leads, setLeads] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchTasks = () => {
    API.get("/tasks").then((res) => setTasks(res.data));
  };

  useEffect(() => {
    fetchTasks();
    API.get("/leads").then((res) => setLeads(res.data.leads || res.data));
    API.get("/users").then((res) => setUsers(res.data));
  }, []);

  const handleCreate = async () => {
    await API.post("/tasks", form);
    setForm({ title: "", lead: "", assignedTo: "", dueDate: "" });
    fetchTasks();
  };

  const markDone = async (id) => {
    try {
      await API.put(`/tasks/${id}`, { status: "Completed" });
      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.message || "Not allowed");
    }
  };

  return (
    <Box>
      <Typography variant="h5" mb={3} fontWeight="bold">
        Tasks
      </Typography>

      {/* CREATE TASK */}
      <Box display="flex" gap={2} mb={3} flexWrap="wrap">
        <TextField
          label="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <TextField
          select
          label="Lead"
          value={form.lead}
          onChange={(e) => setForm({ ...form, lead: e.target.value })}
          sx={{ width: 150 }}
        >
          {leads.map((l) => (
            <MenuItem key={l._id} value={l._id}>
              {l.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Assign To"
          value={form.assignedTo}
          onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
          sx={{ width: 150 }}
        >
          {users.map((u) => (
            <MenuItem key={u._id} value={u._id}>
              {u.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          type="date"
          value={form.dueDate}
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
        />

        <Button variant="contained" onClick={handleCreate}>
          Add Task
        </Button>
      </Box>

      {/* TABLE */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Title</b></TableCell>
              <TableCell><b>Lead</b></TableCell>
              <TableCell><b>Due Date</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {tasks.map((t) => (
              <TableRow key={t._id}>
                <TableCell>{t.title}</TableCell>
                <TableCell>{t.lead?.name}</TableCell>
                <TableCell>
                  {new Date(t.dueDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{t.status}</TableCell>
                <TableCell>
                  {t.status === "Pending" && (
                    <Button
                      size="small"
                      onClick={() => markDone(t._id)}
                    >
                      Done
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}

            {tasks.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No tasks
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}