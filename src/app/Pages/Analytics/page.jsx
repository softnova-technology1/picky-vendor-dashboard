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
  BarChart3,
  ExternalLink,
  Info
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  Cell
} from 'recharts';
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
];

export default function AnalyticsPage() {
  const [activeToggle, setActiveToggle] = useState('Monthly');

  return (
    <AppLayout>
      <div className={styles.container}>
        {/* Header Section */}
        <header className={styles.header}>
          <div className={styles.headerTitle}>
            <h1>Intelligence Hub</h1>
            <p>Measuring the pulse of your curated marketplace.</p>
          </div>
          <button className={styles.exportBtn}>
            <Download size={18} />
            Export Report
          </button>
        </header>

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
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={SALES_DATA} barGap={12}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                    <XAxis 
                      dataKey="name" 
                      stroke="#94a3b8" 
                      fontSize={11} 
                      tickLine={false} 
                      axisLine={false} 
                      dy={10}
                    />
                    <YAxis 
                      stroke="#94a3b8" 
                      fontSize={11} 
                      tickLine={false} 
                      axisLine={false} 
                      tickFormatter={(val) => `${val}k`}
                    />
                    <Tooltip 
                      cursor={{ fill: 'transparent' }}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-hub)' }}
                    />
                    <Bar dataKey="sales" fill="#b45309" radius={[4, 4, 0, 0]} barSize={40} />
                    <Bar dataKey="projection" fill="#fed7aa" radius={[4, 4, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
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
                <div className={styles.viewAll}>View All</div>
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
    </AppLayout>
  );
}
