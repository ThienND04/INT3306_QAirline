import axiosInstance from "./AxiosInstance";

const API_URL = '/tickets';

class TicketApiService {
    getToken = () => {
        return localStorage.getItem('token');
    };

    // Get all tickets (Admin)
    async getAllTickets() {
        try {
            const token = this.getToken();
            const response = await axiosInstance.get(API_URL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error getting all tickets:', error);
            throw error;
        }
    }

    // Get ticket by ID
    async getTicketById(id) {
        try {
            const token = this.getToken();
            const response = await axiosInstance.get(`${API_URL}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error(`Error getting ticket with ID ${id}:`, error);
            throw error;
        }
    }

    // Book a new ticket
    async bookTicket(ticketData) {
        try {
            const token = this.getToken();
            const response = await axiosInstance.post(`${API_URL}/book`, ticketData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error booking ticket:', error);
            throw error;
        }
    }

    // Update ticket
    async updateTicket(id, ticketData) {
        try {
            const token = this.getToken();
            const response = await axiosInstance.put(`${API_URL}/${id}`, ticketData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error(`Error updating ticket with ID ${id}:`, error);
            throw error;
        }
    }

    // Cancel ticket
    async cancelTicket(id) {
        try {
            const token = this.getToken();
            const response = await axiosInstance.delete(`${API_URL}/cancel/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error(`Error cancelling ticket with ID ${id}:`, error);
            throw error;
        }
    }
}

const ticketApiService = new TicketApiService();
export default ticketApiService;
