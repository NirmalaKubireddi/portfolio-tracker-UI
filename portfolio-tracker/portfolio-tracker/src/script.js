// Store stocks in an array
let stocks = [];

// Get DOM elements
const stockForm = document.querySelector('form');
const stockNameInput = document.querySelector('input[placeholder="Stock Name"]');
const tickerInput = document.querySelector('input[placeholder="Ticker"]');
const quantityInput = document.querySelector('input[placeholder="Quantity"]');
const buyPriceInput = document.querySelector('input[placeholder="Buy Price"]');
const stockHoldingsTable = document.querySelector('#stockHoldings tbody');

// Add event listener to form
document.querySelector('.add-stock-btn').addEventListener('click', addStock);

function addStock(e) {
    e.preventDefault();

    // Get input values
    const stockName = stockNameInput.value;
    const ticker = tickerInput.value;
    const quantity = parseInt(quantityInput.value);
    const buyPrice = parseFloat(buyPriceInput.value);

    // Validate inputs
    if (!stockName || !ticker || !quantity || !buyPrice) {
        alert('Please fill in all fields');
        return;
    }

    // Create new stock object
    const stock = {
        name: stockName,
        ticker: ticker,
        quantity: quantity,
        buyPrice: buyPrice,
        currentPrice: buyPrice // In a real app, this would come from an API
    };

    // Add stock to array
    stocks.push(stock);

    // Update UI
    updateStockTable();
    updatePortfolioOverview();
    clearForm();
}

function updateStockTable() {
    // Clear existing table
    stockHoldingsTable.innerHTML = '';

    // Add each stock to table
    stocks.forEach((stock, index) => {
        const row = document.createElement('tr');
        
        // Calculate performance
        const performance = ((stock.currentPrice - stock.buyPrice) / stock.buyPrice) * 100;
        
        row.innerHTML = `
            <td>${stock.name}</td>
            <td>${stock.ticker}</td>
            <td>${stock.quantity}</td>
            <td>$${stock.buyPrice.toFixed(2)}</td>
            <td>$${stock.currentPrice.toFixed(2)}</td>
            <td>
                <button class="edit-btn" onclick="editStock(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteStock(${index})">Delete</button>
            </td>
        `;
        
        stockHoldingsTable.appendChild(row);
    });
}

function updatePortfolioOverview() {
    // Calculate total value
    const totalValue = stocks.reduce((total, stock) => {
        return total + (stock.quantity * stock.currentPrice);
    }, 0);

    // Find top performer
    let topPerformer = null;
    let bestPerformance = -Infinity;

    stocks.forEach(stock => {
        const performance = ((stock.currentPrice - stock.buyPrice) / stock.buyPrice) * 100;
        if (performance > bestPerformance) {
            bestPerformance = performance;
            topPerformer = stock;
        }
    });

    // Update UI
    document.querySelector('.total-value').textContent = `$${totalValue.toFixed(2)}`;
    document.querySelector('.total-stocks').textContent = stocks.length;
    
    if (topPerformer) {
        document.querySelector('.top-performer').textContent = 
            `${topPerformer.ticker} ${bestPerformance > 0 ? '+' : ''}${bestPerformance.toFixed(2)}%`;
    }
}

function deleteStock(index) {
    stocks.splice(index, 1);
    updateStockTable();
    updatePortfolioOverview();
}

function editStock(index) {
    const stock = stocks[index];
    
    // Populate form with stock data
    stockNameInput.value = stock.name;
    tickerInput.value = stock.ticker;
    quantityInput.value = stock.quantity;
    buyPriceInput.value = stock.buyPrice;
    
    // Remove old stock
    stocks.splice(index, 1);
    
    // Update UI
    updateStockTable();
    updatePortfolioOverview();
}

function clearForm() {
    stockNameInput.value = '';
    tickerInput.value = '';
    quantityInput.value = '';
    buyPriceInput.value = '';
}

// Optional: Add mock real-time price updates
function simulatePriceUpdates() {
    setInterval(() => {
        stocks.forEach(stock => {
            // Randomly adjust price by ±2%
            const change = (Math.random() - 0.5) * 0.04;
            stock.currentPrice *= (1 + change);
        });
        updateStockTable();
        updatePortfolioOverview();
    }, 5000); // Update every 5 seconds
}

// Start price simulation
simulatePriceUpdates();