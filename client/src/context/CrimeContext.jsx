import React, { createContext, useContext, useMemo, useState } from "react";

const CrimeContext = createContext();

const CrimeProvider = ({ children }) => {
  const [crimeType, setCrimeType] = useState("homicide");

  const [selectedCounty, setSelectedCounty] = useState(null);

  const value = useMemo(
    () => ({
      crimeType,
      setCrimeType,
      selectedCounty,
      setSelectedCounty,
    }),
    [crimeType, selectedCounty],
  );

  return (
    <CrimeContext.Provider value={value}> {children} </CrimeContext.Provider>
  );
};

export const useCrime = () => {
  const context = useContext(CrimeContext);

  if (!context) {
    throw new Error("useCrime must be used within a CrimeProvider");
  }

  return context;
};
export default CrimeProvider;
