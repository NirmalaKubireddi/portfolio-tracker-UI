import React, { useState, useEffect } from 'react';
import StockTable from './StockTable';
import AddStockForm from './AddStockForm';
import './App.css';

const App = () => {
    const [stocks, setStocks] = useState([]);
    const [totalValue, setTotalValue] = useState(0);
    const [topPerformer, setTopPerformer] = useState('');

    useEffect(() => {
        // Fetch stocks when the page loads
        fetchStocks();
    }, []);

    // Fetch stocks from backend
    const fetchStocks = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/stocks/data');
            const data = await response.json();
            setStocks(data);
            updateOverview(data);
        } catch (error) {
            console.error('Error fetching stocks:', error);
        }
    };

    // Update portfolio overview
    const updateOverview = (stocks) => {
        const total = stocks.reduce((sum, stock) => sum + stock.stockValue, 0);
        const top = stocks.reduce((prev, current) => (prev.stockValue > current.stockValue ? prev : current), { stockName: 'N/A' });

        setTotalValue(total);
        setTopPerformer(top.stockName);
    };

    // Add stock to the portfolio
    const addStock = (newStock) => {
        const updatedStocks = [...stocks, newStock];
        setStocks(updatedStocks);
        updateOverview(updatedStocks);
    };

    return (
        <div className="container">
            <h2>Portfolio Tracker</h2>

            <AddStockForm addStock={addStock} />

            <h3>Portfolio Overview</h3>
            <div>Total Portfolio Value: ${totalValue.toFixed(2)}</div>
            <div>Top Performer: {topPerformer}</div>

            <h3>Stock Holdings</h3>
            <StockTable stocks={stocks} />
        </div>
    );
};

export default App;
