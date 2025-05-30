import axiosInstance from "./AxiosInstance";

class FlightApiService {
    API_URL = '/flights';

    getToken = () => {
        return localStorage.getItem('token');
    };

    async getAllFlights() {
        try {
            const token = this.getToken();
            const response = await axiosInstance.get(this.API_URL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching all flights:', error.response?.data || error.message);
            throw error.response?.data || new Error('Error fetching all flights');
        }
    }

    async searchFlights(searchParams) {
        try {
            const token = this.getToken();
            const response = await axiosInstance.get(`${this.API_URL}/search`, {
                params: searchParams,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error searching flights:', error.response?.data || error.message);
            throw error.response?.data || new Error('Error searching flights');
        }
    }

    async createFlight(flightData) {
        try {
            const token = this.getToken();
            console.log('Creating flight with data:', flightData);
            const response = await axiosInstance.post(this.API_URL, flightData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error creating flight:', error.response?.data || error.message);
            throw error.response?.data || new Error('Error creating flight');
        }
    }

    async getFlightById(flightId) {
        try {
            const token = this.getToken();
            const response = await axiosInstance.get(`${this.API_URL}/${flightId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error(`Error fetching flight by ID ${flightId}:`, error.response?.data || error.message);
            throw error.response?.data || new Error(`Error fetching flight by ID ${flightId}`);
        }
    }

    async updateFlight(flightId, flightData) {
        try {
            const token = this.getToken();
            const response = await axiosInstance.put(`${this.API_URL}/${flightId}`, flightData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error(`Error updating flight ${flightId}:`, error.response?.data || error.message);
            throw error.response?.data || new Error(`Error updating flight ${flightId}`);
        }
    }

    async deleteFlight(flightId) {
        try {
            const token = this.getToken();
            const response = await axiosInstance.delete(`${this.API_URL}/${flightId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error(`Error deleting flight ${flightId}:`, error.response?.data || error.message);
            throw error.response?.data || new Error(`Error deleting flight ${flightId}`);
        }
    }
}

const flightApiService = new FlightApiService();

export default flightApiService;
