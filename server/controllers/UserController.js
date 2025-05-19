const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const createToken = require('../utils/createToken');
const Otp = require('../models/Otp'); 
const sendOtpEmail = require('../utils/sendOtpEmail'); 

class UserController {
    // Đăng ký người dùng mới
    // [POST] /users/register
    async register(req, res) {
        try {
            console.log(req.body);
            const { email,
                password,
                phoneNumber,
                address,
                lastName,
                middleAndFirstName,
                displayOrder,
                gender,
                birthDate,
                nationality,
                language } = req.body;
            // Kiểm tra xem người dùng đã tồn tại chưa
            const existingUser = await User.find({ email });
            if (existingUser.length > 0) {
                return res.status(400).json({ message: 'Username already exists' });
            }
            const newUser = new User({
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
                language
            });
            await newUser.save();

            // var token = createToken(newUser._id);

            return res.status(201).json({
                message: 'User registered successfully',
                user: {
                    email: newUser.email,
                    phoneNumber: newUser.phoneNumber,
                    address: newUser.address,
                    lastName: newUser.lastName,
                    middleAndFirstName: newUser.middleAndFirstName,
                    displayOrder: newUser.displayOrder,
                },
                // token
            });
        } catch (error) {
            return res.status(500).json({ message: 'Error registering user', error });
        }
    }

    // Đăng nhập người dùng
    // [POST] /users/login
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            console.log(user);
            if (!user) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }
            const token = createToken(user._id, user.role);
            return res.status(200).json({
                message: 'Login successful', user,
                user: {
                    email: user.email,
                    fullName: (user.displayOrder === 1) ? user.lastName + ' ' + user.middleAndFirstName : user.middleAndFirstName + ' ' + user.lastName,
                    role: user.role,
                },
                token
            });
        } catch (error) {
            res.status(500).json({ message: 'Error logging in', error });
        }
    }

    // [PUT] /users/update
    async updateUser(req, res) {
        try {
            const { id } = req.user._id;
            const { email, password, phoneNumber, address, lastName, middleAndFirstName, displayOrder, gender, birthDate, nationality, language , role } = req.body;
            const user = await User.findByIdAndUpdate(id, {
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
                role
            }, { new: true });
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
                    fullName: (user.displayOrder === 1) ? user.lastName + ' ' + user.middleAndFirstName : user.middleAndFirstName + ' ' + user.lastName,
                    displayOrder: user.displayOrder,
                    gender: user.gender,
                    birthDate: user.birthDate,
                    nationality: user.nationality,
                    language: user.language,
                    role: user.role,
                }
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

            const formattedUsers = users.map(user => ({
                id: user._id,
                email: user.email,
                phoneNumber: user.phoneNumber,
                address: user.address,
                lastName: user.lastName,
                middleAndFirstName: user.middleAndFirstName,
                fullName: (user.displayOrder === 1) ? user.lastName + ' ' + user.middleAndFirstName : user.middleAndFirstName + ' ' + user.lastName,
                displayOrder: user.displayOrder,
                gender: user.gender,
                birthDate: user.birthDate,
                nationality: user.nationality,
                language: user.language,
                role: user.role,
            }));

            return res.status(200).json({
                message: 'Users retrieved successfully',
                users: formattedUsers
            });
        } catch (error) {
            console.error('Error retrieving all users:', error);
            return res.status(500).json({ message: 'Error retrieving users', error: error.message });
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
                    fullName: (user.displayOrder === 1) ? user.lastName + ' ' + user.middleAndFirstName : user.middleAndFirstName + ' ' + user.lastName,
                    displayOrder: user.displayOrder,
                    gender: user.gender,
                    birthDate: user.birthDate,
                    nationality: user.nationality,
                    language: user.language,
                    role: user.role,
            }});
        } catch (error) {
            console.error('Error retrieving all users:', error);
            return res.status(500).json({ message: 'Error retrieving users', error: error.message });
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

    // [POST] /users/forgot-password
    async forgotPassword(req, res) {
        try {
            const { email } = req.body;
            console.log(req.body);
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            // 6 chữ số OTP
            const otp = Math.floor(100000 + Math.random() * 900000).toString();

            await Otp.create({
                userId: user._id,
                otpCode: otp,
            });

            // Send OTP to user's email
            sendOtpEmail(email, otp);
            console.log('OTP sent to email');
            return res.status(200).json({ message: 'OTP sent to email' });
        } catch (error) {
            return res.status(500).json({ message: 'Error sending OTP', error: error.message });
        }
    }

    // [POST] /users/verify-otp
    async verifyOtp(req, res) {
        try {
            const { email, otp } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const otpDoc = await Otp.findOne({ userId: user._id, isUsed: false }).sort({ createdAt: -1 });
            if (!otpDoc) {
                return res.status(400).json({ message: 'OTP not found or expired' });
            }

            const isMatch = await bcrypt.compare(otp, otpDoc.otpCode);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid OTP' });
            }

            var resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '10m' });
            otpDoc.isUsed = true;
            await otpDoc.save();

            res.status(200).json({
                message: 'OTP verified successfully',
                resetToken
            });
        }
        catch (error) {
            return res.status(500).json({ message: 'Error verifying OTP', error: error.message });
        }
    }

    // [POST] /users/reset-password
    async resetPassword(req, res) {
        try {
            const { resetToken, newPassword } = req.body;
            const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
            const user = await User.findOne({_id: decoded.id });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            user.password = newPassword;
            await user.save();

            return res.status(200).json({ message: 'Password reset successfully' });
        } catch (error) {
            return res.status(500).json({ message: 'Error resetting password', error: error.message });
        }
    }
}

module.exports = new UserController();