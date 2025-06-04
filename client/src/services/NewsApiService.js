import axiosInstance from "./AxiosInstance";

const API_URL = '/news';

class NewsApiService {
    getToken = () => {
        return localStorage.getItem('token');
    };

    async getAllNews() {
        try {
            const response = await axiosInstance.get(API_URL);
            return response.data;
        } catch (error) {
            console.error('Error getting all news:', error);
            throw error;
        }
    }

    async getNewsById(id) {
        try {
            const response = await axiosInstance.get(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error getting news with ID ${id}:`, error);
            throw error;
        }
    }

    async createNews(newsData) {
        try {
            const token = this.getToken();
            const response = await axiosInstance.post(`${API_URL}/create`, newsData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error creating news:', error);
            throw error;
        }
    }

    async updateNews(id, newsData) {
        try {
            const token = this.getToken();
            const response = await axiosInstance.put(`${API_URL}/${id}`, newsData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error(`Error updating news with ID ${id}:`, error);
            throw error;
        }
    }

    async deleteNews(id) {
        try {
            const token = this.getToken();
            const response = await axiosInstance.delete(`${API_URL}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error(`Error deleting news with ID ${id}:`, error);
            throw error;
        }
    }
}

const newsApiService = new NewsApiService();

export default newsApiService;
