// Academics page - year selection tabs, subjects table, objectives, ideas.
// Switching years uses the URL parameter -> React Router concept.
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Tabs,
  Tab,
  Box,
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import PageHeader from "../components/PageHeader";
import { academicsData, years } from "../data/academics";

export default function Academics() {
  const { year } = useParams(); // read /academics/:year
  const navigate = useNavigate();
  const activeYear = academicsData[year] ? year : "FE";
  const data = academicsData[activeYear];

  // Tab change event handler -> updates the URL -> re-renders with new year
  function handleTabChange(event, newValue) {
    navigate(`/academics/${newValue}`);
  }

  return (
    <>
      <PageHeader
        title="Academics"
        subtitle="Subjects, learning objectives and sample project ideas for each academic year. Content is sample data and can be edited."
      />

      <Container maxWidth="lg" className="section" sx={{ pt: 0 }}>
        {/* Year selector tabs */}
        <Tabs
          value={activeYear}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ mb: 3, borderBottom: 1, borderColor: "divider" }}
        >
          {years.map((y) => (
            <Tab key={y.code} value={y.code} label={`${y.label} (${y.code})`} />
          ))}
        </Tabs>

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
          <Typography variant="h5">
            {years.find((y) => y.code === activeYear).full}
          </Typography>
          <Chip size="small" color="warning" variant="outlined" label="Sample curriculum" />
        </Box>
        <Typography variant="body1" color="text.secondary" paragraph>
          {data.intro}
        </Typography>

        {/* Subjects table (Table syllabus concept) */}
        <Typography variant="h6" sx={{ mt: 2 }} gutterBottom>
          Subjects
        </Typography>
        <TableContainer component={Paper} variant="outlined">
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: "primary.main", "& th": { color: "#fff" } }}>
                <TableCell>Code</TableCell>
                <TableCell>Subject Name</TableCell>
                <TableCell align="right">Credits</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.subjects.map((s) => (
                <TableRow key={s.code} hover>
                  <TableCell>{s.code}</TableCell>
                  <TableCell>{s.name}</TableCell>
                  <TableCell align="right">{s.credits}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div className="grid-2" style={{ marginTop: 24 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Learning Objectives
              </Typography>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {data.objectives.map((o) => (
                  <li key={o}>
                    <Typography variant="body2">{o}</Typography>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Sample Project Ideas
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {data.ideas.map((idea) => (
                  <Chip key={idea} label={idea} color="secondary" variant="outlined" />
                ))}
              </Box>
            </CardContent>
          </Card>
        </div>
      </Container>
    </>
  );
}
