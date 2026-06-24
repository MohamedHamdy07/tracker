import { Button } from "@mui/material";
import "./App.css";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import { ApplicationDashboard } from "./pages/application-dashboard";
import { NewApplicationPage } from "./pages/new-application-page";
import { HomePage } from "./pages/home-page";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Button component={Link} to="/home" variant="outlined">
          Home
        </Button>
        <Button component={Link} to="/applications" variant="outlined">
          Application Dashboard
        </Button>
        <Button component={Link} to="/new-application" variant="outlined">
          Submit a new application
        </Button>
      </nav>
      <div className="table-header">
        <h1 style={{ flex: 1 }}>Job Application Tracker</h1>
      </div>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/applications" element={<ApplicationDashboard />} />
        <Route path="/new-application" element={<NewApplicationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
