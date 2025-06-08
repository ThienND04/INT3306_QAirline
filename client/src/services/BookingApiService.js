import axiosInstance from "./AxiosInstance";

const API_URL = '/bookings';

class BookingApiService {
    getToken = () => {
        return localStorage.getItem('token');
    };

    // Get all tickets (Admin)
    async getAllBookings() {
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
    async getBookingById(id) {
        try {
            const token = this.getToken();
            const response = await axiosInstance.get(`${API_URL}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error(`Error getting booking with ID ${id}:`, error);
            throw error;
        }
    }

    // Get tickets by Flight Code
    async getBookingsByFlightCode(flightCode) {
        try {
            const token = this.getToken();
            const response = await axiosInstance.get(`${API_URL}/flight/${flightCode}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error(`Error getting tickets for flight code ${flightCode}:`, error);
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

    // Update booking
    async updateBooking(id, ticketData) {
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
    async cancelBooking(id) {
        try {
            const token = this.getToken();
            const response = await axiosInstance.delete(`${API_URL}/${id}`, {
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

    async getBookingStatistics() {
        try {
            const token = this.getToken();
            const response = await axiosInstance.get(`${API_URL}/statistics`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error getting booking statistics:', error);
            throw error;
        }
    }
}

const bookingApiService = new BookingApiService();
export default bookingApiService;
