export function getColor(value) {
  return value > 1000
    ? "#800026"
    : value > 500
      ? "#BD0026"
      : value > 200
        ? "#E31A1C"
        : value > 100
          ? "#FC4E2A"
          : value > 50
            ? "#FD8D3C"
            : value > 20
              ? "#FEB24C"
              : value > 10
                ? "#FED976"
                : "#FFEDA0"; // no data
}
