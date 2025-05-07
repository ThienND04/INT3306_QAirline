const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const createToken = require('../utils/createToken');

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

            var token = createToken(newUser._id);

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
                token
            });
        } catch (error) {
            return res.status(500).json({ message: 'Error registering user', error });
        }
    }

    // Đăng nhập người dùng
    // [POST] /users/login
    async login(req, res) {
        try {
            console.log(req.body);
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
            const token = createToken(user._id);
            return res.status(200).json({
                message: 'Login successful', user,
                user: {
                    email: user.email,
                    fullName: (user.displayOrder === 1) ? user.lastName + ' ' + user.middleAndFirstName : user.middleAndFirstName + ' ' + user.lastName,
                },
                token
            });
        } catch (error) {
            res.status(500).json({ message: 'Error logging in', error });
        }
    }

    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { email, password, phoneNumber, address, lastName, middleAndFirstName, displayOrder, gender, birthDate, nationality, language } = req.body;
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
                language
            }, { new: true });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json({ message: 'User updated successfully', user });
        } catch (error) {
            return res.status(500).json({ message: 'Error updating user', error });
        }
    }
}

module.exports = new UserController();