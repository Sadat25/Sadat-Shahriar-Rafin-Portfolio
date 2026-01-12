import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";

const IntroAnimation = ({ onFinish }) => {
  const greetings = useMemo(
    () => [
      "Hello",
      "Hola",
      "Merhaba",
      "Ciao",
      "Olá",
      "Здравствуйте",    
      "Hej",
      "Hallo",
      "Salam",
    ],   
    []        
  );
              
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);                

  useEffect(() => {         
    if (index < greetings.length - 1) {
      const t = setTimeout(() => {
        setIndex((i) => i + 1);    
      }, 200); 

      return () => clearTimeout(t);
    }

    const endTimer = setTimeout(() => {
      setVisible(false);
    }, 350); 

    return () => clearTimeout(endTimer);
  }, [index, greetings.length]);

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={onFinish}
    >
      {visible && (
        <motion.div
          className="fixed inset-0 z-9999 flex items-center justify-center bg-[#0B3533] text-white"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: {
              duration: 1.1,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
        >
          <motion.h1
            key={index}
            className="text-5xl md:text-7xl lg:text-8xl font-bold"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
          >
            {greetings[index]}
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroAnimation;
