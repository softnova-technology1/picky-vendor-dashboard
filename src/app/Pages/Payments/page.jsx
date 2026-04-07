'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import { 
  DollarSign, 
  CreditCard, 
  TrendingUp, 
  Calendar, 
  Search, 
  Download, 
  AlertCircle, 
  CheckCircle2, 
  Filter, 
  Plus, 
  MoreVertical,
  Banknote,
  Clock,
  ShieldCheck,
  Smartphone,
  ChevronRight,
  X
} from 'lucide-react';
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import AppLayout from '../../../components/AppLayout';
import styles from '../../../styles/Payments.module.css';

// Dummy Data
const DUMMY_TRANSACTIONS = [
  { id: 'ORD-5432', date: '2024-03-20', customer: 'John Doe', amount: 5000, commission: 500, net: 4500, status: 'Paid' },
  { id: 'ORD-5433', date: '2024-03-21', customer: 'Jane Smith', amount: 12000, commission: 1200, net: 10800, status: 'Pending' },
  { id: 'ORD-5434', date: '2024-03-22', customer: 'Bob Wilson', amount: 3500, commission: 350, net: 3150, status: 'Paid' },
  { id: 'ORD-5435', date: '2024-03-23', customer: 'Alice Brown', amount: 8400, commission: 840, net: 7560, status: 'Failed' },
  { id: 'ORD-5436', date: '2024-03-24', customer: 'Charlie Davis', amount: 2200, commission: 220, net: 1980, status: 'Paid' },
  { id: 'ORD-5437', date: '2024-03-25', customer: 'Emma Thompson', amount: 15600, commission: 1560, net: 14040, status: 'Pending' },
  { id: 'ORD-5438', date: '2024-03-26', customer: 'Frank Miller', amount: 6700, commission: 670, net: 6030, status: 'Paid' },
];

const ANALYTICS_DATA = [
  { name: 'Jan', earnings: 45000 },
  { name: 'Feb', earnings: 52000 },
  { name: 'Mar', earnings: 38000 },
  { name: 'Apr', earnings: 65000 },
  { name: 'May', earnings: 48000 },
  { name: 'Jun', earnings: 70000 },
  { name: 'Jul', earnings: 55000 },
];

const ANALYTICS_DATA_30 = [
  { name: 'Day 1', earnings: 1500 },
  { name: 'Day 5', earnings: 3200 },
  { name: 'Day 10', earnings: 2100 },
  { name: 'Day 15', earnings: 4500 },
  { name: 'Day 20', earnings: 3800 },
  { name: 'Day 25', earnings: 5200 },
  { name: 'Day 30', earnings: 4100 },
];

