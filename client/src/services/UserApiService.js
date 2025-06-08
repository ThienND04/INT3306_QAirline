
import axiosInstance from './AxiosInstance';

class UserApiService {
    constructor() {
        this.baseUrl = '/auth';
        this.baseUrl2 = '/users';
    }

    async getAllUsers() {
        const response = await fetch(this.baseUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        return response.json();
    }

    async getUserById(userId) {
        const response = await fetch(`${this.baseUrl}/${userId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch user');
        }
        return response.json();
    }

    async createUser(userData) {
        console.log(typeof(axiosInstance))
        const response = await axiosInstance.post(`${this.baseUrl}/register`, userData);
        if (response.status !== 201) {
            throw new Error('Failed to create user');
        }
        return response.data;
    }

    async loginUser(userData) {
        const response = await axiosInstance.post(`${this.baseUrl}/login`, userData);
        if (response.status !== 200) {
            throw new Error('Failed to login user');
        }
        return response;
    }

    async forgotPassword(userData) {
        const response = await axiosInstance.post(`${this.baseUrl}/forgot-password`, userData);
        if (response.status !== 200) {
            throw new Error('Failed to login user');
        }
        return response.data;
    }

    async updateUser(userData) {
        const response = await axiosInstance.put(`${this.baseUrl2}/update`, userData);
        if (response.status !== 200) {
            throw new Error('Failed to update user');
        }
        return response.data;
    }

        async getCurrentUser() {
        const response = await axiosInstance.get('/users/me');
        if (response.status !== 200) {
            throw new Error('Failed to get current user');
        }
        return response.data;
    }
}

const userApiService = new UserApiService();

export default userApiService;