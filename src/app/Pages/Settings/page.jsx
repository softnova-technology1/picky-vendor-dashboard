"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  User, 
  Bell, 
  Shield, 
  Wallet, 
  ShoppingCart, 
  Package, 
  Smartphone, 
  Globe, 
  MessageCircle, 
  CheckCircle2, 
  XCircle,
  MoreVertical,
  Camera,
  MapPin,
  Save,
  Trash2,
  ChevronRight,
  Clock,
  ExternalLink,
  Check,
  X,
  History,
  Activity
} from "lucide-react";
import AppLayout from "../../../components/AppLayout";
import styles from "../../../styles/Settings.module.css";

// Extended Notifications Data for "All Activity"
const NOTIFICATIONS = [
  {
    id: 1,
    type: 'order',
    title: 'New Order Received!',
    desc: 'Order #ORD-928 from Alex Sterling for $420.00',
    time: '2 mins ago',
    icon: <ShoppingCart size={18} />,
    color: '#eff6ff',
    iconColor: '#3b82f6'
  },
  {
    id: 2,
    type: 'payment',
    title: 'Payout Successful',
    desc: 'Bank transfer of $1,280.00 processed to your bank.',
    time: '45 mins ago',
    icon: <Wallet size={18} />,
    color: '#f0fdf4',
    iconColor: '#22c55e'
  },
  {
    id: 3,
    type: 'stock',
    title: 'Low Stock Alert',
    desc: 'Bauhaus Lounge Chair is below its threshold (2 left).',
    time: '2 hours ago',
    icon: <Package size={18} />,
    color: '#fffbeb',
    iconColor: '#d97706'
  },
  {
    id: 4,
    type: 'security',
    title: 'Store Logo Updated',
    desc: 'Your store visual identity has been successfully updated.',
    time: '5 hours ago',
    icon: <CheckCircle2 size={18} />,
    color: '#fef2f2',
    iconColor: '#ef4444'
  },
  {
    id: 5,
    type: 'order',
    title: 'New Order from Sam',
    desc: 'Order #ORD-927: Art Deco Lamp ($150.00)',
    time: 'Yesterday',
    icon: <ShoppingCart size={18} />,
    color: '#eff6ff',
    iconColor: '#3b82f6'
  },
  {
    id: 6,
    type: 'system',
    title: 'Monthly Summary Ready',
    desc: 'Your performance report for March is now available.',
    time: '2 days ago',
    icon: <Activity size={18} />,
    color: '#f5f3ff',
    iconColor: '#8b5cf6'
  },
  {
    id: 7,
    type: 'order',
    title: 'Bulk Order Placed',
    desc: 'Order #ORD-920 for 10x Office Chairs ($2,400.00)',
    time: '3 days ago',
    icon: <ShoppingCart size={18} />,
    color: '#eff6ff',
    iconColor: '#3b82f6'
  }
];

