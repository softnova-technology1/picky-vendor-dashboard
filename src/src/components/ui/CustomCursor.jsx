import React, { useEffect, useState } from 'react';
import styles from './CustomCursor.module.css';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, [role="button"], .hover-effect')) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className={styles.cursor}
        animate={{
          x: mousePos.x - 4,
          y: mousePos.y - 4,
          scale: hovered ? 1.5 : 1,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.5 }}
      />
      <motion.div
        className={styles.cursorTrail}
        animate={{
          x: mousePos.x - 16,
          y: mousePos.y - 16,
          scale: hovered ? 2 : 1,
          opacity: hovered ? 0.3 : 0.6,
        }}
        transition={{ type: 'spring', damping: 15, stiffness: 100, mass: 0.8 }}
      />
    </>
  );
};

export default CustomCursor;
