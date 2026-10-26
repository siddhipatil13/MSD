// Home page - banner, quick links, highlights, announcements, events.
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import GroupsIcon from "@mui/icons-material/Groups";
import CodeIcon from "@mui/icons-material/Code";
import EventIcon from "@mui/icons-material/Event";
import api from "../api";
import { Loader, ErrorAlert } from "../components/StateViews";
import { years } from "../data/academics";

export default function Home() {
  // State: announcements fetched from MongoDB through Express
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // useEffect runs after the component mounts (lifecycle concept)
  useEffect(() => {
    fetchAnnouncements();
  }, []);

  async function fetchAnnouncements() {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/announcements");
      setAnnouncements(res.data.data.slice(0, 4)); // show only the latest 4
    } catch (err) {
      setError(err.response?.data?.message || "Could not load announcements");
    } finally {
      setLoading(false);
    }
  }

  const highlights = [
    { icon: <SchoolIcon fontSize="large" color="primary" />, title: "Four-Year B.E. Programme",
      text: "Well-structured curriculum from programming basics to full-stack projects." },
    { icon: <GroupsIcon fontSize="large" color="primary" />, title: "Experienced Faculty",
      text: "Sample faculty records are loaded from MongoDB through a REST API." },
    { icon: <CodeIcon fontSize="large" color="primary" />, title: "Hands-On Learning",
      text: "Workshops, coding competitions and mini projects every semester." },
    { icon: <EventIcon fontSize="large" color="primary" />, title: "Events & Seminars",
      text: "Announcements published by the admin appear here automatically." },
  ];

  return (
    <>
      {/* ---------- Hero banner ---------- */}
      <section className="hero">
        <Container maxWidth="lg">
          <Typography variant="overline" sx={{ letterSpacing: 2, opacity: 0.9 }}>
            D. Y. Patil College of Engineering and Technology, Kolhapur
          </Typography>
          <h1>Department of Computer Science and Engineering</h1>
          <p>
            Welcome to the official demonstration website of the CSE department. Explore our
            academics, faculty, activities and student projects.
          </p>
          <Box sx={{ mt: 3, display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              component={RouterLink}
              to="/academics"
            >
              Explore Academics
            </Button>
            <Button
              variant="outlined"
              size="large"
              component={RouterLink}
              to="/contact"
              sx={{ color: "#fff", borderColor: "#ffffff88" }}
            >
              Contact Department
            </Button>
          </Box>
        </Container>
      </section>

      {/* ---------- Quick links to the four academic years ---------- */}
      <Container maxWidth="lg" className="section">
        <Typography variant="h5" gutterBottom>
          Academic Years
        </Typography>
        <Grid container spacing={2}>
          {years.map((y) => (
            <Grid item xs={6} md={3} key={y.code}>
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                component={RouterLink}
                to={`/academics/${y.code}`}
                sx={{ py: 1.5, flexDirection: "column", gap: 0.5 }}
              >
                <strong>{y.code}</strong>
                <span style={{ fontSize: "0.75rem" }}>{y.label}</span>
              </Button>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ---------- Department highlights ---------- */}
      <Box sx={{ bgcolor: "#fff" }}>
        <Container maxWidth="lg" className="section">
          <Typography variant="h5" gutterBottom>
            Department Highlights
          </Typography>
          <div className="grid-4">
            {highlights.map((h) => (
              <Card key={h.title} variant="outlined" sx={{ height: "100%" }}>
                <CardContent>
                  {h.icon}
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mt: 1 }}>
                    {h.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {h.text}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Box>

      {/* ---------- Latest announcements (conditional rendering) ---------- */}
      <Container maxWidth="lg" className="section">
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h5">Latest Announcements</Typography>
          <Button component={RouterLink} to="/activities">
            View all
          </Button>
        </Box>

        {loading && <Loader text="Loading announcements..." />}
        <ErrorAlert message={error} onRetry={fetchAnnouncements} />

        {!loading && !error && announcements.length === 0 && (
          <Typography color="text.secondary" sx={{ mt: 2 }}>
            No announcements yet. The admin can add them from the Admin panel.
          </Typography>
        )}

        <div className="grid-2">
          {!loading &&
            announcements.map((a) => (
              <Card key={a._id} variant="outlined">
                <CardContent>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Chip size="small" color="primary" label={a.category} />
                    <Typography variant="caption" color="text.secondary">
                      {new Date(a.date).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    {a.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {a.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
        </div>
      </Container>
    </>
  );
}
