"use client";

import { useMemo, useState, useEffect } from "react";
import AppLayout from "../../../components/AppLayout";
import styles from "../../../styles/orders.module.css";
import { ordersData } from "../../../lib/ordersData";
import { 
  Filter, 
  FileDown, 
  ClipboardCheck, 
  Clock, 
  CheckCircle2, 
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function OrdersPage() {
  const [selectedRange, setSelectedRange] = useState("all");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset to first page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedRange]);

  const filterOptions = [
    { label: "All Orders", value: "all" },
    { label: "This Week", value: "week" },
    { label: "This Month", value: "month" },
    { label: "October 2023", value: "2023-10" },
    { label: "September 2023", value: "2023-09" },
  ];

  const filteredOrders = useMemo(() => {
    const now = new Date();

    return ordersData.filter((order) => {
      const orderDate = new Date(order.date);

      if (selectedRange === "all") return true;

      if (selectedRange === "week") {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(now.getDate() - 7);
        return orderDate >= oneWeekAgo;
      }

      if (selectedRange === "month") {
        return (
          orderDate.getMonth() === now.getMonth() &&
          orderDate.getFullYear() === now.getFullYear()
        );
      }

      return order.date.startsWith(selectedRange);
    });
  }, [selectedRange]);

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredOrders.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredOrders, currentPage]);

  const handleExport = () => {
    const rows = [
      ["Order ID", "Customer", "Date", "Amount", "Status", "Payment"],
      ...filteredOrders.map((order) => [
        order.id,
        order.customer,
        order.date,
        order.amount,
        order.status,
        order.payment,
      ]),
    ];

    const csvContent = rows
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;

    let fileName = "orders-all.csv";
    if (selectedRange === "week") fileName = "orders-weekly.csv";
    else if (selectedRange === "month") fileName = "orders-monthly.csv";
    else if (selectedRange === "2023-10") fileName = "orders-october-2023.csv";
    else if (selectedRange === "2023-09") fileName = "orders-september-2023.csv";

    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!mounted) return null;

  return (
    <AppLayout>
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <div className={styles.titleSection}>
            <h1> Orders</h1>
            <p>Manage and track your customer transactions.</p>
          </div>
          <div className={styles.actionsSection}>
            <div className={styles.filterWrapper}>
              <button className={styles.filterBtn} onClick={() => setShowFilterMenu(!showFilterMenu)}>
                <Filter size={18} />
                Filters
                {selectedRange !== "all" && <span className={styles.activeDot}></span>}
              </button>

              {showFilterMenu && (
                <div className={styles.filterDropdown}>
                  <div className={styles.dropdownHeader}>
                    <span>Filter Range</span>
                    <X size={14} style={{ cursor: 'pointer' }} onClick={() => setShowFilterMenu(false)} />
                  </div>
                  {filterOptions.map((option) => (
                    <button
                      key={option.value}
                      className={`${styles.filterOption} ${selectedRange === option.value ? styles.filterOptionActive : ""}`}
                      onClick={() => {
                        setSelectedRange(option.value);
                        setShowFilterMenu(false);
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button className={styles.exportBtn} onClick={handleExport}>
              <FileDown size={18} />
              Export CSV
            </button>
          </div>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statTop}>
              <div className={`${styles.iconBox} ${styles.iconTotal}`}>
                <ClipboardCheck size={24} />
              </div>
              <span className={`${styles.trend} ${styles.trendUp}`}>+12%</span>
            </div>
            <div className={styles.statLabel}>Confirm Orders</div>
            <div className={styles.statValue}>1,284</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statTop}>
              <div className={`${styles.iconBox} ${styles.iconPending}`}>
                <Clock size={24} />
              </div>
              <span className={`${styles.trend} ${styles.trendStable}`}>Stable</span>
            </div>
            <div className={styles.statLabel}>Pending Orders</div>
            <div className={styles.statValue}>42</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statTop}>
              <div className={`${styles.iconBox} ${styles.iconDelivered}`}>
                <CheckCircle2 size={24} />
              </div>
              <span className={`${styles.trend} ${styles.trendUp}`}>+5%</span>
            </div>
            <div className={styles.statLabel}>Shipping Orders</div>
            <div className={styles.statValue}>948</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statTop}>
              <div className={`${styles.iconBox} ${styles.iconPending}`}>
                <Clock size={24} />
              </div>
              <span className={`${styles.trend} ${styles.trendStable}`}>Stable</span>
            </div>
            <div className={styles.statLabel}>Cancel and Returns</div>
            <div className={styles.statValue}>$54,210</div>
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.ordersTable}>
            <thead>
              <tr>
                <th style={{ width: '130px' }}>Order ID</th>
                <th>Products</th>
                <th>Date</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Payment</th> 
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map((order, idx) => (
                <tr key={idx}>
                  <td className={styles.orderId}>{order.id}</td>
                  <td>
                    <div className={styles.customerCell}>
                      <img src={order.avatar} alt={order.customer} className={styles.avatar} />
                      <span className={styles.customerName}>{order.customer}</span>
                    </div>
                  </td>
                  <td>{new Date(order.date).toLocaleDateString()}</td>
                  <td>${order.amount.toLocaleString()}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles[`status-${order.status.toLowerCase()}`]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <span className={`${styles.paymentBadge} ${styles[`payment-${order.payment.toLowerCase()}`]}`}>
                      {order.payment}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                   <td colSpan="6" style={{ textAlign: 'center', padding: '48px', color: 'var(--text-muted)' }}>
                      No orders found for this range.
                   </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className={styles.pagination}>
            <div className={styles.paginationInfo}>
              Showing {Math.min(filteredOrders.length, (currentPage - 1) * ITEMS_PER_PAGE + 1)} to {Math.min(filteredOrders.length, currentPage * ITEMS_PER_PAGE)} of {filteredOrders.length} results
            </div>
            <div className={styles.paginationControls}>
              <button 
                className={styles.navArrow} 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className={styles.progressContainer}>
                <div 
                  className={styles.progressBar} 
                  style={{ width: `${(currentPage / totalPages) * 100}%` }}
                ></div>
              </div>

              <button 
                className={styles.navArrow} 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
