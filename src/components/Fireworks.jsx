import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const Firework = ({ x, y, color, delay }) => {
  const particles = Array.from({ length: 16 }, (_, i) => {
    const angle = (i / 16) * Math.PI * 2
    return {
      id: i,
      endX: Math.cos(angle) * (120 + Math.random() * 60),
      endY: Math.sin(angle) * (120 + Math.random() * 60)
    }
  })

  return (
    <motion.div
      className="firework"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    >
      {/* Rastro de subida */}
      <motion.div
        className="firework-trail"
        style={{ backgroundColor: color }}
        initial={{ height: 0, opacity: 1 }}
        animate={{ height: 100, opacity: 0 }}
        transition={{ duration: 0.5, delay }}
      />
      
      {/* Explosión */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="firework-particle"
          style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}, 0 0 10px ${color}` }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ 
            x: particle.endX, 
            y: particle.endY, 
            opacity: 0,
            scale: 0
          }}
          transition={{ 
            duration: 1.5, 
            delay: delay + 0.5,
            ease: "easeOut"
          }}
        />
      ))}
      
      {/* Centro brillante */}
      <motion.div
        className="firework-center"
        style={{ backgroundColor: 'white', boxShadow: `0 0 20px ${color}, 0 0 40px ${color}` }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 2, 0], opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, delay: delay + 0.5 }}
      />
    </motion.div>
  )
}

const Fireworks = () => {
  const [fireworks, setFireworks] = useState([])
  
  const colors = [
    '#ff6b9d', // Rosa
    '#ffd93d', // Dorado
    '#6bcbff', // Azul cielo
    '#ff8c42', // Naranja
    '#98d8aa', // Verde menta
    '#e879f9', // Púrpura
    '#ffffff', // Blanco
    '#f472b6', // Rosa brillante
  ]

  useEffect(() => {
    const createFirework = () => {
      const newFirework = {
        id: Date.now() + Math.random(),
        x: 5 + Math.random() * 90,
        y: 5 + Math.random() * 40,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: 0
      }
      
      setFireworks(prev => [...prev, newFirework])
      
      // Limpiar fuegos viejos
      setTimeout(() => {
        setFireworks(prev => prev.filter(f => f.id !== newFirework.id))
      }, 3000)
    }

    // Crear muchos fuegos iniciales
    for (let i = 0; i < 10; i++) {
      setTimeout(() => createFirework(), i * 150)
    }

    // Crear fuegos muy frecuentemente
    const interval = setInterval(() => {
      // Crear 3-5 fuegos a la vez
      const count = Math.floor(Math.random() * 3) + 3
      for (let i = 0; i < count; i++) {
        setTimeout(() => createFirework(), i * 80)
      }
    }, 200)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fireworks-container">
      {fireworks.map(fw => (
        <Firework 
          key={fw.id}
          x={fw.x}
          y={fw.y}
          color={fw.color}
          delay={fw.delay}
        />
      ))}
    </div>
  )
}

export default Fireworks
