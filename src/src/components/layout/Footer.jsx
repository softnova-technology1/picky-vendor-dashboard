import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.logo}>Shanmathi.</span>
          </div>
          <div className={styles.tagline}>
            Crafting digital excellence with code and passion.
          </div>
        </div>
        
        <div className={styles.divider}></div>
        
        <div className={styles.bottom}>
          <p className={styles.copyright}>&copy; 2026 Shanmathi. All rights reserved.</p>
          <p className={styles.madeWith}>Made with 🤍 and React</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
