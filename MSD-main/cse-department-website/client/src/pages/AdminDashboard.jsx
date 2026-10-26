// Admin Dashboard - add / edit / delete announcements and projects,
// plus read contact messages. All requests carry the JWT token and the
// server rejects unauthorized calls (authorization is NOT just UI hiding).
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  MenuItem,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Typography,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";
import api from "../api";
import AdminRoute from "../components/AdminRoute";
import { Loader, ErrorAlert, EmptyState } from "../components/StateViews";

const emptyAnnouncement = {
  title: "",
  description: "",
  category: "Notice",
  date: "",
  venue: "",
};
const emptyProject = {
  title: "",
  description: "",
  technologies: "",
  year: "TE",
  studentName: "",
};

export default function AdminDashboard() {
  return (
    <AdminRoute>
      <Dashboard />
    </AdminRoute>
  );
}

function Dashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);

  const [announcements, setAnnouncements] = useState([]);
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [status, setStatus] = useState(null); // { type, message }

  // Dialog states
  const [annDialog, setAnnDialog] = useState({ open: false, mode: "add", data: emptyAnnouncement });
  const [projDialog, setProjDialog] = useState({ open: false, mode: "add", data: emptyProject });
  const [deleteDialog, setDeleteDialog] = useState({ open: false, type: "", item: null });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    loadAll();
  }, []);

  async function loadAll() {
    try {
      setLoading(true);
      setError("");
      const [annRes, projRes, msgRes] = await Promise.all([
        api.get("/announcements"),
        api.get("/projects"),
        api.get("/contact"),
      ]);
      setAnnouncements(annRes.data.data);
      setProjects(projRes.data.data);
      setMessages(msgRes.data.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not load data. Check that the server is running and your session is valid."
      );
      if (err.response?.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
      }
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/admin/login");
  }

  function flash(type, message) {
    setStatus({ type, message });
    setTimeout(() => setStatus(null), 4000);
  }

  // ---------- Announcement handlers ----------
  function validateAnnouncement(data) {
    const errs = {};
    if (!data.title.trim()) errs.title = "Title is required";
    if (!data.description.trim()) errs.description = "Description is required";
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function saveAnnouncement() {
    const data = annDialog.data;
    if (!validateAnnouncement(data)) return;

    try {
      if (annDialog.mode === "add") {
        await api.post("/announcements", data);
        flash("success", "Announcement added.");
      } else {
        await api.put(`/announcements/${data._id}`, data);
        flash("success", "Announcement updated.");
      }
      setAnnDialog({ open: false, mode: "add", data: emptyAnnouncement });
      loadAll();
    } catch (err) {
      flash("error", (err.response?.data?.errors || []).join(" | ") || "Save failed.");
    }
  }

  // ---------- Project handlers ----------
  async function saveProject() {
    const data = projDialog.data;
    const errs = {};
    if (!data.title.trim()) errs.title = "Title is required";
    if (!data.description.trim()) errs.description = "Description is required";
    if (!data.technologies.trim()) errs.technologies = "Technologies are required";
    setFormErrors(errs);
    if (Object.keys(errs).length > 0) return;

    try {
      if (projDialog.mode === "add") {
        await api.post("/projects", data);
        flash("success", "Project added.");
      } else {
        await api.put(`/projects/${data._id}`, data);
        flash("success", "Project updated.");
      }
      setProjDialog({ open: false, mode: "add", data: emptyProject });
      loadAll();
    } catch (err) {
      flash("error", (err.response?.data?.errors || []).join(" | ") || "Save failed.");
    }
  }

  // ---------- Delete handler (shared) ----------
  async function confirmDelete() {
    const { type, item } = deleteDialog;
    try {
      if (type === "announcement") await api.delete(`/announcements/${item._id}`);
      if (type === "project") await api.delete(`/projects/${item._id}`);
      flash("success", "Record deleted.");
      setDeleteDialog({ open: false, type: "", item: null });
      loadAll();
    } catch (err) {
      flash("error", err.response?.data?.message || "Delete failed.");
    }
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h5">Admin Dashboard</Typography>
        <Button startIcon={<LogoutIcon />} onClick={logout} variant="outlined">
          Logout
        </Button>
      </Box>

      {status && <Alert severity={status.type} sx={{ mb: 2 }}>{status.message}</Alert>}
      {loading && <Loader text="Loading admin data..." />}
      <ErrorAlert message={error} onRetry={loadAll} />

      {!loading && !error && (
        <>
          <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mb: 2 }}>
            <Tab label={`Announcements (${announcements.length})`} />
            <Tab label={`Projects (${projects.length})`} />
            <Tab label={`Messages (${messages.length})`} />
          </Tabs>

          {/* ---------- TAB 0: Announcements ---------- */}
          {tab === 0 && (
            <Box>
              <Button
                variant="contained"
                sx={{ mb: 2 }}
                onClick={() => {
                  setFormErrors({});
                  setAnnDialog({ open: true, mode: "add", data: emptyAnnouncement });
                }}
              >
                + Add Announcement
              </Button>

              {announcements.length === 0 ? (
                <EmptyState message="No announcements yet." />
              ) : (
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ bgcolor: "primary.main", "& th": { color: "#fff" } }}>
                        <TableCell>Title</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {announcements.map((a) => (
                        <TableRow key={a._id} hover>
                          <TableCell>{a.title}</TableCell>
                          <TableCell>
                            <Chip size="small" label={a.category} />
                          </TableCell>
                          <TableCell>{new Date(a.date).toLocaleDateString()}</TableCell>
                          <TableCell align="right">
                            <IconButton
                              size="small"
                              onClick={() => {
                                setFormErrors({});
                                setAnnDialog({
                                  open: true,
                                  mode: "edit",
                                  data: { ...a, date: a.date.slice(0, 10) },
                                });
                              }}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => setDeleteDialog({ open: true, type: "announcement", item: a })}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Box>
          )}

          {/* ---------- TAB 1: Projects ---------- */}
          {tab === 1 && (
            <Box>
              <Button
                variant="contained"
                sx={{ mb: 2 }}
                onClick={() => {
                  setFormErrors({});
                  setProjDialog({ open: true, mode: "add", data: emptyProject });
                }}
              >
                + Add Project
              </Button>

              {projects.length === 0 ? (
                <EmptyState message="No projects yet." />
              ) : (
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ bgcolor: "primary.main", "& th": { color: "#fff" } }}>
                        <TableCell>Title</TableCell>
                        <TableCell>Technologies</TableCell>
                        <TableCell>Year</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {projects.map((p) => (
                        <TableRow key={p._id} hover>
                          <TableCell>{p.title}</TableCell>
                          <TableCell>
                            {Array.isArray(p.technologies)
                              ? p.technologies.join(", ")
                              : p.technologies}
                          </TableCell>
                          <TableCell>
                            <Chip size="small" label={p.year} color="primary" variant="outlined" />
                          </TableCell>
                          <TableCell align="right">
                            <IconButton
                              size="small"
                              onClick={() => {
                                setFormErrors({});
                                setProjDialog({
                                  open: true,
                                  mode: "edit",
                                  data: {
                                    ...p,
                                    technologies: Array.isArray(p.technologies)
                                      ? p.technologies.join(", ")
                                      : p.technologies,
                                  },
                                });
                              }}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => setDeleteDialog({ open: true, type: "project", item: p })}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Box>
          )}

          {/* ---------- TAB 2: Contact messages ---------- */}
          {tab === 2 &&
            (messages.length === 0 ? (
              <EmptyState message="No contact messages submitted yet." />
            ) : (
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: "primary.main", "& th": { color: "#fff" } }}>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Message</TableCell>
                      <TableCell>Received</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {messages.map((m) => (
                      <TableRow key={m._id} hover>
                        <TableCell>{m.name}</TableCell>
                        <TableCell>{m.email}</TableCell>
                        <TableCell sx={{ maxWidth: 320 }}>{m.message}</TableCell>
                        <TableCell>{new Date(m.createdAt).toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ))}
        </>
      )}

      {/* ---------- Announcement add/edit dialog ---------- */}
      <Dialog
        open={annDialog.open}
        onClose={() => setAnnDialog({ ...annDialog, open: false })}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {annDialog.mode === "add" ? "Add Announcement" : "Edit Announcement"}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            margin="normal"
            value={annDialog.data.title}
            onChange={(e) =>
              setAnnDialog({ ...annDialog, data: { ...annDialog.data, title: e.target.value } })
            }
            error={Boolean(formErrors.title)}
            helperText={formErrors.title}
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            margin="normal"
            value={annDialog.data.description}
            onChange={(e) =>
              setAnnDialog({
                ...annDialog,
                data: { ...annDialog.data, description: e.target.value },
              })
            }
            error={Boolean(formErrors.description)}
            helperText={formErrors.description}
          />
          <TextField
            select
            fullWidth
            label="Category"
            margin="normal"
            value={annDialog.data.category}
            onChange={(e) =>
              setAnnDialog({ ...annDialog, data: { ...annDialog.data, category: e.target.value } })
            }
          >
            {["Workshop", "Seminar", "Competition", "Event", "Notice"].map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            type="date"
            label="Date"
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={annDialog.data.date || ""}
            onChange={(e) =>
              setAnnDialog({ ...annDialog, data: { ...annDialog.data, date: e.target.value } })
            }
          />
          <TextField
            fullWidth
            label="Venue (optional)"
            margin="normal"
            value={annDialog.data.venue}
            onChange={(e) =>
              setAnnDialog({ ...annDialog, data: { ...annDialog.data, venue: e.target.value } })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAnnDialog({ ...annDialog, open: false })}>Cancel</Button>
          <Button variant="contained" onClick={saveAnnouncement}>
            {annDialog.mode === "add" ? "Add" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ---------- Project add/edit dialog ---------- */}
      <Dialog
        open={projDialog.open}
        onClose={() => setProjDialog({ ...projDialog, open: false })}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{projDialog.mode === "add" ? "Add Project" : "Edit Project"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Project Title"
            margin="normal"
            value={projDialog.data.title}
            onChange={(e) =>
              setProjDialog({ ...projDialog, data: { ...projDialog.data, title: e.target.value } })
            }
            error={Boolean(formErrors.title)}
            helperText={formErrors.title}
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            margin="normal"
            value={projDialog.data.description}
            onChange={(e) =>
              setProjDialog({
                ...projDialog,
                data: { ...projDialog.data, description: e.target.value },
              })
            }
            error={Boolean(formErrors.description)}
            helperText={formErrors.description}
          />
          <TextField
            fullWidth
            label="Technologies (comma separated)"
            margin="normal"
            placeholder="React, Node.js, MongoDB"
            value={projDialog.data.technologies}
            onChange={(e) =>
              setProjDialog({
                ...projDialog,
                data: { ...projDialog.data, technologies: e.target.value },
              })
            }
            error={Boolean(formErrors.technologies)}
            helperText={formErrors.technologies}
          />
          <TextField
            select
            fullWidth
            label="Academic Year"
            margin="normal"
            value={projDialog.data.year}
            onChange={(e) =>
              setProjDialog({ ...projDialog, data: { ...projDialog.data, year: e.target.value } })
            }
          >
            {["FE", "SE", "TE", "BE"].map((y) => (
              <MenuItem key={y} value={y}>
                {y}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="Student Name (optional)"
            margin="normal"
            value={projDialog.data.studentName}
            onChange={(e) =>
              setProjDialog({
                ...projDialog,
                data: { ...projDialog.data, studentName: e.target.value },
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setProjDialog({ ...projDialog, open: false })}>Cancel</Button>
          <Button variant="contained" onClick={saveProject}>
            {projDialog.mode === "add" ? "Add" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ---------- Delete confirmation dialog ---------- */}
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ ...deleteDialog, open: false })}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete "
            {deleteDialog.item?.title}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ ...deleteDialog, open: false })}>Cancel</Button>
          <Button color="error" variant="contained" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
