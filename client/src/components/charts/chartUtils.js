import { getColor } from "../../utils/getColor";

// BARCHART DATA
export function buildBarChartData(geoData, crimeType) {
  if (!geoData?.features) return [];

  return geoData.features
    .map((feature) => ({
      county: feature.properties.county,
      value: Number(feature.properties[crimeType]) || 0,
      color: getColor(feature.properties[crimeType]),
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10); // Get top 10 counties
}

// PIECHART DATA

export function buildPieChartData(selectedCounty) {
  if (!selectedCounty) return [];

  return [
    {
      name: "Homicide",
      value: Number(selectedCounty.homicide) || 0,
    },
    {
      name: "Assault",
      value: Number(selectedCounty.assault) || 0,
    },
    {
      name: "Robbery",
      value: Number(selectedCounty.robbery) || 0,
    },
    {
      name: "Breaking",
      value: Number(selectedCounty.breaking) || 0,
    },
    {
      name: "Drugs",
      value: Number(selectedCounty.drugs) || 0,
    },
  ];
}
