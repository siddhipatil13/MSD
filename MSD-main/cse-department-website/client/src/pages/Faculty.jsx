// Faculty page - fetches records from GET /api/faculty and shows cards.
import { useEffect, useState } from "react";
import {
  Avatar,
  Card,
  CardContent,
  Chip,
  Container,
  Typography,
  Box,
} from "@mui/material";
import BadgeIcon from "@mui/icons-material/WorkspacePremium";
import api from "../api";
import PageHeader from "../components/PageHeader";
import { Loader, ErrorAlert, EmptyState } from "../components/StateViews";

export default function Faculty() {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadFaculty();
  }, []);

  async function loadFaculty() {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/faculty");
      setFaculty(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Could not load faculty data");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <PageHeader
        title="Our Faculty"
        subtitle="Faculty records are stored in MongoDB and fetched through the Express API GET /api/faculty."
      />

      <Container maxWidth="lg" className="section" sx={{ pt: 0 }}>
        <Box sx={{ mb: 2 }}>
          <Chip size="small" color="warning" variant="outlined" label="Sample faculty data" />
        </Box>

        {loading && <Loader text="Loading faculty..." />}
        <ErrorAlert message={error} onRetry={loadFaculty} />
        {!loading && !error && faculty.length === 0 && (
          <EmptyState message="No faculty records found. Run 'npm run seed' inside the server folder." />
        )}

        <div className="grid-3">
          {!loading &&
            faculty.map((f) => (
              <Card key={f._id} variant="outlined" sx={{ height: "100%" }}>
                <CardContent sx={{ textAlign: "center" }}>
                  {f.photo ? (
                    <Avatar
                      src={`http://localhost:5000${f.photo}`}
                      alt={f.name}
                      sx={{ width: 72, height: 72, mx: "auto", mb: 1 }}
                    />
                  ) : (
                    <Avatar sx={{ width: 72, height: 72, mx: "auto", mb: 1, bgcolor: "primary.main" }}>
                      {f.name.charAt(0)}
                    </Avatar>
                  )}

                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    {f.name}
                  </Typography>
                  <Typography variant="body2" color="primary">
                    {f.designation}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 0.5,
                      mt: 1,
                      mb: 1,
                      flexWrap: "wrap",
                    }}
                  >
                    <BadgeIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {f.qualification}
                    </Typography>
                  </Box>

                  <Chip size="small" label={f.expertise} variant="outlined" color="primary" />
                  <Typography variant="caption" display="block" sx={{ mt: 1.5 }}>
                    {f.email}
                  </Typography>
                </CardContent>
              </Card>
            ))}
        </div>
      </Container>
    </>
  );
}
