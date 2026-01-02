import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Detectar si es móvil
const isMobile = () => window.innerWidth <= 768

const Firework = ({ x, y, color, delay }) => {
  const mobile = isMobile()
  
  // Menos partículas en móvil para mejor rendimiento
  const particleCount = mobile ? 10 : 20
  const sparkleCount = mobile ? 6 : 12
  
  const particles = Array.from({ length: particleCount }, (_, i) => {
    const angle = (i / particleCount) * Math.PI * 2
    const distance = mobile ? (60 + Math.random() * 40) : (100 + Math.random() * 80)
    return {
      id: i,
      endX: Math.cos(angle) * distance,
      endY: Math.sin(angle) * distance + (mobile ? 15 : 30),
      rotation: Math.random() * 360
    }
  })

  const sparkles = Array.from({ length: sparkleCount }, (_, i) => {
    const angle = Math.random() * Math.PI * 2
    const distance = mobile ? (25 + Math.random() * 35) : (40 + Math.random() * 60)
    return {
      id: i,
      endX: Math.cos(angle) * distance,
      endY: Math.sin(angle) * distance + (mobile ? 10 : 20)
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
        animate={{ height: mobile ? 80 : 120, opacity: 0 }}
        transition={{ duration: 0.6, delay }}
      />
      
      {/* Partículas principales con rastros */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="firework-particle-trail"
          style={{ 
            background: `linear-gradient(to bottom, ${color}, transparent)`,
          }}
          initial={{ x: 0, y: 0, opacity: 0, scale: 0, rotate: particle.rotation }}
          animate={{ 
            x: particle.endX, 
            y: particle.endY, 
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 0.8, 0],
            rotate: particle.rotation + 180
          }}
          transition={{ 
            duration: mobile ? 1.2 : 1.8, 
            delay: delay + 0.5,
            ease: "easeOut",
            opacity: { times: [0, 0.1, 0.6, 1] }
          }}
        />
      ))}

      {/* Sparkles secundarios */}
      {sparkles.map(sparkle => (
        <motion.div
          key={`sparkle-${sparkle.id}`}
          className="firework-sparkle"
          style={{ 
            backgroundColor: 'white',
            boxShadow: mobile ? `0 0 3px white` : `0 0 4px white, 0 0 8px ${color}`
          }}
          initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
          animate={{ 
            x: sparkle.endX, 
            y: sparkle.endY, 
            opacity: [0, 1, 0],
            scale: [0, mobile ? 1 : 1.5, 0]
          }}
          transition={{ 
            duration: mobile ? 0.8 : 1.2, 
            delay: delay + 0.6,
            ease: "easeOut"
          }}
        />
      ))}
      
      {/* Centro brillante de la explosión */}
      <motion.div
        className="firework-center"
        style={{ 
          backgroundColor: 'white', 
          boxShadow: mobile 
            ? `0 0 15px ${color}, 0 0 30px ${color}` 
            : `0 0 30px ${color}, 0 0 60px ${color}, 0 0 90px ${color}` 
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, mobile ? 2 : 3, 0], opacity: [0, 1, 0] }}
        transition={{ duration: 0.6, delay: delay + 0.5 }}
      />

      {/* Anillo de expansión - solo en desktop */}
      {!mobile && (
        <motion.div
          className="firework-ring"
          style={{ borderColor: color }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 4], opacity: [0.8, 0] }}
          transition={{ duration: 1, delay: delay + 0.5, ease: "easeOut" }}
        />
      )}
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
    const mobile = isMobile()
    
    const createFirework = () => {
      const newFirework = {
        id: Date.now() + Math.random(),
        x: 5 + Math.random() * 90,
        y: 5 + Math.random() * 40,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: 0
      }
      
      setFireworks(prev => [...prev, newFirework])
      
      // Limpiar fuegos viejos (más rápido en móvil)
      setTimeout(() => {
        setFireworks(prev => prev.filter(f => f.id !== newFirework.id))
      }, mobile ? 2000 : 3000)
    }

    // Menos fuegos iniciales en móvil
    const initialCount = mobile ? 2 : 3
    for (let i = 0; i < initialCount; i++) {
      setTimeout(() => createFirework(), i * 800)
    }

    // Menos frecuente en móvil (1 cada 1.5s en móvil, 1 cada 1s en desktop)
    const interval = setInterval(() => {
      createFirework()
    }, mobile ? 1500 : 1000)

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
