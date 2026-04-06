import React, { useRef } from 'react';
import styles from './DevExperience.module.css';
import { motion, useScroll, useTransform } from 'framer-motion';
import shanImg from '../../assets/shan.jpg';
import img1 from '../../assets/chair1.jpg';
import img2 from '../../assets/flowers.jpg';
import img3 from '../../assets/shofa.jpg';
import img4 from '../../assets/crm.jpg';
import img5 from '../../assets/shoes.jpg';
import { Terminal, Code, Cpu, Database, Globe, Layout, Layers, ExternalLink, Github, Mail, Send, MapPin, X } from 'lucide-react';

const codeLines = [
  "INITIALIZING_CORE_SYSTEM...",
  "CONNECTING_TO_USER_ASSETS...",
  "LOADING_KERNEL_MODULES...",
  "ANALYZING_SKILL_MATRIX...",
  "FETCHING_PORTFOLIO_V2.0...",
  "SUCCESS: ACCESS_GRANTED"
];

const skills = [
  { name: 'HTML5', icon: <Globe size={40} />, color: '#E34F26', level: 95 },
  { name: 'CSS3', icon: <Layout size={40} />, color: '#1572B6', level: 90 },
  { name: 'React', icon: <Cpu size={40} />, color: '#61DAFB', level: 92 },
  { name: 'JavaScript', icon: <Code size={40} />, color: '#F7DF1E', level: 88 },
  { name: 'Git', icon: <Database size={40} />, color: '#F05032', level: 80 },
  { name: 'Framer Motion', icon: <Layers size={40} />, color: '#FF0055', level: 85 },
];

 const galleryData = [
   { img: img1, title: "Modern Furniture", category: "E-Commerce", link: "https://e-commerce-elegant.netlify.app/" },
   { img: img2, title: "Floral Boutique", category: "Shopify Store", link: "https://flowerproject-store.netlify.app/" },
   { img: img3, title: "Addine Decor", category: "Interior Design", link: "https://addina-project.netlify.app/" },
   { img: img4, title: "NextGen CRM", category: "SaaS Dashboard", link: "https://management-crm.netlify.app/" },
   { img: img5, title: "Elite Kicks", category: "Shoe Store", link: "https://shoes-task.netlify.app/" },
 ];
