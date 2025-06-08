const User = require('../models/User'); // đường dẫn đến file model User

const createAdmin = async () => {
	try {
		const existing = await User.findOne({ email: 'admin@qairline.com' });
		if (existing) {
			console.log('Admin đã tồn tại.');
			return;
		}

		const admin = new User({
			email: 'admin@qairline.com',
			password: 'Admin@123',
			phoneNumber: '0909123456',
			address: '123 Đường ABC, Quận 1, TP.HCM',
			lastName: 'Nguyễn',
			middleAndFirstName: 'Văn A',
			displayOrder: 1,
			gender: 'Nam',
			birthDate: {
				day: 1,
				month: 1,
				year: 1990
			},
			nationality: 'Việt Nam',
			language: 'Tiếng Việt',
			role: 'admin'
		});

		await admin.save();
		console.log('Admin đã được tạo thành công!');
	} catch (error) {
		console.error('Lỗi khi tạo admin:', error);
	}
};

module.exports = createAdmin;