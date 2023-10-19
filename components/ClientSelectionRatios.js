import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { fetchHistoricalStockData } from '../lib/iex'; // Assuming you have this function implemented

const ClientSelectionRatios = ({ 
  clientStocksMap, numAdvisors, numStaff, numHouseHolds, advisorSalary, staffSalary
  }) => {

    const [totalAUM, setTotalAUM] = useState({});
    useEffect(() => {
      const fetchData = async () => {
        const totalAUMData = await fetchHistoricalStockData(clientStocksMap);
        setTotalAUM(totalAUMData);
      };

      fetchData();
    }, [clientStocksMap]);

    const sortedAUM = Object.keys(totalAUM)
      .sort((a, b) => new Date(a) - new Date(b))
      .reduce((acc, key) => ({
        ...acc,
        [key]: totalAUM[key]
    }), {});


    let revenuePerHousehold = {};
    let AUMperHousehold = {};
    let grossProfitPerHousehold = {}
    let operatingProfitPerHousehold = {}

    for (const date in sortedAUM) {
      if (sortedAUM.hasOwnProperty(date)) {
        const totalRevenue = 0.1 * sortedAUM[date];
        revenuePerHousehold[date] =  totalRevenue/numHouseHolds;
        AUMperHousehold[date] = totalRevenue / numHouseHolds;
        grossProfitPerHousehold[date] = (totalRevenue - numAdvisors*advisorSalary)/numHouseHolds;
        operatingProfitPerHousehold[date] = (totalRevenue - numAdvisors*advisorSalary - numStaff*staffSalary)/numHouseHolds;
      }
    }
  
    const chartData = {
      datasets: [
        {
          label: 'Revenue per Household',
          data: revenuePerHousehold,
          borderColor: 'rgba(75, 192, 192, 1)',
          fill: false,
        },   
        {
          label: 'AUM per Household',
          data: AUMperHousehold,
          borderColor: 'rgba(255, 99, 132, 1)',
          fill: false,
        },  
        {
          label: 'Gross Profit per Household',
          data: grossProfitPerHousehold,
          borderColor: 'rgba(255, 165, 0, 1)', 
          fill: false,
        },  
        {
          label: 'Operating Profit per Household',
          data: operatingProfitPerHousehold,
          borderColor: 'rgba(128, 0, 128, 1)', 
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
        <div style={{ width: '75vw', height: '30vh' }}>  
          <Line data={chartData} options={options} />
        </div>
      </div>
    );
  };
  
  export default ClientSelectionRatios;
  
