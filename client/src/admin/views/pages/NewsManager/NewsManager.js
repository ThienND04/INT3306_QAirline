import React, { useEffect, useState } from 'react';
import newsApiService from '../../../../services/NewsApiService';
import './NewsManager.css';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';

const NewsManager = () => {
	const [newsList, setNewsList] = useState([]);
	const [formVisible, setFormVisible] = useState(false);
	const [formData, setFormData] = useState({
		title: '',
		content: '',
		imageFile: null
	});


	useEffect(() => {
		fetchNews();
	}, []);

	const fetchNews = async () => {
		try {
			const data = await newsApiService.getAllNews();
			setNewsList(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
		} catch (err) {
			console.error('Error fetching news:', err);
		}
	};

	const handleInputChange = (e) => {
		setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleFileChange = (e) => {
		setFormData(prev => ({ ...prev, imageFile: e.target.files[0] }));
	};

	const handleCreate = async () => {
		if (!formData.title || !formData.content) {
			alert('Vui lòng nhập tiêu đề và nội dung.');
			return;
		}

		const form = new FormData();
		form.append('title', formData.title);
		form.append('content', formData.content);
		if (formData.imageFile) {
			form.append('image', formData.imageFile);
		}

		try {
			await newsApiService.createNews(form);
			setFormData({ title: '', content: '', imageFile: null });
			setFormVisible(false);
			fetchNews();
		} catch (err) {
			console.error('Error creating news:', err);
		}
	};


	const handleDelete = async (id) => {
		if (window.confirm('Bạn có chắc muốn xóa tin này?')) {
			try {
				await newsApiService.deleteNews(id);
				fetchNews();
			} catch (err) {
				console.error('Error deleting news:', err);
			}
		}
	};

	return (
		<div className="news-manager-container">
			<Header />
			<main>
				<section className="news-manager">
					<h1>Quản lý tin tức</h1>
					<p>Thêm, sửa, xoá các bản tin hiển thị trên hệ thống.</p>

					<div className="actions">
						<button onClick={() => setFormVisible(!formVisible)}>
							{formVisible ? '✖️ Hủy' : '➕ Tạo Tin Mới'}
						</button>
					</div>

					{formVisible && (
						<div className="news-form">
							<input
								type="text"
								name="title"
								value={formData.title}
								onChange={handleInputChange}
								placeholder="Tiêu đề"
							/>
							<textarea
								name="content"
								value={formData.content}
								onChange={handleInputChange}
								placeholder="Nội dung"
							/>
							<input
								type="file"
								accept="image/*"
								onChange={handleFileChange}
							/>
							<button className="submit-btn" onClick={handleCreate}>Đăng tin</button>
						</div>
					)}

					<div className="news-list">
						{newsList.length > 0 ? (
							<table className="news-table">
								<thead>
									<tr>
										<th>Ảnh</th>
										<th>Tiêu đề</th>
										<th>Nội dung</th>
										<th>Hành động</th>
									</tr>
								</thead>
								<tbody>
									{newsList.map(news => (
										<tr key={news._id}>
											<td>
												{news.imageUrl ? (
													<img className="news-thumbnail" src={news.imageUrl} alt="news" />
												) : '—'}
											</td>
											<td>{news.title}</td>
											<td>{news.content.slice(0, 120)}{news.content.length > 120 ? '...' : ''}</td>
											<td>
												<button>Sửa</button>
												<button className="danger" onClick={() => handleDelete(news._id)}>Xóa</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						) : (
							<p style={{ textAlign: 'center', marginTop: 20, color: '#888' }}>Chưa có bản tin nào.</p>
						)}
					</div>
				</section>
			</main>
			<Footer />
		</div>
	);
};

export default NewsManager;
