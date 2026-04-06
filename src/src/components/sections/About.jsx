import React, { useRef } from 'react';
import styles from './About.module.css';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, Mail, MapPin, Terminal, Cpu, Layout, Globe } from 'lucide-react';
import shanImg from '../../assets/shan.jpg';
import { clsx } from 'clsx';

const About = ({ devMode }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Unique movement for image and content on scroll
  const imageY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const contentY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const rotateImg = useTransform(scrollYProgress, [0, 1], [-2, 2]);

  return (
    <section 
      id="about" 
      className={clsx(styles.aboutSection, devMode && styles.devMode)} 
      ref={containerRef}
    >
      <div className={styles.decorativeNumber}>01</div>
      <div className={styles.verticalTitle}>ABOUT</div>
      
      {/* Dev Mode Floating Elements */}
      {devMode && (
        <div className={styles.codeParticles}>
          <motion.div style={{ y: imageY }} className={styles.codeSnippet}>&lt;section id="about"&gt;</motion.div>
          <motion.div style={{ y: contentY }} className={styles.codeSnippet}>const Profile = () =&gt; &#123;</motion.div>
          <motion.div style={{ y: imageY }} className={styles.codeSnippet}>return &lt;Image src=&#123;shan&#125; /&gt;</motion.div>
        </div>
      )}

      <div className={styles.container}>
        <div className={styles.aboutHeader}>
          <motion.div 
            className={styles.imageSide}
            style={{ y: imageY, rotate: rotateImg }}
          >
            <div className={styles.imageOverlay}>
              <img src={shanImg} alt="Shanmathi R B" className={styles.profileImg} />
              
              {/* Dev Mode UI Layer */}
              {devMode && (
                <div className={styles.uiFrame}>
                  <div className={styles.frameCorner}></div>
                  <div className={styles.frameCorner}></div>
                  <div className={styles.frameCorner}></div>
                  <div className={styles.frameCorner}></div>
                  <span className={styles.scanLine}></span>
                  <div className={styles.metadata}>
                    <span>RESOLUTION: 1080P</span>
                    <span>SOURCE: assets/shan.jpg</span>
                  </div>
                </div>
              )}

              <motion.div 
                className={styles.juniorBadge}
                initial={{ x: 20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className={styles.badgeF}>{devMode ? <Terminal size={20} /> : "F"}</div>
                <div className={styles.badgeText}>
                  <span>{devMode ? "SYSTEM" : "JUNIOR"}</span>
                  <strong>{devMode ? "USER_PROFILER" : "DEVELOPER"}</strong>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            className={styles.textSide}
            style={{ y: contentY }}
          >
            <h2 className={styles.mainHeading}>
               {devMode ? "> SYSTEM_PROFILE" : "I build things for the web."}
            </h2>
            <p className={styles.bioText}>
              I'm <span className={styles.nameHighlight}>Shanmathi R B</span>, a passionate Junior Front-End Developer based in India. My journey in the digital realm started with a curiosity for how pixels move, which led me to specialize in building fast, interactive, and user-friendly web applications.
            </p>

            <div className={styles.detailsGrid}>
              <div className={styles.detailCol}>
                <h4 className={styles.colTitle}>{devMode ? "_CORE_STACK" : "FOCUS"}</h4>
                <ul className={styles.detailList}>
                  <li><ChevronRight size={16} /> HTML</li>
                  <li><ChevronRight size={16} /> CSS</li>
                  <li><ChevronRight size={16} /> JS</li>
                  <li><ChevronRight size={16} /> ReactJS</li>
                  <li><ChevronRight size={16} /> Next JS</li>
                </ul>
              </div>
              <div className={styles.detailCol}>
                <h4 className={styles.colTitle}>{devMode ? "_EDUCATION" : "CREDENTIALS"}</h4>
                <ul className={styles.detailList}>
                  <li><ChevronRight size={16} /> B.Sc Computer Science</li>
                  <li><ChevronRight size={16} /> Frontend Intern @ Softnova</li>
                </ul>
              </div>
            </div>

            <div className={styles.contactCapsules}>
              <div className={styles.capsule}>
               <Mail size={16} /> smily.shanvi6597@gmail.com
              </div>
              <div className={styles.capsule}>
                <MapPin size={16} /> Peravurani, India
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
