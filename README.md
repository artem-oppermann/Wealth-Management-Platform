# Wealth Management Platform

In this tutorial, you'll develop a basic wealth management dashboard that provides a multidimensional view of an asset portfolio using [Node.js](https://nodejs.org/en) and financial data sourced from IEX Cloud]. It features real-time metrics such as the current ticker price, absolute lifetime profit/loss, and daily gains or losses and displays key performance indicators, including profitability ratios like gross profit margin and operating profit margin, productivity metrics like revenue per advisor and operating profit per staff, and client selection ratios like revenue and profit per client household. 

## How to use

### Set Up a Next.js Project

If you don't already have [Node.js](https://nodejs.org/de/download) and [npm](https://www.npmjs.com/package/npm), you'll need to install them now.  

Next, you will need to install [react-chartjs-2](https://react-chartjs-2.js.org/) using `npm`:

```
npm install react-chartjs-2 chart.js
```
This package allows you to easily integrate visualizations into the wealth management dashboard, providing a range of options for creating interactive and dynamic charts for displaying the financial data.

After the installation, create a new [Next.js](https://nextjs.org/docs) app by executing the following command in the command prompt:

```
npx create-next-app wealth-management-dashboard
```
Then, navigate to the project directory:

```
cd wealth-management-dashboard
```

### Set Up an IEX Cloud Account 

After setting up your Next.js project, you need to [sign up for a free IEX Cloud account](https://iexcloud.io/cloud-login#/register). After signing up, navigate to the **Home** section to access your personal (secret) IEX API key. 

Make sure you store the API key securely. It's recommended that you use an environment variable to store it by creating a `.env.local` file in your `Next.js` project root and adding the key:

```
IEX_API_KEY=<your api key>
```

