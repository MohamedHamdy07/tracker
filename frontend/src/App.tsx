import { AppBar, Toolbar, Button, Container, Box } from "@mui/material";
import "./App.css";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import { ApplicationDashboard } from "./pages/application-dashboard";
import { NewApplicationPage } from "./pages/new-application-page";
import { HomePage } from "./pages/home-page";
import { AnalyticsPage } from "./pages/analytics-page";

function App() {
  return (
    <BrowserRouter>
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Toolbar sx={{ gap: 1 }}>
          <Box sx={{ fontWeight: 700, fontSize: "1.1rem", mr: 2 }}>
            Job Tracker
          </Box>
          <Button component={Link} to="/home" color="inherit">
            Home
          </Button>
          <Button component={Link} to="/applications" color="inherit">
            Dashboard
          </Button>
          <Button component={Link} to="/analytics" color="inherit">
            Analytics
          </Button>
          <Button
            component={Link}
            to="/new-application"
            variant="contained"
            sx={{ ml: "auto" }}
          >
            New Application
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/applications" element={<ApplicationDashboard />} />
          <Route path="/new-application" element={<NewApplicationPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
