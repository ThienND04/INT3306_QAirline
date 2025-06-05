import React from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

function Home() {
	return (
		<>
			<Header />

			<header
				className="section utility-padding-all-0 utility-overflow-hidden utility-text-on-overlay"
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
								alt="Aircraft in flight"
								src="https://cdn.prod.website-files.com/682e8903f7dfdbc88bbce3f4/682e99afbf98b8250ae9f9f1_1743d08e-619f-45f7-8bd1-61b82e8af8c4.avif"
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
							<h1 className="h1-heading utility-text-align-center">
								CHÀO MỪNG ĐẾN VỚI QAIRLINE - nơi hành trình của bạn bắt đầu <br />
							</h1>
							<div className="flight-card">
								<div
									data-current="Tab 1"
									data-easing="ease"
									data-duration-in="300"
									data-duration-out="100"
									className="w-tabs"
								>
									<div className="tabs-menu w-tab-menu">
										<button type="button" data-w-tab="Tab 1" className="tab-link-t-v w-inline-block w-tab-link w--current" style={{ background: "none", border: "none", padding: 0, margin: 0, cursor: "pointer" }}>
											<div className="div-block-4">
												<div className="material-icon">flight</div>
												<div className="text-block-4">Đặt Vé </div>
											</div>
										</button>
										<button
											type="button"
											data-w-tab="Tab 2"
											className="tab-link-l-m-th-t-c w-inline-block w-tab-link"
											style={{ background: "none", border: "none", padding: 0, margin: 0, cursor: "pointer" }}
										>
											<div className="div-block-4">
												<div className="material-icon">airplane_ticket</div>
												<div className="text-block-4">Làm Thủ Tục</div>
											</div>
										</button>
										<button
											type="button"
											data-w-tab="Tab 3"
											className="tab-link-t-ch w-inline-block w-tab-link"
											style={{ background: "none", border: "none", padding: 0, margin: 0, cursor: "pointer" }}
										>
											<div className="div-block-4">
												<div className="material-icon">airline_seat_recline_extra</div>
												<div className="text-block-4">Đặt Chỗ Của Tôi</div>
											</div>
										</button>
									</div>
									<div className="w-tab-content">
										<div data-w-tab="Tab 1" className="w-tab-pane w--tab-active">
											<div className="w-form">
												<form id="email-form" name="email-form" data-name="Email Form" method="get">
													<div className="radio-button-group">
														<label className="radio-button-field w-radio">
															<input
																type="radio"
																name="Radio"
																id="Radio"
																data-name="Radio"
																className="w-form-formradioinput w-radio-input"
																value="Radio"
															/>
															<span className="radio-button-label w-form-label" htmlFor="Radio">
																Một chiều
															</span>
														</label>
														<label className="radio-button-field w-radio">
															<input
																type="radio"
																name="Radio"
																id="Radio-3"
																data-name="Radio 3"
																className="w-form-formradioinput w-radio-input"
																value="Radio"
															/>
															<span className="radio-button-label w-form-label" htmlFor="Radio-3">
																Khứ hồi
															</span>
														</label>
														<label className="radio-button-field w-radio">
															<input
																type="radio"
																name="Radio"
																id="Radio-2"
																data-name="Radio 2"
																className="w-form-formradioinput w-radio-input"
																value="Radio"
															/>
															<span className="radio-button-label w-form-label" htmlFor="Radio-2">
																Đa chặng
															</span>
														</label>
													</div>
													<div className="form-row">
														<div className="div-block-7">
															<div className="div-block-8">
																<label htmlFor="field" className="field-label">
																	TỪ
																</label>
																<input
																	className="from-airport w-input"
																	maxLength="256"
																	name="field"
																	data-name="Field"
																	placeholder="Example Text"
																	type="text"
																	id="field"
																	required
																/>
															</div>
															<div className="div-block-8">
																<label htmlFor="field-4" className="field-label">
																	ĐẾN
																</label>
																<input
																	className="to-airport w-input"
																	maxLength="256"
																	name="field-4"
																	data-name="Field 4"
																	placeholder="Example Text"
																	type="text"
																	id="field-4"
																	required
																/>
															</div>
															<div className="div-block-9 div-block-8">
																<label htmlFor="field-5" className="field-label">
																	NGÀY
																</label>
																<input
																	className="depart-date w-input"
																	maxLength="256"
																	name="field-4"
																	data-name="Field 4"
																	placeholder="Example Text"
																	type="text"
																	id="field-4"
																	required
																/>
															</div>
															<div className="div-block-10 div-block-8">
																<label htmlFor="field-5" className="field-label">
																	HÀNH KHÁCH
																</label>
																<input
																	className="depart-date w-input"
																	maxLength="256"
																	name="field-4"
																	data-name="Field 4"
																	placeholder="Example Text"
																	type="text"
																	id="field-4"
																	required
																/>
															</div>
														</div>
														<div>
															<input type="submit" data-wait="Please wait..." className="w-button" value="Submit" />
														</div>
													</div>
												</form>
												<div className="w-form-done">
													<div>Thank you! Your submission has been received!</div>
												</div>
												<div className="w-form-fail">
													<div>Oops! Something went wrong while submitting the form.</div>
												</div>
											</div>
										</div>
										<div data-w-tab="Tab 2" className="w-tab-pane"></div>
										<div data-w-tab="Tab 3" className="w-tab-pane"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
			<section data-record-id="db7b11c5-ba68-4bd7-2700-c0978c796e9e" data-copilot="true" data-wf--services--variant="base"
        className="section">
        <div className="container">
            <div
                className="utility-max-width-lg utility-text-align-center utility-element-align-center utility-margin-bottom-4rem">
                <h2>Khám phá sự khác biệt cùng QAIRLINE</h2>
                <p className="paragraph-lg utility-text-secondary">Bay thông minh, không vất vả. Khám phá những dịch vụ hàng
                    đầu được thiết kế để giúp hành trình của bạn trở nên suôn sẻ từ lúc cất cánh đến khi hạ cánh.</p>
            </div>
            <div className="w-layout-grid grid-layout desktop-3-column tablet-1-column grid-gap-sm">
                <div id="w-node-_39abaecf-1dc2-886a-5c1d-6d90e390de50-4f0d0a8d"
                    className="card w-node-_0571ce03-38b2-36ad-466d-57ddf78e1462-be40c5b3">
                    <div className="card-body">
                        <div className="icon utility-margin-bottom-1rem"><svg xmlns="http://www.w3.org/2000/svg"
                                width="100%" height="100%" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M12.5 18.25C16.2279 18.25 19.25 15.2279 19.25 11.5C19.25 7.77208 16.2279 4.75 12.5 4.75C8.77208 4.75 5.75 7.77208 5.75 11.5C5.75 12.6007 6.01345 13.6398 6.48072 14.5578L5 19L9.71819 17.6519C10.5664 18.0361 11.5082 18.25 12.5 18.25Z"
                                    stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"></path>
                            </svg></div>
                        <h3 id="w-node-_39abaecf-1dc2-886a-5c1d-6d90e390de57-4f0d0a8d"
                            className="h4-heading w-node-_0571ce03-38b2-36ad-466d-57ddf78e145e-be40c5b3">Vận chuyển hành lý
                            dễ dàng</h3>
                        <p className="paragraph-sm utility-margin-bottom-0 utility-max-width-md">Mang theo những gì bạn yêu
                            thích! Thoải mái với chính sách hành lý rộng rãi và quy trình check-in nhanh chóng mỗi lần
                            bạn bay cùng chúng tôi.</p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <div id="w-node-_39abaecf-1dc2-886a-5c1d-6d90e390de60-4f0d0a8d"
                            className="w-node-_0571ce03-38b2-36ad-466d-57ddf78e146a-be40c5b3">
                            <div className="icon utility-margin-bottom-1rem"><svg xmlns="http://www.w3.org/2000/svg"
                                    width="100%" height="100%" viewBox="0 0 24 24" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
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
                <div className="card">
                    <div className="card-body">
                        <div id="w-node-_39abaecf-1dc2-886a-5c1d-6d90e390de6c-4f0d0a8d"
                            className="w-node-_0571ce03-38b2-36ad-466d-57ddf78e1475-be40c5b3">
                            <div className="icon utility-margin-bottom-1rem"><svg xmlns="http://www.w3.org/2000/svg"
                                    width="100%" height="100%" viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M19.25 12C19.25 16.0041 16.0041 19.25 12 19.25C7.99594 19.25 4.75 16.0041 4.75 12C4.75 7.99594 7.99594 4.75 12 4.75C16.0041 4.75 19.25 7.99594 19.25 12Z"
                                        stroke="currentColor" stroke-width="1.5"></path>
                                    <path d="M9 12L11 14L15.5 9.5" stroke="currentColor" stroke-width="1.5"></path>
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
                    className="card w-node-_0571ce03-38b2-36ad-466d-57ddf78e1484-be40c5b3">
                    <div className="card-body">
                        <div className="icon utility-margin-bottom-1rem"><svg xmlns="http://www.w3.org/2000/svg"
                                width="100%" height="100%" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M19 12C15.134 12 12 15.134 12 19C12 15.134 8.86599 12 5 12C8.86599 12 12 8.86599 12 5C12 8.86599 15.134 12 19 12Z"
                                    stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"></path>
                                <path d="M8 16L5.5 18.5" stroke="currentColor" stroke-width="1.5"></path>
                                <path d="M8 8L5.5 5.5" stroke="currentColor" stroke-width="1.5"></path>
                                <path d="M16 16L18.5 18.5" stroke="currentColor" stroke-width="1.5"></path>
                                <path d="M16 8L18.5 5.5" stroke="currentColor" stroke-width="1.5"></path>
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
    <section data-record-id="c72fcd26-e8e6-8fec-5891-b83d58f66853" data-copilot="true" className="section">
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
                        className="card w-node-_37c5b3fd-9a45-154d-5b97-f8f01d18f363-60726cee">
                        <div className="utility-padding-all-1rem">
                            <div className="flex-horizontal y-center flex-gap-xs utility-margin-bottom-1rem">
                                <div className="avatar"><img className="cover-image"
                                        src="https://cdn.prod.website-files.com/682e8903f7dfdbc88bbce3f4/6839739276bfc1624e599c00_img_ORsO.webp"
                                        width="" height="48" alt="" sizes="71.97917175292969px"
                                        data-aisg-image-id="7ca1c287-fb3f-4009-bcc7-2a8c87735b94" loading="lazy"
                                        srcset="https://cdn.prod.website-files.com/682e8903f7dfdbc88bbce3f4/6839739276bfc1624e599c00_img_ORsO.webp 500w, https://cdn.prod.website-files.com/682e8903f7dfdbc88bbce3f4/6839739276bfc1624e599c00_img_ORsO.webp 800w, https://cdn.prod.website-files.com/682e8903f7dfdbc88bbce3f4/6839739276bfc1624e599c00_img_ORsO.webp 1080w, https://cdn.prod.website-files.com/682e8903f7dfdbc88bbce3f4/6839739276bfc1624e599c00_img_ORsO.webp 1440w" />
                                </div>
                                <div>
                                    <div className="paragraph-sm"><strong>Phương </strong></div>
                                    <div className="paragraph-sm">Khách hàng bay thường xuyên</div>
                                </div>
                            </div>
                            <p className="paragraph-sm utility-margin-bottom-0">QAirline khiến mỗi chuyến đi trở nên nhẹ
                                nhàng! Đặt vé đơn giản, phi hành đoàn cực kỳ thân thiện và tôi luôn cảm thấy sảng khoái
                                khi đến nơi. Đây là lựa chọn số một của tôi cho các chuyến đi công tác và gia đình.</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="utility-padding-all-1rem">
                            <div className="flex-horizontal y-center flex-gap-xs utility-margin-bottom-1rem">
                                <div className="avatar"><img width="" height="48" alt=""
                                        src="https://cdn.prod.website-files.com/webflow-prod-assets/682e8903f7dfdbc88bbce3f4/683974ae14ddc1966fa04032_ffcf1952-41b7-42ab-b352-c15f5627447f.avif"
                                        loading="lazy" data-aisg-image-id="46c28f14-b708-40ba-aba4-1de7287065f6"
                                        className="cover-image" /></div>
                                <div>
                                    <div className="paragraph-sm"><strong>David Chau</strong></div>
                                    <div className="paragraph-sm">Travel Blogger</div>
                                </div>
                            </div>
                            <p className="paragraph-sm utility-margin-bottom-0">From check-in to landing, QAirline nails it.
                                The in-flight meals are actually tasty, and the legroom is a game-changer!</p>
                        </div>
                    </div>
                    <div id="w-node-_57b0b48d-fc7d-2a70-7d13-21713b2c2f03-0be05d1c"
                        className="card w-node-_37c5b3fd-9a45-154d-5b97-f8f01d18f37d-60726cee">
                        <div className="utility-padding-all-1rem">
                            <div className="flex-horizontal y-center flex-gap-xs utility-margin-bottom-1rem">
                                <div className="avatar"><img width="" height="48" alt=""
                                        src="https://cdn.prod.website-files.com/webflow-prod-assets/682e8903f7dfdbc88bbce3f4/683974af14ddc1966fa04059_c5334392-9cd9-4e40-a7ae-5dfafc1a5e8b.avif"
                                        loading="lazy" data-aisg-image-id="2e927f3b-4fe6-4eb0-9e0b-6745414afeca"
                                        className="cover-image" /></div>
                                <div>
                                    <div className="paragraph-sm"><strong>James O’Connor</strong></div>
                                    <div className="paragraph-sm">Business Traveler</div>
                                </div>
                            </div>
                            <p className="paragraph-sm utility-margin-bottom-0">I fly QAirline every month. The staff
                                remembers my name, and the Wi-Fi keeps me productive in the clouds. Five stars!</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="utility-padding-all-1rem">
                            <div className="flex-horizontal y-center flex-gap-xs utility-margin-bottom-1rem">
                                <div className="avatar"><img width="" height="48" alt=""
                                        src="https://cdn.prod.website-files.com/webflow-prod-assets/682e8903f7dfdbc88bbce3f4/683974ae14ddc1966fa04037_d042d98b-e6f5-41f6-8372-a3fb72e74e25.avif"
                                        loading="lazy" data-aisg-image-id="27b01c89-efb1-44b0-867c-10725f56500a"
                                        className="cover-image" /></div>
                                <div>
                                    <div className="paragraph-sm"><strong>Sofia Martinez</strong></div>
                                    <div className="paragraph-sm">Adventure Seeker</div>
                                </div>
                            </div>
                            <p className="paragraph-sm utility-margin-bottom-0">Loved the smooth ride and the friendly crew!
                                QAirline made my vacation start the moment I boarded.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section data-record-id="798d348a-e3d5-c351-55df-308f20a67f19" data-copilot="true" className="section">
        <div className="container">
            <div className="utility-text-align-center utility-margin-bottom-4rem">
                <h2 className="eyebrow utility-margin-bottom-1rem">Discover QAirline</h2>
                <h3 className="h3-heading">Upcoming Events &amp; Announcements</h3>
                <p className="paragraph-lg utility-margin-bottom-0">Stay updated with the latest happenings at QAirline.
                    From new routes to exclusive in-flight experiences, we&#x27;ve got exciting news for you.</p>
            </div>
            <div className="w-layout-grid grid-layout desktop-3-column tablet-1-column grid-gap-sm"><a
					href="/inflight-experience"
                    id="w-node-ad7e1832-39e3-90e5-6cc9-f687cbdd7d91-bac2655b"
                    className="card-link w-node-_42f59ece-bd50-b85c-48df-53570b109ec5-0b109eb9 w-inline-block">
                    <div className="utility-aspect-3x2 utility-position-relative flex-horizontal x-right"><img width="1216"
                            height="832" alt=""
                            src="https://cdn.prod.website-files.com/682e8903f7dfdbc88bbce3f4/682e8ab1a179c3fdd9fa54bf_ca3dd369-89ae-4b7e-b301-1f1eb334d4bb.avif"
                            loading="lazy" data-aisg-image-id="ab70756a-4353-4194-9afb-8d8d3a97b8f6"
                            className="cover-image" />
                        <div className="card utility-position-absolute utility-margin-top-1rem utility-margin-right-1rem">
                            <div className="utility-padding-all-1rem utility-text-align-center">
                                <div className="paragraph-sm utility-margin-bottom-0">Fri</div>
                                <div className="paragraph-xxl utility-margin-bottom-0"><strong>09</strong></div>
                                <div className="paragraph-sm utility-margin-bottom-0">Feb 2024</div>
                            </div>
                        </div>
                    </div>
                    <div className="utility-padding-all-3rem">
                        <div className="tag utility-margin-bottom-1rem">
                            <div>New Route</div>
                        </div>
                        <h4 className="h3-heading">Fly to New Destinations</h4>
                        <div className="utility-text-secondary utility-margin-bottom-1rem">Worldwide</div>
                        <p>Join us as we unveil new routes that connect you to more destinations. Experience the world
                            with QAirline&#x27;s exceptional service.</p>
                        <div className="text-link utility-text-decoration-none">
                            <div>Explore More</div>
                        </div>
                    </div>
                </a><a id="w-node-_888cf32c-9ab2-653d-3c0c-1a7839511a48-bac2655b" href="/inflight-experience"
                    className="card-link w-node-_42f59ece-bd50-b85c-48df-53570b109ede-0b109eb9 w-inline-block">
                    <div className="utility-aspect-3x2 utility-position-relative flex-horizontal x-right"><img width="1216"
                            height="832" alt=""
                            src="https://cdn.prod.website-files.com/682e8903f7dfdbc88bbce3f4/682e9da58263f4a43945cd43_50acf2db-b064-4da7-bdec-9a80145b499a.avif"
                            loading="lazy" data-aisg-image-id="aba62937-a50b-4225-ada5-078e512165f8"
                            className="cover-image" />
                        <div className="card utility-position-absolute utility-margin-top-1rem utility-margin-right-1rem">
                            <div className="utility-padding-all-1rem utility-text-align-center">
                                <div className="paragraph-sm utility-margin-bottom-0">Fri</div>
                                <div className="paragraph-xxl utility-margin-bottom-0"><strong>09</strong></div>
                                <div className="paragraph-sm utility-margin-bottom-0">Feb 2024</div>
                            </div>
                        </div>
                    </div>
                    <div className="utility-padding-all-3rem">
                        <div className="tag utility-margin-bottom-1rem">
                            <div>In-Flight Experience</div>
                        </div>
                        <h4 className="h3-heading">Elevate Your Journey</h4>
                        <div className="utility-text-secondary utility-margin-bottom-1rem">Onboard</div>
                        <p>Discover our enhanced in-flight services, designed to make your journey more comfortable and
                            enjoyable. Fly with us and feel the difference.</p>
                        <div className="text-link utility-text-decoration-none">
                            <div>Learn More</div>
                        </div>
                    </div>
                </a><a id="w-node-f2b7feac-88a1-b0dd-8f8d-0b26f295558c-bac2655b" href="/inflight-experience"
                    className="card-link w-node-_42f59ece-bd50-b85c-48df-53570b109ef7-0b109eb9 w-inline-block">
                    <div className="utility-aspect-3x2 utility-position-relative flex-horizontal x-right"><img width="1216"
                            height="832" alt=""
                            src="https://cdn.prod.website-files.com/682e8903f7dfdbc88bbce3f4/682e91013e961282e1711b47_b1a18db2-48ff-4d9f-80ef-477d8ea17e0e.avif"
                            loading="lazy" data-aisg-image-id="76f231a3-bb0c-4fed-a828-9e906f48e5a3"
                            className="cover-image" />
                        <div className="card utility-position-absolute utility-margin-top-1rem utility-margin-right-1rem">
                            <div className="utility-padding-all-1rem utility-text-align-center">
                                <div className="paragraph-sm utility-margin-bottom-0">Fri</div>
                                <div className="paragraph-xxl utility-margin-bottom-0"><strong>09</strong></div>
                                <div className="paragraph-sm utility-margin-bottom-0">Feb 2024</div>
                            </div>
                        </div>
                    </div>
                    <div className="utility-padding-all-3rem">
                        <div className="tag utility-margin-bottom-1rem">
                            <div>Special Offer</div>
                        </div>
                        <h4 className="h3-heading">Exclusive Deals</h4>
                        <div className="utility-text-secondary utility-margin-bottom-1rem">Online</div>
                        <p>Don&#x27;t miss out on our special offers! Book your next flight with QAirline and enjoy
                            unbeatable prices and perks.</p>
                        <div className="text-link utility-text-decoration-none">
                            <div>Grab the Deal</div>
                        </div>
                    </div>
                </a></div>
            <div className="button-group align-center utility-margin-top-3rem"><a href="/inflight-experience"
                    className="button secondary-button w-button">See All Events</a></div>
        </div>
    </section>
    <section data-record-id="0f09cee4-40a4-1421-6ea8-88ddc50540e5" data-copilot="true" className="section">
        <div className="container small-container">
            <div id="w-node-_185f60f0-8ba0-284e-2436-f639fd271ad8-fd271ad5"
                className="utility-text-align-center utility-margin-bottom-4rem w-node-_95a058fb-fe1c-8906-8bdb-f25895fedc60-278782d9">
                <div className="eyebrow">FAQs at 30,000 Feet</div>
                <h2>Your Questions, Answered—The QAirline Way</h2>
                <p className="subheading">Got a question about flying with us? Check out our most asked questions below. We
                    keep it clear, simple, and sky-high friendly.</p>
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
                                    stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"></path>
                            </svg></div>
                    </div>
                    <div className="h4-heading">How do I book a flight?</div>
                    <p>Just enter your trip details, pick your flight, and you’re cleared for takeoff. Booking with
                        QAirline is a breeze!</p>
                </div>
                <div id="w-node-_9f3f1ede-167a-23fc-1325-62beb5f80451-fd271ad5"
                    className="utility-text-align-center w-node-_95a058fb-fe1c-8906-8bdb-f25895fedc74-278782d9">
                    <div className="flex-horizontal x-center utility-margin-bottom-1rem">
                        <div className="icon icon-container"><svg xmlns="http://www.w3.org/2000/svg" width="100%"
                                height="100%" viewBox="0 0 24 24" fill="none">
                                <path d="M5.25 6.75H18.75V17.25H5.25V6.75Z" stroke="currentColor" stroke-width="1.5"
                                    stroke-linejoin="round"></path>
                                <path d="M5.25 6.75L12 12L18.75 6.75" stroke="currentColor" stroke-width="1.5"
                                    stroke-linejoin="round"></path>
                            </svg></div>
                    </div>
                    <div className="h4-heading">What’s included in my ticket?</div>
                    <p>Every ticket comes with a comfy seat, a tasty meal, and a smile from our crew. Extra legroom? You
                        bet—just ask!</p>
                </div>
                <div id="w-node-_84310da2-a5e5-762c-911b-f856ff98de9f-fd271ad5"
                    className="utility-text-align-center w-node-_95a058fb-fe1c-8906-8bdb-f25895fedc7e-278782d9">
                    <div className="flex-horizontal x-center utility-margin-bottom-1rem">
                        <div className="icon icon-container"><svg xmlns="http://www.w3.org/2000/svg" width="100%"
                                height="100%" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M19.25 12C19.25 16.0041 16.0041 19.25 12 19.25C7.99594 19.25 4.75 16.0041 4.75 12C4.75 7.99594 7.99594 4.75 12 4.75C16.0041 4.75 19.25 7.99594 19.25 12Z"
                                    stroke="currentColor" stroke-width="1.5"></path>
                                <path d="M9 12L11 14L15.5 9.5" stroke="currentColor" stroke-width="1.5"></path>
                            </svg></div>
                    </div>
                    <div className="h4-heading">Can I change or cancel my booking?</div>
                    <p>Plans up in the air? No worries! Manage or cancel your booking online in just a few clicks.</p>
                </div>
                <div id="w-node-_7c5bc2d4-b166-5f54-4277-7092ae4d112a-fd271ad5"
                    className="utility-text-align-center w-node-_95a058fb-fe1c-8906-8bdb-f25895fedc8a-278782d9">
                    <div className="flex-horizontal x-center utility-margin-bottom-1rem">
                        <div className="icon icon-container"><svg width="100%" height="100%" viewBox="0 0 24 24"
                                fill="none">
                                <path
                                    d="M9.24998 18.7103C6.60958 17.6271 4.75 15.0307 4.75 12C4.75 8.96938 6.60958 6.37304 9.24997 5.28979"
                                    stroke-width="1.5" stroke-linejoin="round" stroke="currentColor"></path>
                                <path
                                    d="M14.75 5.28979C17.3904 6.37303 19.25 8.96938 19.25 12.0001C19.25 15.0307 17.3904 17.6271 14.75 18.7103"
                                    stroke-width="1.5" stroke-linejoin="round" stroke="currentColor"></path>
                                <path
                                    d="M4 19.2501L8.99998 19.2501C9.13805 19.2501 9.24998 19.1381 9.24998 19.0001L9.24997 14"
                                    stroke-width="1.5" stroke-linejoin="round" stroke="currentColor"></path>
                                <path d="M20 4.75L15 4.75003C14.8619 4.75003 14.75 4.86196 14.75 5.00003L14.75 10.0001"
                                    stroke-width="1.5" stroke-linejoin="round" stroke="currentColor"></path>
                            </svg></div>
                    </div>
                    <div className="h4-heading">How do I check my flight status?</div>
                    <p>Stay in the loop! Track your flight in real time on our website—no turbulence, just updates.</p>
                </div>
                <div id="w-node-fcd63731-53e5-cad4-ca0c-69f84aad2950-fd271ad5"
                    className="utility-text-align-center w-node-_95a058fb-fe1c-8906-8bdb-f25895fedc97-278782d9">
                    <div className="flex-horizontal x-center utility-margin-bottom-1rem">
                        <div className="icon icon-container"><svg xmlns="http://www.w3.org/2000/svg" width="100%"
                                height="100%" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M19 12C15.134 12 12 15.134 12 19C12 15.134 8.86599 12 5 12C8.86599 12 12 8.86599 12 5C12 8.86599 15.134 12 19 12Z"
                                    stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"></path>
                                <path d="M8 16L5.5 18.5" stroke="currentColor" stroke-width="1.5"></path>
                                <path d="M8 8L5.5 5.5" stroke="currentColor" stroke-width="1.5"></path>
                                <path d="M16 16L18.5 18.5" stroke="currentColor" stroke-width="1.5"></path>
                                <path d="M16 8L18.5 5.5" stroke="currentColor" stroke-width="1.5"></path>
                            </svg></div>
                    </div>
                    <div className="h4-heading">What’s the baggage allowance?</div>
                    <p>Pack happy! Every ticket includes a carry-on and checked bag. Need more? Add extra bags anytime.
                    </p>
                </div>
                <div id="w-node-_29ade456-17d2-2150-82f2-4fe8f51b15b4-fd271ad5"
                    className="utility-text-align-center w-node-_95a058fb-fe1c-8906-8bdb-f25895fedca1-278782d9">
                    <div className="flex-horizontal x-center utility-margin-bottom-1rem">
                        <div className="icon icon-container"><svg xmlns="http://www.w3.org/2000/svg" width="100%"
                                height="100%" viewBox="0 0 24 24" fill="none">
                                <path d="M18.25 13.5L18.25 5.75002L10.5 5.75" stroke="currentColor" stroke-width="1.5"
                                    stroke-linejoin="round"></path>
                                <path d="M18.25 5.75L6.5 17.5" stroke="currentColor" stroke-width="1.5"></path>
                            </svg></div>
                    </div>
                    <div className="h4-heading">How do I contact customer support?</div>
                    <p>We’re here 24/7! Reach out via chat, email, or phone—our crew is always ready to help.</p>
                </div>
            </div>
        </div>
    </section>
    <section data-record-id="3254d935-37a2-0f9d-0420-a52ad1c2dfba" data-copilot="true"
        className="section linear-gradient-bg-client">
        <div className="container">
            <div className="w-layout-grid grid-layout tablet-1-column grid-gap-md">
                <div id="w-node-a6542d50-0a0c-aae3-187d-ec258ad74e44-8ad74e41"
                    className="w-node-_0848802c-2772-04ad-65db-a28774a808eb-74a808e8">
                    <h2>Prepare for an Unforgettable Journey</h2>
                    <p className="subheading utility-margin-bottom-0">Discover the skies with a fresh perspective.</p>
                </div><a id="w-node-a6542d50-0a0c-aae3-187d-ec258ad74e49-8ad74e41" href="/inflight-experience"
                    className="button w-node-_0848802c-2772-04ad-65db-a28774a808f0-74a808e8 w-button">Start Your
                    Adventure</a>
            </div>
        </div>
    </section>
			<Footer />
		</>
	);
}

export default Home;
