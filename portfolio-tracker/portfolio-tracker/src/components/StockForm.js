import React, { useState } from 'react';
import { stockService } from '../services/stockService';

function StockForm() {
    const [stockData, setStockData] = useState({
        symbol: '',
        price: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const savedStock = await stockService.saveStock(stockData);
            console.log('Stock saved:', savedStock);
            // Reset form or show success message
        } catch (error) {
            // Handle error (show error message)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={stockData.symbol}
                onChange={(e) => setStockData({...stockData, symbol: e.target.value})}
                placeholder="Stock Symbol"
            />
            <input
                type="number"
                value={stockData.price}
                onChange={(e) => setStockData({...stockData, price: e.target.value})}
                placeholder="Stock Price"
            />
            <button type="submit">Save Stock</button>
        </form>
    );
}

export default StockForm;