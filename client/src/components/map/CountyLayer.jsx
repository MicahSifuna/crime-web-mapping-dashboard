import React, { useState, useEffect } from "react";

import { useCrime } from "../../context/CrimeContext";
import { getCounties } from "../../api/crimeApi";
import { GeoJSON, useMap } from "react-leaflet";
import { getColor } from "../../utils/getColor";

const CountyLayer = () => {
  const [geoData, setGeoData] = useState(null);
  const { crimeType, setSelectedCounty } = useCrime();

  const map = useMap();

  useEffect(() => {
    getCounties().then(setGeoData).catch(console.error);
  }, []);

  const style = (feature) => ({
    // fillColor: "#333",
    fillColor: getColor(feature.properties[crimeType]),
    weight: 2,
    fillOpacity: 0.7,
    color: "#333",
  });

  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: () => {
        layer.setStyle({
          weight: 3,
          color: "#000",
          // fillOpacity: 0.7
        });

        layer.bringToFront();
      },

      mouseout: () => {
        layer.setStyle(style(feature));
      },

      click: () => {
        setSelectedCounty(feature.properties);

        map.fitBounds(layer.getBounds(), {
          padding: [30, 30],
          maxZoom: 12,
        });
      },
    });

    layer.bindTooltip(feature.properties.county);
  };

  if (!geoData) return null;

  return (
    <GeoJSON
      key={crimeType}
      data={geoData}
      style={style}
      onEachFeature={onEachFeature}
    />
  );
};
export default CountyLayer;
