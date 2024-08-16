export const useCalculatePercentageChange = (current, last) => {
  if (last === 0) {
    return current > 0 ? "Infinity" : "0";
  }
  const change = ((current - last) / last) * 100;
  return change.toFixed(2) + "%"; // Formats the number to two decimal places and appends a '%' symbol
};
