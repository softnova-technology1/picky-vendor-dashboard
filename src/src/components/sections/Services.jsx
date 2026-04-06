import React from 'react';
import styles from './Services.module.css';
import { motion } from 'framer-motion';
import { Layout, Codepen, Figma, Smartphone } from 'lucide-react';

const services = [
  {
    id: 1,
    title: "Web Design",
    description: "Creating visually stunning and intuitive digital interfaces that captivate users.",
    icon: <Layout size={40} />,
    color: "var(--primary)"
  },
  {
    id: 2,
    title: "Frontend Development",
    description: "Building fast, responsive, and accessible web applications using modern technologies.",
    icon: <Codepen size={40} />,
    color: "var(--secondary)"
  },
  {
    id: 3,
    title: "UX Strategy",
    description: "Designing user journeys that are meaningful, effective, and conversion-focused.",
    icon: <Figma size={40} />,
    color: "var(--accent)"
  }
];

const Services = () => {
  return (
    <section id="services" className={styles.servicesSection}>
      <div className={styles.decorativeNumber}>04</div>
      <div className={styles.verticalTitle}>SERVICES</div>
      <div className={styles.container}>
        <div className={styles.header}>
          <motion.p 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={styles.eyebrow}
          >
            What I Do
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={styles.title}
          >
            Premium Digital <span className="text-gradient">Solutions.</span>
          </motion.h2>
        </div>

        <div className={styles.grid}>
          {services.map((service, index) => (
            <motion.div 
              key={service.id}
              className={styles.serviceCard}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div 
                className={styles.iconWrapper} 
                style={{ backgroundColor: `rgba(99, 102, 241, 0.1)` }}
              >
                {service.icon}
              </div>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceDesc}>{service.description}</p>
              <motion.div 
                className={styles.cardHover}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                Learn More
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className={styles.englishBack}>SERVICES</div>
    </section>
  );
};

export default Services;
