export const fetchStockData = async (ticker, purchasedOnData) => {

    const purchasedOn = new Date(purchasedOnData);
    const today = new Date();

    purchasedOn.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const timeDifference = Math.abs(today.getTime() - purchasedOn.getTime());
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    const currentDataResponse= await fetch(`https://api.iex.cloud/v1/data/core/quote/${ticker}?token=pk_5d47b97b684f43a59b4ae15beb0e1f14`);
    const historicalPrices = await fetch(`https://api.iex.cloud/v1/data/core/historical_prices/${ticker}?range=${daysDifference}d&token=pk_5d47b97b684f43a59b4ae15beb0e1f14`);

    const currentDataResponseArray = await currentDataResponse.json();  // Assuming the response is an object, not an array
    const currentDay = currentDataResponseArray[0];

    const historicalPricesArray = await historicalPrices.json();  // Assuming the response is an object, not an array
    const firstDay = historicalPricesArray[historicalPricesArray.length - 1];

    return {
        latestPrice: currentDay.latestPrice,
        previousClose: currentDay.previousClose,
        initialPrice: firstDay.open
      };
  };


  export const fetchIncomeData = async (ticker, dataRange) => {
    const response = await fetch(`https://api.iex.cloud/v1/data/core/income/${ticker}/quarterly?last=${dataRange}&token=pk_5d47b97b684f43a59b4ae15beb0e1f14`);
    const fundamentalsDataResponseArray = await response.json();
    
    const grossProfitMargins = [];
    const operatingProfitMargins = [];
  
    fundamentalsDataResponseArray.forEach(entry => {
      const grossProfitMargin = (entry.grossProfit / entry.totalRevenue) * 100;
      const operatingProfitMargin = ((entry.operatingIncome - entry.operatingExpense) / entry.totalRevenue) * 100;
      
      grossProfitMargins.push(grossProfitMargin);
      operatingProfitMargins.push(operatingProfitMargin);
    });
  
    return {
      grossProfitMargins,
      operatingProfitMargins
    };
  };

  export const fetchHistoricalStockDataForTicker = async (ticker, purchasedOnData) => {

    const purchasedOn = new Date(purchasedOnData);
    const today = new Date();

    purchasedOn.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const timeDifference = Math.abs(today.getTime() - purchasedOn.getTime());
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    const historicalPrices = await fetch(`https://api.iex.cloud/v1/data/core/historical_prices/${ticker}?range=${daysDifference}d&token=pk_5d47b97b684f43a59b4ae15beb0e1f14`);

    const historicalPricesArray = await historicalPrices.json();  // Assuming the response is an object, not an array
    return {
        historicalPricesArray
      };
  };



  export const fetchHistoricalStockData = async (clientStocksMap) => {

    let avgAUMByYear = {};

      const clientStocks = Object.values(clientStocksMap).flat();

      for (const [ticker, purchasedOnData, amount] of clientStocks) {

        const purchasedOn = new Date(purchasedOnData);
        const today = new Date();

        purchasedOn.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        const timeDifference = Math.abs(today.getTime() - purchasedOn.getTime());
        const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

        const response = await fetch(`https://api.iex.cloud/v1/data/core/historical_prices/${ticker}?range=${daysDifference}d&token=pk_5d47b97b684f43a59b4ae15beb0e1f14`);
        const historicalPricesArray = await response.json();
  
        historicalPricesArray.forEach(entry => {
            const priceDate = new Date(entry.priceDate);
            const year = priceDate.getFullYear();
            const openValue = entry.open;

            if (!avgAUMByYear[year]) {
                avgAUMByYear[year] = { total: 0, count: 0 };
            }

            avgAUMByYear[year].total += openValue * amount;
            avgAUMByYear[year].count += 1;
          });
      }
      // Calculate the average AUM per year
      for (const year in avgAUMByYear) {
        avgAUMByYear[year] = avgAUMByYear[year].total / avgAUMByYear[year].count;
      }
      return avgAUMByYear;
    
  };
