// Activities & Announcements page.
// Public list + link to the admin form for adding new announcements.
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import api from "../api";
import PageHeader from "../components/PageHeader";
import { Loader, ErrorAlert, EmptyState } from "../components/StateViews";

const categories = ["All", "Workshop", "Seminar", "Competition", "Event", "Notice"];

export default function Activities() {
  const [announcements, setAnnouncements] = useState([]);
  const [filter, setFilter] = useState("All"); // controlled select (state + onChange)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadAnnouncements();
  }, []);

  async function loadAnnouncements() {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/announcements");
      setAnnouncements(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Could not load announcements");
    } finally {
      setLoading(false);
    }
  }

  // Filter is done in the React component itself using array.filter()
  const visible =
    filter === "All"
      ? announcements
      : announcements.filter((a) => a.category === filter);

  return (
    <>
      <PageHeader
        title="Activities & Announcements"
        subtitle="Workshops, seminars, coding competitions and department notices retrieved from MongoDB."
      />

      <Container maxWidth="lg" className="section" sx={{ pt: 0 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
            mb: 3,
          }}
        >
          <TextField
            select
            size="small"
            label="Filter by category"
            value={filter}
            onChange={(e) => setFilter(e.target.value)} // onChange event handling
            sx={{ minWidth: 220 }}
          >
            {categories.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </TextField>

          <Button variant="contained" component={RouterLink} to="/admin/login">
            + Admin: Add Announcement
          </Button>
        </Box>

        {loading && <Loader text="Loading activities..." />}
        <ErrorAlert message={error} onRetry={loadAnnouncements} />
        {!loading && !error && visible.length === 0 && (
          <EmptyState message={`No announcements found for "${filter}".`} />
        )}

        <div className="grid-2">
          {!loading &&
            visible.map((a) => (
              <Card key={a._id} variant="outlined" sx={{ height: "100%" }}>
                <CardContent>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Chip
                      size="small"
                      color={
                        a.category === "Workshop"
                          ? "primary"
                          : a.category === "Competition"
                          ? "secondary"
                          : "default"
                      }
                      label={a.category}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {new Date(a.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </Typography>
                  </Box>

                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    {a.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {a.description}
                  </Typography>

                  {a.venue && (
                    <Typography variant="caption" color="text.secondary">
                      Venue: {a.venue}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            ))}
        </div>
      </Container>
    </>
  );
}
