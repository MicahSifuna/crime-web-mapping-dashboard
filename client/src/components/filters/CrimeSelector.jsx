import React from "react";
import { useCrime } from "../../context/CrimeContext";

const CrimeSelector = () => {
  const { crimeType, setCrimeType } = useCrime();
  return (
    <select value={crimeType} onChange={(e) => setCrimeType(e.target.value)}>
      <option value="homicide">Homicide</option>
      <option value="assault">Assault</option>
      <option value="robbery">Robbery</option>
      <option value="breaking">Breaking</option>
      <option value="drugs">Drugs</option>
    </select>
  );
};

export default CrimeSelector;
