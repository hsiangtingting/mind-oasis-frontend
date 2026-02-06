import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

const apiClient = axios.create({
    baseURL: `${API_BASE_URL.replace(/\/$/, "")}/api`,
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

    createJournalEntry: async (theme, content) => {
        const uuid = localStorage.getItem('token');

        console.log("Submitting. Found Token:", uuid || "None (Guest Mode)");

        try {
            const response = await apiClient.post('/journals',
                {
                    theme: theme,
                    content: content
                },
                {
                    params: { userUuid: uuid }
                }
            );
            return response.data;
        } catch (error) {
            handleApiError(error);
            throw error;
        }
    },

    getJournalsByUser: async () => {
        const uuid = localStorage.getItem('token');
        if (!uuid) throw new Error("Please login first");

        try {
            const response = await apiClient.get('/journals', {
                params: { userUuid: uuid }
            });
            return response.data;
        } catch (error) {
            handleApiError(error);
            throw error;
        }
    },

    deleteJournal: async (id) => {
        try {
            const response = await apiClient.delete(`/journals/${id}`);
            return response.data;
        } catch (error) {
            handleApiError(error);
            throw error;
        }
    }
};

export default journalService;