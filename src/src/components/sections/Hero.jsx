import React, { useState, useEffect } from 'react';
import styles from './Hero.module.css';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, FileDown } from 'lucide-react';
import { clsx } from 'clsx';
import MagneticButton from '../ui/MagneticButton';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = "Frontend Developer | UI Designer";
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText((prev) => prev + fullText[index]);
        setIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  return (
    <section id="home" className={styles.heroSection}>
      <div className={styles.heroContent}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.heroHeader}
        >
          <span className={styles.greeting}>HI, I'm</span>
          <h1 className={styles.heroTitle}>
            <span className={styles.nameHighlight}>Shanmathi</span>
          </h1>
          <p className={styles.heroSubtitle}>{typedText}<span className={styles.cursorMark}>|</span></p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={styles.ctaGroup}
        >
          <MagneticButton href="#projects" className={clsx(styles.ctaButton, styles.primaryCta)}>
            View Projects <ArrowRight size={20} className={styles.ctaIcon} />
          </MagneticButton>
          <MagneticButton href="#contact" className={clsx(styles.ctaButton, styles.secondaryCta)}>
            Hire Me
          </MagneticButton>
          <MagneticButton 
            href="/ATS.pdf" 
            className={clsx(styles.ctaButton, styles.outlineCta)}
            target="_blank"
            rel="noreferrer"
          >
            View Resume <FileDown size={18} className={styles.ctaIcon} />
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
          className={styles.statCards}
        >
          <div className={styles.statCard}>
            <h3>Ready</h3>
            <p>To Build</p>
          </div>
          <div className={styles.statCard}>
            <h3>5+</h3>
            <p>Projects</p>
          </div>
          <div className={styles.statCard}>
            <h3>Fast</h3>
            <p>Learner</p>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        className={styles.scrollDown}
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown size={30} color="var(--text-dim)" />
      </motion.a>
    </section>
  );
};

export default Hero;
