import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    Filler
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import { AlertCircle, Zap, Thermometer, Activity, Server, Brain } from 'lucide-react';
import './Dashboard.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    Filler
);

import LoadingSpinner from './LoadingSpinner';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [detections, setDetections] = useState([]);
    const [stats, setStats] = useState({
        total: 0,
        critical: 0,
        avgVoltage: 0,
        currentPrediction: 'Safe',
        confidence: 0
    });

    // Dummy Data Generator (24 Hours)
    const generateDummyData = () => {
        const data = [];
        const now = new Date();
        // Generate 48 points (every 30 mins for 24 hours)
        for (let i = 0; i < 48; i++) {
            const time = new Date(now.getTime() - i * 30 * 60 * 1000); // 30 min intervals
            const rand = Math.random();
            let status = 'Normal';
            let prediction = 'Safe';

            // Slightly chaotic data for realism
            if (rand > 0.75) { status = 'Warning'; prediction = 'Risk'; }
            if (rand > 0.95) { status = 'Critical'; prediction = 'Fail Imminent'; }

            data.push({
                _id: i,
                timestamp: time,
                lineId: `LINE-${Math.floor(Math.random() * 5) + 1}`,
                status: status,
                voltage: Math.floor(Math.random() * (245 - 215 + 1) + 215),
                temperature: Math.floor(Math.random() * (85 - 45 + 1) + 45),
                prediction: prediction,
                confidence: Math.floor(Math.random() * 15) + 85
            });
        }
        return data;
    };

    const processData = (data) => {
        setDetections(data);
        const total = data.length;
        const critical = data.filter(d => d.status === 'Critical').length;
        const avgVoltage = total > 0 ? (data.reduce((acc, curr) => acc + curr.voltage, 0) / total).toFixed(2) : 0;

        const latest = data[0] || {};
        const currentPrediction = latest.prediction || 'Safe';
        const confidence = latest.confidence || 0;

        setStats({ total, critical, avgVoltage, currentPrediction, confidence });
        setLoading(false);
    };

    useEffect(() => {
        // Force usage of dummy data if no backend or for demo purposes
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/detections');
                if (response.data && response.data.length > 0) {
                    processData(response.data);
                } else {
                    console.warn("API empty, using dummy data");
                    processData(generateDummyData());
                }
            } catch (error) {
                processData(generateDummyData());
            }
        };

        // Initial fetch
        fetchData();
        // Poll slower for history view, or separate live feed? 
        // For now, simple polling
        const interval = setInterval(fetchData, 10000);
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <div className="dashboard-container">
                <LoadingSpinner />
            </div>
        );
    }

    // --- Chart Configurations ---
    const lineChartData = {
        labels: detections.slice(0, 48).reverse().map(d => {
            const date = new Date(d.timestamp);
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }),
        datasets: [
            {
                label: 'Voltage (kV)',
                data: detections.slice(0, 48).reverse().map(d => d.voltage),
                borderColor: '#06b6d4',
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                    gradient.addColorStop(0, 'rgba(6, 182, 212, 0.5)');
                    gradient.addColorStop(1, 'rgba(6, 182, 212, 0)');
                    return gradient;
                },
                tension: 0.4,
                fill: true,
                pointRadius: 2,
            },
        ],
    };

    const statusCounts = {
        Normal: detections.filter(d => d.status === 'Normal').length,
        Warning: detections.filter(d => d.status === 'Warning').length,
        Critical: detections.filter(d => d.status === 'Critical').length,
    };

    const doughnutData = {
        labels: ['Normal', 'Warning', 'Critical'],
        datasets: [
            {
                data: [statusCounts.Normal, statusCounts.Warning, statusCounts.Critical],
                backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
                borderColor: '#1e293b',
                borderWidth: 2,
                hoverOffset: 10,
            },
        ],
    };

    const lineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#1e293b',
                titleColor: '#e2e8f0',
                bodyColor: '#e2e8f0',
                borderColor: '#334155',
                borderWidth: 1,
            }
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { color: '#64748b' }
            },
            y: {
                grid: { color: '#334155' },
                ticks: { color: '#64748b' }
            },
        }
    };

    const getPredictionColor = (pred) => {
        if (pred === 'Safe') return 'var(--success)';
        if (pred === 'Risk') return 'var(--warning)';
        return 'var(--danger)';
    };

    return (
        <div className="dashboard-container">
            {/* Header */}
            <div className="dashboard-header">
                <div>
                    <h1 className="dashboard-title">
                        Analytics Dashboard
                    </h1>
                    <p className="dashboard-subtitle">Real-time Transformer Monitoring Grid</p>
                </div>
                <div className="server-status">
                    <Server size={18} style={{ color: 'var(--primary)' }} />
                    <div className="flex flex-col">
                        <span className="status-label">Server Status</span>
                        <span className="status-value">
                            <span className="status-dot"></span> Online
                        </span>
                    </div>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="kpi-grid">
                <KpiCard
                    title="Total Detections"
                    value={stats.total}
                    icon={<Activity size={24} style={{ color: 'var(--primary)' }} />}
                />
                <KpiCard
                    title="Critical Alerts"
                    value={stats.critical}
                    icon={<AlertCircle size={24} style={{ color: 'var(--danger)' }} />}
                    isCritical={stats.critical > 0}
                />

                {/* New AI Prediction Card */}
                <div className="kpi-card" style={{ borderColor: getPredictionColor(stats.currentPrediction) }}>
                    <div className="kpi-header">
                        <div className="kpi-icon" style={{ color: getPredictionColor(stats.currentPrediction) }}>
                            <Brain size={24} />
                        </div>
                    </div>
                    <div className="kpi-value" style={{ color: getPredictionColor(stats.currentPrediction) }}>
                        {stats.currentPrediction}
                    </div>
                    <div className="kpi-label">AI Forecast ({stats.confidence}% Conf.)</div>
                </div>

                <KpiCard
                    title="Avg Voltage"
                    value={`${stats.avgVoltage} kV`}
                    icon={<Zap size={24} style={{ color: 'var(--warning)' }} />}
                />
            </div>

            {/* Main Charts Area */}
            <div className="charts-grid">
                {/* Voltage Chart */}
                <div className="chart-card voltage-chart">
                    <div className="chart-header">
                        <h3 className="chart-title">
                            <Zap size={18} style={{ color: 'var(--primary)' }} /> Live Voltage Feed
                        </h3>
                        <span className="live-badge">Live</span>
                    </div>
                    <div className="chart-container">
                        <Line options={lineOptions} data={lineChartData} />
                    </div>
                </div>

                {/* Status Distribution */}
                <div className="chart-card status-chart">
                    <h3 className="chart-title" style={{ width: '100%', marginBottom: '1.5rem' }}>
                        <Activity size={18} style={{ color: '#c084fc' }} /> Status Ratio
                    </h3>
                    <div className="doughnut-container">
                        <Doughnut data={doughnutData} options={{ cutout: '75%', plugins: { legend: { display: false } } }} />
                        <div className="doughnut-center-text">
                            <span>{stats.total}</span>
                        </div>
                    </div>
                    <div className="doughnut-legend">
                        <div className="legend-item">
                            <div className="legend-value" style={{ color: 'var(--success)' }}>{statusCounts.Normal}</div>
                            <div className="legend-label">Normal</div>
                        </div>
                        <div className="legend-item">
                            <div className="legend-value" style={{ color: 'var(--warning)' }}>{statusCounts.Warning}</div>
                            <div className="legend-label">Warn</div>
                        </div>
                        <div className="legend-item">
                            <div className="legend-value" style={{ color: 'var(--danger)' }}>{statusCounts.Critical}</div>
                            <div className="legend-label">Crit</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Alerts Table */}
            <div className="table-card">
                <div className="table-header">
                    <h3 className="table-title">Recent System Events</h3>
                    <button className="view-all-btn">View All History</button>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Timestamp</th>
                                <th>Device ID</th>
                                <th>Voltage</th>
                                <th>AI Pred.</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {detections.slice(0, 5).map((d) => (
                                <tr key={d._id}>
                                    <td className="font-mono">{new Date(d.timestamp).toLocaleTimeString()}</td>
                                    <td>{d.lineId}</td>
                                    <td style={{ fontWeight: 500 }}>{d.voltage} kV</td>
                                    <td>
                                        <span style={{
                                            color: getPredictionColor(d.prediction),
                                            fontWeight: 'bold',
                                            fontSize: '0.75rem'
                                        }}>
                                            {d.prediction}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`status-badge ${d.status.toLowerCase()}`}>
                                            {d.status === 'Critical' && <AlertCircle size={12} style={{ marginRight: '4px' }} />}
                                            {d.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// Sub-components
const KpiCard = ({ title, value, icon, isCritical }) => (
    <div className={`kpi-card ${isCritical ? 'critical' : ''}`}>
        <div className="kpi-header">
            <div className={`kpi-icon ${isCritical ? 'critical' : ''}`}>{icon}</div>
        </div>
        <div className="kpi-value">{value}</div>
        <div className="kpi-label">{title}</div>
    </div>
);

export default Dashboard;
