import './App.css';
import { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useTransform, useScroll, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import LoadingScreen from './LoadingScreen';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

// Add this at the top, after imports
const galleryImages = [
  "g1.png",
  "g2.png",
  "g3.png",
  "g4.png",
  "g5.png",
  "g6.png",
  "g7.png",
  "g8.png",
  "g9.png",
  "g10.png",
  "g11.png",
  "g12.png",
  "g13.png",
  "g14.png",
  "g15.png",
];

function App() {
  // Menu open state
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Refs for GSAP animations
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const galleryRef = useRef(null);
  const welcomeRef = useRef(null);

  // Use framer-motion's useScroll for real-time scroll tracking
  const { scrollY } = useScroll();
  // Smoother spring for scroll value
  const springY = useSpring(scrollY, { stiffness: 40, damping: 30, mass: 1 });
  // Map scroll to scale: 1.05 at top, 1.0 at scrollY=600
  const scale = useTransform(springY, [0, 600], [1.05, 1]);
  // Map scroll to gradient overlay
  const bgStyle = {
    background: `linear-gradient(120deg, #181818 ${40 + 0.2 * scrollY.get()}%, #3a2c1a ${60 + 0.3 * scrollY.get()}%)`,
    transition: 'background 0.2s',
  };

  // Animate logo-title on scroll: shrink and fade out as user scrolls down
  const logoScale = useTransform(springY, [0, 200], [1, 0.7]);
  const logoOpacity = useTransform(springY, [0, 200], [1, 0.3]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // GSAP Animations
  useEffect(() => {
    if (!loading) {
      // Hero section animation
      gsap.from(heroRef.current, {
        duration: 0.8,
        y: 50,
        opacity: 0,
        ease: "power2.out"
      });

      // Logo title animation
      gsap.from(".logo-title", {
        duration: 0.6,
        y: -100,
        opacity: 0,
        scale: 0.8,
        ease: "back.out(1.7)",
        delay: 0.2
      });

      // Logo title sup animation
      gsap.from(".logo-title sup", {
        duration: 0.5,
        y: 50,
        opacity: 0,
        scale: 0.5,
        ease: "back.out(1.7)",
        delay: 0.3
      });

      // Features section animation
      const featuresText = document.querySelector('.features-text');
      if (featuresText) {
        // Split text into lines
        const splitText = new SplitText(featuresText, { type: "lines" });
        gsap.set(splitText.lines, { opacity: 0, y: 40 });
        gsap.to(splitText.lines, {
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 60%",
            end: "center center",
            toggleActions: "play none none reverse"
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out"
        });
      }

      // Overlay animation
      const overlay = document.querySelector('.features-text-overlay');
      if (overlay) {
        gsap.fromTo(overlay, {
          opacity: 0.4
        }, {
          opacity: 0,
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top top",
            end: "top 70%",
            scrub: true
          },
          ease: "none"
        });
      }

      // Gallery section animation
      gsap.from(".gallery-img", {
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top center",
          toggleActions: "play none none reverse"
        },
        duration: 1,
        scale: 0.8,
        opacity: 0,
        stagger: 0.3,
        ease: "power2.out"
      });

      // Welcome section animation
      gsap.from(welcomeRef.current, {
        scrollTrigger: {
          trigger: welcomeRef.current,
          start: "top center",
          toggleActions: "play none none reverse"
        },
        duration: 1.2,
        y: 100,
        opacity: 0,
        ease: "power3.out"
      });

      // Menu button hover animation
      gsap.to(".menu-btn", {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
        paused: true,
        yoyo: true,
        repeat: 1
      });
    }
  }, [loading]);

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen />}
      </AnimatePresence>
      {/* Sticky menu/close button always visible */}
      <button 
        className={`menu-btn sticky-menu${menuOpen ? ' menu-open' : ''}`} 
        onClick={() => setMenuOpen(v => !v)}
        onMouseEnter={(e) => gsap.to(e.target, { scale: 1.05, duration: 0.3 })}
        onMouseLeave={(e) => gsap.to(e.target, { scale: 1, duration: 0.3 })}
      >
        <div className="text-container">
          <span className="text menu">Menu</span>
          <span className="text close">Close</span>
        </div>
        <span className="menu-icon">{menuOpen ? '✕' : '≡'}</span>
      </button>
      {!loading && (
        <div className="landing-root" style={bgStyle}>
          {/* Animated background image with inside padding */}
          <div className="bg-image-wrapper">
            <motion.div
              className="bg-image"
              style={{ scale }}
              aria-hidden="true"
            />
          </div>
          {/* Hero Section */}
          <div className="hero-section" ref={heroRef}>
            {/* Hero Headline and Reserve Button */}
            <div className="hero-header">
              <motion.div
                className="logo-title"
                style={{ scale: logoScale, opacity: logoOpacity }}
              >
                Capsules<sup>®</sup>
              </motion.div>
              <button className="reserve-btn">
                Reserve <span className="arrow">↗</span>
              </button>
            </div>
            {/* Bottom Left Text */}
            <div className="bottom-left-text">
              Closer to<br />Nature—Closer<br />to Yourself
            </div>
            {/* Bottom Right Description */}
            <div className="bottom-right-desc">
              Spend unforgettable and remarkable time<br />in the Californian desert with—Capsules.
            </div>
          </div>

          {/* Features Section */}
          <section className="features-section" ref={featuresRef}>
            <div className="features-content" style={{ position: 'relative' }}>
              <div className="features-text-overlay"></div>
              <p className="features-text">
                Welcome to a world of wild California<br />
                desert with Capsules®, where you will<br />
                discover exquisite nature observing it<br />
                from capsule houses, nestled in the<br />
                one of the most breathtaking<br />
                destination on the United States.
              </p>
            </div>
          </section>

          {/* About Section */}
          <section className="about-section">
            <div className="about-content">
              <h2>About Capsules</h2>
              <p>Capsules is a new way to experience the wild beauty of the California desert. Our mission is to bring you closer to nature while providing comfort, privacy, and inspiration.</p>
            </div>
          </section>

          {/* Gallery Section */}
          <section className="gallery-section" ref={galleryRef}>
            <h2 className="gallery-title">Gallery</h2>
            <p className="gallery-desc">A glimpse into the Capsules experience—nature, architecture, and unforgettable moments.</p>
            <div className="gallery-grid">
              {galleryImages.map((img, idx) => (
                <img
                  key={img}
                  src={`/${img}`}
                  alt={`Gallery image ${idx + 1}`}
                  className="gallery-img"
                />
              ))}
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="testimonials-section">
            <h2>What Our Guests Say</h2>
            <div className="testimonials-row">
              <div className="testimonial-card">
                <p>"A magical escape! The desert views are unforgettable."</p>
                <span>— Alex</span>
              </div>
              <div className="testimonial-card">
                <p>"The capsule was cozy, stylish, and so peaceful."</p>
                <span>— Jamie</span>
              </div>
              <div className="testimonial-card">
                <p>"We loved the stargazing and the privacy. 10/10!"</p>
                <span>— Morgan</span>
              </div>
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="cta-section">
            <h2>Ready for Your Desert Adventure?</h2>
            <button className="reserve-btn cta-btn">Reserve Now</button>
          </section>

          {/* FAQ Section */}
          <section className="faq-section">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-list">
              <div className="faq-item">
                <h4>What is included in a stay?</h4>
                <p>Each capsule includes a private bathroom, luxury bedding, and access to all amenities.</p>
              </div>
              <div className="faq-item">
                <h4>Is it family friendly?</h4>
                <p>Absolutely! We welcome families and provide activities for all ages.</p>
              </div>
              <div className="faq-item">
                <h4>How do I get there?</h4>
                <p>We'll send you detailed directions after you book. Parking is available on site.</p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="footer">
            <div>© {new Date().getFullYear()} Capsules. All rights reserved.</div>
            <div className="footer-links">
              <a href="#">Instagram</a> | <a href="#">Facebook</a> | <a href="#">Contact</a>
            </div>
          </footer>

          {/* Welcome Section */}
          <section className="welcome-section" id="welcome" ref={welcomeRef}>
            <h1 className="welcome-title">
              Welcome to a world of wild California desert with Capsules<sup>®</sup>, where you will discover exquisite nature observing it from capsule houses, nestled in the one of the most breathtaking <span className="muted">destination on the United States.</span>
            </h1>
            <div className="welcome-images-row">
              <img className="welcome-img" src="/welcome1.jpg" alt="Desert night" />
              <img className="welcome-img" src="/welcome2.jpg" alt="Campfire" />
            </div>
            <div className="welcome-desc">
              A place where you can be with yourself and your loved ones.<br />
              A place where you can experience unforgettable desert things.
            </div>
          </section>
          {/* Animated menu overlay */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                className="menu-overlay"
                initial={{ 
                  clipPath: "circle(0% at 50% 97%)",
                  opacity: 0 
                }}
                animate={{ 
                  clipPath: "circle(150% at 50% 97%)",
                  opacity: 1 
                }}
                exit={{ 
                  clipPath: "circle(0% at 50% 97%)",
                  opacity: 0 
                }}
                transition={{ 
                  duration: 0.8,
                  ease: [0.4, 0, 0.2, 1]
                }}
              >
                <motion.nav 
                  className="menu-nav"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <a href="#welcome" onClick={() => setMenuOpen(false)}>Welcome</a>
                  <a href="#introduction" onClick={() => setMenuOpen(false)}>Introduction</a>
                  <a href="#houses" onClick={() => setMenuOpen(false)}>Houses</a>
                  <a href="#feedback" onClick={() => setMenuOpen(false)}>Feedback</a>
                </motion.nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
}

export default App;
