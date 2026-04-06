'use client';

import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  ShoppingBag, 
  Percent, 
  Download, 
  ArrowUpRight, 
  ArrowDownRight,
  ChevronRight,
  Monitor,
  Smartphone,
  Tablet,
  LayoutGrid,
  ExternalLink,
  Info,
  CheckCircle2,
  AlertCircle,
  X
} from 'lucide-react';
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import AppLayout from '../../../components/AppLayout';
import styles from '../../../styles/Analytics.module.css';

// Dummy Data
const SUMMARY_STATS = [
  { id: 1, label: 'TOTAL REVENUE', value: '$482,900.00', trend: '+12.4%', up: true, icon: <ShoppingBag size={20} /> },
  { id: 2, label: 'Total Order', value: '1,284', trend: '+8.1%', up: true, icon: <Users size={20} /> },
  { id: 3, label: 'Total Product', value: '$156.40', trend: '-2.3%', up: false, icon: <ShoppingBag size={20} /> },
  { id: 4, label: 'Lose Rate', value: '4.2%', trend: '+18.5%', up: true, icon: <Percent size={20} /> },
];

const SALES_DATA = [
  { name: 'MAY', sales: 45, projection: 110 },
  { name: 'JUN', sales: 52, projection: 120 },
  { name: 'JUL', sales: 38, projection: 80 },
  { name: 'AUG', sales: 65, projection: 115 },
  { name: 'SEP', sales: 48, projection: 125 },
  { name: 'OCT', sales: 70, projection: 130 },
  { name: 'NOV', sales: 55, projection: 120 },
];

const WEEKLY_SALES_DATA = [
  { name: 'MON', sales: 12, projection: 15 },
  { name: 'TUE', sales: 18, projection: 20 },
  { name: 'WED', sales: 15, projection: 18 },
  { name: 'THU', sales: 25, projection: 22 },
  { name: 'FRI', sales: 20, projection: 25 },
  { name: 'SAT', sales: 30, projection: 28 },
  { name: 'SUN', sales: 28, projection: 30 },
];

const CATEGORY_SPLIT = [
  { name: 'High-End Furniture', percentage: 42, color: '#b45309' },
  { name: 'Art & Collectibles', percentage: 28, color: '#1e293b' },
  { name: 'Vintage Textiles', percentage: 18, color: '#64748b' },
  { name: 'Lighting Fixtures', percentage: 12, color: '#cbd5e1' },
];

const TOP_PERFORMERS = [
  { id: 1, name: 'Bauhaus Lounge Chair', category: 'Furniture / Living', revenue: '$84,200', sales: '183 Sales', img: '1' },
  { id: 2, name: 'Eclipse Brass Floor Lamp', category: 'Lighting / Studio', revenue: '$32,150', sales: '94 Sales', img: '2' },
  { id: 3, name: 'Kurdish Geometric Rug', category: 'Textiles / Decor', revenue: '$28,400', sales: '72 Sales', img: '3' },
  { id: 4, name: 'Vintage Marble Vase', category: 'Ceramics / Deco', revenue: '$18,400', sales: '45 Sales', img: '4' },
  { id: 5, name: 'Oak Sideboard', category: 'Storage / Living', revenue: '$12,400', sales: '32 Sales', img: '5' },
];

