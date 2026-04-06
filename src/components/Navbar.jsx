"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/navbar.module.css";
import { Search, Bell, ChevronDown, LayoutDashboard, ShoppingBag, Box, CreditCard, BarChart3, Settings, Plus } from "lucide-react";
import { currentUser } from "../lib/user";
import Link from "next/link";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const searchRef = useRef(null);

  const searchableItems = [
    { label: "Dashboard Overview", icon: <LayoutDashboard size={14} />, href: "/Pages/Dashboard" },
    { label: "View All Orders", icon: <ShoppingBag size={14} />, href: "/Pages/Orders" },
    { label: "Product Management", icon: <Box size={14} />, href: "/Pages/Products" },
    { label: "Add New Product", icon: <Plus size={14} />, href: "/Pages/Products/Add" },
    { label: "Payment History", icon: <CreditCard size={14} />, href: "/Pages/Payments" },
    { label: "Sales Analytics", icon: <BarChart3 size={14} />, href: "/Pages/Analytics" },
    { label: "Account Settings", icon: <Settings size={14} />, href: "/Pages/Settings" },
  ];

  useEffect(() => {
    if (search.trim()) {
      const filtered = searchableItems.filter(item => 
        item.label.toLowerCase().includes(search.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [search]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    if (e.key !== "Enter") return;
    if (suggestions.length > 0) {
      router.push(suggestions[0].href);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (href) => {
    router.push(href);
    setSearch("");
    setShowSuggestions(false);
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.searchContainer} ref={searchRef}>
        <div className={styles.searchBar}>
          <Search size={18} color="#9ca3af" strokeWidth={2} />
          <input 
            type="text" 
            placeholder="Search products, orders, or SKU..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
            onFocus={() => search.trim() && setShowSuggestions(true)}
          />
        </div>

        {showSuggestions && suggestions.length > 0 && (
          <div className={styles.suggestionsDropdown}>
            {suggestions.map((item, index) => (
              <div 
                key={index} 
                className={styles.suggestionItem}
                onClick={() => handleSuggestionClick(item.href)}
              >
                <span className={styles.suggestionIcon}>{item.icon}</span>
                <span className={styles.suggestionLabel}>{item.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.navActions}>
        <div className={styles.navIconGroup}>
          <button 
            className={styles.iconBtn}
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={20} color="#6b7280" />
            <span className={styles.badge}></span>

            {showNotifications && (
              <div className={styles.dropdown}>
                <h4 style={{ marginBottom: '12px', fontSize: '14px' }}>Notifications</h4>
                <div className={styles.dropdownItem}>
                  <p style={{ fontSize: '13px' }}>New order #8902 received</p>
                </div>
                <div className={styles.dropdownItem}>
                  <p style={{ fontSize: '13px' }}>Restock alert for Watch...</p>
                </div>
              </div>
            )}
          </button>
        </div>
        
        <div className={styles.divider}></div>

        <div className={styles.profileSection} onClick={() => setShowProfileMenu(!showProfileMenu)}>
          <div className={styles.profileText}>
            <p className={styles.profileName}>{currentUser.name}</p>
            <p className={styles.profileRole}>{currentUser.shopName}</p>
          </div>
          <div className={styles.avatarWrapper}>
            <img src={currentUser.avatar} alt={currentUser.name} className={styles.adminAvatar} />
          </div>
          <ChevronDown size={14} color="#6b7280" />

          {showProfileMenu && (
            <div className={styles.dropdown}>
              <div className={styles.profileCard}>
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className={styles.profileAvatar}
                />
                <h4>{currentUser.name}</h4>
                <p>{currentUser.shopName}</p>
              </div>

              <button 
                className={styles.logoutButton}
                onClick={() => {
                  localStorage.removeItem("vendor-auth");
                  router.push("/Auth/Log");
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
