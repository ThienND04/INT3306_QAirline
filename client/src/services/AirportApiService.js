import axiosInstance from "./AxiosInstance";

const API_URL = '/airports'; 

class AirportApiService {
    getToken = () => {
        return localStorage.getItem('token');
    };

    // Get all airports
    async getAllAirports() {
        try {
            const token = this.getToken();
            const response = await axiosInstance.get(API_URL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            );
            return response.data;
        } catch (error) {
            console.error('Error getting all airports:', error);
            throw error;
        }
    }

    // Get airport by ID
    async getAirportById(id) {
        try {
            const token = this.getToken();
            const response = await axiosInstance.get(`${API_URL}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error(`Error getting airport with ID ${id}:`, error);
            throw error;
        }
    }

    // Create new airport
    async createAirport(airportData) {
        try {
            const token = this.getToken();
            const response = await axiosInstance.post(API_URL, airportData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log()
            return response.data;
        } catch (error) {
            console.error('Error creating airport:', error);
            throw error;
        }
    }

    // Update airport
    async updateAirport(id, airportData) {
        try {
            const token = this.getToken();
            const response = await axiosInstance.put(`${API_URL}/${id}`, airportData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error(`Error updating airport with ID ${id}:`, error);
            throw error;
        }
    }

    // Delete airport
    async deleteAirport(id) {
        try {
            const token = this.getToken();
            const response = await axiosInstance.delete(`${API_URL}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error(`Error deleting airport with ID ${id}:`, error);
            throw error;
        }
    }

    async hardDeleteAirport(id) {
        try {
            const token = this.getToken();
            const response = await axiosInstance.delete(`${API_URL}/hard-delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error(`Error hard deleting airport with ID ${id}:`, error);
            throw error;
        }
    }

    // Get all deleted airports
    async getDeletedAirports() {
        try {
            const token = this.getToken();
            const response = await axiosInstance.get(`${API_URL}/deleted`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error getting deleted airports:', error);
            throw error;
        }
    }

    // Restore airport
    async restoreAirport(id) {
        try {
            const token = this.getToken();
            const response = await axiosInstance.patch(`${API_URL}/restore/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error(`Error restoring airport with ID ${id}:`, error);
            throw error;
        }
    }

    async searchAirport(keyword) {
        try {
            const token = this.getToken();
            const response = await axiosInstance.get(`${API_URL}/search`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: { query: keyword },
            });
            return response.data;
        } catch (error) {
            console.error('Error searching airports:', error);
            throw error;
        }
    }

    async getAirportByIATACode(iataCode) {
        try {
            const token = this.getToken();
            const response = await axiosInstance.get(`${API_URL}/iata/${iataCode}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error(`Error getting airport with IATA code ${iataCode}:`, error);
            throw error;
        }
    }
}

const airportApiService = new AirportApiService();

export default airportApiService;
