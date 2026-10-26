// Reusable state components: loading, error and empty states.
// Demonstrates CONDITIONAL RENDERING in React.
import { Alert, Box, CircularProgress, Typography, Button } from "@mui/material";

export function Loader({ text = "Loading..." }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 6, gap: 2 }}>
      <CircularProgress size={30} />
      <Typography color="text.secondary">{text}</Typography>
    </Box>
  );
}

export function ErrorAlert({ message, onRetry }) {
  if (!message) return null;
  return (
    <Box sx={{ my: 2 }}>
      <Alert
        severity="error"
        action={
          onRetry ? (
            <Button color="inherit" size="small" onClick={onRetry}>
              Retry
            </Button>
          ) : null
        }
      >
        {message}
      </Alert>
    </Box>
  );
}

export function EmptyState({ message = "No records found yet." }) {
  return (
    <Box sx={{ textAlign: "center", py: 6 }}>
      <Typography variant="subtitle1" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
}
