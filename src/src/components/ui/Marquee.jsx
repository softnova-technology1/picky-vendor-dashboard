import React from 'react';
import styles from './Marquee.module.css';

const Marquee = () => {
  const words = [
    "FRONT-END DEVELOPER",
    "UI Designer",
    "REACT Developer",
    "CREATIVE THINKER"
  ];

  return (
    <div className={styles.marqueeContainer}>
      <div className={styles.marqueeTrack}>
        {/* We duplicate the words array multiple times to create a seamless infinite loop */}
        {[...Array(3)].map((_, i) => (
          <div key={i} className={styles.marqueeGroup}>
            {words.map((word, index) => (
              <React.Fragment key={`${i}-${index}`}>
                <span className={styles.marqueeWord}>{word}</span>
                <span className={styles.marqueeSeparator}>✦</span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
