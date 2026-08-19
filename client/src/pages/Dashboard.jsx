import React from "react";
import Map from "../components/map/Map";
import MapLegend from "../components/map/MapLegend";
import "./dashboard.css";
import CrimeSelector from "../components/filters/CrimeSelector";
import CrimeBarChart from "../components/charts/CrimeBarChart";
import CrimePieChart from "../components/charts/CrimePieChart";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Map />

      <div className="top-controls">
        <CrimeSelector />
      </div>

      <div className="sidebar">
        <CrimeBarChart />
        <CrimePieChart />
      </div>

      <MapLegend />
    </div>
  );
};

export default Dashboard;
