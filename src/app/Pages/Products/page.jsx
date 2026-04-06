"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import AppLayout from "../../../components/AppLayout";
import styles from "../../../styles/products.module.css";
import Link from "next/link";
import { 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  Package, 
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Monitor,
  Watch,
  Headphones,
  Briefcase
} from "lucide-react";

const initialProducts = [
  { 
    id: 1, 
    name: "Midnight Kinetic Sneakers", 
    sku: "KIN-8821", 
    category: "Footwear", 
    price: "$185.00", 
    stock: 421, 
    stockStatus: "good",
    status: "active",
    icon: <Monitor size={24} color="#10b981" /> 
  },
  { 
    id: 2, 
    name: "Arctic Minimalist Watch", 
    sku: "WAT-1102", 
    category: "Accessories", 
    price: "$299.00", 
    stock: 0, 
    stockStatus: "low",
    status: "active",
    icon: <Watch size={24} color="#ef4444" /> 
  },
  { 
    id: 3, 
    name: "Elite Series Headset", 
    sku: "AUD-9942", 
    category: "Electronics", 
    price: "$450.00", 
    stock: 128, 
    stockStatus: "good",
    status: "draft",
    icon: <Headphones size={24} color="#3b82f6" /> 
  },
  { 
    id: 4, 
    name: "Artisan Leather Briefcase", 
    sku: "LEA-4432", 
    category: "Bags", 
    price: "$210.00", 
    stock: 54, 
    stockStatus: "good",
    status: "active",
    icon: <Briefcase size={24} color="#f59e0b" /> 
  },
];

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState(initialProducts);
  const [activeTab, setActiveTab] = useState("All Items");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedProducts = JSON.parse(localStorage.getItem("all-products") || "[]");
    if (savedProducts.length > 0) {
      // Map local storage items to the UI format if needed
      const formattedSaved = savedProducts.map(p => ({
        ...p,
        id: p.id,
        price: `$${parseFloat(p.variants[0]?.price || 0).toLocaleString()}`,
        stock: p.variants.reduce((acc, v) => acc + parseInt(v.stock || 0), 0),
        stockStatus: p.variants.some(v => parseInt(v.stock || 0) < parseInt(v.lowStockAlert || 5)) ? "low" : "good",
        status: p.status || "active",
        icon: p.productType === 'digital' ? <Monitor size={24} color="#3b82f6" /> : <Package size={24} color="#10b981" />
      }));
      setProducts([...initialProducts, ...formattedSaved]);
    }
  }, []);

  const filteredProducts = useMemo(() => {
    switch (activeTab) {
      case "In Stock":
        return products.filter(p => p.stock > 0 && p.status === "active");
      case "Out of Stock":
        return products.filter(p => p.stock <= 0 && p.status === "active");
      case "Drafts":
        return products.filter(p => p.status === "draft");
      default:
        return products;
    }
  }, [products, activeTab]);

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      const updatedProducts = products.filter(p => p.id !== id);
      setProducts(updatedProducts);
      
      // Update localStorage for custom products
      const savedProducts = JSON.parse(localStorage.getItem("all-products") || "[]");
      const filteredSaved = savedProducts.filter(p => p.id !== id);
      localStorage.setItem("all-products", JSON.stringify(filteredSaved));
    }
  };

  const handleEdit = (product) => {
    // Only allow editing products from local storage (id is usually a UUID string)
    // The initialProducts use numeric IDs, but in a real app all would be editable.
    router.push(`/Pages/Products/Add?editId=${product.id}`);
  };

  if (!mounted) return null;

  return (
    <AppLayout>
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <div className={styles.titleSection}>
            <h1>Product Management</h1>
            <p>Manage your inventory, pricing, and stock levels.</p>
          </div>
          <Link href="/Pages/Products/Add" className={styles.addBtn}>
            <Plus size={20} />
            Add New Product
          </Link>
        </div>

        <div className={styles.statsRow}>
          <div className={styles.statCard}>
            <div className={styles.statTop}>
              <div className={`${styles.iconBox} ${styles.iconProducts}`}>
                <Package size={24} />
              </div>
              <span className={`${styles.trend} ${styles.trendUp}`}>+12%</span>
            </div>
            <div className={styles.statLabel}>Total Products</div>
            <div className={styles.statValue}>{products.length}</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statTop}>
              <div className={`${styles.iconBox} ${styles.iconLowStock}`}>
                <AlertTriangle size={24} />
              </div>
              <span className={`${styles.trend} ${styles.trendAlert}`}>High Alert</span>
            </div>
            <div className={styles.statLabel}>Low Stock Items</div>
            <div className={styles.statValue}>{products.filter(p => p.stockStatus === 'low').length}</div>
          </div>

          <div className={styles.performanceCard}>
            <div className={styles.performanceHeader}>
              <h4>Weekly Performance</h4>
              <h3>Top Performing Category: Leather Goods</h3>
            </div>
            <div className={styles.barChart}>
              <div className={styles.bar} style={{ height: '30%' }}></div>
              <div className={styles.bar} style={{ height: '50%' }}></div>
              <div className={styles.bar} style={{ height: '40%' }}></div>
              <div className={styles.barActive} style={{ height: '100%', width: '120px' }}></div>
              <div className={styles.bar} style={{ height: '60%' }}></div>
              <div className={styles.bar} style={{ height: '45%' }}></div>
              <div className={styles.bar} style={{ height: '70%' }}></div>
            </div>
          </div>
        </div>

        <div className={styles.mainBox}>
          <div className={styles.tabRow}>
            <div className={styles.tabs}>
              {["All Items", "In Stock", "Out of Stock", "Drafts"].map((tab) => (
                <div 
                  key={tab}
                  className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </div>
              ))}
            </div>
            <button className={styles.filterBtn}>
              <Filter size={16} />
              Filter
            </button>
          </div>

          <table className={styles.productsTable}>
            <thead>
              <tr>
                <th style={{ width: '80px' }}>Image</th>
                <th style={{ width: '300px' }}>Product Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock Level</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className={styles.productImg}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: '#f3f4f6' }}>
                        {item.icon}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={styles.productInfo}>
                      <h4>{item.name}</h4>
                      <p>SKU: {item.sku}</p>
                    </div>
                  </td>
                  <td>
                    <span className={styles.categoryBadge}>{item.category}</span>
                  </td>
                  <td className={styles.price}>{item.price}</td>
                  <td className={styles.stockCol}>
                    <div className={styles.stockLevel}>
                      <div className={styles.progressBar}>
                        <div 
                          className={`${styles.progress} ${item.stockStatus === 'low' ? styles.progressLow : styles.progressGood}`} 
                          style={{ width: item.stockStatus === 'low' || item.stock <= 0 ? '15%' : '60%' }}
                        ></div>
                      </div>
                      <div className={styles.stockText}>
                        {item.stock <= 0 ? (
                          <span className={styles.lowStockAlert}>Out of Stock</span>
                        ) : item.stockStatus === 'low' ? (
                          <span className={styles.lowStockAlert}>Low Stock ({item.stock})</span>
                        ) : (
                          <span>{item.stock} Units</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={styles.actions} style={{ justifyContent: 'flex-end' }}>
                      <Edit2 
                        size={18} 
                        className={`${styles.actionBtn} ${styles.editBtn}`} 
                        onClick={() => handleEdit(item)}
                      />
                      <Trash2 
                        size={18} 
                        className={`${styles.actionBtn} ${styles.deleteBtn}`} 
                        onClick={() => handleDelete(item.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '48px', color: 'var(--text-muted)' }}>
                    No products found in this category.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className={styles.pagination}>
            <div className={styles.showingText}>Showing {filteredProducts.length} products</div>
            <div className={styles.paginationButtons}>
              <button className={styles.navArrow}><ChevronLeft size={18} /></button>
              <button className={`${styles.pageBtn} ${styles.pageActive}`}>1</button>
              <button className={styles.pageBtn}>2</button>
              <button className={styles.pageBtn}>3</button>
              <div style={{ padding: '0 8px', color: '#9ca3af' }}>...</div>
              <button className={styles.pageBtn}>125</button>
              <button className={styles.navArrow}><ChevronRight size={18} /></button>
            </div>
          </div>
        </div>

        <footer className={styles.footer}>
          <div className={styles.copyright}>© 2024 Picky Vendor CRM. All rights reserved.</div>
          <div className={styles.footerLinks}>
            <a href="#" className={styles.footerLink}>Privacy Policy</a>
            <a href="#" className={styles.footerLink}>Terms of Service</a>
            <a href="#" className={styles.footerLink}>Help Center</a>
          </div>
        </footer>
      </div>
    </AppLayout>
  );
}
