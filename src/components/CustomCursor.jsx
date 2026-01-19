import React, { useEffect, useState } from 'react'

const CustomCursor = () => {

  const [cursor, setCursor] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {          
    const handleMouseMove = (e) => {
      setCursor({
        x: e.clientX,
        y: e.clientY,                                 
      });
    };              

    window.addEventListener('mousemove', handleMouseMove);           

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  })           

  return (
    <div className='pointer-events-none fixed top-0 left-0 z-9999 '            
      style={{ transform: `translate(${cursor.x - 40}px , ${cursor.y - 40}px )` }}
    >
      <div
        className='w-20 h-20 rounded-full bg-linear-to-r from-pink-500 to-blue-500 blur-3xl opacity-80 '
      />
    </div>
  )
}

export default CustomCursor
