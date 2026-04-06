import React, { useState, useEffect } from 'react';
import styles from './Background.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

const Background = ({ devMode }) => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const [particles] = useState(() => {
    return [...Array(20)].map(() => ({
      xPath: [Math.random() * 100, Math.random() * -100, Math.random() * 100],
      yPath: [Math.random() * 100, Math.random() * -100, Math.random() * 100],
      duration: Math.random() * 10 + 10,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      scale: Math.random() * 1.5 + 0.5,
    }));
  });

  const [binaryStreams] = useState(() => {
    return [...Array(5)].map(() => (Math.random() > 0.5 ? "1010101100" : "0011001010"));
  });

  return (
    <div className={clsx(styles.backgroundContainer, devMode && styles.devMode)}>
      <div className={styles.overlay}></div>
      
      {/* Dev Mode Matrix/Grid Overlay */}
      <AnimatePresence>
        {devMode && (
          <motion.div 
            className={styles.devBackground}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
          >
            <div className={styles.gridLines}></div>
            <div className={styles.binaryStream}>
              {binaryStreams.map((text, i) => (
                <motion.div 
                  key={i}
                  className={styles.binaryCol}
                  animate={{ y: ["-100%", "100%"] }}
                  transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
                >
                  {text}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div 
        className={styles.mouseFollower} 
        style={{ left: `${mousePos.x}%`, top: `${mousePos.y}%` }}
      ></div>
      <div className={styles.particleContainer}>
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className={styles.particle}
            animate={{
              x: p.xPath,
              y: p.yPath,
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              left: p.left,
              top: p.top,
              scale: p.scale,
            }}
          />
        ))}
      </div>
      <div className={styles.blobs}>
        <div className={styles.blob1}></div>
        <div className={styles.blob2}></div>
        <div className={styles.blob3}></div>
      </div>
    </div>
  );
};

export default Background;
