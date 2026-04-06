import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import styles from './Contact.module.css';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';

const Contact = () => {
  const formRef = useRef(null);
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_7pm66nn',
      'template_e4yvn0c',
      e.target,
      'TFYCoxnoh3Oi4SMYl'
    )
      .then(() => {
        alert("Message Sent Successfully ✅");
      }, (_error) => {
        alert("Failed ❌");
      });

    e.target.reset();
  };

  return (
    <section id="contact" className={styles.contactSection}>
      <div className={styles.decorativeNumber}>04</div>
      <div className={styles.verticalTitle}>CONTACT</div>
      <div className={styles.container}>
        <div className={styles.header}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={styles.title}
          >
            Get In <span className="text-gradient">Touch.</span>
          </motion.h2>
          <p className={styles.subtitle}>Have a project in mind or just want to say hello? Let's connect.</p>
        </div>

        <div className={styles.grid}>
          <motion.div
            className={styles.infoWrapper}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className={styles.infoItem}>
              <div className={styles.iconBox}><Mail size={24} /></div>
              <div className={styles.infoText}>
                <h4>Email</h4>
                <p>hello@shanmathi.dev</p>
              </div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.iconBox}><Phone size={24} /></div>
              <div className={styles.infoText}>
                <h4>Phone</h4>
                <p>+91 98765 43210</p>
              </div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.iconBox}><MapPin size={24} /></div>
              <div className={styles.infoText}>
                <h4>Location</h4>
                <p>Chennai, Tamil Nadu</p>
              </div>
            </div>

            <div className={styles.socialGroup}>
              <a href="#" className={styles.socialLink}><Github size={24} /></a>
              <a href="#" className={styles.socialLink}><Linkedin size={24} /></a>
              <a href="#" className={styles.socialLink}><Twitter size={24} /></a>
            </div>
          </motion.div>

          <motion.form
            className={styles.formWrapper}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}

            ref={formRef} onSubmit={sendEmail}
          >
            <div className={styles.inputGroup}>
              <label htmlFor="name">Full Name</label>
              <input type="text" name="user_name" placeholder="John Doe" required />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email Address</label>
              <input type="email" name="user_email" placeholder="john@example.com" required />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="message">Your Message</label>
              <textarea name="user_message" placeholder="Your message" required></textarea>
            </div>

            <motion.button
              type="submit"
              className={styles.submitBtn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message <Send size={20} />
            </motion.button>
          </motion.form>
        </div>
      </div>

      <div className={styles.englishBack}>CONNECT</div>
    </section>
  );
};

export default Contact;
