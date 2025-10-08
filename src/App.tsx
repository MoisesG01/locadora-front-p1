import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Vehicles from "./pages/Vehicles";
import Rentals from "./pages/Rentals";
import CustomerArea from "./pages/CustomerArea";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/vehicles" element={<Vehicles />} />
                <Route path="/rentals" element={<Rentals />} />
                <Route path="/customer-area" element={<CustomerArea />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
