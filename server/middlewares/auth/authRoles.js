const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        // console.log(req.user);
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'You do not have permission' });
        }
        next();
    };
};

module.exports = authorizeRoles;
