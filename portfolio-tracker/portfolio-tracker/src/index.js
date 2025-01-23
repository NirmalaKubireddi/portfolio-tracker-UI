import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

const App = () => {
    const [stocks, setStocks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchStocks();
    }, []);

    async function fetchStocks() {
        try {
            const response = await fetch('http://localhost:8080/api/stocks/data');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setStocks(data);
        } catch (error) {
            setError(error.message);
        }
    }

    const renderStockTable = () => {
        return stocks.map(stock => (
            <tr key={stock.id}>
                <td>{stock.stockName || 'N/A'}</td>
                <td>{stock.stockTicker || 'N/A'}</td>
                <td>{stock.stockQuantity || 0}</td>
                <td>{stock.stockBuyPrice ? `$${stock.stockBuyPrice.toFixed(2)}` : 'N/A'}</td>
                <td>{stock.stockValue !== undefined && stock.stockValue !== null ? `$${stock.stockValue.toFixed(2)}` : 'N/A'}</td>
                <td><button onClick={() => handleDelete(stock.id)}>Delete</button></td>
            </tr>
        ));
    };

    const handleDelete = (id) => {
        // Handle stock deletion logic here
    };

    return (
        <div>
            <h1>Portfolio Tracker</h1>
            {error && <p>{error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>Stock</th>
                        <th>Ticker</th>
                        <th>Quantity</th>
                        <th>Buy Price</th>
                        <th>Stock Value</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {renderStockTable()}
                </tbody>
            </table>
        </div>
    );
};

// Ensure the element exists and React is mounting the app correctly
const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />);
} else {
    console.error('Root element not found');
}
