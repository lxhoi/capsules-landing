import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import './LoadingScreen.css';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          return 100;
        }
        return prev + 2;
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="loading-overlay"
      initial={{ opacity: 1 }}
      animate={{ 
        opacity: isComplete ? 0 : 1,
        clipPath: isComplete ? "inset(0 0 100% 0)" : "inset(0 0 0 0)"
      }}
      exit={{ 
        opacity: 0,
        clipPath: "inset(0 0 100% 0)"
      }}
      transition={{ 
        duration: 1,
        ease: [0.4, 0, 0.2, 1]
      }}
    >
      <div className="loading-container">
        <div className="pill-bar">
          <motion.div
            className="pill-progress"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'linear', duration: 0.04 }}
          />
        </div>
        <div className="loading-text">Loading...</div>
      </div>
    </motion.div>
  );
} 