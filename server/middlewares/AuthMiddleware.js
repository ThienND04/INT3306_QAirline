const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'your_secret_key';

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Không có token' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded; // lưu thông tin userId vào req
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token không hợp lệ hoặc hết hạn' });
    }
};

module.exports = authMiddleware;