export default function SettingsPage() {
  const [isWhatsAppConnected, setIsWhatsAppConnected] = useState(false);
  const [whatsAppNumber, setWhatsAppNumber] = useState("+91 9876543210");
  const [isEditingWhatsApp, setIsEditingWhatsApp] = useState(false);
  const [tempNumber, setTempNumber] = useState(whatsAppNumber);
  
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showAllActivityModal, setShowAllActivityModal] = useState(false);
  const [alerts, setAlerts] = useState([]);

  // Add Alert Logic
  const addAlert = (message, type = 'success') => {
    const id = Date.now();
    setAlerts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setAlerts(prev => prev.filter(alert => alert.id !== id));
    }, 4000);
  };
  
  const dropdownRef = useRef(null);
  const fileInputRef = useRef(null);
  
  // Profile Image State
  const [profileImg, setProfileImg] = useState("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80");

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle Photo Change
  const handlePhotoClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImg(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveWhatsAppNumber = () => {
    setWhatsAppNumber(tempNumber);
    setIsEditingWhatsApp(false);
  };

  const handleDisconnect = () => {
    if (confirm("Are you sure you want to disconnect WhatsApp integration? You will stop receiving alerts.")) {
      setIsWhatsAppConnected(false);
      setIsEditingWhatsApp(false);
      setNotifState(prev => ({
        ...prev,
        orderWhatsApp: false,
        paymentWhatsApp: false,
        stockWhatsApp: false
      }));
    }
  };

  // Profile State
  const [profile, setProfile] = useState({
    fullName: "Julian Thorne",
    storeName: "Thorne & Co. Curations"
  });

  // Notification States
  const [notifState, setNotifState] = useState({
    orderApp: true,
    orderBrowser: false,
    orderWhatsApp: false,
    paymentApp: true,
    paymentWhatsApp: true,
    stockApp: true,
    stockWhatsApp: false
  });

  const toggleNotif = (key) => {
    setNotifState(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    addAlert("Syncing preferences to cloud...", "success");
    setTimeout(() => {
      addAlert("Settings successfully saved!", "success");
    }, 1500);
  };

  const handleDiscard = () => {
    if (confirm("Reset all changes to original settings?")) {
      setProfile({
        fullName: "Julian Thorne",
        storeName: "Thorne & Co. Curations"
      });
      setNotifState({
        orderApp: true,
        orderBrowser: false,
        orderWhatsApp: false,
        paymentApp: true,
        paymentWhatsApp: true,
        stockApp: true,
        stockWhatsApp: false
      });
      setProfileImg("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80");
      setIsWhatsAppConnected(false);
      addAlert("Changes discarded. Restored defaults.", "success");
    }
  };

  const NotificationToggle = ({ id, checked, color = 'orange', onChange }) => (
    <label className={styles.switch}>
      <input 
        type="checkbox" 
        checked={checked} 
        onChange={onChange} 
      />
      <span className={`${styles.slider} ${color === 'green' ? styles.sliderGreen : ''}`}></span>
    </label>
  );

  return (
    <AppLayout>
      <div className={styles.settingsContainer}>
        {/* Hidden File Input */}
        <input 
          type="file" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          accept="image/*" 
          onChange={handleFileChange}
        />

        {/* All Activity Modal */}
        {showAllActivityModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.activityModal}>
              <div className={styles.modalHeader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <History size={24} color="#a65e31" />
                  <h2>All Store Activity</h2>
                </div>
                <div className={styles.closeIcon} onClick={() => setShowAllActivityModal(false)}>
                  <X size={24} />
                </div>
              </div>
              
              <div className={styles.activityScrollArea}>
                {NOTIFICATIONS.map((notif) => (
                  <div key={notif.id} className={styles.notifItem} style={{ borderBottom: '1px solid #f8f9fb' }}>
                    <div className={styles.notifItemIcon} style={{ backgroundColor: notif.color, color: notif.iconColor }}>
                      {notif.icon}
                    </div>
                    <div className={styles.notifItemText} style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h4>{notif.title}</h4>
                        <span className={styles.notifTime}>{notif.time}</span>
                      </div>
                      <p>{notif.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div style={{ padding: '20px', borderTop: '1px solid #f1f3f5', display: 'flex', justifyContent: 'flex-end' }}>
                <button className={styles.btnPrimary} onClick={() => setShowAllActivityModal(false)}>Close Activity</button>
              </div>
            </div>
          </div>
        )}

        {/* Page Header */}
        <div className={styles.header}>
          <div className={styles.headerText}>
            <h1>Settings</h1>
            <p>Curate your shop's configuration and preferences.</p>
          </div>
          
          {/* Bell Icon with Dropdown */}
          <div className={styles.bellWrapper} ref={dropdownRef}>
            <div 
              className={styles.bellIcon} 
              onClick={() => setShowNotifDropdown(!showNotifDropdown)}
            >
              <Bell size={20} />
              <div className={styles.badge}>4</div>
            </div>

            {showNotifDropdown && (
              <div className={styles.notifDropdown}>
                <div className={styles.dropdownHeader}>
                  <h3>Notifications</h3>
                  <span className={styles.markRead} onClick={() => alert("Marked all as read!")}>Mark all as read</span>
                </div>
                <div className={styles.notifListContent}>
                  {NOTIFICATIONS.slice(0, 4).map((notif) => (
                    <div key={notif.id} className={styles.notifItem}>
                      <div className={styles.notifItemIcon} style={{ backgroundColor: notif.color, color: notif.iconColor }}>
                        {notif.icon}
                      </div>
                      <div className={styles.notifItemText}>
                        <h4>{notif.title}</h4>
                        <p>{notif.desc}</p>
                        <div className={styles.notifTime}>
                          <Clock size={10} style={{ marginRight: '4px', display: 'inline' }} />
                          {notif.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div 
                  className={styles.dropdownFooter} 
                  onClick={() => { setShowNotifDropdown(false); setShowAllActivityModal(true); }}
                >
                  View all activity <ChevronRight size={14} style={{ display: 'inline', marginLeft: '4px' }} />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={styles.singleColumnLayout}>
          <div className={styles.contentArea}>
            
            {/* Section 1: Profile Information */}
            <div className={styles.card}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionTitle}>
                  <User size={20} />
                  <h3>Profile Information</h3>
                </div>
                <p className={styles.sectionDesc}>Update your public profile and account details.</p>
              </div>

              <div className={styles.profileSection}>
                <div className={styles.avatarUpload}>
                  <img 
                    src={profileImg} 
                    className={styles.avatarImg} 
                    alt="Avatar" 
                  />
                  <div className={styles.cameraBtn} onClick={handlePhotoClick}>
                    <Camera size={14} />
                  </div>
                </div>
                <div className={styles.profileInfo}>
                  <h4 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>{profile.fullName}</h4>
                  <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#6b7280' }}>Shop Owner</p>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>FULL NAME</label>
                <input 
                  type="text" 
                  value={profile.fullName} 
                  onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>STORE NAME</label>
                <input 
                  type="text" 
                  value={profile.storeName}
                  onChange={(e) => setProfile({...profile, storeName: e.target.value})}
                />
              </div>
            </div>

            {/* Notification Heading */}
            <div style={{ marginTop: '24px', marginBottom: '8px' }}>
              <div className={styles.sectionTitle}>
                 <Bell size={20} color="#a65e31" />
                 <h2 style={{ fontSize: '20px', fontWeight: 700, margin: 0 }}>Notification Settings</h2>
              </div>
              <p style={{ fontSize: '13px', color: '#6b7280', margin: '4px 0 16px 30px' }}>Configure how and when you receive alerts across various channels.</p>
            </div>

            {/* Orders */}
            <div className={styles.card}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionTitle}>
                  <ShoppingCart size={20} />
                  <h3>Orders</h3>
                </div>
                <p className={styles.sectionDesc}>Get notified when new orders or updates happen</p>
              </div>

              <div className={styles.notifyList}>
                <div className={styles.notifyRow}>
                  <div className={styles.notifyLabel}>
                    <Smartphone size={18} />
                    <span>App Notifications</span>
                  </div>
                  <NotificationToggle 
                    checked={notifState.orderApp} 
                    onChange={() => toggleNotif('orderApp')} 
                  />
                </div>

                <div className={styles.notifyRow}>
                  <div className={styles.notifyLabel}>
                    <Globe size={18} />
                    <span>Browser Notifications</span>
                  </div>
                  <NotificationToggle 
                    checked={notifState.orderBrowser} 
                    onChange={() => toggleNotif('orderBrowser')} 
                  />
                </div>

                <div className={styles.notifyRow} style={{ marginBottom: isWhatsAppConnected ? '0' : '20px' }}>
                  <div className={styles.notifyLabel}>
                    <MessageCircle size={18} />
                    <span>WhatsApp Notifications</span>
                  </div>
                  {isWhatsAppConnected ? (
                    <NotificationToggle 
                      checked={notifState.orderWhatsApp} 
                      onChange={() => toggleNotif('orderWhatsApp')} 
                    />
                  ) : (
                    <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600' }}>Disconnected</span>
                  )}
                </div>

                {!isWhatsAppConnected && (
                  <div className={styles.whatsAppConnect} style={{ backgroundColor: '#f9fafb' }}>
                    <div className={styles.whatsAppText}>
                      <div style={{ fontWeight: 700, fontSize: '13px', color: '#374151', marginBottom: '2px' }}>WhatsApp Integration</div>
                      <div className={styles.whatsAppHelper}>Receive instant alerts on WhatsApp</div>
                    </div>
                    <button className={styles.btnConnect} onClick={() => {setIsWhatsAppConnected(true); setIsEditingWhatsApp(true);}}>Connect WhatsApp</button>
                  </div>
                )}
              </div>
            </div>

            {/* Payments */}
            <div className={styles.card}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionTitle}>
                  <Wallet size={20} />
                  <h3>Payments</h3>
                </div>
                <p className={styles.sectionDesc}>Stay updated on payouts and transactions</p>
              </div>

              <div className={styles.notifyList}>
                <div className={styles.notifyRow}>
                  <div className={styles.notifyLabel}>
                    <Smartphone size={18} />
                    <span>App Notifications</span>
                  </div>
                  <NotificationToggle 
                    checked={notifState.paymentApp} 
                    color="green"
                    onChange={() => toggleNotif('paymentApp')} 
                  />
                </div>

                <div className={styles.notifyRow}>
                  <div className={styles.notifyLabel}>
                    <MessageCircle size={18} />
                    <span>WhatsApp Notifications</span>
                  </div>
                  <NotificationToggle 
                    checked={notifState.paymentWhatsApp} 
                    color="green"
                    onChange={() => toggleNotif('paymentWhatsApp')} 
                  />
                </div>

                {isWhatsAppConnected ? (
                  <div className={styles.whatsAppConnect}>
                    {!isEditingWhatsApp ? (
                      <>
                        <div className={styles.whatsAppInfo}>
                          <CheckCircle2 size={16} />
                          <span>Connected to {whatsAppNumber}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '12px' }}>
                          <span className={styles.btnDisconnect} style={{ color: '#2563eb' }} onClick={() => { setTempNumber(whatsAppNumber); setIsEditingWhatsApp(true); }}>Change</span>
                          <span className={styles.btnDisconnect} onClick={handleDisconnect}>Disconnect</span>
                        </div>
                      </>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
                        <input 
                          type="text" 
                          value={tempNumber} 
                          onChange={(e) => setTempNumber(e.target.value)}
                          className={styles.btnConnect}
                          style={{ background: 'white', border: '1px solid #d1d5db', color: '#374151', flex: 1, padding: '6px 12px' }}
                          autoFocus
                        />
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button className={styles.btnConnect} style={{ background: '#22c55e', color: 'white', padding: '6px' }} onClick={saveWhatsAppNumber}>
                            <Check size={16} />
                          </button>
                          <button className={styles.btnConnect} style={{ background: '#ef4444', color: 'white', padding: '6px' }} onClick={() => setIsEditingWhatsApp(false)}>
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className={styles.whatsAppConnect} style={{ backgroundColor: '#f9fafb' }}>
                    <div className={styles.whatsAppText}>
                      <div style={{ fontWeight: 700, fontSize: '13px', color: '#374151', marginBottom: '2px' }}>WhatsApp Integration</div>
                      <div className={styles.whatsAppHelper}>Receive instant alerts on WhatsApp</div>
                    </div>
                    <button className={styles.btnConnect} onClick={() => {setIsWhatsAppConnected(true); setIsEditingWhatsApp(true);}}>Connect WhatsApp</button>
                  </div>
                )}
              </div>
            </div>

            {/* Stock Alerts */}
            <div className={styles.card}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionTitle}>
                  <Package size={20} />
                  <h3>Stock Alerts</h3>
                </div>
                <p className={styles.sectionDesc}>Low stock and inventory alerts</p>
              </div>

              <div className={styles.notifyList}>
                <div className={styles.notifyRow}>
                  <div className={styles.notifyLabel}>
                    <Smartphone size={18} />
                    <span>App Notifications</span>
                  </div>
                  <NotificationToggle 
                    checked={notifState.stockApp} 
                    onChange={() => toggleNotif('stockApp')} 
                  />
                </div>

                <div className={styles.notifyRow}>
                  <div className={styles.notifyLabel}>
                    <MessageCircle size={18} />
                    <span>WhatsApp Notifications</span>
                  </div>
                  <NotificationToggle 
                    checked={notifState.stockWhatsApp} 
                    onChange={() => toggleNotif('stockWhatsApp')} 
                  />
                </div>
              </div>
            </div>

            {/* Final Actions */}
            <div className={styles.footerActions} style={{ maxWidth: '100%' }}>
              <span className={styles.btnSecondary} onClick={handleDiscard}>Discard Changes</span>
              <button className={styles.btnPrimary} onClick={handleSave}>Save All Settings</button>
            </div>
          </div>
        </div>

        {/* Global Alerts Container */}
        <div className={styles.alertsContainer}>
          {alerts.map(alert => (
            <div key={alert.id} className={styles.alert} style={{ borderTopColor: alert.type === 'error' ? '#ef4444' : '#a65e31' }}>
              {alert.type === 'success' ? <CheckCircle2 size={40} color="#a65e31" /> : <XCircle size={40} color="#ef4444" />}
              <span style={{ fontWeight: 700 }}>{alert.message}</span>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
