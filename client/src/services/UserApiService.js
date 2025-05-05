
import axiosInstance from './AxiosInstance';

class UserApiService {
    constructor() {
        this.baseUrl = '/users';
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
        if (response.status !== 200) {
            throw new Error('Failed to create user');
        }
        return response.data;
    }

    async loginUser(userData) {
        const response = await axiosInstance.post(`${this.baseUrl}/login`, userData);
        if (response.status !== 200) {
            throw new Error('Failed to login user');
        }
        return response.data;
    }
}

const userApiService = new UserApiService();

export default userApiService;