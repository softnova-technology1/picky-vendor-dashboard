import styles from "../styles/navbar.module.css";

export default function Navbar() {
  return (
    <header className={styles.navbar}>
      <div className={styles.searchBar}>
        <span>🔍</span>
        <input type="text" placeholder="Search orders, products, or customers..." />
      </div>

      <div className={styles.navActions}>
        <button className={styles.iconBtn}>🔔</button>
        <button className={styles.iconBtn}>✉️</button>
        <button className={styles.iconBtn}>❓</button>
        
        <div className={styles.profileSection}>
          <div className={styles.profileInfo}>
            <p className={styles.profileName}>Alex Sterling</p>
          </div>
          <div className={styles.avatar}></div>
        </div>
      </div>
    </header>
  );
}
