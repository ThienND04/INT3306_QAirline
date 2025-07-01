const News = require('../models/News');

class NewsController {
    // [POST] /news/create
    async createNews(req, res) {
        try {
            const { title, content } = req.body;
            const imageUrl = req.file ? req.file.path : null;
            const news = new News({ title, content, imageUrl });
            await news.save();
            res.status(201).json({ message: 'Thêm tin tức thành công', news });
        } catch (error) {
            console.error('Lỗi khi thêm tin tức:', error);
            res.status(500).json({ message: 'Lỗi khi thêm tin tức' });
        }
    }

    // [PUT] /news/:id
    async updateNews(req, res) {
        try {
            const { id } = req.params;
            const { title, content, imageUrl } = req.body;

            const updatedNews = await News.findByIdAndUpdate(
                id,
                { title, content, imageUrl },
                { new: true },
            );

            if (!updatedNews) {
                return res.status(404).json({ message: 'Không tìm thấy tin tức' });
            }

            res.status(200).json({ message: 'Cập nhật tin tức thành công', news: updatedNews });
        } catch (error) {
            console.error('Lỗi khi cập nhật tin tức:', error);
            res.status(500).json({ message: 'Lỗi hệ thống khi cập nhật tin tức' });
        }
    }

    // [GET] /news
    async getAllNews(req, res) {
        try {
            const newsList = await News.find().sort({ createdAt: -1 });
            res.status(200).json(newsList);
        } catch (error) {
            console.error('Lỗi khi lấy tin tức:', error);
            res.status(500).json({ message: 'Lỗi khi lấy danh sách tin tức' });
        }
    }

    // [GET] /news/:id
    async getNewsById(req, res) {
        try {
            const { id } = req.params;
            const news = await News.findById(id);
            if (!news) {
                return res.status(404).json({ message: 'Không tìm thấy tin tức' });
            }
            res.status(200).json(news);
        } catch (error) {
            console.error('Lỗi khi lấy tin tức:', error);
            res.status(500).json({ message: 'Lỗi hệ thống khi lấy tin tức' });
        }
    }

    // [DELETE] /news/:id
    async deleteNews(req, res) {
        try {
            const { id } = req.params;
            const deleted = await News.findByIdAndDelete(id);
            if (!deleted) {
                return res.status(404).json({ message: 'Không tìm thấy tin tức' });
            }
            res.status(200).json({ message: 'Xóa tin tức thành công' });
        } catch (error) {
            console.error('Lỗi khi xóa tin tức:', error);
            res.status(500).json({ message: 'Lỗi hệ thống khi xóa tin tức' });
        }
    }
}

const newsController = new NewsController();
module.exports = newsController;
