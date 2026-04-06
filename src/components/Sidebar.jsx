"use client";

import styles from "../styles/sidebar.module.css";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Box, 
  CreditCard, 
  BarChart3, 
  Settings,
  HardDrive,
  LogOut
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo.png"
import { currentUser } from "../lib/user";


export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();


  const handleLogout = () => {
    localStorage.removeItem("vendor-auth");
    router.push("/Auth/Log");
  };

  const menuItems = [
    { label: "Dashboard", href: "/Pages/Dashboard", icon: <LayoutDashboard size={20} /> },
    { label: "Orders", href: "/Pages/Orders", icon: <ShoppingBag size={20} /> },
    { label: "Products", href: "/Pages/Products", icon: <Box size={20} /> },
    { label: "Payments", href: "/Pages/Payments", icon: <CreditCard size={20} /> },
    { label: "Analytics", href: "/Pages/Analytics", icon: <BarChart3 size={20} /> },
    { label: "Settings", href: "/Pages/Settings", icon: <Settings size={20} /> },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        <div className={styles.brand}>
          <div className={styles.logoBox}>
            <Image 
              src={logo} 
              alt="Picky Logo" 
              width={48} 
              height={48} 
              className={styles.logoImg}
            />
          </div>
          <div className={styles.brandInfo}>
            <h3>Picky Vendor</h3>
            <p className={styles.slogan}>CHOOSE PICKY NOT CHOICE</p>
          </div>
        </div>


        <nav className={styles.navMenu}>
          {menuItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/Pages/Dashboard" && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`${styles.navItem} ${isActive ? styles.navActive : ""}`}
              >
                <span className={styles.navIcon}>{item.icon}</span>
                <span className={styles.navLabel}>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className={styles.bottomSection}>
        <div className={styles.logoutWrapper}>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>

       
      </div>
    </aside>
  );
}
