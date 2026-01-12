import React from 'react'
import { motion } from 'framer-motion'
import ps from '../assets/Photo.jpeg'
import p from '../assets/Photos.jpeg'

const About = () => {

  const stats = [
    { lable: "Experience", value: "1+ years" },
    { lable: "Speciality", value: "Front-End" },
    { lable: "Focus", value: "performance & UX" }
  ]

  const glows = [
    "-top-10 -left-10 w-[360px] h-[360px] opacity-20 blur-[120px]",
    "bottom-0 right-10 w-[420px] h-[420px] opacity-15 blur-[140px] delay-300",
    "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] opacity-10 blur-[100px]"
  ]

  return (
    <section id='about'
      className='min-h-screen w-full flex items-center justify-center relative bg-black text-white overflow-hidden'>
      <div className='absolute inset-0 pointer-events-none'>
        {glows.map((c, i) => (
          <div key={i} className={`absolute rounded-full bg-linear-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] animate-pulse ${c}`} />
        ))}
      </div>
      <div className='relative z-10 max-w-6xl w-full mx-auto px-6 md:px-10 lg:px-12 py-20 flex flex-col gap-12'>
        <motion.div className="flex flex-col md:flex-row items-center md:items-stretch gap-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.div className='relative w-40  h-40 md:w-50 md:h-50 rounded-2xl overflow-hidden shadow-2xl bg-linear-to-br from-[#1cd8d2]/20 to-[#302b63]/20 border border-[#1cd8d2]/25 '
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
          >
            <img src={p} alt="Profile" className='absolute inset-0' />
            {/* <img src={ps} alt="Profile" className='absolute inset-0' /> */}
          </motion.div>

          <div className='flex-1 flex flex-col justify-center text-center md:text-left '>
            <h2 className='text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-[#1cd8d2] via-[#00bf8f] to-[#1cd8d2]'>Sadat Shahriar Rafin</h2>
            <p className='mt-2 text-lg sm:text-xl text-white/90 font-semibold '>Front-End Developer</p>
            <p className='mt-4 text-gray-300 leading-relaxed text-base sm:text-lg max-w-2xl md:max-w-3xl '>
              I’m a frontend developer who loves turning ideas into clean, engaging, and high-performance user interfaces. I focus on building modern, scalable web experiences where thoughtful design meets smooth interactions and strong performance. Using React, Next.js, JavaScript, Bootstrap and Tailwind CSS, I craft responsive, accessible interfaces that feel intuitive and enjoyable to use—from the first click to the final detail.
            </p>
            <div className='mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-xl'>
              {stats.map((item, i) => (
                <motion.div key={i} className='rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center '
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.05 * i, delay: 0.4 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className='text-sm text-gray-400'>{item.lable}</div>
                  <div className='font-semibold'>{item.value}</div>
                </motion.div>
              ))}
            </div>

            <div className='mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start'>
              <a href="#projects" className='inline-flex items-center justify-center rounded-lg bg-white text-black font-semibold px-5 py-3 hover:bg-gray-300 transition'>View Project</a>
              <a href="#contact" className='inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white font-semibold px-5 py-3 hover:bg-white/20 transition'>Get in Touch</a>
            </div>

          </div>

        </motion.div>

        <motion.div className='text-center md:text-left '
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <h3 className='text-2xl sm:text-3xl font-bold text-white mb-3'>About Me</h3>
          <p className='text-gray-300 leading-relaxed sm:text-lg'>I’m a frontend-focused software developer passionate about building modern, fast, and user-friendly web applications. I enjoy turning ideas into clean, scalable interfaces with a strong focus on performance, usability, and visual clarity. I work with modern frontend technologies to create digital experiences that feel intuitive and reliable for users around the world.</p>
        </motion.div>

      </div>

    </section>
  )
}

export default About