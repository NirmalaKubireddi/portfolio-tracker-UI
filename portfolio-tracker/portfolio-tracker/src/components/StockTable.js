import React from 'react';

const StockTable = ({ stocks, onDelete, onEdit }) => {
    return (
        <table className="table-auto w-full border">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Ticker</th>
                    <th>Quantity</th>
                    <th>Buy Price</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {stocks.map((stock) => (
                    <tr key={stock.id}>
                        <td>{stock.name}</td>
                        <td>{stock.ticker}</td>
                        <td>{stock.quantity}</td>
                        <td>${stock.buyPrice.toFixed(2)}</td>
                        <td>
                            <button onClick={() => onEdit(stock)}>Edit</button>
                            <button onClick={() => onDelete(stock.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default StockTable;
