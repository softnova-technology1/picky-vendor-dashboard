import React from "react";
import styles from "./Projects.module.css";
import { motion } from "framer-motion";
import img1 from "../../assets/chair1.jpg";
import img2 from "../../assets/flowers.jpg";
import img3 from "../../assets/shofa.jpg";
import img4 from "../../assets/crm.jpg";
import img5 from "../../assets/shoes.jpg";

const galleryData = [
  { img: img1, title: "Modern Furniture", category: "E-Commerce", link: "https://e-commerce-elegant.netlify.app/" },
  { img: img2, title: "Floral Boutique", category: "Shopify Store", link: "https://flowerproject-store.netlify.app/" },
  { img: img3, title: "Addine Decor", category: "Interior Design", link: "https://addina-project.netlify.app/" },
  { img: img4, title: "NextGen CRM", category: "SaaS Dashboard", link: "https://management-crm.netlify.app/" },
  { img: img5, title: "Elite Kicks", category: "Shoe Store", link: "https://shoes-task.netlify.app/" },
];

const Gallery = () => {
  return (
    <section className={styles.gallerySection} id="projects">
      {/* Background Decor */}
      <div className={styles.sectionHeading}>
        <span className={styles.number}>03</span>
        <h2 className={styles.verticalText}>PROJECTS</h2>
      </div>

      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className={styles.header}
        >
          <h2 className="gradient-text">Recent Work</h2>
          <p className={styles.subtitle}>A collection of projects built with precision and passion</p>
        </motion.div>

        <div className={styles.grid}>
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
                y: -10,
              }}
              className={styles.card}
            >
              <div className={styles.imageOverlay}>
                <img src={project.img} alt={project.title} className={styles.cardImg} />
                <div className={styles.index}>0{index + 1}</div>
                
                <div className={styles.hoverTarget}>
                   <div className={styles.viewPrompt}>
                      <span>VIEW PROJECT</span>
                      <div className={styles.line}></div>
                   </div>
                </div>
              </div>

              <div className={styles.cardFooter}>
                <div className={styles.textStack}>
                  <h3 className={styles.title}>{project.title}</h3>
                </div>
                <div className={styles.arrowIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
