import React from "react";
import { useCrime } from "../../context/CrimeContext";
import { getColor } from "../../utils/getColor";

const MapLegend = () => {
  const { crimeType } = useCrime();

  const legendItems = [
    { label: "0 - 10", value: 5 },
    { label: "11 - 20", value: 15 },
    { label: "21 - 50", value: 35 },
    { label: "51 - 100", value: 75 },
    { label: "101 - 200", value: 150 },
    { label: "201 - 500", value: 350 },
    { label: "501 - 1000", value: 750 },
    { label: "1000+", value: 1000 },
  ];
  return (
    <div className="legend">
      <h4>{crimeType.toUpperCase()}</h4>
      <h4>Cases</h4>

      {legendItems.map((item, index) => (
        <div className="legend-item" key={index}>
          <i style={{ backgroundColor: getColor(item.value) }} />
          <span>{item.label}</span>
        </div>
      ))}

      <div className="legend-item">
        <i style={{ backgroundColor: "#d9d9d9" }} />
        <span>No Data</span>
      </div>
    </div>
  );
};

export default MapLegend;
