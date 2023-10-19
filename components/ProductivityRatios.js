import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { fetchHistoricalStockData } from '../lib/iex'; // Assuming you have this function implemented

const ProductivityRatios = ({ clientStocksMap, numAdvisors, numStaff, numHouseHolds}) => {
  const [totalAUM, setTotalAUM] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const totalAUMData = await fetchHistoricalStockData(clientStocksMap);
      setTotalAUM(totalAUMData);
    };

    fetchData();
  }, [clientStocksMap]);

  const householdsPerAdvisor = numHouseHolds / numAdvisors;
  const householdsPerStaff = numHouseHolds / numStaff;

  const sortedAUM = Object.keys(totalAUM)
    .sort((a, b) => new Date(a) - new Date(b))
    .reduce((acc, key) => ({
      ...acc,
      [key]: totalAUM[key]
  }), {});

  let revenuePerAdvisor = {};
  let revenuePerStaff = {};

  for (const date in sortedAUM) {
    if (sortedAUM.hasOwnProperty(date)) {
      revenuePerAdvisor[date] = 0.1 * (sortedAUM[date] / numAdvisors);
      revenuePerStaff[date] = 0.1 * (sortedAUM[date] / numStaff);
    }
  }

  // Prepare data for the chart
  const dates = Object.keys(totalAUM).sort((a, b) => b - a);

  const totalAUMData = dates.map(date => totalAUM[date]);
  const chartData = {
    
    datasets: [
      {
        label: 'Revenue per Advisor',
        data: revenuePerAdvisor,
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
      {
        label: 'Revenue per Staff',
        data: revenuePerStaff,
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false,
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 10
        }
      }
    }
  };

  return (
    <div style={{ display: 'inline-block', marginRight: '20px', verticalAlign: 'top' }}>
      <h3>Households Per Advisor: {householdsPerAdvisor}</h3>
      <h3>Households Per Staff: {householdsPerStaff}</h3>
      <div style={{ width: '75vw', height: '30vh' }}>    
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ProductivityRatios;
