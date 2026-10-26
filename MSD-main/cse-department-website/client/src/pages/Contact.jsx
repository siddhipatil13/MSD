// Contact page - college details (placeholders) + validated contact form.
import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LanguageIcon from "@mui/icons-material/Language";
import api from "../api";
import PageHeader from "../components/PageHeader";

// Official contact details are NOT invented - placeholders only.
const contactInfo = [
  { icon: <LocationOnIcon color="primary" />, label: "Address", value: "[Add official college address here]" },
  { icon: <EmailIcon color="primary" />, label: "Email", value: "[add-official-email@college.example]" },
  { icon: <PhoneIcon color="primary" />, label: "Phone", value: "[Add official phone number here]" },
  { icon: <LanguageIcon color="primary" />, label: "Website", value: "[Add official college website here]" },
];

const emptyForm = { name: "", email: "", message: "" };

export default function Contact() {
  // State: controlled form inputs + status flags
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  // Update state on every keystroke (onChange + controlled components)
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear the field error as soon as the user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  }

  // Client-side validation before calling the API
  function validate() {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = "Enter a valid email";
    if (!form.message.trim()) newErrors.message = "Message is required";
    else if (form.message.length > 2000) newErrors.message = "Message is too long";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // Form submit handler (onSubmit)
  async function handleSubmit(e) {
    e.preventDefault(); // stop the page from reloading
    setStatus({ type: "", message: "" });

    if (!validate()) {
      setStatus({ type: "error", message: "Please fix the highlighted fields." });
      return;
    }

    try {
      setSubmitting(true);
      const res = await api.post("/contact", form);
      setStatus({ type: "success", message: res.data.message });
      setForm(emptyForm); // reset form after success
    } catch (err) {
      const serverErrors = err.response?.data?.errors;
      setStatus({
        type: "error",
        message: Array.isArray(serverErrors)
          ? serverErrors.join(" | ")
          : err.response?.data?.message || "Something went wrong. Is the server running?",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="Reach the CSE department. Contact details below are placeholders until verified with the college office."
      />

      <Container maxWidth="lg" className="section" sx={{ pt: 0 }}>
        <Grid container spacing={3}>
          {/* Contact information cards */}
          <Grid item xs={12} md={5}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  D. Y. Patil College of Engineering and Technology
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Kolhapur, Maharashtra
                </Typography>

                {contactInfo.map((c) => (
                  <Box key={c.label} sx={{ display: "flex", gap: 1.5, mb: 1.5 }}>
                    {c.icon}
                    <Box>
                      <Typography variant="subtitle2">{c.label}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {c.value}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>

          {/* Contact form */}
          <Grid item xs={12} md={7}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Send us a message
                </Typography>

                {/* Status messages (conditional rendering) */}
                {status.message && (
                  <Alert severity={status.type === "success" ? "success" : "error"} sx={{ mb: 2 }}>
                    {status.message}
                  </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} noValidate>
                  <TextField
                    fullWidth
                    label="Your Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    error={Boolean(errors.name)}
                    helperText={errors.name}
                    margin="normal"
                    required
                  />
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                    margin="normal"
                    required
                  />
                  <TextField
                    fullWidth
                    label="Message"
                    name="message"
                    multiline
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    error={Boolean(errors.message)}
                    helperText={errors.message}
                    margin="normal"
                    required
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={submitting}
                    sx={{ mt: 2 }}
                  >
                    {submitting ? "Sending..." : "Send Message"}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
