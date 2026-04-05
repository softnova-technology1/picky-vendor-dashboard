import styles from "../styles/sidebar.module.css";

export default function Sidebar() {
  const menuItems = [
    { label: "Dashboard", href: "/Pages/Dashboard", icon: "📊", active: true },
    { label: "Orders", href: "/Pages/Orders", icon: "🛍️" },
    { label: "Products", href: "/Pages/Products", icon: "📦" },
    { label: "Payments", href: "/Pages/Payments", icon: "💳" },
    { label: "Analytics", href: "/Pages/Analytics", icon: "📈" },
    { label: "Settings", href: "/Pages/Settings", icon: "⚙️" },
  ];

  return (
    <aside className={styles.sidebar}>
      <div>
        <div className={styles.brand}>
          <div className={styles.logoBox}>EM</div>
          <div className={styles.brandInfo}>
            <h3>Elite Merchant</h3>
            <p>Gold Tier Vendor</p>
          </div>
        </div>

        <nav className={styles.navMenu}>
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`${styles.navItem} ${item.active ? styles.navActive : ""}`}
            >
              <span>{item.icon}</span>
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <div className={styles.upgradeCard}>
        <h4>Upgrade Plan</h4>
        <p>Unlock Pro Insights</p>
        <button className={styles.btnUpgrade}>Upgrade Now</button>
      </div>
    </aside>
  );
}
