import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { useCrime } from "../../context/CrimeContext";
import { buildPieChartData } from "./chartUtils";
import StatisticalCard from "../cards/StatisticalCard";

const COLORS = ["#D73027", "#fc8d59", "#fee08b", "#91bfdb", "$4575b4"];
const CrimePieChart = () => {
  const { selectedCounty } = useCrime();

  const data = useMemo(
    () => buildPieChartData(selectedCounty),
    [selectedCounty],
  );

  if (!selectedCounty) {
    return (
      <StatisticalCard title="Crime Distribution">
        <div className="chart-empty">
          Click a county on the map to view its crime distribution.
        </div>
      </StatisticalCard>
    );
  }
  return (
    <StatisticalCard title={`${selectedCounty.county} Crime Distribution`}>
      <div className="chart">
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cy="50%"
              cx="50%"
              outerRadius={120}
              innerRadius={40}
              paddingAngle={3}
              label={({ percent }) => `${(percent * 100).toFixed(2)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => value.toLocaleString()} />
            <Legend verticalAlign="bottomm" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </StatisticalCard>
  );
};

export default CrimePieChart;
