const Notification = require('../models/Notification');

class NotificationController {
    // [GET] /notifications/:userId
    async getNotificationsByUser(req, res) {
        try {
            const { userId } = req.params;
            const notifications = await Notification.find({ user: userId }).sort({
                createdAt: -1,
            });
            res.status(200).json(notifications);
        } catch (error) {
            console.error('Error fetching notifications:', error);
            res.status(500).json({ message: 'Lỗi khi lấy thông báo.' });
        }
    }

    // [POST] /notifications
    async createNotification(req, res) {
        try {
            const { user, title, message } = req.body;
            const newNotification = new Notification({ user, title, message });
            await newNotification.save();
            res.status(201).json(newNotification);
        } catch (error) {
            console.error('Error creating notification:', error);
            res.status(500).json({ message: 'Lỗi khi tạo thông báo.' });
        }
    }

    // [PUT] /notifications/:id/read
    async markAsRead(req, res) {
        try {
            const { id } = req.params;
            const notification = await Notification.findByIdAndUpdate(
                id,
                { isRead: true },
                { new: true },
            );
            if (!notification)
                return res.status(404).json({ message: 'Không tìm thấy thông báo.' });
            res.status(200).json(notification);
        } catch (error) {
            console.error('Error marking notification as read:', error);
            res.status(500).json({ message: 'Lỗi khi cập nhật trạng thái thông báo.' });
        }
    }

    // [DELETE] /notifications/:id
    async deleteNotification(req, res) {
        try {
            const { id } = req.params;
            const deleted = await Notification.findByIdAndDelete(id);
            if (!deleted) return res.status(404).json({ message: 'Không tìm thấy thông báo.' });
            res.status(200).json({ message: 'Đã xóa thông báo.' });
        } catch (error) {
            console.error('Error deleting notification:', error);
            res.status(500).json({ message: 'Lỗi khi xóa thông báo.' });
        }
    }
}

module.exports = new NotificationController();
