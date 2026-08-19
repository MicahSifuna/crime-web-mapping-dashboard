import React, { useState, useEffect, useMemo } from "react";
import { useCrime } from "../../context/CrimeContext";
import { getCounties } from "../../api/crimeApi";
import { buildBarChartData } from "./chartUtils";
import StatisticalCard from "../cards/StatisticalCard";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  CartesianGrid,
} from "recharts";

const CrimeBarChart = () => {
  const { crimeType } = useCrime();
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    getCounties().then(setGeoData).catch(console.error);
  }, []);

  const chartData = useMemo(
    () => buildBarChartData(geoData, crimeType),
    [geoData, crimeType],
  );

  if (!chartData.length)
    return (
      <StatisticalCard title="Crime Histogram">
        <div className="chart-empty">Loading crime data ...</div>
      </StatisticalCard>
    );
  return (
    <StatisticalCard title={`Top 10 Counties - ${crimeType.toUpperCase()}`}>
      <div className="chart">
        <ResponsiveContainer width="100%" height={420}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{
              top: 10,
              right: 20,
              left: 25,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              tickFormatter={(value) => value.toLocaleString()}
            />
            <YAxis type="category" dataKey="county" width={110} />
            <Tooltip formatter={(value) => value.toLocaleString()} />
            <Bar
              dataKey="value"
              radius={[0, 5, 5, 0]}
              barSize={18}
              isAnimationActive
              animationDuration={800}
            >
              {chartData.map((entry, index) => (
                <Cell key={entry.county} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </StatisticalCard>
  );
};

export default CrimeBarChart;
