import { useScroll, useTransform, motion } from "framer-motion"
import React, { useEffect, useMemo, useRef, useState } from "react"

const experience = [
  {
    role: "Wordpress Developer",
    company: "Consumer-Based (Startup)",
    duration: "Feb 2025 - May 2025",
    description:
      "Built and customized responsive WordPress websites with a focus on UI, theme customization, and client requirements.",
  },
  {
    role: "Frontend Developer (Intern)",
    company: "Bright Sill Ltd.",  
    duration: "Oct 2025 - Jan 2025",
    description:  
      "Led a team of frontend developers on production-like projects using React and Tailwind CSS, managing tasks, Git workflows, and code reviews.",
  },      
  {
    role: "Frontend Developer",
    company: "Upcoming",             
    duration: "Future",
    description:
      "Continuously improving skills in modern JavaScript, React, and UI development to prepare for future frontend roles.",
  },  
]

function ExperienceItem({ exp, idx, start, end, scrollYProgress, layout }) {
  const scale = useTransform(scrollYProgress, [start, end], [0.1, 1])
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1])
  const y = useTransform(
    scrollYProgress,
    [start, end],
    [idx % 2 === 0 ? 30 : -30, 0]
  )
  const x = useTransform(
    scrollYProgress,
    [start, end],
    [-24, 0]
  )
  if (layout === "desktop") {
    return (
      <div className="relative flex flex-1 justify-center items-center min-w-0">
        <motion.div
          className="z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.1)]"
          style={{ scale, opacity }}
        />
        <motion.div
          className={`absolute ${idx % 2 === 0 ? "-top-8" : "-bottom-8"} w-0.5 bg-white/40`}
          style={{ height: 40, opacity }}
        />
        <motion.article
          className={`absolute ${idx % 2 === 0 ? "bottom-15" : "top-12"}
           bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-7 w-[320px] shadow-lg`}
          style={{ opacity, y, maxWidth: "90vw" }}
          transition={{ duration: 0.4, delay: idx * 0.15 }}
        >
          <h3 className="text-xl font-semibold">{exp.role}</h3>
          <p className="text-md text-gray-400">{exp.company}</p>
          <p className="text-md text-gray-400 mb-3">{exp.duration}</p>
          <p className="text-md text-gray-300">{exp.description}</p>
        </motion.article>
      </div>
    )
  }
  return (
    <div className="relative flex items-start">
      <motion.div className="absolute -left-3.5 top-3 z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.1)]"
        style={{ scale, opacity }}
      >
      </motion.div>
      <motion.article className="bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-5 w-[90vw] max-w-sm ml-6 shadow-lg "
        style={{ scale, x }}
        transition={{ duration: 0.4, delay: idx * 0.15 }}
      >
        <h3 className="text-xl font-semibold wrap-break-word">{exp.role}</h3>
        <p className="text-sm text-gray-400 wrap-break-word">{exp.company}</p>
        <p className="text-sm text-gray-400 wrap-break-word mb-3">{exp.duration}</p>
        <p className="text-sm text-gray-300 wrap-break-word">{exp.description}</p>
      </motion.article>
    </div>
  )

}

const Experience = () => {
  const sceneRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const SCENE_HEIGHT_VH = isMobile ? 160 * experience.length : 120 * experience.length;

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  })

  const thresholds = useMemo(
    () => experience.map((_, i) => (i + 1) / experience.length),
    []
  )

  const lineSize = useTransform(scrollYProgress, (v) => `${v * 100}%`)

  return (
    <section id="experience" className="relative min-h-screen bg-black text-white">
      <div
        ref={sceneRef}
        className="relative overflow-visible"
        style={{ height: `${SCENE_HEIGHT_VH}vh`, minHeight: "120vh" }}
      >
        <div className="sticky top-0 h-screen flex flex-col">
          <h2 className="text-5xl font-semibold mt-6 text-center">
            Experience
          </h2>

          <div className="flex flex-1 items-center justify-center px-6 pb-10">
            {!isMobile && (
              <div className="relative w-full max-w-7xl">
                <div className="relative h-1.5 bg-white/15 rounded">
                  <motion.div
                    className="absolute left-0 top-0 h-1.5 bg-white rounded origin-left"
                    style={{ width: lineSize }}
                  />
                </div>

                <div className="relative flex justify-between mt-0">
                  {experience.map((exp, idx) => (
                    <ExperienceItem
                      key={idx}
                      exp={exp}
                      idx={idx}
                      start={idx === 0 ? 0 : thresholds[idx - 1]}
                      end={thresholds[idx]}
                      scrollYProgress={scrollYProgress}
                      layout={"desktop"}
                    />
                  ))}
                </div>
              </div>
            )}

            {isMobile && (
              <div className="relative w-full max-w-md">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 h-full bg-white/15 rounded">
                  <motion.div
                    className="absolute top-0 left-0 bg-white rounded origin-top w-1.5"
                    style={{ height: lineSize }}
                  />
                </div>

                <div className="relative flex flex-col gap-10 ml-10 mt-6 pb-28">
                  {experience.map((exp, idx) => (
                    <ExperienceItem
                      key={idx}
                      exp={exp}
                      idx={idx}
                      start={idx === 0 ? 0 : thresholds[idx - 1]}
                      end={thresholds[idx]}
                      scrollYProgress={scrollYProgress}
                      layout={"mobile"}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
