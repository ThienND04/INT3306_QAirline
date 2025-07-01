const User = require('../models/User');

class UserController {
    // [PUT] /users/update
    async updateUser(req, res) {
        try {
            const id = req.user._id;
            const {
                email,
                password,
                phoneNumber,
                address,
                lastName,
                middleAndFirstName,
                displayOrder,
                gender,
                birthDate,
                nationality,
                language,
                role,
            } = req.body;
            const user = await User.findByIdAndUpdate(
                id,
                {
                    email,
                    password,
                    phoneNumber,
                    address,
                    lastName,
                    middleAndFirstName,
                    displayOrder,
                    gender,
                    birthDate,
                    nationality,
                    language,
                    role,
                },
                { new: true },
            );
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json({ message: 'User updated successfully', user });
        } catch (error) {
            return res.status(500).json({ message: 'Error updating user', error });
        }
    }

    // [GET] /users/me
    async getCurrentUser(req, res) {
        try {
            const userId = req.user.id;
            const user = await User.findById(userId).select('-password'); // Loại bỏ mật khẩu khỏi kết quả

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            return res.status(200).json({
                message: 'User retrieved successfully',
                user: {
                    id: user._id,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    address: user.address,
                    lastName: user.lastName,
                    middleAndFirstName: user.middleAndFirstName,
                    fullName:
                        user.displayOrder === 1
                            ? user.lastName + ' ' + user.middleAndFirstName
                            : user.middleAndFirstName + ' ' + user.lastName,
                    displayOrder: user.displayOrder,
                    gender: user.gender,
                    birthDate: user.birthDate,
                    nationality: user.nationality,
                    language: user.language,
                    role: user.role,
                },
            });
        } catch (error) {
            console.error('Error retrieving user:', error);
            return res.status(500).json({ message: 'Error retrieving user', error: error.message });
        }
    }

    // [GET] /users/all
    async getAllUsers(req, res) {
        try {
            const users = await User.find({}).select('-password');

            if (!users || users.length === 0) {
                return res.status(404).json({ message: 'No users found' });
            }

            const formattedUsers = users.map((user) => ({
                id: user._id,
                email: user.email,
                phoneNumber: user.phoneNumber,
                address: user.address,
                lastName: user.lastName,
                middleAndFirstName: user.middleAndFirstName,
                fullName:
                    user.displayOrder === 1
                        ? user.lastName + ' ' + user.middleAndFirstName
                        : user.middleAndFirstName + ' ' + user.lastName,
                displayOrder: user.displayOrder,
                gender: user.gender,
                birthDate: user.birthDate,
                nationality: user.nationality,
                language: user.language,
                role: user.role,
            }));

            return res.status(200).json({
                message: 'Users retrieved successfully',
                users: formattedUsers,
            });
        } catch (error) {
            console.error('Error retrieving all users:', error);
            return res
                .status(500)
                .json({ message: 'Error retrieving users', error: error.message });
        }
    }

    // Lấy thông tin người dùng theo ID
    // [GET] /users/:id
    async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findById(id).select('-password');

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            return res.status(200).json({
                message: 'User retrieved successfully',
                user: {
                    id: user._id,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    address: user.address,
                    lastName: user.lastName,
                    middleAndFirstName: user.middleAndFirstName,
                    fullName:
                        user.displayOrder === 1
                            ? user.lastName + ' ' + user.middleAndFirstName
                            : user.middleAndFirstName + ' ' + user.lastName,
                    displayOrder: user.displayOrder,
                    gender: user.gender,
                    birthDate: user.birthDate,
                    nationality: user.nationality,
                    language: user.language,
                    role: user.role,
                },
            });
        } catch (error) {
            console.error('Error retrieving all users:', error);
            return res
                .status(500)
                .json({ message: 'Error retrieving users', error: error.message });
        }
    }

    // Cập nhật thông tin người dùng theo ID
    // [PUT] /users/:id

    // [DELETE] /users/:id
    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findByIdAndDelete(id);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            return res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error('Error deleting user:', error);
            return res.status(500).json({ message: 'Error deleting user', error: error.message });
        }
    }
}

module.exports = new UserController();
