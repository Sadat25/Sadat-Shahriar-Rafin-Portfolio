import React from 'react'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6'
import { motion } from 'framer-motion'

const socials = [
  { Icon: FaLinkedinIn, label: "LinkedIn", href: "https://www.linkedin.com/in/sadat-shahriar-rafin-68274a35b/" },
  { Icon: FaGithub, label: "Github", href: "https://github.com/Sadat25" }
]

const glow = {
  initial: { scale: 1, y: 0, filter: "drop-shadow(0 0 0 rgba(0,0,0,0))" },
  hover: {
    scale: 1.2, y: -3,
    filter: "drop-shadow(0 0 8px rgba(13,88,204,0.9)) drop-shadow(0 0 18px rgba(16,185,129,0.8))",
    transition: { type: "spring", stiffness: 300, damping: 15 }
  },
  tap: { scale: 0.95, y: 0, transition: { duration: 0.08 } }
}

const Footer = () => {
  return (
    <footer className='relative overflow-hidden bg-black'>
      <motion.div className='relative z-10 px-4 sm:p-8 lg:px-10 py-16 md:py-20 flex flex-col items-center text-center space-y-6'
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1
          className="text-center select-none text-white font-bold text-3xl sm:text-4xl md:text-6xl lg:text-7xl lg:whitespace-nowrap"
          style={{
            letterSpacing: "0.02em",
            lineHeight: 0.9,
            padding: "0.3vw",
            textShadow: "0 2px 18px rgba(0,0,0,0.45)"
          }}
        >
          Sadat Shahriar Rafin
        </h1>

        <div className='h-0.75 w-24 md:w-32 rounded-full bg-linear-to-r from-[#0d58cc] via-cyan-300 to-emerald-400 ' />
        <div className='flex gap-5 text-2xl md:text-3xl'>
          {socials.map(({ Icon, label, href }) => (
            <motion.a href={href}
              key={label}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              variants={glow}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className='text-gray-300 transition-colors duration-200 inline-flex items-center justify-center'
            >
              <Icon />
            </motion.a>
          ))}
        </div>
        <p className='text-gray-300 italic max-w-xl'>" Where clean code meets meaningful user experience."</p>
        <p className='text-xs text-gray-400'>&copy; {new Date().getFullYear()} Sadat Shahriar Rafin. All rights reserved.</p>
      </motion.div>
    </footer>
  )
}

export default Footer