import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api";

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

const handleApiError = (error) => {
    if (error.response) {
        console.error(`Backend Error (${error.response.status}):`, error.response.data);
    } else if (error.request) {
        console.error("Network Error: No response received from backend.");
    } else {
        console.error("API Setup Error:", error.message);
    }
};

export const journalService = {
    /**
     * @param {string} theme
     * @param {string} content
     */
    createJournalEntry: async (theme, content) => {
        try {
            const response = await apiClient.post('/journals', {
                theme: theme,
                content: content
            });
            return response.data;
        } catch (error) {
            handleApiError(error);
            throw error;
        }
    },

    getAllJournals: async () => {
        try {
            const response = await apiClient.get('/journals');
            return response.data;
        } catch (error) {
            handleApiError(error);
            throw error;
        }
    }
};

export default journalService;