const DevExperience = ({ toggleDevMode, goToContact }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Balanced animation timeline (extended to 1000vh)
  // Stage 0.0 - 0.2: Start Image
  const imageScale = useTransform(scrollYProgress, [0, 0.15], [1.2, 0.4]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.1, 0.15, 0.2], [1, 1, 0.5, 0]);
  
  // Stage 0.2 - 0.4: Code Feed
  const codeOpacity = useTransform(scrollYProgress, [0.2, 0.25, 0.35, 0.42], [0, 1, 1, 0]);
  
  // Stage 0.45 - 0.7: Skills
  const skillsOpacity = useTransform(scrollYProgress, [0.45, 0.52, 0.65, 0.72], [0, 1, 1, 0]);
  const skillsScale = useTransform(scrollYProgress, [0.45, 0.55], [0.8, 1]);
  const skillsY = useTransform(scrollYProgress, [0.65, 0.72], [0, -100]);

  // Stage 0.75 - 0.95: Projects (Increased stay time)
  const projectsOpacity = useTransform(scrollYProgress, [0.72, 0.78, 0.88, 0.92], [0, 1, 1, 0]);
  const projTitleOpacity = useTransform(scrollYProgress, [0.72, 0.75, 0.84, 0.88], [0, 1, 1, 0]);
  const projectsY = useTransform(scrollYProgress, [0.72, 0.8, 0.86, 0.92], [200, 0, 0, -120]);

  // Stage 0.93 - 1.0: Contact (Stays focused at the end)
  const contactOpacity = useTransform(scrollYProgress, [0.88, 0.93, 1.0], [0, 1, 1]);
  const contactScale = useTransform(scrollYProgress, [0.9, 0.96], [0.85, 1]);
  const contactY = useTransform(scrollYProgress, [0.88, 0.93], [100, 0]);

  // Pointer events management to prevent overlapping invisible scenes
  const skillsPointer = useTransform(skillsOpacity, [0, 0.1], ["none", "auto"]);
  const projectsPointer = useTransform(projectsOpacity, [0, 0.1], ["none", "auto"]);
  const contactPointer = useTransform(contactOpacity, [0, 0.1], ["none", "auto"]);

  return (
    <div className={styles.devViewport} ref={containerRef}>
      {/* Sticky content container */}
      <div className={styles.stickyWrapper}>
        <div className={styles.devGrid}></div>
        
        {/* System Dashboard Bar */}
        <div className={styles.systemBar}>
          <div className={styles.systemInfo}>
            <Terminal size={14} /> <span>USER: SHANMATHI | MODE: DEV_INTERACTIVE</span>
          </div>
          <div className={styles.progressBar}>
            <motion.div 
              className={styles.progressFill} 
              style={{ width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
            />
          </div>
          <button className={styles.exitButton} onClick={toggleDevMode}>
            <X size={16} /> [ RETURN_DEV_OFF ]
          </button>
        </div> 

        {/* Level 1: Central Image Matrix */}
        <motion.div 
          className={styles.imageOverlay}
          style={{ scale: imageScale, opacity: imageOpacity }}
        >
          <div className={styles.glitchBox}>
            <img src={shanImg} alt="Shanmathi" className={styles.mainImg} />
            <div className={styles.glitchLayer}></div>
            <div className={styles.glitchLayer}></div>
          </div>
          <h2 className={styles.introName}>SHANMATHI R B</h2>
          <p className={styles.scrollHint}>SCROLL TO INITIALIZE_SEQUENCE</p>
        </motion.div>

        {/* Level 2: Real-time Code Stream */}
        <motion.div 
          className={styles.codeFeed}
          style={{ opacity: codeOpacity }}
        >
          {codeLines.map((line, f) => (
            <div key={f} className={styles.codeRow}>
              <span className={styles.prefix}>&gt;</span> {line}
            </div>
          ))}
        </motion.div>

        {/* Level 3: Final Skill Matrix */}
        <motion.div 
          className={styles.skillsScene}
          style={{ 
            opacity: skillsOpacity, 
            scale: skillsScale, 
            y: skillsY,
            pointerEvents: skillsPointer 
          }}
        >
          <div className={styles.hexContainer}>
            <h3 className={styles.hexTitle}>CORE_SKILLSET</h3>
            <div className={styles.skillsGrid}>
              {skills.map((skill) => (
                <motion.div 
                  key={skill.name}
                  className={styles.skillHex}
                  whileHover={{ scale: 1.05, borderColor: '#B8960B' }}
                >
                  <div className={styles.hexIcon} style={{ color: '#B8960B' }}>{skill.icon}</div>
                  <span className={styles.hexLabel}>{skill.name}</span>
                  <div className={styles.skillOverlay}>
                    <span className={styles.overlayPercent}>{skill.level}%</span>
                    <div className={styles.overlayBar}>
                      <div 
                        className={styles.overlayFill}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Level 4: Project Repositories */}
        <motion.div 
          className={styles.projectsScene}
          style={{ 
            opacity: projectsOpacity, 
            y: projectsY,
            pointerEvents: projectsPointer
          }}
        >
          <div className={styles.projContainer}>
            <motion.h3 
              className={styles.projTitle}
              style={{ opacity: projTitleOpacity }}
            >
              PROJECT_REPOSITORY
            </motion.h3>
            <div className={styles.projGrid}>
              {galleryData.map((project, index) => (
                <motion.a
                  key={index}
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ 
                    y: -15,
                    scale: 1.02,
                    boxShadow: "0 25px 50px rgba(184, 150, 11, 0.15)"
                  }}
                  className={styles.projCard}
                >
                  <div className={styles.projImgContainer}>
                    <img src={project.img} alt={project.title} className={styles.projImg} />
                    <div className={styles.hoverContent}>
                      <span className={styles.viewLink}>Explore Project</span>
                    </div>
                  </div>
                  <div className={styles.projMeta}>
                    <h4 className={styles.title}>{project.title}</h4>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Level 5: Secure Communication Channel */}
        <motion.div 
          className={styles.contactScene}
          style={{ 
            opacity: contactOpacity, 
            scale: contactScale, 
            y: contactY,
            pointerEvents: contactPointer
          }}
        >
          <div className={styles.contactShell}>
            <h3 className={styles.shellTitle}>&gt; CONNECT_DEVELOPER</h3>
            <div className={styles.contactNodes}>
              <div className={styles.node}>
                <Mail className={styles.nodeIcon} />
                <span>smily.shanvi6597@gmail.com</span>
              </div>
              <div className={styles.node}>
                <MapPin className={styles.nodeIcon} />
                <span>PERAVURANI, INDIA</span>
              </div>
            </div>
            <motion.button 
              onClick={goToContact}
              className={styles.pingButton}
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px #B8960B" }}
              whileTap={{ scale: 0.95 }}
            >
              <Send size={18} /> PING_DEVELOPER
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* This creates the scroll length */}
      <div className={styles.scrollDepth}></div>
    </div>
  );
};

export default DevExperience;