export default function AnalyticsPage() {
  React.useEffect(() => {
    document.title = "Analytics | Intelligence Hub";
  }, []);
  const [activeToggle, setActiveToggle] = useState('Monthly');
  const [alerts, setAlerts] = useState([]);
  const [showPerformersModal, setShowPerformersModal] = useState(false);

  const currentData = activeToggle === 'Weekly' ? WEEKLY_SALES_DATA : SALES_DATA;

  // Add Alert Logic
  const addAlert = (message, type = 'success') => {
    const id = Date.now();
    setAlerts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setAlerts(prev => prev.filter(alert => alert.id !== id));
    }, 4000);
  };

  const handleExportReport = () => {
    addAlert("Preparing Intelligence Report for export...", "success");
    
    // Simulate data gathering and real file download
    setTimeout(() => {
      const reportContent = "Category,Sales,Projection\nMAY,45,110\nJUN,52,120\nJUL,38,80\nAUG,65,115\nSEP,48,125\nOCT,70,130\nNOV,55,120";
      const blob = new Blob([reportContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('hidden', '');
      a.setAttribute('href', url);
      a.setAttribute('download', 'Intelligence_Report_2024.csv');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      addAlert("Report (CSV) downloaded successfully!", "success");
    }, 2000);
  };

  const chartOptions = {
    chart: {
      type: 'bar',
      toolbar: { show: false },
      zoom: { enabled: false },
      fontFamily: 'inherit',
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 4,
        dataLabels: { position: 'top' }
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ['transparent'] },
    xaxis: {
      categories: currentData.map(d => d.name),
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: '#94a3b8', fontSize: '12px' } }
    },
    yaxis: {
      labels: { 
        style: { colors: '#94a3b8', fontSize: '12px' },
        formatter: (val) => `${val}k`
      }
    },
    fill: { opacity: 1 },
    tooltip: { theme: 'light', y: { formatter: (val) => `${val}k` } },
    colors: ['#b45309', '#fed7aa'],
    legend: { show: false },
    grid: { borderColor: '#f1f5f9', strokeDashArray: 4 }
  };

  const chartSeries = [
    { name: 'Actual Revenue', data: currentData.map(d => d.sales) },
    { name: 'Revenue Projections', data: currentData.map(d => d.projection) }
  ];

  return (
    <AppLayout>
      <div className={styles.container}>
        {/* Header Section */}
        <header className={styles.header}>
          <div className={styles.headerTitle}>
            <h1>Intelligence Hub</h1>
            <p>Measuring the pulse of your curated marketplace.</p>
          </div>
          <button className={styles.exportBtn} onClick={handleExportReport}>
            <Download size={18} />
            Export Report
          </button>
        </header>

        {/* Global Alerts Container */}
        <div className={styles.alertsContainer}>
          {alerts.map(alert => (
            <div key={alert.id} className={styles.alert} style={{ borderLeftColor: alert.type === 'error' ? '#ef4444' : '#b45309' }}>
              {alert.type === 'success' ? <CheckCircle2 size={18} color="#b45309" /> : <AlertCircle size={18} color="#ef4444" />}
              <span style={{ fontWeight: 600, fontSize: '13px' }}>{alert.message}</span>
            </div>
          ))}
        </div>

        {/* 4 Stats Summary Cards */}
        <section className={styles.statsGrid}>
          {SUMMARY_STATS.map((stat) => (
            <div key={stat.id} className={styles.statCard}>
              <div className={styles.statHeader}>
                <div className={styles.statIcon}>{stat.icon}</div>
                <div className={`${styles.trendBadge} ${stat.up ? styles.trendUp : styles.trendDown}`}>
                  {stat.trend}
                </div>
              </div>
              <div className={styles.statLabel}>{stat.label}</div>
              <div className={styles.statValue}>{stat.value}</div>
            </div>
          ))}
        </section>

        {/* Main Sections: Chart + Category Progress Bars */}
        <div className={styles.mainLayout}>
          <div className={styles.leftColumn}>
            <section className={styles.sectionCard}>
              <div className={styles.sectionTitle}>
                <div>
                  <h2>Sales Performance</h2>
                  <p>Revenue vs. Projections for the current month</p>
                </div>
                <div className={styles.toggle}>
                  <button 
                    className={`${styles.toggleBtn} ${activeToggle === 'Monthly' ? styles.toggleBtnActive : ''}`}
                    onClick={() => setActiveToggle('Monthly')}
                  >
                    Monthly
                  </button>
                  <button 
                    className={`${styles.toggleBtn} ${activeToggle === 'Weekly' ? styles.toggleBtnActive : ''}`}
                    onClick={() => setActiveToggle('Weekly')}
                  >
                    Weekly
                  </button>
                </div>
              </div>
              
              <div style={{ height: '320px', width: '100%', marginTop: '20px' }}>
                <Chart 
                  options={chartOptions} 
                  series={chartSeries} 
                  type="bar" 
                  height={320} 
                />
              </div>
              <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginTop: '24px', fontSize: '11px', color: '#64748b', fontWeight: '600' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: '#b45309' }}></div>
                  Actual Revenue
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: '#fed7aa' }}></div>
                  Revenue Projections
                </div>
              </div>
            </section>

            {/* Top Performers */}
            <section className={styles.sectionCard} style={{ maxWidth: '600px' }}>
              <div className={styles.sectionTitle}>
                <h2>Top Performers</h2>
                <div className={styles.viewAll} onClick={() => setShowPerformersModal(true)}>View All</div>
              </div>
              <div className={styles.performerList}>
                {TOP_PERFORMERS.map((item) => (
                  <div key={item.id} className={styles.performerItem}>
                    <div className={styles.performerInfo}>
                      <div className={styles.performerImg}>
                        <div style={{ border: '1px solid #1e293b', width: '32px', textAlign: 'center', fontWeight: '700', fontSize: '12px' }}>{item.img}</div>
                      </div>
                      <div className={styles.performerDesc}>
                        <h4>{item.name}</h4>
                        <p>{item.category}</p>
                      </div>
                    </div>
                    <div className={styles.performerStats}>
                      <div className={styles.performerRevenue}>{item.revenue}</div>
                      <div className={styles.performerSales}>{item.sales}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className={styles.rightColumn}>
            <section className={styles.sectionCard}>
              <div className={styles.sectionTitle}>
                <div>
                  <h2>Category Split</h2>
                  <p>Sales volume by vertical</p>
                </div>
              </div>
              
              <div className={styles.categoryList}>
                {CATEGORY_SPLIT.map((cat, idx) => (
                  <div key={idx} className={styles.categoryItem}>
                    <div className={styles.categoryLabel}>
                      <span>{cat.name}</span>
                      <span>{cat.percentage}%</span>
                    </div>
                    <div className={styles.progressContainer}>
                      <div 
                        className={styles.progressBar} 
                        style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.insightBox}>
                <TrendingUp size={20} style={{ flexShrink: 0 }} />
                <p>Furniture demand is up 14% this quarter. Consider restocking premium oaks.</p>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Top Performers Modal */}
      {showPerformersModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.performerModal}>
            <div className={styles.modalHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <TrendingUp size={24} color="#b45309" />
                <h2 style={{ fontSize: '20px', fontWeight: 800 }}>Full Leaderboard</h2>
              </div>
              <div className={styles.closeBtn} onClick={() => setShowPerformersModal(false)}>
                <X size={24} />
              </div>
            </div>
            
            <div className={styles.modalBody}>
              {TOP_PERFORMERS.map((item) => (
                <div key={item.id} className={styles.performerItem}>
                  <div className={styles.performerInfo}>
                    <div className={styles.performerImg}>
                      <div style={{ border: '1px solid #1e293b', width: '32px', textAlign: 'center', fontWeight: '700', fontSize: '12px' }}>{item.img}</div>
                    </div>
                    <div className={styles.performerDesc}>
                      <h4>{item.name}</h4>
                      <p>{item.category}</p>
                    </div>
                  </div>
                  <div className={styles.performerStats}>
                    <div className={styles.performerRevenue}>{item.revenue}</div>
                    <div className={styles.performerSales}>{item.sales}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ padding: '20px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                style={{ padding: '10px 24px', backgroundColor: '#b45309', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}
                onClick={() => setShowPerformersModal(false)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
