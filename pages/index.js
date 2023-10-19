// pages/index.js
import { useState } from 'react';
import ProfitLoss from '../components/ProfitLoss';
import ProfitabilityRatios from '../components/ProfitabilityRatios';
import ProductivityRatios from '../components/ProductivityRatios';
import ClientSelectionRatios from '../components/ClientSelectionRatios';

// Create a function that returns options for a given ticker
const getOptions = (ticker) => ({
  maintainAspectRatio: false,
  title: {
    display: true,
    text: `Stock: ${ticker}`,
  },
  // ... your other options
});

export default function Home() {

  const [selectedClient, setSelectedClient] = useState('A');

  const clientStocksMap = {
    'A': [
      ["AAPL", "2019-04-12", 95000],
      ["AMZN", "2020-08-12", 35000],
      ["TSLA", "2020-07-05", 7500],
      // add more stocks as needed for client A
    ],
    'B': [
      ["AAPL", "2020-09-12", 75000],
      ["MSFT", "2020-09-12", 89000],
      // add more stocks as needed for client B
    ],
    'C': [
      ["AMZN", "2020-03-06", 150000],
      // add more stocks as needed for client C
    ]
  };

  const clientHouseholds = {
    'Household I' : [ 'A', 'B'],
    'Household II' : [ 'C'],
  }

  const numAdvisors = 5.0;
  const numStaff = 10.0;
  const numHouseHolds = 2;

  const advisorSalary = 75000;
  const staffSalary = 40000;
  
  const stocks = clientStocksMap[selectedClient] || []; // Default to an empty array if selectedClient is not valid
  

  return (
    <div style={{ backgroundColor: 'black', color: 'white' }}>
      <h1>My Wealth Management Dashboard</h1>
  
      <label>Select Client: </label>
      <select value={selectedClient} onChange={(e) => setSelectedClient(e.target.value)}>
        <option value="A">Client A</option>
        <option value="B">Client B</option>
        <option value="C">Client C</option>
      </select>
      <h2>Profit and Loss of Holdings for a complete Portfolio of Assets</h2>
      {stocks.map(([ticker, purchasedOn, initialAmount], index) => (
        <ProfitLoss 
          key={index}
          ticker={ticker}
          purchasedOn={purchasedOn}
          initialAmount={initialAmount}       
        />
      ))}
      <h2>Profitability Ratios over Time</h2>
      {stocks.map(([ticker, _, __], index) => (
        <ProfitabilityRatios 
          key={index}
          ticker={ticker}
          dataRange={8}
        />
      ))}
      <h2>Productivity Ratios over Time</h2>
      <ProductivityRatios clientStocksMap={clientStocksMap} numAdvisors = {numAdvisors} numStaff= {numStaff} numHouseHolds={numHouseHolds}/>
      <h2>Client Selection Ratios over Time</h2> 
      <ClientSelectionRatios clientStocksMap={clientStocksMap} clientHouseholds={clientHouseholds} numAdvisors = {numAdvisors} numStaff= {numStaff} numHouseHolds={numHouseHolds} advisorSalary = {advisorSalary} staffSalary={staffSalary}/>
    </div>
  );
  
}

