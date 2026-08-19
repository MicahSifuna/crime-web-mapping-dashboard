import React from "react";

const StatisticalCard = ({ title, children }) => {
  return (
    <div className="statistical-card">
      <h3 className="statistical-card-title">{title}</h3>
      <div className="statistical-card-content">{children}</div>
    </div>
  );
};

export default StatisticalCard;
