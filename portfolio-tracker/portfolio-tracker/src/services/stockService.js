const API_BASE_URL = 'http://localhost:8080/api/stocks';

export const stockService = {
    saveStock: async (stockData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/save`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(stockData)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Failed to save stock');
            }

            return await response.json();
        } catch (error) {
            console.error('Error saving stock:', error);
            throw error;
        }
    }
};