import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Background from './components/background/Background';
import CustomCursor from './components/ui/CustomCursor';
import Loader from './components/ui/Loader';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Skill from './components/sections/Skills'; // Fix existing typing if necessary, but keep as is
import Marquee from './components/ui/Marquee';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';
import DevExperience from './components/sections/DevExperience';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [devMode, setDevMode] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const toggleDevMode = () => {
     setDevMode(!devMode);
     window.scrollTo(0, 0);
  };

  const goToContactFromDev = () => {
    setDevMode(false);
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        const yOffset = -80; // Navbar height
        const y = contactSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <>
      <Loader isLoading={isLoading} />
      <motion.div
        className="scroll-progress-bar"
        style={{ scaleX }}
      />
      
      {!isLoading && (
        <div className={`main-content ${devMode ? 'dev-mode-enabled' : ''}`}>
          <Navbar devMode={devMode} toggleDevMode={toggleDevMode} />
          
          <AnimatePresence mode="wait">
            {!devMode ? (
              <motion.div
                key="normal-mode"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Background devMode={false} />
                <Hero devMode={false} />
                <Marquee />
                <About devMode={false} />
                <Skills devMode={false} />
                <Projects devMode={false} />
                <Contact devMode={false} />
                <Footer devMode={false} />
              </motion.div>
            ) : (
              <motion.div
                key="dev-experience"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <DevExperience 
                  toggleDevMode={toggleDevMode} 
                  goToContact={goToContactFromDev} 
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
}

export default App;
