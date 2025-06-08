import React from "react";
import "./Home.css";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import SearchTab from "../../components/Home/SearchTab";

function Home() {
    const [activeTab, setActiveTab] = React.useState("Tab 1");
    const navigate = useNavigate();
    const location = useLocation();

    
    React.useEffect(() => {
        if (location.state && location.state.scrollToSection) {
            const section = document.getElementById(location.state.scrollToSection);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);
    React.useEffect(() => {
        const cards = document.querySelectorAll('.card-tilt');
    
        const handleMouseMove = (e) => {
            const card = e.currentTarget;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * 1; 
            const rotateY = ((x - centerX) / centerX) * -1;
            card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
            card.classList.add('is-hovered');
        };
        const handleMouseLeave = (e) => {
            const card = e.currentTarget;
            card.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)';
            card.classList.remove('is-hovered');
        };
        cards.forEach(card => {
            card.addEventListener('mousemove', handleMouseMove);
            card.addEventListener('mouseleave', handleMouseLeave);
        });
        return () => {
            cards.forEach(card => {
                card.removeEventListener('mousemove', handleMouseMove);
                card.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);
    React.useEffect(() => {
        const sections = document.querySelectorAll('.section');
        const observer = new window.IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                    entry.target.classList.add('section-visible');
                    }
                });
            },
            { threshold: 0.15 }
        );
        sections.forEach(section => observer.observe(section));
        return () => {
            sections.forEach(section => observer.unobserve(section));
        };
    }, []);
    React.useEffect(() => {
        const cards = document.querySelectorAll('.review-card');
        const observer = new window.IntersectionObserver(
            (entries) => {
            entries.forEach((entry, idx) => {
                if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('review-card-visible');
                }, idx * 120); // hiệu ứng xuất hiện lần lượt
                }
            });
            },
            { threshold: 0.15 }
        );
        cards.forEach(card => observer.observe(card));
        return () => {
            cards.forEach(card => observer.unobserve(card));
        };
    }, []);    
    return (
        <>
			<Header />

			<header
				className="section zoom-in utility-padding-all-0 utility-overflow-hidden utility-text-on-overlay"
			>
				<div className="w-layout-grid grid-layout">
					<div
						id="w-node-cdbde5e8-8b4f-e20c-bac0-1a4bbfefe3c5-bfefe3c3"
						className="utility-position-relative utility-min-height-100dvh w-node-_566a2587-b706-13cb-859c-c186b302d23d-8bbce412"
					>
						<div className="ix-parallax-scale-out-hero utility-radius-xl">
							<img
								width="1216"
								height="832"
								alt="Plane"
								src="/plane.jpg"
								loading="lazy"
								data-aisg-image-id="ab70756a-4353-4194-9afb-8d8d3a97b8f6"
								className="cover-image utility-position-absolute ix-parallax-speed--10"
							/>
							<div className="overlay utility-mask-top"></div>
						</div>
					</div>
					<div
						id="w-node-cdbde5e8-8b4f-e20c-bac0-1a4bbfefe3c9-bfefe3c3"
						className="container utility-z-index-2 w-node-_566a2587-b706-13cb-859c-c186b302d248-8bbce412"
					>
						<div className="utility-margin-bottom-6rem">
                            <h1 className="h1-heading utility-text-align-center ">
                                CHÀO MỪNG ĐẾN VỚI <p className="gradient-heading">QAIRLINE</p> nơi hành trình của bạn bắt đầu
                            </h1>
							<div className="flight-card">
								<div>
									<div className="custom-tabs-menu">
										<button
                                            className={`custom-tab-link${activeTab === "Tab 1" ? " active" : ""}`}
                                            onClick={() => setActiveTab("Tab 1")}
                                            type="button"
                                        >
                                            <span className="material-icon">flight</span> Đặt Vé
                                        </button>
										<button
                                            className={`custom-tab-link${activeTab === "Tab 2" ? " active" : ""}`}
                                            onClick={() => setActiveTab("Tab 2")}
                                            type="button"
                                        >   
                                            <span className="material-icon">airplane_ticket</span> Làm Thủ Tục
                                        </button>                                  
                                        <button
                                            className={`custom-tab-link${activeTab === "Tab 3" ? " active" : ""}`}
                                            onClick={() => {
                                                setActiveTab("Tab 3");
                                                navigate("/booking-list");
                                            }}
                                            type="button"
                                        >
                                            <span className="material-icon">airline_seat_recline_extra</span> Đặt Chỗ Của Tôi
                                        </button>                                   
									</div>
									<div className="w-tab-content">
										{activeTab === "Tab 1" && (
                                            <div data-w-tab="Tab 1" className="w-tab-pane w--tab-active">
                                                <div className="hero-buttons mb-3">
                                                    <Button variant="success" className="me-2">Xem tất cả các chuyến bay</Button>
                                                    <Button variant="outline-primary" className="me-2">Một chiều</Button>
                                                    <Button variant="outline-secondary">Khứ hồi</Button>
                                                </div>
                                                <SearchTab />
                                            </div>
                                        )}
                                        {activeTab === "Tab 2" && (
                                            <div data-w-tab="Tab 2" className="w-tab-pane w--tab-active">
                                                {/* Nội dung tab 2 */}
                                            </div>
                                        )}
                                        {activeTab === "Tab 3" && (
                                            <div data-w-tab="Tab 3" className="w-tab-pane w--tab-active">
                                                {/* Nếu muốn chuyển trang, dùng navigate hoặc <Navigate /> */}
                                            </div>
                                        )}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
			<section className="section">
        <div className="container">
            <div
                className="utility-max-width-lg utility-text-align-center utility-element-align-center utility-margin-bottom-4rem">
                <h2>Khám phá sự khác biệt cùng QAIRLINE</h2>
                <p className="paragraph-lg utility-text-secondary">Bay thông minh, không vất vả. Khám phá những dịch vụ hàng
                    đầu được thiết kế để giúp hành trình của bạn trở nên suôn sẻ từ lúc cất cánh đến khi hạ cánh.</p>
            </div>
            <div className="w-layout-grid grid-layout desktop-3-column tablet-1-column grid-gap-sm">
                <div id="w-node-_39abaecf-1dc2-886a-5c1d-6d90e390de50-4f0d0a8d"
                    className="card card-tilt w-node-_0571ce03-38b2-36ad-466d-57ddf78e1462-be40c5b3">
                    <div className="card-body">
                        <div className="icon utility-margin-bottom-1rem"><svg xmlns="http://www.w3.org/2000/svg"
                                width="100%" height="100%" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M12.5 18.25C16.2279 18.25 19.25 15.2279 19.25 11.5C19.25 7.77208 16.2279 4.75 12.5 4.75C8.77208 4.75 5.75 7.77208 5.75 11.5C5.75 12.6007 6.01345 13.6398 6.48072 14.5578L5 19L9.71819 17.6519C10.5664 18.0361 11.5082 18.25 12.5 18.25Z"
                                    stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"></path>
                            </svg></div>
                        <h3 id="w-node-_39abaecf-1dc2-886a-5c1d-6d90e390de57-4f0d0a8d"
                            className="h4-heading w-node-_0571ce03-38b2-36ad-466d-57ddf78e145e-be40c5b3">Vận chuyển hành lý
                            dễ dàng</h3>
                        <p className="paragraph-sm utility-margin-bottom-0 utility-max-width-md">Mang theo những gì bạn yêu
                            thích! Thoải mái với chính sách hành lý rộng rãi và quy trình check-in nhanh chóng mỗi lần
                            bạn bay cùng chúng tôi.</p>
                    </div>
                </div>
                <div className="card card-tilt">
                    <div className="card-body">
                        <div id="w-node-_39abaecf-1dc2-886a-5c1d-6d90e390de60-4f0d0a8d"
                            className="w-node-_0571ce03-38b2-36ad-466d-57ddf78e146a-be40c5b3">
                            <div className="icon utility-margin-bottom-1rem"><svg xmlns="http://www.w3.org/2000/svg"
                                    width="100%" height="100%" viewBox="0 0 24 24" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                        d="M9.5 9C9.5 7.61929 10.6193 6.5 12 6.5C13.3807 6.5 14.5 7.61929 14.5 9C14.5 10.3807 13.3807 11.5 12 11.5C10.6193 11.5 9.5 10.3807 9.5 9ZM12 5C9.79086 5 8 6.79086 8 9C8 11.2091 9.79086 13 12 13C14.2091 13 16 11.2091 16 9C16 6.79086 14.2091 5 12 5ZM8.75 13.5C6.67893 13.5 5 15.1789 5 17.25V19H6.5V17.25C6.5 16.0074 7.50736 15 8.75 15H15.25C16.4926 15 17.5 16.0074 17.5 17.25V19H19V17.25C19 15.1789 17.3211 13.5 15.25 13.5H8.75Z"
                                        fill="currentColor"></path>
                                </svg></div>
                            <h3 id="w-node-_39abaecf-1dc2-886a-5c1d-6d90e390de64-4f0d0a8d"
                                className="h4-heading w-node-_0571ce03-38b2-36ad-466d-57ddf78e1467-be40c5b3">Bữa ăn ngon
                                tuyệt</h3>
                            <p className="paragraph-sm utility-margin-bottom-0">Tận hưởng hương vị trên không. Với nhiều món
                                ăn và đồ ăn nhẹ được chế biến tươi mới cho hành trình của bạn.</p>
                        </div>
                    </div>
                </div>
                <div className="card card-tilt">
                    <div className="card-body">
                        <div id="w-node-_39abaecf-1dc2-886a-5c1d-6d90e390de6c-4f0d0a8d"
                            className="w-node-_0571ce03-38b2-36ad-466d-57ddf78e1475-be40c5b3">
                            <div className="icon utility-margin-bottom-1rem"><svg xmlns="http://www.w3.org/2000/svg"
                                    width="100%" height="100%" viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M19.25 12C19.25 16.0041 16.0041 19.25 12 19.25C7.99594 19.25 4.75 16.0041 4.75 12C4.75 7.99594 7.99594 4.75 12 4.75C16.0041 4.75 19.25 7.99594 19.25 12Z"
                                        stroke="currentColor" strokeWidth="1.5"></path>
                                    <path d="M9 12L11 14L15.5 9.5" stroke="currentColor" strokeWidth="1.5"></path>
                                </svg></div>
                            <h3 id="w-node-_39abaecf-1dc2-886a-5c1d-6d90e390de71-4f0d0a8d"
                                className="h4-heading w-node-_0571ce03-38b2-36ad-466d-57ddf78e1472-be40c5b3">Giải trí trên
                                máy bay</h3>
                            <p className="paragraph-sm utility-margin-bottom-0">Thư giãn, thưởng thức phim ảnh, âm nhạc và
                                nhiều nội dung khác như một rạp chiếu phim trên bầu trời dành riêng cho bạn.</p>
                        </div>
                    </div>
                </div>
                <div id="w-node-_39abaecf-1dc2-886a-5c1d-6d90e390de75-4f0d0a8d"
                    className="card card-tilt w-node-_0571ce03-38b2-36ad-466d-57ddf78e1484-be40c5b3">
                    <div className="card-body">
                        <div className="icon utility-margin-bottom-1rem"><svg xmlns="http://www.w3.org/2000/svg"
                                width="100%" height="100%" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M19 12C15.134 12 12 15.134 12 19C12 15.134 8.86599 12 5 12C8.86599 12 12 8.86599 12 5C12 8.86599 15.134 12 19 12Z"
                                    stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"></path>
                                <path d="M8 16L5.5 18.5" stroke="currentColor" strokeWidth="1.5"></path>
                                <path d="M8 8L5.5 5.5" stroke="currentColor" strokeWidth="1.5"></path>
                                <path d="M16 16L18.5 18.5" stroke="currentColor" strokeWidth="1.5"></path>
                                <path d="M16 8L18.5 5.5" stroke="currentColor" strokeWidth="1.5"></path>
                            </svg></div>
                        <h3 id="w-node-_39abaecf-1dc2-886a-5c1d-6d90e390de80-4f0d0a8d"
                            className="h4-heading w-node-_0571ce03-38b2-36ad-466d-57ddf78e1480-be40c5b3">Đội ngũ thân thiện
                            phục vụ 24/7</h3>
                        <p className="paragraph-sm utility-margin-bottom-0 utility-max-width-md">Đội ngũ của chúng tôi luôn
                            sẵn sàng – hỗ trợ, giải đáp mọi thắc mắc và giúp chuyến bay của bạn suôn sẻ nhất có thể.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section className="section slide-left">
        <div className="container">
            <div className="w-layout-grid grid-layout tablet-1-column grid-gap-xxl">
                <div id="w-node-_0dc7589f-614c-e2cf-7555-5eed0be05d1f-0be05d1c"
                    className="flex-horizontal flex-vertical y-space-between w-node-_37c5b3fd-9a45-154d-5b97-f8f01d18f356-60726cee">
                    <div className="utility-margin-bottom-4rem">
                        <h2>Khách hàng của chúng tôi nói gì</h2>
                        <p className="paragraph-lg utility-margin-bottom-0">Những câu chuyện thực tế từ hành khách thực tế.
                            Hãy xem vì sao hành khách yêu thích việc bay cùng QAirline – chuyến bay êm ru, ghế ngồi
                            thoải mái và dịch vụ vượt xa mong đợi.</p>
                    </div>
                    <div className="w-layout-grid grid-layout grid-gap-sm">
                        <div>
                            <div className="h1-heading">52K+</div>
                            <div>Hành khách hài lòng</div>
                        </div>
                        <div>
                            <div className="h1-heading">2M+</div>
                            <div>Dặm bay mỗi tháng</div>
                        </div>
                    </div>
                </div>
                <div className="w-layout-grid grid-layout mobile-landscape-1-column grid-gap-sm">
                    <div id="w-node-d6288141-3e37-a760-1f1f-3f87c261e1bc-0be05d1c"
                        className="card review-card w-node-_37c5b3fd-9a45-154d-5b97-f8f01d18f363-60726cee">
                        <div className="utility-padding-all-1rem">
                            <div className="flex-horizontal y-center flex-gap-xs utility-margin-bottom-1rem">
                                <div className="avatar"><img className="cover-image"
                                        src="https://cdn.prod.website-files.com/682e8903f7dfdbc88bbce3f4/6839739276bfc1624e599c00_img_ORsO.webp"
                                        width="" height="48" alt="" sizes="71.97917175292969px"
                                        data-aisg-image-id="7ca1c287-fb3f-4009-bcc7-2a8c87735b94" loading="lazy"
                                        srcSet="https://cdn.prod.website-files.com/682e8903f7dfdbc88bbce3f4/6839739276bfc1624e599c00_img_ORsO.webp 500w, https://cdn.prod.website-files.com/682e8903f7dfdbc88bbce3f4/6839739276bfc1624e599c00_img_ORsO.webp 800w, https://cdn.prod.website-files.com/682e8903f7dfdbc88bbce3f4/6839739276bfc1624e599c00_img_ORsO.webp 1080w, https://cdn.prod.website-files.com/682e8903f7dfdbc88bbce3f4/6839739276bfc1624e599c00_img_ORsO.webp 1440w" />
                                </div>
                                <div>
                                    <div className="paragraph-sm"><strong>Phương Tuấn</strong></div>
                                    <div className="paragraph-sm">Khách hàng bay thường xuyên</div>
                                </div>
                            </div>
                            <p className="paragraph-sm utility-margin-bottom-0">QAirline khiến mỗi chuyến đi trở nên nhẹ
                                nhàng! Đặt vé đơn giản, phi hành đoàn cực kỳ thân thiện và tôi luôn cảm thấy sảng khoái
                                khi đến nơi. Đây là lựa chọn số một của tôi cho các chuyến đi công tác và gia đình.</p>
                        </div>
                    </div>
                    <div className="card review-card">
                        <div className="utility-padding-all-1rem">
                            <div className="flex-horizontal y-center flex-gap-xs utility-margin-bottom-1rem">
                                <div className="avatar"><img width="" height="48" alt=""
                                        src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                                        loading="lazy" data-aisg-image-id="46c28f14-b708-40ba-aba4-1de7287065f6"
                                        className="cover-image" /></div>
                                <div>
                                    <div className="paragraph-sm"><strong>Ngô Lang Thang</strong></div>
                                    <div className="paragraph-sm">Travel Blogger</div>
                                </div>
                            </div>
                            <p className="paragraph-sm utility-margin-bottom-0">Từ lúc làm thủ tục đến khi hạ cánh, QAirline đều làm rất tốt. 
                                Các bữa ăn trên máy bay thực sự ngon, và chỗ để chân rộng rãi là một điểm cộng lớn!</p>
                        </div>
                    </div>
                    <div id="w-node-_57b0b48d-fc7d-2a70-7d13-21713b2c2f03-0be05d1c"
                        className="card review-card w-node-_37c5b3fd-9a45-154d-5b97-f8f01d18f37d-60726cee">
                        <div className="utility-padding-all-1rem">
                            <div className="flex-horizontal y-center flex-gap-xs utility-margin-bottom-1rem">
                                <div className="avatar"><img width="" height="48" alt=""
                                        src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp"
                                        loading="lazy" data-aisg-image-id="2e927f3b-4fe6-4eb0-9e0b-6745414afeca"
                                        className="cover-image" /></div>
                                <div>
                                    <div className="paragraph-sm"><strong>Thái Hoàng</strong></div>
                                    <div className="paragraph-sm">Business Travel</div>
                                </div>
                            </div>
                            <p className="paragraph-sm utility-margin-bottom-0">Tôi bay với QAirline mỗi tháng. Nhân viên luôn nhớ tên tôi, 
                                chuyến bay em ru giúp tôi làm việc hiệu quả ngay cả khi đang ở trên mây. Năm sao!</p>
                        </div>
                    </div>
                    <div className="card review-card">
                        <div className="utility-padding-all-1rem">
                            <div className="flex-horizontal y-center flex-gap-xs utility-margin-bottom-1rem">
                                <div className="avatar"><img width="" height="48" alt=""
                                        src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
                                        loading="lazy" data-aisg-image-id="27b01c89-efb1-44b0-867c-10725f56500a"
                                        className="cover-image" /></div>
                                <div>
                                    <div className="paragraph-sm"><strong>Minh Hiếu</strong></div>
                                    <div className="paragraph-sm">Khách hàng bay thường xuyên</div>
                                </div>
                            </div>
                            <p className="paragraph-sm utility-margin-bottom-0">Tôi rất thích chuyến bay êm ái và phi hành đoàn thân thiện! 
                                QAirline đã khiến kỳ nghỉ của tôi bắt đầu ngay từ lúc tôi lên máy bay.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section className="section" id="events">
        <div className="container">
            <div className="utility-text-align-center utility-margin-bottom-4rem">
                <h2 className="eyebrow utility-margin-bottom-1rem">khám phá với QAirline</h2>
                <h3 className="h3-heading">Sự kiện &amp; Thông báo sắp tới</h3>
                <p className="paragraph-lg utility-margin-bottom-0">Luôn cập nhật những tin tức mới nhất từ QAirline.
                    Từ các đường bay mới đến trải nghiệm độc quyền trên chuyến bay, chúng tôi luôn có những thông tin hấp dẫn dành cho bạn.</p>
            </div>
            <div className="w-layout-grid grid-layout desktop-3-column tablet-1-column grid-gap-sm">
                <div
                    id="w-node-ad7e1832-39e3-90e5-6cc9-f687cbdd7d91-bac2655b"
                    className="card-link w-node-_42f59ece-bd50-b85c-48df-53570b109ec5-0b109eb9 w-inline-block">
                    <div className="utility-aspect-3x2 utility-position-relative flex-horizontal x-right"><img width="1216"
                            height="832" alt=""
                            src="https://cdn.prod.website-files.com/682e8903f7dfdbc88bbce3f4/682e8ab1a179c3fdd9fa54bf_ca3dd369-89ae-4b7e-b301-1f1eb334d4bb.avif"
                            loading="lazy" data-aisg-image-id="ab70756a-4353-4194-9afb-8d8d3a97b8f6"
                            className="cover-image" />
                    </div>
                    <div className="utility-padding-all-3rem">
                        <div className="tag utility-margin-bottom-1rem">
                            <div>Tuyến bay mới</div>
                        </div>
                        <h4 className="h3-heading">Bay đến những điểm đến mới</h4>
                        <div className="utility-text-secondary utility-margin-bottom-1rem">Toàn cầu</div>
                        <p>Hãy cùng chúng tôi khám phá các tuyến bay mới kết nối bạn đến nhiều điểm đến hơn. Trải nghiệm thế giới với dịch vụ tuyệt vời của QAirline.</p>
                        <div className="text-link utility-text-decoration-none">
                            <div>Khám phá thêm</div>
                        </div>
                    </div>
                </div>
                <div id="w-node-_888cf32c-9ab2-653d-3c0c-1a7839511a48-bac2655b" href="/inflight-experience"
                    className="card-link w-node-_42f59ece-bd50-b85c-48df-53570b109ede-0b109eb9 w-inline-block">
                    <div className="utility-aspect-3x2 utility-position-relative flex-horizontal x-right"><img width="1216"
                            height="832" alt=""
                            src="https://cdn.prod.website-files.com/682e8903f7dfdbc88bbce3f4/682e9da58263f4a43945cd43_50acf2db-b064-4da7-bdec-9a80145b499a.avif"
                            loading="lazy" data-aisg-image-id="aba62937-a50b-4225-ada5-078e512165f8"
                            className="cover-image" />
                    </div>
                    <div className="utility-padding-all-3rem">
                        <div className="tag utility-margin-bottom-1rem">
                            <div>Trải nghiệm trên chuyến bay</div>
                        </div>
                        <h4 className="h3-heading">Nâng tầm hành trình của bạn</h4>
                        <div className="utility-text-secondary utility-margin-bottom-1rem">Trên máy bay</div>
                        <p>Khám phá các dịch vụ trên chuyến bay được nâng cấp của chúng tôi, được thiết kế để giúp hành trình của bạn thoải mái và thú vị hơn. Bay cùng chúng tôi và cảm nhận sự khác biệt.</p>
                        <div className="text-link utility-text-decoration-none">
                            <div>Tìm hiểu thêm</div>
                        </div>
                    </div>
                </div>
                <div id="w-node-f2b7feac-88a1-b0dd-8f8d-0b26f295558c-bac2655b" href="/inflight-experience"
                    className="card-link w-node-_42f59ece-bd50-b85c-48df-53570b109ef7-0b109eb9 w-inline-block">
                    <div className="utility-aspect-3x2 utility-position-relative flex-horizontal x-right"><img width="1216"
                            height="832" alt=""
                            src="https://cdn.prod.website-files.com/682e8903f7dfdbc88bbce3f4/682e91013e961282e1711b47_b1a18db2-48ff-4d9f-80ef-477d8ea17e0e.avif"
                            loading="lazy" data-aisg-image-id="76f231a3-bb0c-4fed-a828-9e906f48e5a3"
                            className="cover-image" />
                    </div>
                    <div className="utility-padding-all-3rem">
                        <div className="tag utility-margin-bottom-1rem">
                            <div>Ưu đãi đặc biệt</div>
                        </div>
                        <h4 className="h3-heading">Ưu đãi độc quyền</h4>
                        <div className="utility-text-secondary utility-margin-bottom-1rem">Trực tuyến</div>
                        <p>Đừng bỏ lỡ các ưu đãi đặc biệt của chúng tôi! Đặt chuyến bay tiếp theo với QAirline và tận hưởng mức giá cùng quyền lợi không thể bỏ qua.</p>
                        <div className="text-link utility-text-decoration-none">
                            <div>Nhận ưu đãi</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="button-group align-center utility-margin-top-3rem"><a href="/inflight-experience"
                    className="button secondary-button w-button">Xem tất cả</a></div>
        </div>
    </section>
    <section className="section slide-left" id="faq" >
        <div className="container small-container">
            <div id="w-node-_185f60f0-8ba0-284e-2436-f639fd271ad8-fd271ad5"
                className="utility-text-align-center utility-margin-bottom-4rem w-node-_95a058fb-fe1c-8906-8bdb-f25895fedc60-278782d9">
                <div className="eyebrow">Câu hỏi thường gặp ở độ cao 30.000 feet</div>
                <h2>Các thắc mắc của bạn, được giải đáp - Theo cách của QAirline</h2>
                <p className="subheading">Bạn có câu hỏi về việc bay cùng chúng tôi? Hãy xem những câu hỏi được hỏi nhiều nhất bên dưới. 
    Chúng tôi luôn giải đáp rõ ràng và hỗ trợ 24/7.</p>
            </div>
        </div>
        <div id="w-node-_6d181685-830d-fed9-53d4-bd265d6c854d-fd271ad5"
            className="container w-node-_95a058fb-fe1c-8906-8bdb-f25895fedca3-278782d9">
            <div
                className="w-layout-grid grid-layout desktop-3-column tablet-2-column mobile-landscape-1-column grid-gap-md">
                <div id="w-node-_185f60f0-8ba0-284e-2436-f639fd271ae0-fd271ad5"
                    className="utility-text-align-center w-node-_95a058fb-fe1c-8906-8bdb-f25895fedc6a-278782d9">
                    <div className="flex-horizontal x-center utility-margin-bottom-1rem">
                        <div className="icon icon-container"><svg xmlns="http://www.w3.org/2000/svg" width="100%"
                                height="100%" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M12.5 18.25C16.2279 18.25 19.25 15.2279 19.25 11.5C19.25 7.77208 16.2279 4.75 12.5 4.75C8.77208 4.75 5.75 7.77208 5.75 11.5C5.75 12.6007 6.01345 13.6398 6.48072 14.5578L5 19L9.71819 17.6519C10.5664 18.0361 11.5082 18.25 12.5 18.25Z"
                                    stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"></path>
                            </svg></div>
                    </div>
                    <div className="h4-heading">Làm thế nào để đặt chuyến bay?</div>
                    <p>Chỉ cần nhập điểm đến và điểm đi, chọn chuyến bay, điền những thông tin cơ bản và bạn đã xong!</p>
                </div>
                <div id="w-node-_9f3f1ede-167a-23fc-1325-62beb5f80451-fd271ad5"
                    className="utility-text-align-center w-node-_95a058fb-fe1c-8906-8bdb-f25895fedc74-278782d9">
                    <div className="flex-horizontal x-center utility-margin-bottom-1rem">
                        <div className="icon icon-container"><svg xmlns="http://www.w3.org/2000/svg" width="100%"
                                height="100%" viewBox="0 0 24 24" fill="none">
                                <path d="M5.25 6.75H18.75V17.25H5.25V6.75Z" stroke="currentColor" strokeWidth="1.5"
                                    strokeLinejoin="round"></path>
                                <path d="M5.25 6.75L12 12L18.75 6.75" stroke="currentColor" strokeWidth="1.5"
                                    strokeLinejoin="round"></path>
                            </svg></div>
                    </div>
                    <div className="h4-heading">Vé của tôi bao gồm những gì?</div>
                    <p>Mỗi vé đều bao gồm ghế ngồi thoải mái, bữa ăn ngon và nụ cười thân thiện từ đội ngũ tiếp viên. Nâng hạng nếu bạn muốn trải nghiệm đẳng cấp hơn</p>
                </div>
                <div id="w-node-_84310da2-a5e5-762c-911b-f856ff98de9f-fd271ad5"
                    className="utility-text-align-center w-node-_95a058fb-fe1c-8906-8bdb-f25895fedc7e-278782d9">
                    <div className="flex-horizontal x-center utility-margin-bottom-1rem">
                        <div className="icon icon-container"><svg xmlns="http://www.w3.org/2000/svg" width="100%"
                                height="100%" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M19.25 12C19.25 16.0041 16.0041 19.25 12 19.25C7.99594 19.25 4.75 16.0041 4.75 12C4.75 7.99594 7.99594 4.75 12 4.75C16.0041 4.75 19.25 7.99594 19.25 12Z"
                                    stroke="currentColor" strokeWidth="1.5"></path>
                                <path d="M9 12L11 14L15.5 9.5" stroke="currentColor" strokeWidth="1.5"></path>
                            </svg></div>
                    </div>
                    <div className="h4-heading">Tôi có thể thay đổi hoặc hủy đặt chỗ không?</div>
                    <p>Kế hoạch thay đổi? Đừng lo! Bạn có thể quản lý hoặc hủy đặt chỗ trực tuyến chỉ với vài cú nhấp chuột.</p>
                </div>
                <div id="w-node-_7c5bc2d4-b166-5f54-4277-7092ae4d112a-fd271ad5"
                    className="utility-text-align-center w-node-_95a058fb-fe1c-8906-8bdb-f25895fedc8a-278782d9">
                    <div className="flex-horizontal x-center utility-margin-bottom-1rem">
                        <div className="icon icon-container"><svg width="100%" height="100%" viewBox="0 0 24 24"
                                fill="none">
                                <path
                                    d="M9.24998 18.7103C6.60958 17.6271 4.75 15.0307 4.75 12C4.75 8.96938 6.60958 6.37304 9.24997 5.28979"
                                    strokeWidth="1.5" strokeLinejoin="round" stroke="currentColor"></path>
                                <path
                                    d="M14.75 5.28979C17.3904 6.37303 19.25 8.96938 19.25 12.0001C19.25 15.0307 17.3904 17.6271 14.75 18.7103"
                                    strokeWidth="1.5" strokeLinejoin="round" stroke="currentColor"></path>
                                <path
                                    d="M4 19.2501L8.99998 19.2501C9.13805 19.2501 9.24998 19.1381 9.24998 19.0001L9.24997 14"
                                    strokeWidth="1.5" strokeLinejoin="round" stroke="currentColor"></path>
                                <path d="M20 4.75L15 4.75003C14.8619 4.75003 14.75 4.86196 14.75 5.00003L14.75 10.0001"
                                    strokeWidth="1.5" strokeLinejoin="round" stroke="currentColor"></path>
                            </svg></div>
                    </div>
                    <div className="h4-heading">Làm thế nào để kiểm tra tình trạng chuyến bay của tôi?</div>
                    <p>Luôn cập nhật thông tin! Theo dõi chuyến bay của bạn theo thời gian thực trên website của chúng tôi, không lo nhiễu loạn, cập nhật thông tin mới nhất.</p>
                </div>
                <div id="w-node-fcd63731-53e5-cad4-ca0c-69f84aad2950-fd271ad5"
                    className="utility-text-align-center w-node-_95a058fb-fe1c-8906-8bdb-f25895fedc97-278782d9">
                    <div className="flex-horizontal x-center utility-margin-bottom-1rem">
                        <div className="icon icon-container"><svg xmlns="http://www.w3.org/2000/svg" width="100%"
                                height="100%" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M19 12C15.134 12 12 15.134 12 19C12 15.134 8.86599 12 5 12C8.86599 12 12 8.86599 12 5C12 8.86599 15.134 12 19 12Z"
                                    stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"></path>
                                <path d="M8 16L5.5 18.5" stroke="currentColor" strokeWidth="1.5"></path>
                                <path d="M8 8L5.5 5.5" stroke="currentColor" strokeWidth="1.5"></path>
                                <path d="M16 16L18.5 18.5" stroke="currentColor" strokeWidth="1.5"></path>
                                <path d="M16 8L18.5 5.5" stroke="currentColor" strokeWidth="1.5"></path>
                            </svg></div>
                    </div>
                    <div className="h4-heading">Quy định hành lý là gì?</div>
                    <p>Thoải mái mang theo! Mỗi vé đều bao gồm 1 kiện hành lý xách tay và 1 kiện ký gửi.
                    </p>
                </div>
                <div id="w-node-_29ade456-17d2-2150-82f2-4fe8f51b15b4-fd271ad5"
                    className="utility-text-align-center w-node-_95a058fb-fe1c-8906-8bdb-f25895fedca1-278782d9">
                    <div className="flex-horizontal x-center utility-margin-bottom-1rem">
                        <div className="icon icon-container"><svg xmlns="http://www.w3.org/2000/svg" width="100%"
                                height="100%" viewBox="0 0 24 24" fill="none">
                                <path d="M18.25 13.5L18.25 5.75002L10.5 5.75" stroke="currentColor" strokeWidth="1.5"
                                    strokeLinejoin="round"></path>
                                <path d="M18.25 5.75L6.5 17.5" stroke="currentColor" strokeWidth="1.5"></path>
                            </svg></div>
                    </div>
                    <div className="h4-heading">Làm thế nào để liên hệ với bộ phận hỗ trợ khách hàng?</div>
                    <p>Chúng tôi luôn sẵn sàng 24/7! Liên hệ qua chat, email hoặc điện thoại, đội ngũ của chúng tôi luôn sẵn lòng hỗ trợ bạn.</p>
                </div>
            </div>
        </div>
    </section>
    <section className="section zoom-in linear-gradient-bg-client">
        <div className="container">
            <div className="w-layout-grid grid-layout tablet-1-column grid-gap-md">
                <div id="w-node-a6542d50-0a0c-aae3-187d-ec258ad74e44-8ad74e41"
                    className="w-node-_0848802c-2772-04ad-65db-a28774a808eb-74a808e8">
                    <h2>Chuẩn bị bắt đầu cho một hành trình khó quên</h2>
                    <p className="subheading utility-margin-bottom-0">Hãy cùng khám phá bầu trời với dịch vụ tốt nhất.</p>
                </div>
                <a id="w-node-a6542d50-0a0c-aae3-187d-ec258ad74e49-8ad74e41" 
                    href="/" 
                    className="button w-node-_0848802c-2772-04ad-65db-a28774a808f0-74a808e8 w-button" 
                onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }}>Bắt đầu hành trình của bạn ngay!</a>
            </div>
        </div>
    </section>
			<Footer />
		</>
	);
    
};

export default Home;
