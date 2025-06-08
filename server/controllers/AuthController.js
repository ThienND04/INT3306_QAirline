const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const createToken = require('../utils/createToken');
const Otp = require('../models/Otp'); 
const {sendOtpEmail} = require('../utils/sendEmail'); 

class AuthController {
    // [POST] /auth/register
    async register(req, res) {
        try {
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
            const existingUser = await User.find({ email });
            console.log('Existing user:', existingUser);
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

            console.log('New user created:', newUser);
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
            console.error('Error registering user:', error);
            return res.status(500).json({ message: 'Error registering user', error });
        }
    }

    // Đăng nhập người dùng
    // [POST] /auth/login
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
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
            res.status(500).json({ message: 'Error logging in', error: error.message });
        }
    }

    // [POST] /auth/forgot-password
    async forgotPassword(req, res) {
        try {
            const { email } = req.body;
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

            console.log('OTP generated:', otp);

            // Send OTP to user's email
            sendOtpEmail(email, otp);
            console.log('OTP sent to email');
            return res.status(200).json({ message: 'OTP sent to email' });
        } catch (error) {
            return res.status(500).json({ message: 'Error sending OTP', error: error.message });
        }
    }

    // [POST] /auth/verify-otp
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

    // [POST] /auth/reset-password
    async resetPassword(req, res) {
        try {
            console.log('Reset password request body:', req.body);
            const { resetToken, newPassword } = req.body;
            const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
            const user = await User.findOne({ _id: decoded.id });
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

module.exports = new AuthController();