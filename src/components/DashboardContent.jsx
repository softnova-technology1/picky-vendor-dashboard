import styles from "../styles/dashboard.module.css";

export default function DashboardContent() {
  const statCards = [
    { label: "Total Revenue", value: "$42,560.00", trend: "+12%", trendType: "Up", icon: "📻" },
    { label: "Total Orders", value: "1,240", trend: "+8%", trendType: "Up", icon: "🛒" },
    { label: "Active Customers", value: "856", trend: "-2%", trendType: "Down", icon: "👤" },
    { label: "Stock Units", value: "4,892", trend: "Static", trendType: "Neutral", icon: "📋" },
  ];

  const chartData = [
    { day: "MON", height: "40%" },
    { day: "TUE", height: "65%" },
    { day: "WED", height: "85%", active: true, tooltip: "Peak: $8.4k" },
    { day: "THU", height: "55%" },
    { day: "FRI", height: "75%" },
    { day: "SAT", height: "45%" },
    { day: "SUN", height: "60%" },
  ];

  const activities = [
    { text: "New order #8902 received", time: "2 minutes ago", color: "var(--success)" },
    { text: "Payout of $1,240 processed", time: "45 minutes ago", color: "var(--warning)" },
    { text: "Updated 3 product descriptions", time: "3 hours ago", color: "var(--info)" },
  ];

  const tableData = [
    { id: "#ORD-9012", customer: "Helena Hills", product: "Organic Coffee Beans", amount: "$89.00", status: "Pending", avatar: "👩" },
    { id: "#ORD-9011", customer: "Markus Wright", product: "Artisan Ceramic Mug", amount: "$124.50", status: "Shipped", avatar: "👨" },
    { id: "#ORD-9010", customer: "Clara Oswald", product: "Handwoven Rug Large", amount: "$450.00", status: "Delivered", avatar: "👩" },
  ];

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
              <div className={styles.statIcon}>{card.icon}</div>
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
              <p>Weekly revenue trends and sales volume</p>
            </div>
            <div className={styles.chartTabs}>
              <div className={`${styles.tab} ${styles.tabActive}`}>Weekly</div>
              <div className={styles.tab}>Monthly</div>
            </div>
          </div>

          <div className={styles.chartBarsContainer}>
            {chartData.map((d) => (
              <div key={d.day} className={styles.barGroup}>
                <div 
                  className={`${styles.bar} ${d.active ? styles.barActive : ""}`} 
                  style={{ height: d.height }}
                >
                  {d.tooltip && (
                    <div className={styles.barTooltip}>{d.tooltip}</div>
                  )}
                </div>
                <span className={styles.barLabel}>{d.day}</span>
              </div>
            ))}
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
          <a href="#" className={styles.viewAll}>View All Orders</a>
        </div>
        
        <div className={styles.tableContainer}>
          <table className={styles.ordersTable}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Amount</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item) => (
                <tr key={item.id}>
                  <td style={{ fontWeight: '600' }}>{item.id}</td>
                  <td>
                    <div className={styles.customerCell}>
                      <div className={styles.customerAvatar} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9f9' }}>{item.avatar}</div>
                      {item.customer}
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>{item.product}</td>
                  <td style={{ fontWeight: '600' }}>{item.amount}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles[`status-${item.status.toLowerCase()}`]}`}>
                      {item.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <span className={styles.actionDots}>•••</span>
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
