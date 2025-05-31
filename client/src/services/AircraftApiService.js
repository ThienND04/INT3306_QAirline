import axiosInstance from './AxiosInstance';

const API_URL = '/aircrafts'; 

const getAuthHeaders = () => {
    const token = localStorage.getItem('token'); 
    if (token) {
        return { Authorization: `Bearer ${token}` };
    }
    return {};
};

const AircraftApiService = {
    async getAllAircrafts() {
        try {
            const response = await axiosInstance.get(API_URL, { headers: getAuthHeaders() });
            return response.data;
        } catch (error) {
            console.error('Error fetching all aircraft:', error.response || error.message);
            throw error.response ? error.response.data : new Error('Network error');
        }
    },

    async getAircraftById(id) {
        try {
            const response = await axiosInstance.get(`${API_URL}/${id}`, { headers: getAuthHeaders() });
            console.log('Aircraft data loaded:', response.data);
            return response.data;
        } catch (error) {
            console.error(`Error fetching aircraft with ID ${id}:`, error.response || error.message);
            throw error.response ? error.response.data : new Error('Network error');
        }
    },

    async createAircraft(aircraftData) {
        try {
            const response = await axiosInstance.post(API_URL, aircraftData, { headers: getAuthHeaders() });
            return response.data;
        } catch (error) {
            console.error('Error creating aircraft:', error.response || error.message);
            throw error.response ? error.response.data : new Error('Network error');
        }
    },

    async updateAircraft(id, aircraftData){
        try {
            const response = await axiosInstance.put(`${API_URL}/${id}`, aircraftData, { headers: getAuthHeaders() });
            return response.data;
        } catch (error) {
            console.error(`Error updating aircraft with ID ${id}:`, error.response || error.message);
            throw error.response ? error.response.data : new Error('Network error');
        }
    },

    async deleteAircraft(id){
        try {
            const response = await axiosInstance.delete(`${API_URL}/${id}`, { headers: getAuthHeaders() });
            return response.data;
        } catch (error) {
            console.error(`Error deleting aircraft with ID ${id}:`, error.response || error.message);
            throw error.response ? error.response.data : new Error('Network error');
        }
    },

    async hardDeleteAircraft(id) {
        try {
            const response = await axiosInstance.delete(`${API_URL}/hard-delete/${id}`, { headers: getAuthHeaders() });
            return response.data;
        } catch (error) {
            console.error(`Error hard deleting aircraft with ID ${id}:`, error.response || error.message);
            throw error.response ? error.response.data : new Error('Network error');
        }
    },

    async getDeletedAircrafts() {
        try {
            const response = await axiosInstance.get(`${API_URL}/deleted`, { headers: getAuthHeaders() });
            return response.data;
        } catch (error) {
            console.error('Error fetching deleted aircraft:', error.response || error.message);
            throw error.response ? error.response.data : new Error('Network error');
        }
    },

    async restoreAircraft(id) {
        try {
            const response = await axiosInstance.patch(`${API_URL}/${id}/restore`, {}, { headers: getAuthHeaders() });
            return response.data;
        } catch (error) {
            console.error(`Error restoring aircraft with ID ${id}:`, error.response || error.message);
            throw error.response ? error.response.data : new Error('Network error');
        }
    }
};

export default AircraftApiService;
