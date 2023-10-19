import { useEffect, useState } from 'react';
import { fetchIncomeData } from '../lib/iex';
import { Line } from 'react-chartjs-2';

import {Chart} from 'chart.js/auto';


const ProfitabilityRatios = ({ ticker, dataRange }) => {
  const [grossProfitMargins, setGrossProfitMargins] = useState([]);
  const [operatingProfitMargins, setOperatingProfitMargins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { grossProfitMargins, operatingProfitMargins } = await fetchIncomeData(ticker, dataRange);

      setGrossProfitMargins(grossProfitMargins);
      setOperatingProfitMargins(operatingProfitMargins);
      setIsLoading(false);
    };

    fetchData();
  }, [ticker, dataRange]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const data = {
    labels: Array.from({ length: dataRange }, (_, i) => `Q${i + 1}`),
    datasets: [
      {
        label: 'Gross Profit Margin',
        data: grossProfitMargins,
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
      {
        label: 'Operating Profit Margin',
        data: operatingProfitMargins,
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    // ... your other options
  };
  
  return (
    <div style={{ display: 'inline-block', marginRight: '20px', verticalAlign: 'top' }}>
      <h4>{ticker}</h4>
      <div style={{ width: '75vw', height: '30vh' }}> 
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default ProfitabilityRatios;
