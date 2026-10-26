// Admin login page - posts credentials to /api/auth/login, stores JWT.
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import api from "../api";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // Basic client-side validation
    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password.");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/login", { username, password });
      // Save the token - the server still verifies it on every admin API call
      localStorage.setItem("adminToken", res.data.token);
      localStorage.setItem("adminUser", res.data.admin.username);
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Is the server running?");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Card variant="outlined">
        <CardContent sx={{ p: 4 }}>
          <LockIcon color="primary" fontSize="large" />
          <Typography variant="h5" gutterBottom>
            Admin Login
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Demo credentials: <strong>admin</strong> / <strong>admin123</strong> (set in
            server/.env)
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
              required
              autoFocus
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
