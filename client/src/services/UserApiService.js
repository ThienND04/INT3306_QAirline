import axiosInstance from './AxiosInstance';

class UserApiService {
    constructor() {
        this.baseUrl = '/auth';
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
        console.log('Forgot password data:', userData);
        const response = await axiosInstance.post(`${this.baseUrl}/forgot-password`, userData);
        if (response.status !== 200) {
            throw new Error('Failed to forgot password');
        }
        return response.data;
    }

    async verifyOtp(otpData) {
        const response = await axiosInstance.post(`${this.baseUrl}/verify-otp`, otpData);
        if (response.status !== 200) {
            throw new Error('Failed to verify OTP');
        }
        return response.data;
    }

    async resetPassword(passwordData) {
        console.log('Reset password data:', passwordData);
        const response = await axiosInstance.put(`${this.baseUrl}/reset-password`, passwordData);
        if (response.status !== 200) {
            throw new Error('Failed to reset password');
        }
        return response.data;
    }
}

const userApiService = new UserApiService();

export default userApiService;