import apiService from './apiService'; // Assuming apiService is configured for API calls

const TicketApiService = {
    /**
     * Get all tickets (Admin only)
     * @returns {Promise<AxiosResponse<any>>}
     */
    getAllTickets: () => {
        return apiService.get('/tickets');
    },

    /**
     * Get a ticket by its ID
     * @param {string} id - The ID of the ticket
     * @returns {Promise<AxiosResponse<any>>}
     */
    getTicketById: (id) => {
        return apiService.get(`/tickets/${id}`);
    },

    /**
     * Book a new ticket
     * @param {object} ticketData - Data for the new ticket
     * @param {string} ticketData.flightCode
     * @param {string} ticketData.userId
     * @param {string} ticketData.identityNo
     * @param {string} ticketData.seatNo
     * @param {number} ticketData.price
     * @returns {Promise<AxiosResponse<any>>}
     */
    bookTicket: (ticketData) => {
        return apiService.post('/tickets/book', ticketData);
    },

    /**
     * Update an existing ticket
     * @param {string} id - The ID of the ticket to update
     * @param {object} ticketData - Updated data for the ticket
     * @returns {Promise<AxiosResponse<any>>}
     */
    updateTicket: (id, ticketData) => {
        return apiService.put(`/tickets/${id}`, ticketData);
    },

    /**
     * Cancel a ticket
     * @param {string} id - The ID of the ticket to cancel
     * @returns {Promise<AxiosResponse<any>>}
     */
    cancelTicket: (id) => {
        return apiService.delete(`/tickets/cancel/${id}`);
    },
};

export default TicketApiService;
