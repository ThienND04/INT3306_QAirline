import React, { useEffect, useState } from 'react';
import {
    LineChart, Line, XAxis, YAxis, Tooltip, Legend,
    BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';
import './Statistic.css';
import bookingApiService from '../../../../services/BookingApiService';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

export default function Statistic() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const stats = await bookingApiService.getBookingStatistics();
                setData(stats);
            } catch (err) {
                console.error('Failed to fetch statistics:', err);
            }
        }
        fetchData();
    }, []);

    const latestMonth = data[data.length - 1];
    const classCountData = latestMonth ? Object.entries(latestMonth.classCount).map(([name, value]) => ({ name, value })) : [];

    return (
        <>
            <Header />
            <div className="statistic-container">
                <h2>📊 Thống kê đặt vé 6 tháng gần nhất</h2>

                <div className="summary">
                    <p>Tổng số đặt vé: {data.reduce((sum, d) => sum + d.totalBookings, 0)}</p>
                    <p>Người lớn: {data.reduce((sum, d) => sum + d.totalAdults, 0)}</p>
                    <p>Trẻ em: {data.reduce((sum, d) => sum + d.totalChildren, 0)}</p>
                    <p>Trẻ sơ sinh: {data.reduce((sum, d) => sum + d.totalInfants, 0)}</p>
                </div>

                <div className="chart-box">
                    <h3>Lượt đặt vé theo tháng</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={data}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="totalBookings" stroke="#8884d8" name="Số lượt đặt vé" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-box">
                    <h3>Hành khách theo độ tuổi</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="totalAdults" fill="#8884d8" name="Người lớn" />
                            <Bar dataKey="totalChildren" fill="#82ca9d" name="Trẻ em" />
                            <Bar dataKey="totalInfants" fill="#ffc658" name="Trẻ sơ sinh" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {classCountData.length > 0 && (
                    <div className="chart-box">
                        <h3>Hạng ghế trong tháng gần nhất ({latestMonth.month})</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={classCountData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    label
                                >
                                    {classCountData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
} 
