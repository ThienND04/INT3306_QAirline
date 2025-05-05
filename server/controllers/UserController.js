const User = require('../models/User');

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
            return res.status(201).json({ message: 'User registered successfully' });
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
            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }
            // const token = user.generateAuthToken();
            res.status(200).json({ message: 'Login successful', user });
        } catch (error) {
            res.status(500).json({ message: 'Error logging in', error });
        }
    }
}

module.exports = new UserController();