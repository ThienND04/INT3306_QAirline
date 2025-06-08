import axiosInstance from "./AxiosInstance";

class FlightApiService {
  API_URL = "/flights";

  getToken = () => {
    return localStorage.getItem("token");
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
      console.error(
        "Error fetching all flights:",
        error.response?.data || error.message
      );
      throw error.response?.data || new Error("Error fetching all flights");
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
            console.log('Search results:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error searching flights:', error.response?.data || error.message);
            throw error.response?.data || new Error('Error searching flights');
        }
    }

  async createFlight(flightData) {
    try {
      const token = this.getToken();
      console.log("Creating flight with data:", flightData);
      const response = await axiosInstance.post(this.API_URL, flightData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error creating flight:",
        error.response?.data || error.message
      );
      throw error.response?.data || new Error("Error creating flight");
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
      console.error(
        `Error fetching flight by ID ${flightId}:`,
        error.response?.data || error.message
      );
      throw (
        error.response?.data ||
        new Error(`Error fetching flight by ID ${flightId}`)
      );
    }
  }

  async updateFlight(flightId, flightData) {
    try {
      const token = this.getToken();
      const response = await axiosInstance.put(
        `${this.API_URL}/${flightId}`,
        flightData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error updating flight ${flightId}:`,
        error.response?.data || error.message
      );
      throw (
        error.response?.data || new Error(`Error updating flight ${flightId}`)
      );
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

    async delayFlight(flightId, delayData) {
        try {
            const token = this.getToken();
            const response = await axiosInstance.put(`${this.API_URL}/delay`, delayData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error(`Error delaying flight ${flightId}:`, error.response?.data || error.message);
            throw error.response?.data || new Error(`Error delaying flight ${flightId}`);
        }
    }

  async getDeletedFlights() {
    try {
      const token = this.getToken();
      const response = await axiosInstance.get(`${this.API_URL}/deleted`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching deleted flights:",
        error.response?.data || error.message
      );
      throw error.response?.data || new Error("Error fetching deleted flights");
    }
  }

  async restoreFlight(flightId) {
    try {
      const token = this.getToken();
      const response = await axiosInstance.patch(
        `${this.API_URL}/restore/${flightId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error restoring flight ${flightId}:`,
        error.response?.data || error.message
      );
      throw (
        error.response?.data || new Error(`Error restoring flight ${flightId}`)
      );
    }
  }

  async hardDeleteFlight(flightId) {
    try {
      const token = this.getToken();
      const response = await axiosInstance.delete(
        `${this.API_URL}/hard-delete/${flightId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error hard deleting flight ${flightId}:`,
        error.response?.data || error.message
      );
      throw (
        error.response?.data ||
        new Error(`Error hard deleting flight ${flightId}`)
      );
    }
  }
}

const flightApiService = new FlightApiService();

export default flightApiService;
