"use client";
import { useState } from "react";
import styles from "../../../styles/login.module.css";
import { Mail, Eye, EyeOff, LayoutGrid, HelpCircle, AlertCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem("vendor-auth", "true");
      router.push("/Pages/Dashboard");
    } else {
      setError("Please enter your login details.");
    }
  };

  return (
    <div className={styles.loginWrapper}>
      {/* Left Section - Image & Branding */}
      <section className={styles.leftSection}>
        <div className={styles.overlay}></div>
        <Image 
          src="/login_background_picky_1775455959610.png"
          alt="Business background"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={styles.bgImage}
          priority
        />
        <div className={styles.leftContent}>
          <h1>Empower Your <br />Business with Picky</h1>
          <p>Manage your inventory, track orders, and grow your sales.</p>
        </div>
      </section>

      {/* Right Section - Login Form */}
      <section className={styles.rightSection}>
        <div className={styles.loginContainer}>
          <div className={styles.brandLogo}>
            <div className={styles.logoIcon}>
              <Image 
                src="/logo.png" 
                alt="Picky Logo" 
                width={38} 
                height={38} 
              />
            </div>
            <div className={styles.brandTitle}>
              <span>Picky Vendor</span>
              <p className={styles.slogan}>CHOOSE PICKY NOT CHOICE</p>
            </div>
          </div>

          <div className={styles.loginHeader}>
            <h2>Vendor Login</h2>
            <p>Access your Picky marketplace dashboard</p>
          </div>

          {error && (
            <div className={styles.errorBanner} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              backgroundColor: '#fee2e2', 
              color: '#dc2626', 
              padding: '16px', 
              borderRadius: '12px', 
              marginBottom: '24px', 
              fontSize: '0.9rem' 
            }}>
              <AlertCircle size={20} />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className={styles.formGroup}>
              <label>Vendor Email</label>
              <div className={styles.inputWrapper}>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your vendor email address"
                  className={styles.formInput}
                  required
                />
                <Mail className={styles.inputIcon} size={18} />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Password</label>
              <div className={styles.inputWrapper}>
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={styles.formInput}
                  required
                />
                <button 
                  type="button" 
                  className={styles.inputIcon}
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className={styles.formOptions}>
              <label className={styles.rememberMe}>
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <Link href="#" className={styles.forgotLink}>
                Forgot password?
              </Link>
            </div>

            <button type="submit" className={styles.loginBtn}>
              Sign In to Dashboard
            </button>
          </form>

          <div className={styles.footerLinks}>
            <p className={styles.signupText}>
              Not a vendor? <Link href="#" className={styles.linkCyan}>Join us today</Link>
            </p>
            <Link href="#" className={styles.supportLink}>
              <HelpCircle size={14} />
              Need help? Contact Vendor Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
