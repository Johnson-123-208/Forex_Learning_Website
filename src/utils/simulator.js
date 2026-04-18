export const simulatePriceMovement = (currentPrice) => {
  const volatility = 0.0005; // Adjust for different pairs
  const change = (Math.random() - 0.5) * 2 * volatility;
  return parseFloat((currentPrice + change).toFixed(5));
};

export const generateCandlestickData = (basePrice, count = 50) => {
  let data = [];
  let currentPrice = basePrice;
  const now = new Date();

  for (let i = 0; i < count; i++) {
    const open = currentPrice;
    const high = open + Math.random() * 0.001;
    const low = open - Math.random() * 0.001;
    const close = low + Math.random() * (high - low);
    
    data.push({
      time: new Date(now.getTime() - (count - i) * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      open, high, low, close
    });
    currentPrice = close;
  }
  return data;
};

export const calculatePnL = (entry, current, lots, direction, pair) => {
  // Simple calculation: 1 lot = 100,000 units. 
  // PnL = (Current - Entry) * Lots * 100,000
  const multiplier = direction === 'buy' ? 1 : -1;
  const pips = (current - entry) * (pair.includes('JPY') ? 100 : 10000);
  const pipValue = 10; // Assuming standard lot $10 per pip for simplicity
  return pips * multiplier * (lots * 10);
};
