"use client";
import { useState, useEffect } from "react";
import styles from "../styles/dashboard.module.css";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { DollarSign, ShoppingBag, Users, Package, User } from "lucide-react";

import Link from "next/link";

export default function DashboardContent() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("Weekly");
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    setMounted(true);
    const products = JSON.parse(localStorage.getItem("all-products") || "[]");
    setProductCount(products.length);
  }, []);

  const statCards = [
    { 
      label: "Total Orders", 
      value: "$42,560.00", 
      trend: "+12%", 
      trendType: "Up", 
      icon: <DollarSign size={22} />,
      color: "#1b85db",
      bgColor: "#eef8ff"
    },
    { 
      label: "Total Product", 
      value: String(productCount), 
      trend: "+8%", 
      trendType: "Up", 
      icon: <Package size={22} />,
      color: "var(--color-primary)",
      bgColor: "var(--color-primary-light)"
    },
    { 
      label: "Successfull Orders", 
      value: "856", 
      trend: "-2%", 
      trendType: "Down", 
      icon: <Users size={22} />,
      color: "#10b981",
      bgColor: "#ecfdf5"
    },
    { 
      label: "Pending Orders", 
      value: "4,892", 
      trend: "Static", 
      trendType: "Neutral", 
      icon: <Package size={22} />,
      color: "#ef4444",
      bgColor: "#fef2f2"
    },
  ];

  const weeklyData = [
    { name: "MON", sales: 4000 },
    { name: "TUE", sales: 3000 },
    { name: "WED", sales: 5000 },
    { name: "THU", sales: 2780 },
    { name: "FRI", sales: 1890 },
    { name: "SAT", sales: 2390 },
    { name: "SUN", sales: 3490 },
  ];

  const monthlyData = [
    { name: "JAN", sales: 24000 },
    { name: "FEB", sales: 18000 },
    { name: "MAR", sales: 35000 },
    { name: "APR", sales: 28000 },
    { name: "MAY", sales: 42000 },
    { name: "JUN", sales: 38000 },
  ];

  const chartData = activeTab === "Weekly" ? weeklyData : monthlyData;

  const chartOptions = {
    chart: {
      type: 'area',
      toolbar: { show: false },
      zoom: { enabled: false },
      fontFamily: 'inherit',
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 3, colors: ['#1b85db'] },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 90, 100]
      }
    },
    xaxis: {
      categories: chartData.map(d => d.name),
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: '#94a3b8', fontSize: '12px' } }
    },
    yaxis: {
      labels: { 
        style: { colors: '#94a3b8', fontSize: '12px' },
        formatter: (val) => `$${val >= 1000 ? (val/1000).toFixed(0) + 'k' : val}`
      }
    },
    grid: { borderColor: '#f1f5f9', strokeDashArray: 4, padding: { left: 10, right: 10 } },
    tooltip: { theme: 'light', y: { formatter: (val) => `$${val.toLocaleString()}` } },
    colors: ['#1b85db'],
    markers: { size: 5, colors: ['#fff'], strokeColors: '#1b85db', strokeWidth: 2, hover: { size: 7 } }
  };

  const activities = [
    { text: "New order #8902 received", time: "2 minutes ago", color: "var(--success)" },
    { text: "Payout of $1,240 processed", time: "45 minutes ago", color: "var(--warning)" },
    { text: "Updated 3 product descriptions", time: "3 hours ago", color: "var(--info)" },
  ];

  const tableData = [
    { id: "#ORD-9012", customer: "Helena Hills", product: "Organic Coffee Beans", amount: "$89.00", status: "Pending" },
    { id: "#ORD-9011", customer: "Markus Wright", product: "Artisan Ceramic Mug", amount: "$124.50", status: "Shipped" },
    { id: "#ORD-9010", customer: "Clara Oswald", product: "Handwoven Rug Large", amount: "$450.00", status: "Delivered" },
  ];

  if (!mounted) return null;

  return (
    <div className={styles.container}>
      <div className={styles.headerText}>
        <h1>Dashboard Overview</h1>
        <p>Welcome back, Alex. Here's what's happening with your store today.</p>
      </div>

      <div className={styles.statsGrid}>
        {statCards.map((card) => (
          <div key={card.label} className={styles.card}>
            <div className={styles.statHeader}>
              <div 
                className={styles.statIcon} 
                style={{ backgroundColor: card.bgColor, color: card.color }}
              >
                {card.icon}
              </div>
              <div className={`${styles.trendBadge} ${styles[`trend${card.trendType}`]}`}>
                {card.trendType === "Up" ? "↗" : card.trendType === "Down" ? "↘" : ""} {card.trend}
              </div>
            </div>
            <div className={styles.statInfo}>
              <p>{card.label}</p>
              <h2>{card.value}</h2>
            </div>
          </div>
        ))}
      </div>


      <div className={styles.performanceRow}>
        <section className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <div className={styles.chartTitle}>
              <h3>Sales Performance</h3>
              <p>{activeTab} revenue trends and sales volume</p>
            </div>
            <div className={styles.chartTabs}>
              <div 
                className={`${styles.tab} ${activeTab === "Weekly" ? styles.tabActive : ""}`} 
                onClick={() => setActiveTab("Weekly")}
              >
                Weekly
              </div>
              <div 
                className={`${styles.tab} ${activeTab === "Monthly" ? styles.tabActive : ""}`} 
                onClick={() => setActiveTab("Monthly")}
              >
                Monthly
              </div>
            </div>
          </div>

          <div className={styles.chartContainer}>
            <Chart 
              options={chartOptions} 
              series={[{ name: "Sales Volume", data: chartData.map(d => d.sales) }]} 
              type="area" 
              height={280} 
            />
          </div>
        </section>

        <div className={styles.alertsCol}>
          <div className={styles.alertCardGold}>
            <h4>Inventory Alert</h4>
            <p>4 products are running low on stock. Restock suggested.</p>
            <button className={styles.btnInventory}>Manage Inventory</button>
          </div>

          <div className={styles.activityCard}>
            <h4>Recent Activity</h4>
            <div className={styles.activityList}>
              {activities.map((act, i) => (
                <div key={i} className={styles.activityItem}>
                  <div 
                    className={styles.activityDot} 
                    style={{ backgroundColor: act.color }}
                  ></div>
                  <div className={styles.activityDetails}>
                    <p>{act.text}</p>
                    <span>{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className={styles.ordersSection}>
        <div className={styles.ordersHeader}>
          <h3>Recent Orders</h3>
          <Link href="/Pages/Orders" className={styles.viewAll}>View All Orders</Link>
        </div>
        
        <div className={styles.tableContainer}>
          <table className={styles.ordersTable}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item) => (
                <tr key={item.id}>
                  <td style={{ fontWeight: '600' }}>{item.id}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{item.product}</td>
                  <td style={{ fontWeight: '600' }}>{item.amount}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles[`status-${item.status.toLowerCase()}`]}`}>
                      {item.status}
                    </span>
                  </td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}