export default function PaymentsPage() {
  useEffect(() => {
    document.title = "Payments | Picky Vendor CRM";
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [alerts, setAlerts] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAddMethodModal, setShowAddMethodModal] = useState(false);
  const [showMethodDetails, setShowMethodDetails] = useState(false);
  const [showPayoutDetailsModal, setShowPayoutDetailsModal] = useState(false);
  const [activePayout, setActivePayout] = useState(null);
  const [activeMethod, setActiveMethod] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState('Bank');
  const [selectedRange, setSelectedRange] = useState('7months');
  const [payoutMethod, setPayoutMethod] = useState('Bank');
  const [copiedId, setCopiedId] = useState(null);
  const [showPayoutFormModal, setShowPayoutFormModal] = useState(false);
  const [payoutDetails, setPayoutDetails] = useState({
    accountNumber: '',
    ifscCode: '',
    upiId: '',
    email: ''
  });

  const handleCopyId = (id) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    addAlert(`ID ${id} copied to clipboard!`, 'success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const currentData = selectedRange === '30days' ? ANALYTICS_DATA_30 : ANALYTICS_DATA;

  const availableBalance = 45000;
  const minWithdrawal = 1000;

  // Add Alert
  const addAlert = (message, type = 'success') => {
    const id = Date.now();
    setAlerts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setAlerts(prev => prev.filter(alert => alert.id !== id));
    }, 4000);
  };

  // Filter Transactions
  const filteredTransactions = useMemo(() => {
    return DUMMY_TRANSACTIONS.filter(t => {
      const matchesSearch = t.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            t.customer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  // Handle Withdrawal Request
  const handleWithdrawal = (e) => {
    e.preventDefault();
    const amount = Number(withdrawAmount);
    
    if (amount < minWithdrawal) {
      addAlert(`Minimum withdrawal amount is ₹${minWithdrawal}`, 'error');
      return;
    }
    
    if (amount > availableBalance) {
      addAlert('Insufficient balance', 'error');
      return;
    }

    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      addAlert(`Withdrawal request for ₹${amount} initiated successfully!`, 'success');
      setWithdrawAmount('');
      setIsProcessing(false);
    }, 1500);
  };

  const handleSaveMethod = (e) => {
    e.preventDefault();
    addAlert(`${selectedMethod} payment method added successfully!`, 'success');
    setShowAddMethodModal(false);
  };

  const handleDownloadReceipt = (payout) => {
    if (!payout) return;
    addAlert(`Generating official PDF receipt for ${payout.id}...`, 'success');
  
    try {
      const doc = new jsPDF();
      
      // Receipt Header
      doc.setFontSize(22);
      doc.setTextColor(27, 133, 219); // Brand primary color
      doc.text("PICKY VENDOR CRM", 105, 30, { align: 'center' });
      
      doc.setFontSize(12);
      doc.setTextColor(100, 116, 139);
      doc.text("OFFICIAL TRANSACTION RECEIPT", 105, 38, { align: 'center' });
      
      doc.setDrawColor(226, 232, 240);
      doc.line(20, 45, 190, 45); // Divider
      
      // Transaction Info
      doc.setFontSize(10);
      doc.setTextColor(30, 41, 59);
      doc.text(`Transaction ID:`, 20, 60);
      doc.text(`${payout.id}`, 80, 60);
      
      doc.text(`Date:`, 20, 68);
      doc.text(`${payout.date}`, 80, 68);
      
      doc.text(`Status:`, 20, 76);
      doc.text(`${payout.status}`, 80, 76);
      
      doc.line(20, 85, 190, 85); // Divider
  
      // Amount Section
      doc.setFontSize(11);
      doc.text(`Description`, 20, 100);
      doc.text(`Amount`, 170, 100, { align: 'right' });
      
      doc.setFontSize(10);
      doc.setTextColor(100, 116, 139);
      doc.text(`Gross Transaction Amount`, 20, 115);
      doc.text(`₹${payout.amount.toLocaleString()}`, 170, 115, { align: 'right' });
      
      doc.text(`Platform Commission (10%)`, 20, 125);
      doc.text(`- ₹${payout.commission.toLocaleString()}`, 170, 125, { align: 'right' });
      
      doc.line(100, 135, 190, 135); // Sub-divider
      
      doc.setFontSize(14);
      doc.setTextColor(27, 133, 219);
      doc.setFont(undefined, 'bold');
      doc.text(`NET PAYOUT`, 20, 148);
      doc.text(`₹${payout.net.toLocaleString()}`, 170, 148, { align: 'right' });
      
      // Footer
      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(148, 163, 184);
      doc.text("----------------------------------------------------------------", 105, 180, { align: 'center' });
      doc.text("This is an electronically generated receipt.", 105, 188, { align: 'center' });
      doc.text("For any queries, please contact support@picky-crm.com", 105, 193, { align: 'center' });
  
      // Save PDF
      doc.save(`Receipt-${payout.id}.pdf`);
      
      setTimeout(() => {
        addAlert("Official Receipt downloaded successfully!", "success");
      }, 1000);
    } catch (error) {
      console.error("PDF Export Error:", error);
      addAlert("Failed to generate PDF. Please try again.", "error");
    }
  };

  const handleDownloadStatement = () => {
    addAlert("Generating account statement...", "success");
    setTimeout(() => {
      addAlert("Statement downloaded successfully!", "success");
    }, 1500);
  };

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
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [20, 100],
        colorStops: [
          { offset: 0, color: '#1b85db', opacity: 0.45 },
          { offset: 100, color: '#1b85db', opacity: 0.05 }
        ]
      }
    },
    xaxis: {
      categories: currentData.map(d => d.name),
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: '#94a3b8', fontSize: '12px' } }
    },
    yaxis: {
      labels: { 
        style: { colors: '#94a3b8', fontSize: '12px' },
        formatter: (val) => `₹${val/1000}k`
      }
    },
    tooltip: { 
      theme: 'light',
      y: { formatter: (val) => `₹${val.toLocaleString()}` } 
    },
    colors: ['#1b85db'],
    grid: { borderColor: '#f1f5f9', strokeDashArray: 4 }
  };

  const chartSeries = [
    { name: 'Earnings', data: currentData.map(d => d.earnings) }
  ];

  return (
    <AppLayout>
      <div className={styles.container}>
        {/* Notifications */}
        <div className={styles.alertsContainer}>
          {alerts.map(alert => (
            <div key={alert.id} className={styles.alert} style={{ borderLeftColor: alert.type === 'error' ? '#ef4444' : '#22c55e' }}>
              {alert.type === 'success' ? <CheckCircle2 size={18} color="#22c55e" /> : <AlertCircle size={18} color="#ef4444" />}
              <span>{alert.message}</span>
            </div>
          ))}
        </div>

        {/* Add Payment Method Modal */}
        {showAddMethodModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <button 
                className={styles.actionBtn} 
                style={{ position: 'absolute', right: '20px', top: '20px' }}
                onClick={() => setShowAddMethodModal(false)}
              >
                <X size={20} />
              </button>

              <div className={styles.modalHeader}>
                <h2>Add Payment Method</h2>
                <p>Securely connect your payout method</p>
              </div>

              <div className={styles.methodGrid}>
                <div 
                  className={`${styles.methodItem} ${selectedMethod === 'Bank' ? styles.methodItemSelected : ''}`}
                  onClick={() => setSelectedMethod('Bank')}
                >
                  <div className={styles.methodItemIcon}><Banknote size={24} /></div>
                  <span style={{ fontSize: '13px', fontWeight: '600' }}>Bank Transfer</span>
                  {selectedMethod === 'Bank' && <div className={styles.checkMark}><CheckCircle2 size={12} /></div>}
                </div>

                <div 
                  className={`${styles.methodItem} ${selectedMethod === 'PayPal' ? styles.methodItemSelected : ''}`}
                  onClick={() => setSelectedMethod('PayPal')}
                >
                  <div className={styles.methodItemIcon}><CreditCard size={24} /></div>
                  <span style={{ fontSize: '13px', fontWeight: '600' }}>PayPal</span>
                  {selectedMethod === 'PayPal' && <div className={styles.checkMark}><CheckCircle2 size={12} /></div>}
                </div>

                <div 
                  className={`${styles.methodItem} ${selectedMethod === 'UPI' ? styles.methodItemSelected : ''}`}
                  onClick={() => setSelectedMethod('UPI')}
                >
                  <div className={styles.methodItemIcon}><Smartphone size={24} /></div>
                  <span style={{ fontSize: '13px', fontWeight: '600' }}>UPI</span>
                  {selectedMethod === 'UPI' && <div className={styles.checkMark}><CheckCircle2 size={12} /></div>}
                </div>
              </div>

              <form onSubmit={handleSaveMethod}>
                <div className={styles.dynamicFieldsContainer}>
                  {selectedMethod === 'Bank' && (
                    <div className={`${styles.formGrid} ${styles.animateField}`}>
                      <div className={styles.inputWrapper}>
                        <label>Account Holder Name</label>
                        <input type="text" className={styles.formInput} placeholder="e.g. John Doe" />
                      </div>
                      <div className={styles.inputWrapper}>
                        <label>Bank Name</label>
                        <input type="text" className={styles.formInput} placeholder="e.g. Global Reserve Bank" />
                      </div>
                      <div className={`${styles.inputWrapper} ${styles.fullWidth}`}>
                        <label>Account Number</label>
                        <input type="text" className={styles.formInput} placeholder="Enter 12-16 digit account number" />
                      </div>
                      <div className={styles.inputWrapper}>
                        <label>IFSC / SWIFT Code</label>
                        <input type="text" className={styles.formInput} placeholder="ABCD0123456" />
                      </div>
                      <div className={styles.inputWrapper}>
                        <label>Branch Name</label>
                        <input type="text" className={styles.formInput} placeholder="Central Square Branch" />
                      </div>
                    </div>
                  )}

                  {selectedMethod === 'PayPal' && (
                    <div className={`${styles.formGrid} ${styles.animateField}`}>
                      <div className={`${styles.inputWrapper} ${styles.fullWidth}`}>
                        <label>PayPal Email Address</label>
                        <input type="email" className={styles.formInput} placeholder="yourname@gmail.com" />
                      </div>
                      <div className={`${styles.inputWrapper} ${styles.fullWidth}`}>
                        <label>Confirm Email</label>
                        <input type="email" className={styles.formInput} placeholder="Re-enter your email" />
                      </div>
                    </div>
                  )}

                  {selectedMethod === 'UPI' && (
                    <div className={`${styles.formGrid} ${styles.animateField}`}>
                      <div className={`${styles.inputWrapper} ${styles.fullWidth}`}>
                        <label>UPI ID / VPA</label>
                        <input type="text" className={styles.formInput} placeholder="username@okaxis or 9876543210@ybl" />
                      </div>
                      <div className={`${styles.inputWrapper} ${styles.fullWidth}`}>
                        <label>Aadhar Linked Number (Optional)</label>
                        <input type="text" className={styles.formInput} placeholder="9876543210" />
                      </div>
                    </div>
                  )}
                </div>

                <div className={styles.securityNote}>
                  <ShieldCheck size={20} color="#10b981" />
                  <span>Your payment information is encrypted and secure.</span>
                </div>

                <div className={styles.modalFooter}>
                  <button type="button" className={styles.cancelBtn} onClick={() => setShowAddMethodModal(false)}>Cancel</button>
                  <button type="submit" className={styles.saveBtn}>Save Method</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Payment Method Details Modal */}
        {showMethodDetails && activeMethod && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal} style={{ maxWidth: '450px' }}>
              <button 
                className={styles.actionBtn} 
                style={{ position: 'absolute', right: '20px', top: '20px' }}
                onClick={() => setShowMethodDetails(false)}
              >
                <X size={20} />
              </button>

              <div className={styles.modalHeader}>
                <div className={styles.methodItemIcon} style={{ margin: '0 auto 16px auto', width: '60px', height: '60px' }}>
                  {activeMethod === 'Bank' ? <Banknote size={32} /> : <CreditCard size={32} />}
                </div>
                <h2>{activeMethod === 'Bank' ? 'Bank Account Details' : 'PayPal Details'}</h2>
                <p>Securely linked on March 12, 2024</p>
              </div>

              <div className={styles.bankDetails} style={{ padding: '24px', backgroundColor: '#f9fafb', borderRadius: '16px', marginBottom: '24px', border: '1px solid #f1f3f5' }}>
                {activeMethod === 'Bank' ? (
                  <>
                    <div className={styles.bankItem}>
                      <span className={styles.bankLabel}>ACCOUNT HOLDER</span>
                      <span className={styles.bankValue}>Alexander Sterling</span>
                    </div>
                    <div className={styles.bankItem}>
                      <span className={styles.bankLabel}>BANK NAME</span>
                      <span className={styles.bankValue}>Global Reserve Bank</span>
                    </div>
                    <div className={styles.bankItem}>
                      <span className={styles.bankLabel}>ACCOUNT NUMBER</span>
                      <span className={styles.bankValue}>•••• •••• 8821</span>
                    </div>
                    <div className={styles.bankItem}>
                      <span className={styles.bankLabel}>IFSC CODE</span>
                      <span className={styles.bankValue}>GRB0001234</span>
                    </div>
                    <div className={styles.bankItem}>
                      <span className={styles.bankLabel}>BRANCH</span>
                      <span className={styles.bankValue}>Central Square Branch</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.bankItem}>
                      <span className={styles.bankLabel}>ACCOUNT HOLDER</span>
                      <span className={styles.bankValue}>Alexander Sterling</span>
                    </div>
                    <div className={styles.bankItem}>
                      <span className={styles.bankLabel}>PAYPAL EMAIL</span>
                      <span className={styles.bankValue}>jake.v@gmail.com</span>
                    </div>
                    <div className={styles.bankItem} style={{ borderTop: '1px solid #f1f3f5', paddingTop: '12px', marginTop: '12px' }}>
                      <span className={styles.bankLabel}>ACCOUNT STATUS</span>
                      <span style={{ color: '#10b981', fontWeight: '700', fontSize: '13px' }}>Verified ✓</span>
                    </div>
                  </>
                )}
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button className={styles.withdrawBtn} style={{ background: '#fef2f2', color: '#ef4444', flex: 1 }} onClick={() => addAlert("Remove feature disabled in demo", "error")}>
                  Remove Method
                </button>
                <button className={styles.withdrawBtn} style={{ flex: 2 }} onClick={() => setShowMethodDetails(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Payout Form Modal - Dynamic Details Request */}
        {showPayoutFormModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal} style={{ maxWidth: '400px' }}>
              <button 
                className={styles.actionBtn} 
                style={{ position: 'absolute', right: '20px', top: '20px' }}
                onClick={() => setShowPayoutFormModal(false)}
              >
                <X size={20} />
              </button>

              <div className={styles.modalHeader}>
                <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
                  <div className={styles.methodItemIcon} style={{ width: '56px', height: '56px', background: '#f0f9ff', color: '#1b85db' }}>
                    {payoutMethod === 'Bank' ? <Banknote size={28} /> : payoutMethod === 'UPI' ? <Smartphone size={28} /> : <CreditCard size={28} />}
                  </div>
                </div>
                <h2>Secure Payout</h2>
                <p>Transferring ₹{Number(withdrawAmount).toLocaleString()} to your {payoutMethod}</p>
              </div>

              <div className={styles.dynamicFieldsContainer} style={{ minHeight: 'auto', marginBottom: '24px' }}>
                {payoutMethod === 'Bank' && (
                  <div className={styles.animateField}>
                    <div className={styles.inputGroup} style={{ marginBottom: '16px' }}>
                      <label>Account Number</label>
                      <input 
                        type="text" 
                        placeholder="Enter 12-16 digit account number" 
                        className={styles.inputField}
                        value={payoutDetails.accountNumber}
                        onChange={(e) => setPayoutDetails({...payoutDetails, accountNumber: e.target.value})}
                        required
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>IFSC Code</label>
                      <input 
                        type="text" 
                        placeholder="SBIN0012345" 
                        className={styles.inputField}
                        value={payoutDetails.ifscCode}
                        onChange={(e) => setPayoutDetails({...payoutDetails, ifscCode: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                )}

                {payoutMethod === 'UPI' && (
                  <div className={styles.animateField}>
                    <div className={styles.inputGroup}>
                      <label>UPI ID / G-Pay Number</label>
                      <input 
                        type="text" 
                        placeholder="username@okaxis or 9876543210" 
                        className={styles.inputField}
                        value={payoutDetails.upiId}
                        onChange={(e) => setPayoutDetails({...payoutDetails, upiId: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                )}

                {payoutMethod === 'PayPal' && (
                  <div className={styles.animateField}>
                    <div className={styles.inputGroup}>
                      <label>PayPal Email Address</label>
                      <input 
                        type="email" 
                        placeholder="yourname@example.com" 
                        className={styles.inputField}
                        value={payoutDetails.email}
                        onChange={(e) => setPayoutDetails({...payoutDetails, email: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button className={styles.withdrawBtn} style={{ background: '#f1f5f9', color: '#64748b', flex: 1 }} onClick={() => setShowPayoutFormModal(false)}>
                  Cancel
                </button>
                <button 
                  className={styles.withdrawBtn} 
                  style={{ flex: 2 }} 
                  onClick={() => {
                    setShowPayoutFormModal(false);
                    // Trigger actual withdrawal notification
                    setIsProcessing(true);
                    setTimeout(() => {
                      addAlert(`Withdrawal request for ₹${withdrawAmount} initiated successfully!`, 'success');
                      setWithdrawAmount('');
                      setIsProcessing(false);
                    }, 1500);
                  }}
                >
                  {isProcessing ? 'Verifying...' : 'Finalize Payout'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Payout Details Modal */}
        {showPayoutDetailsModal && activePayout && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal} style={{ maxWidth: '500px' }}>
              <button 
                className={styles.actionBtn} 
                style={{ position: 'absolute', right: '20px', top: '20px' }}
                onClick={() => setShowPayoutDetailsModal(false)}
              >
                <X size={20} />
              </button>

              <div className={styles.modalHeader}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
                  <ShieldCheck size={20} color="#10b981" />
                  <span style={{ color: '#10b981', fontWeight: '700', fontSize: '12px', textTransform: 'uppercase' }}>Transaction Verified</span>
                </div>
                <h2>Payout Details</h2>
                <p>Transaction ID: {activePayout.id}</p>
              </div>

              <div className={styles.bankDetails} style={{ padding: '0', background: 'transparent', border: 'none' }}>
                <div style={{ background: 'white', border: '1px solid #f1f3f5', borderRadius: '16px', overflow: 'hidden', marginBottom: '20px' }}>
                  <div style={{ padding: '16px 20px', background: '#f9fafb', borderBottom: '1px solid #f1f3f5', display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 600, fontSize: '14px' }}>Status</span>
                    <span className={`${styles.badge} ${
                      activePayout.status === 'Paid' ? styles.badgePaid : 
                      activePayout.status === 'Pending' ? styles.badgePending : styles.badgeFailed
                    }`}>
                      {activePayout.status}
                    </span>
                  </div>
                  
                  <div style={{ padding: '20px' }}>
                    <div className={styles.bankItem}>
                      <span className={styles.bankLabel}>DATE</span>
                      <span className={styles.bankValue}>{activePayout.date}</span>
                    </div>
                    <div className={styles.bankItem}>
                      <span className={styles.bankLabel}>GROSS AMOUNT</span>
                      <span className={styles.bankValue}>₹{activePayout.amount.toLocaleString()}</span>
                    </div>
                    <div className={styles.bankItem}>
                      <span className={styles.bankLabel}>COMMISSION (10%)</span>
                      <span className={styles.bankValue} style={{ color: '#ef4444' }}>- ₹{activePayout.commission.toLocaleString()}</span>
                    </div>
                    <div className={styles.bankItem} style={{ borderTop: '2px dashed #f1f3f5', marginTop: '12px', paddingTop: '12px' }}>
                      <span className={styles.bankLabel} style={{ fontWeight: 800, color: '#111827' }}>NET PAYOUT</span>
                      <span className={styles.bankValue} style={{ fontSize: '18px', color: '#111827', fontWeight: 800 }}>₹{activePayout.net.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div style={{ padding: '16px', background: '#eff6ff', borderRadius: '12px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <Clock size={18} color="#3b82f6" style={{ marginTop: '2px' }} />
                  <div>
                    <span style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1e40af' }}>Settlement Duration</span>
                    <span style={{ fontSize: '12px', color: '#3b82f6' }}>This payout was settled within 24 hours of the request.</span>
                  </div>
                </div>
              </div>

              <div className={styles.modalFooter} style={{ marginTop: '24px' }}>
                <button type="button" className={styles.cancelBtn} style={{ flex: 1 }} onClick={() => handleDownloadReceipt(activePayout)}>
                  <Download size={16} style={{ marginRight: '8px' }} />
                  PDF Receipt
                </button>
                <button type="button" className={styles.saveBtn} style={{ flex: 1 }} onClick={() => setShowPayoutDetailsModal(false)}>Done</button>
              </div>
            </div>
          </div>
        )}

        <header className={styles.header}>
          <h1>Payout Dashboard</h1>
          <p>Overview of your earnings and transaction history</p>
        </header>

        {/* Summary Stats Cards */}
        <section className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statContent}>
              <h3>Total Earnings</h3>
              <div className={styles.statValue}>₹2,50,450</div>
              <div className={styles.profitIndicator}><TrendingUp size={12} /> <span>12% Increase</span></div>
            </div>
            <div className={`${styles.statIcon} ${styles.iconBlue}`}><TrendingUp size={20} /></div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statContent}>
              <h3>Total Paid</h3>
              <div className={styles.statValue}>₹1,95,000</div>
              <div className={styles.profitIndicator}><span>34 Transactions</span></div>
            </div>
            <div className={`${styles.statIcon} ${styles.iconGreen}`}><CheckCircle2 size={20} /></div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statContent}>
              <h3>Pending Payouts</h3>
              <div className={styles.statValue}>₹10,450</div>
              <div className={styles.profitIndicator}><span>Processing (2)</span></div>
            </div>
            <div className={`${styles.statIcon} ${styles.iconAmber}`}><Clock size={20} /></div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statContent}>
              <h3>Next Payout</h3>
              <div className={styles.statValue}>28 Mar</div>
              <div className={styles.profitIndicator}><span>Estimated Date</span></div>
            </div>
            <div className={`${styles.statIcon} ${styles.iconBlue}`}><Calendar size={20} /></div>
          </div>
        </section>

        {/* Main Layout: Chart + Withdrawal */}
        <div className={styles.mainLayout}>
          <div className={styles.leftColumn} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <section className={`${styles.sectionCard} ${styles.chartSection}`}>
              <div className={styles.sectionTitle}>
                <span>Earnings Analytics</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <select 
                    className={styles.selectInput} 
                    style={{ padding: '4px 10px', fontSize: '12px' }}
                    value={selectedRange}
                    onChange={(e) => setSelectedRange(e.target.value)}
                  >
                    <option value="7months">Last 7 Months</option>
                    <option value="30days">Last 30 Days</option>
                  </select>
                </div>
              </div>
              <div className={styles.chartContainer}>
                <Chart 
                  options={chartOptions} 
                  series={chartSeries} 
                  type="area" 
                  height="100%" 
                />
              </div>
            </section>

          </div>

          <section className={`${styles.sectionCard} ${styles.payoutCard}`}>
            <div className={styles.sectionTitle}>Request Payout</div>
            <div className={styles.balanceBox}>
              <div className={styles.balanceLabel}>Available Balance</div>
              <div className={styles.balanceAmount}>₹{availableBalance.toLocaleString()}</div>
            </div>
            
            <div className={styles.payoutForm}>
              <div className={styles.methodTabGroup}>
                <button 
                  type="button"
                  className={`${styles.methodTab} ${payoutMethod === 'Bank' ? styles.methodTabActive : ''}`}
                  onClick={() => setPayoutMethod('Bank')}
                >
                  <Banknote size={16} />
                  Bank
                </button>
                <button 
                  type="button"
                  className={`${styles.methodTab} ${payoutMethod === 'UPI' ? styles.methodTabActive : ''}`}
                  onClick={() => setPayoutMethod('UPI')}
                >
                  <Smartphone size={16} />
                  UPI / G-Pay
                </button>
                <button 
                  type="button"
                  className={`${styles.methodTab} ${payoutMethod === 'PayPal' ? styles.methodTabActive : ''}`}
                  onClick={() => setPayoutMethod('PayPal')}
                >
                  <CreditCard size={16} />
                  PayPal
                </button>
              </div>

              <div className={styles.inputGroup} style={{ marginBottom: '20px' }}>
                <label>Withdrawal Amount</label>
                <div className={styles.amountInputWrapper}>
                  <span>₹</span>
                  <input 
                    type="number" 
                    placeholder="0.00" 
                    className={styles.inputField}
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                  />
                </div>
              </div>

              <button 
                type="button" 
                className={`${styles.withdrawBtn} ${styles.saveBtn}`}
                style={{ marginTop: '24px', padding: '16px' }}
                disabled={isProcessing || !withdrawAmount}
                onClick={() => setShowPayoutFormModal(true)}
              >
                Confirm & Request
              </button>
            </div>
          </section>
        </div>

        {/* Full Width Payment Methods Section */}
        <section className={styles.sectionCard} style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div className={styles.sectionTitle} style={{ marginBottom: 0 }}>Payment Methods</div>
            <button className={styles.addMethodBtn} style={{ width: 'auto', margin: 0, padding: '10px 20px' }} onClick={() => setShowAddMethodModal(true)}>
              <Plus size={18} />
              Add New Method
            </button>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            <div className={styles.linkedMethodItem} onClick={() => { setActiveMethod('Bank'); setShowMethodDetails(true); }}>
              <div className={styles.methodLogo}><Banknote size={24} /></div>
              <div className={styles.methodInfo}>
                <h4 style={{ fontSize: '16px' }}>Bank Transfer</h4>
                <p>•••• 8821</p>
              </div>
              <ChevronRight size={20} style={{ marginLeft: 'auto', color: '#ccc' }} />
            </div>

            <div className={styles.linkedMethodItem} onClick={() => { setActiveMethod('PayPal'); setShowMethodDetails(true); }}>
              <div className={styles.methodLogo} style={{ color: '#0070ba' }}><CreditCard size={24} /></div>
              <div className={styles.methodInfo}>
                <h4 style={{ fontSize: '16px' }}>PayPal</h4>
                <p>jake.v@gmail.com</p>
              </div>
              <ChevronRight size={20} style={{ marginLeft: 'auto', color: '#ccc' }} />
            </div>
          </div>
        </section>

        {/* Transactions Section */}
        <section className={styles.sectionCard}>
          <div className={styles.sectionTitle}>
            <span>Payout History</span>
            <button className={styles.actionBtn} title="Download Statement" onClick={handleDownloadStatement}><Download size={18} /></button>
          </div>

          {/* Filters */}
          <div className={styles.filterBar}>
            <div className={styles.searchBox}>
              <Search className={styles.searchIcon} size={18} />
              <input 
                type="text" 
                placeholder="Search Order ID..." 
                className={styles.searchInput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select 
              className={styles.selectInput}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Paid">Processed</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>

            <div style={{ display: 'flex', gap: '8px' }}>
              <input type="date" className={styles.selectInput} />
            </div>
          </div>

          {/* Responsive Table */}
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>PAYOUT ID</th>
                  <th>AMOUNT</th>
                  <th>STATUS</th>
                  <th>DATE</th>
                  <th>METHOD</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((tx) => (
                    <tr key={tx.id}>
                      <td data-label="PAYOUT ID" className={styles.orderId}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {tx.id}
                          <button 
                            className={styles.copyBtn} 
                            onClick={() => handleCopyId(tx.id)}
                            title="Copy ID"
                          >
                            {copiedId === tx.id ? <CheckCircle2 size={12} color="#10b981" /> : <Plus size={12} style={{ transform: 'rotate(45deg)' }} />}
                          </button>
                        </div>
                      </td>
                      <td data-label="AMOUNT">₹{tx.amount.toLocaleString()}</td>
                      <td data-label="STATUS">
                        <span className={`${styles.badge} ${
                          tx.status === 'Paid' ? styles.badgePaid : 
                          tx.status === 'Pending' ? styles.badgePending : styles.badgeFailed
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                      <td data-label="DATE">{tx.date}</td>
                      <td data-label="METHOD">Bank Transfer</td>
                      <td data-label="ACTIONS">
                        <button className={styles.actionBtn} onClick={() => { setActivePayout(tx); setShowPayoutDetailsModal(true); }}>
                          <ChevronRight size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                        <Search size={48} opacity={0.2} />
                        <p>No payout history found.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
