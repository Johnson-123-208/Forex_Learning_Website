export const calculatePipValue = (pair, lotSize) => {
  const isJpy = pair.includes('JPY');
  const pip = isJpy ? 0.01 : 0.0001;
  // 1 standard lot = 100,000 units. Pip value = 100,000 * 0.0001 = $10.
  // For JPY, 100,000 * 0.01 = 1,000 JPY (~$7-10)
  const baseValue = 10; 
  return lotSize * baseValue; // Approximation for USD accounts
};

export const calculatePositionSize = (balance, riskPerc, slPips, pair) => {
  const riskAmount = balance * (riskPerc / 100);
  const pipValuePerStandardLot = 10; // For USD based pairs
  const positionSize = riskAmount / (slPips * pipValuePerStandardLot);
  return parseFloat(positionSize.toFixed(2));
};

export const calculateMargin = (pair, lotSize, leverage) => {
  const contractSize = 100000;
  // Margin = (Market Price * Lot Size * Contract Size) / Leverage
  return (1.085 * lotSize * contractSize) / leverage; // Example EUR/USD
};
