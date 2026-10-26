// Student Projects page - cards + table view, year filter.
import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import api from "../api";
import PageHeader from "../components/PageHeader";
import { Loader, ErrorAlert, EmptyState } from "../components/StateViews";

const yearOptions = ["All", "FE", "SE", "TE", "BE"];

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [year, setYear] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProjects();
    // Empty dependency array = run once after first render
  }, []);

  async function loadProjects() {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/projects");
      setProjects(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Could not load projects");
    } finally {
      setLoading(false);
    }
  }

  const visible = year === "All" ? projects : projects.filter((p) => p.year === year);

  return (
    <>
      <PageHeader
        title="Student Projects"
        subtitle="Projects built by students across all four academic years, stored in MongoDB."
      />

      <Container maxWidth="lg" className="section" sx={{ pt: 0 }}>
        <TextField
          select
          size="small"
          label="Filter by year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          sx={{ minWidth: 200, mb: 3 }}
        >
          {yearOptions.map((y) => (
            <MenuItem key={y} value={y}>
              {y}
            </MenuItem>
          ))}
        </TextField>

        {loading && <Loader text="Loading projects..." />}
        <ErrorAlert message={error} onRetry={loadProjects} />
        {!loading && !error && visible.length === 0 && (
          <EmptyState message="No projects found for this selection." />
        )}

        {/* Cards view */}
        <div className="grid-3">
          {!loading &&
            visible.map((p) => (
              <Card key={p._id} variant="outlined" sx={{ height: "100%" }}>
                <CardContent>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Chip size="small" color="primary" label={p.year} />
                    <Typography variant="caption" color="text.secondary">
                      {p.studentName}
                    </Typography>
                  </Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    {p.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {p.description}
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {(Array.isArray(p.technologies) ? p.technologies : [p.technologies]).map(
                      (tech) => (
                        <Chip key={tech} size="small" label={tech} variant="outlined" />
                      )
                    )}
                  </Box>
                </CardContent>
              </Card>
            ))}
        </div>

        {/* Table view (second display format) */}
        {!loading && visible.length > 0 && (
          <>
            <Typography variant="h6" sx={{ mt: 5, mb: 1.5 }}>
              Table View
            </Typography>
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: "primary.main", "& th": { color: "#fff" } }}>
                    <TableCell>#</TableCell>
                    <TableCell>Project Title</TableCell>
                    <TableCell>Technologies</TableCell>
                    <TableCell>Year</TableCell>
                    <TableCell>Student</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {visible.map((p, index) => (
                    <TableRow key={p._id} hover>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{p.title}</TableCell>
                      <TableCell>
                        {Array.isArray(p.technologies)
                          ? p.technologies.join(", ")
                          : p.technologies}
                      </TableCell>
                      <TableCell>
                        <Chip size="small" label={p.year} color="primary" variant="outlined" />
                      </TableCell>
                      <TableCell>{p.studentName}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Container>
    </>
  );
}
