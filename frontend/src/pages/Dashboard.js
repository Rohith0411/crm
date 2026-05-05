import { useEffect, useState } from "react";
import API from "../api";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box
} from "@mui/material";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalLeads: 0,
    qualifiedLeads: 0,
    tasksDueToday: 0,
    completedTasks: 0
  });

  useEffect(() => {
    API.get("/dashboard/stats")
      .then((res) => setStats(res.data))
      .catch(() => alert("Error loading stats"));
  }, []);

  const cardData = [
    { title: "Total Leads", value: stats.totalLeads },
    { title: "Qualified Leads", value: stats.qualifiedLeads },
    { title: "Tasks Due Today", value: stats.tasksDueToday },
    { title: "Completed Tasks", value: stats.completedTasks }
  ];

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {cardData.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 6
                }
              }}
            >
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  {item.title}
                </Typography>

                <Typography variant="h4" fontWeight="bold">
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}