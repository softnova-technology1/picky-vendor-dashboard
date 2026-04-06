import React, { useState } from 'react';
import styles from './Skills.module.css';
import { motion, AnimatePresence } from 'framer-motion';

const skillsData = [
  { name: 'HTML5', level: 95, category: 'Frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS3', level: 90, category: 'Frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'Bootstrap', level: 85, category: 'Frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
  { name: 'JavaScript', level: 88, category: 'Frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'React JS', level: 92, category: 'Frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Git', level: 80, category: 'Tools', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'GitHub', level: 85, category: 'Tools', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
];

const Skills = () => {
  const [filter, setFilter] = useState('All');

  const filteredSkills = filter === 'All' 
    ? skillsData 
    : skillsData.filter(skill => skill.category === filter);

  return (
    <section id="skills" className={styles.skillsSection}>
      <div className={styles.decorativeNumber}>02</div>
      <div className={styles.verticalTitle}>SKILLS</div>

      <div className={styles.container}>
        <div className={styles.header}>
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={styles.title}
          >
            My Skills
          </motion.h2>
          <p className={styles.subtitle}>Transforming ideas into digital reality with modern tools</p>
        </div>

        <div className={styles.filterTabs}>
          {['All', 'Frontend', 'Tools'].map(tab => (
            <button
              key={tab}
              className={`${styles.filterBtn} ${filter === tab ? styles.active : ''}`}
              onClick={() => setFilter(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <motion.div 
          className={styles.skillsGrid}
          layout
        >
          <AnimatePresence>
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={styles.skillCard}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.iconBox}>
                    <img src={skill.icon} alt={skill.name} className={styles.skillIcon} />
                  </div>
                  <div className={styles.skillInfo}>
                    <h3 className={styles.skillName}>{skill.name}</h3>
                    <div className={styles.progressRow}>
                      <div className={styles.progressBar}>
                        <motion.div 
                          className={styles.progressFill}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                      </div>
                      <span className={styles.percentage}>{skill.level}%</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
