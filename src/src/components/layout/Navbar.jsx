import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Twitter, FileDown } from 'lucide-react';
import { clsx } from 'clsx';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = ({ devMode, toggleDevMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (devMode) {
      document.body.classList.add('dev-mode-active');
    } else {
      document.body.classList.remove('dev-mode-active');
    }
  }, [devMode]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <nav className={clsx(styles.navbar, scrolled && styles.scrolled)}>
        <div className={styles.navContainer}>
          <a href="#home" className={styles.logo}>
            {!devMode && <span className={styles.logoText}>Shanmathi.</span>}
          </a>

          {!devMode && (
            <ul className={styles.navLinks}>
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className={styles.navLink}>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          )}

          <div className={styles.socialIcons}>
            {!devMode && (
              <a href="/ATS.pdf" download className={styles.resumeBtn} title="Download Resume" target="_blank" rel="noreferrer">
                 <FileDown size={18} /> <span>DOWNLOAD RESUME</span>
              </a>
            )}
            {!devMode && (
              <>
                <button 
                  className={clsx(styles.devToggle, devMode && styles.devToggleActive)} 
                  onClick={toggleDevMode}
                  title="Developer Mode"
                >
                  {devMode ? "EXIT_SESSION" : "DEV ON"}
                </button>
                <a href="https://github.com/Shanmathi0605" target="_blank" rel="noreferrer" className={styles.socialIcon}>
                  <Github size={20} />
                </a>
              </>
            )}
          </div>

          {!devMode && (
            <button className={styles.mobileToggle} onClick={toggleMenu} aria-label="Toggle Menu">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          )}
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -200 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -200 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <button className={styles.closeButton} onClick={toggleMenu} aria-label="Close Menu">
              <X size={32} />
            </button>
            <div className={styles.mobileMenuContent}>
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className={styles.mobileNavLink}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {link.name}
                </motion.a>
              ))}
              <div className={styles.mobileSocials}>
                <a href="https://github.com" className={styles.socialIcon}><Github size={24} /></a>
                <a href="https://linkedin.com" className={styles.socialIcon}><Linkedin size={24} /></a>
              </div>
            </div>
            <div className={styles.menuDecorative}>NAVIGATION</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
