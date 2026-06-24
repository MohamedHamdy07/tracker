import { Button } from "@mui/material";
import "./App.css";
import { JobsForm } from "./jobs-form/jobs-form";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { ApplicationDashboard } from "./pages/application-dashboard";
import { NewApplicationPage } from "./pages/new-application-page";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Button variant="outlined">
          <Link to="/home">Home</Link>
        </Button>
        <Button variant="outlined">
          <Link to="/applications">Application Dashboard</Link>
        </Button>
        <Button variant="outlined">
          <Link to="/new-application">Submit a new application</Link>
        </Button>
      </nav>
      <div className="table-header">
        <h1 style={{ flex: 1 }}>Job Application Tracker</h1>
      </div>
      <Routes>
        <Route path="/home" />
        <Route path="/applications" element={<ApplicationDashboard />} />
        <Route path="new-application" element={<NewApplicationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
