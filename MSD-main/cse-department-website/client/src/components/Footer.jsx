// Footer with college name and useful links.
import { Box, Container, Grid, Typography, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <Box sx={{ bgcolor: "primary.dark", color: "#fff", mt: 4, py: 5 }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <Typography variant="h6" gutterBottom>
              D. Y. Patil College of Engineering and Technology
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.85 }}>
              Kolhapur, Maharashtra, India
              <br />
              Department of Computer Science and Engineering
            </Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 700 }}>
              Quick Links
            </Typography>
            <Box display="flex" flexDirection="column" gap={0.75}>
              <MuiLink component={Link} to="/about" color="inherit" underline="hover">
                About Department
              </MuiLink>
              <MuiLink component={Link} to="/faculty" color="inherit" underline="hover">
                Faculty
              </MuiLink>
              <MuiLink component={Link} to="/activities" color="inherit" underline="hover">
                Activities
              </MuiLink>
              <MuiLink component={Link} to="/contact" color="inherit" underline="hover">
                Contact
              </MuiLink>
            </Box>
          </Grid>
          <Grid item xs={6} md={4}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 700 }}>
              Academic Years
            </Typography>
            <Box display="flex" flexDirection="column" gap={0.75}>
              <MuiLink component={Link} to="/academics/FE" color="inherit" underline="hover">
                First Year (FE)
              </MuiLink>
              <MuiLink component={Link} to="/academics/SE" color="inherit" underline="hover">
                Second Year (SE)
              </MuiLink>
              <MuiLink component={Link} to="/academics/TE" color="inherit" underline="hover">
                Third Year (TE)
              </MuiLink>
              <MuiLink component={Link} to="/academics/BE" color="inherit" underline="hover">
                Fourth Year (BE)
              </MuiLink>
            </Box>
          </Grid>
        </Grid>
        <Typography variant="body2" sx={{ mt: 4, opacity: 0.7, textAlign: "center" }}>
          © {new Date().getFullYear()} CSE Department, D. Y. Patil College of Engineering and
          Technology, Kolhapur. Student MERN project - sample content.
        </Typography>
      </Container>
    </Box>
  );
}
