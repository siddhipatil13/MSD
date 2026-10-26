// Reusable page header shown at the top of every inner page.
import { Box, Typography, Breadcrumbs, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function PageHeader({ title, subtitle }) {
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        color: "#fff",
        px: 3,
        py: 5,
        mb: 3,
      }}
    >
      <Breadcrumbs separator="›" sx={{ color: "#ffffffaa", mb: 1 }}>
        <Link component={RouterLink} to="/" underline="hover" color="inherit">
          Home
        </Link>
        <Typography color="inherit">{title}</Typography>
      </Breadcrumbs>
      <Typography variant="h4">{title}</Typography>
      {subtitle && (
        <Typography variant="body1" sx={{ opacity: 0.85, mt: 0.5, maxWidth: 800 }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}
