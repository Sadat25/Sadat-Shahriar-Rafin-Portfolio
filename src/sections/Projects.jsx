import React, { useMemo, useRef, useState } from 'react'
import { useEffect } from 'react';
import img1 from '../assets/img1.png'
import img2 from '../assets/img2.png'
import img3 from '../assets/img3.png'
import img4 from '../assets/img4.png'
import photo1 from '../assets/photo1.png'
import photo2 from "../../public/photo2.png"
import photo3 from '../assets/photo3.png'
import photo4 from '../assets/photo4.png'
import { AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion';
import { motion } from 'framer-motion';


const useIsMobile = (query = "(max-width: 639px)") => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.matchMedia(query).matches
  )
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(query);
    const handler = (e) => setIsMobile(e.matches);

    mediaQuery.addEventListener("change", handler);
    setIsMobile(mediaQuery.matches);

    return () => mediaQuery.removeEventListener("change", handler);
  }, [query]);

  return isMobile;
}

const Projects = () => {

  const isMobile = useIsMobile();
  const scenRef = useRef(null);

  const projects = useMemo(
    () => [
      {
        title: "E-Commerce",
        link: "https://e-commerce-website-alpha-five.vercel.app/",
        bgColor: "#1E293B",
        img: isMobile ? photo1 : img1
      },
      {
        title: "Finsweet",
        link: "https://finsweet-p4.vercel.app/",
        bgColor: "#1C1E53",
        img: isMobile ? photo2 : img2,
      },
      {
        title: "Pumpinsta",
        link: "https://pumpinsta25.netlify.app/",
        bgColor: "#E90024",
        img: isMobile ? photo3 : img3,
      },
      {
        title: "Todo List",
        link: "https://todos25.netlify.app/",
        bgColor: "#1E293B",
        img: isMobile ? photo4 : img4,
      },
    ],
    [isMobile]
  );

  const { scrollYProgress } = useScroll({
    target: scenRef,
    offset: ["start start", "end end"],
  })
  const thresholds = projects.map((_, i) => (i + 1) / projects.length);
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = thresholds.findIndex((t) => v <= t);
    setActiveIndex(idx === -1 ? thresholds.length - 1 : idx);
  })

  const activeProjects = projects[activeIndex]


  return (
    <section id='projects'
      ref={scenRef}
      className='relative text-white'
      style={{
        height: `${100 * projects.length}vh`,
        backgroundColor: activeProjects.bgColor,
        transition: "background-color 400ms ease"
      }}
    >

      <div className='sticky top-0 h-screen flex flex-col items-center justify-center '>
        <h2 className={`text-3xl font-semibold z-10 text-center ${isMobile ? "mt-4" : "mt-8"}`}>My Work</h2>
        <div className={`relative w-full flex-1 flex items-center justify-center ${isMobile ? "mt-4" : ""}`}>
          {projects.map((project, idx) => (
            <div key={project.title}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${activeIndex === idx ? "opacity-100 z-20" : "opacity-0 z-0 sm:z-10"}`}
              style={{ width: "85%", maxWidth: "1200px" }}
            >
              <AnimatePresence mode='wait'>
                {activeIndex === idx && (
                  <motion.h3 key={project.title}
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`block text-center text-[clamp(2rem,6vw,5rem)] text-white/95 sm:absolute sm:-top-20 sm:left-[35%] lg:left-[-5%] sm:mb-0 italic font-semibold ${isMobile ? "-mt-24" : ""}`}
                    style={{
                      zIndex: 5,
                      textAlign: isMobile ? "center" : "left",
                    }}
                  >{project.title}</motion.h3>
                )}
              </AnimatePresence>

              <div
                className={`relative w-full overflow-hidden shadow-2xl ${isMobile ? "mb-6 rounded-lg" : "mb-10 sm:mb-12 rounded-xl"} h-[62vh] sm:h-[66vh] flex items-center justify-center`}
                style={{
                  zIndex: 10,
                  backgroundColor: project.bgColor,
                  transition: "box-shadow 250ms ease",
                }}
              >
                <img
                  src={project.img}
                  alt={project.title}
                  className="max-w-full max-h-full object-contain drop-shadow-xl md:drop-shadow-2xl"
                  style={{
                    zIndex: 10,
                    filter: "drop-shadow(0px 16px 40px rgba(0,0,0,0.65))",
                    transition: "filter 200ms ease",
                  }}
                  loading="lazy"
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.12) 40%)",
                  }}
                />
              </div>

            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeProjects?.title}
            className={`absolute ${isMobile ? "bottom-20" : "bottom-10"} z-50`}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <motion.a
              href={activeProjects?.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 font-semibold rounded-xl bg-white text-black shadow-lg"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              View Project
            </motion.a>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Projects