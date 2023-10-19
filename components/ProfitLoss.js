// ProfitLoss.js
import { useEffect, useState } from 'react';
import { fetchStockData } from '../lib/iex';

const ProfitLoss = ({ ticker, purchasedOn, initialAmount }) => {
  const [currentPrice, setCurrentPrice] = useState(null);
  const [previousClose, setPreviousClose] = useState(null); 
  const [initialPrice, setInitialPrice]  = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { latestPrice, previousClose, initialPrice } = await fetchStockData(ticker, purchasedOn);

      setCurrentPrice(latestPrice);
      setPreviousClose(previousClose); 
      setInitialPrice(initialPrice);
      setIsLoading(false);
    };

    fetchData();
  }, [ticker, purchasedOn]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const lifetimeProfitLoss = (currentPrice - initialPrice) * initialAmount;
  const percentageLifetimeProfitLoss = ((currentPrice - initialPrice) / initialPrice) * 100;

  const dayProfitLoss = (currentPrice - previousClose) * initialAmount;
  const percentageDayProfitLoss = ((currentPrice - previousClose) / previousClose) * 100;

  return (
    <div style={{ display: 'inline-block', marginRight: '20px', verticalAlign: 'top' }}>
      <h3>{ticker}</h3>
      <p>Current Price: ${currentPrice.toFixed(2)}</p>
      <p>Absolute Lifetime Profit/Loss: ${lifetimeProfitLoss.toFixed(2)}</p>
      <p>Percentage Lifetime Profit/Loss: {percentageLifetimeProfitLoss.toFixed(2)}%</p>
      <p>Profit/Loss on Current Day: ${dayProfitLoss.toFixed(2)}</p>
      <p>Profit/Loss Percentage on Current Day: {percentageDayProfitLoss.toFixed(2)}%</p>
    </div>
  );
};

export default ProfitLoss;
