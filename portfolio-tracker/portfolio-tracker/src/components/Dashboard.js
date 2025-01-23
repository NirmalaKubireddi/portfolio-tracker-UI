import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const Dashboard = ({ portfolioData }) => {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold">Portfolio Dashboard</h2>
            <div className="flex gap-4">
                <div>
                    <h3>Total Portfolio Value: ${portfolioData.totalValue}</h3>
                    <p>Top Stock: {portfolioData.topStock}</p>
                </div>
                <PieChart width={200} height={200}>
                    <Pie
                        data={portfolioData.distribution}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={50}
                        fill="#8884d8"
                    >
                        {portfolioData.distribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </div>
        </div>
    );
};

export default Dashboard;
