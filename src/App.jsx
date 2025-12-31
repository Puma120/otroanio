import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Fireworks from './components/Fireworks'
import LoveLetter from './components/LoveLetter'
import './App.css'

function App() {
  const [showLetter, setShowLetter] = useState(false)
  const [stars, setStars] = useState([])

  useEffect(() => {
    // Generar estrellas aleatorias
    const generatedStars = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 40,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 2,
      duration: Math.random() * 2 + 1
    }))
    setStars(generatedStars)
  }, [])

  return (
    <div className="scene-container">
      {/* Cielo nocturno */}
      <div className="night-sky">
        {/* Estrellas parpadeantes */}
        {stars.map(star => (
          <motion.div
            key={star.id}
            className="star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay
            }}
          />
        ))}

        {/* Luna */}
        <motion.div 
          className="moon"
          animate={{
            boxShadow: [
              '0 0 20px rgba(255, 255, 200, 0.5)',
              '0 0 40px rgba(255, 255, 200, 0.8)',
              '0 0 20px rgba(255, 255, 200, 0.5)'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Fuegos artificiales */}
        <Fireworks />

        {/* Texto principal */}
        <motion.div 
          className="main-text"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <motion.h1 
            className="title pixel-text"
            animate={{
              textShadow: [
                '0 0 10px #ff6b9d, 0 0 20px #ff6b9d, 0 0 30px #ff6b9d',
                '0 0 20px #ffd93d, 0 0 40px #ffd93d, 0 0 60px #ffd93d',
                '0 0 10px #ff6b9d, 0 0 20px #ff6b9d, 0 0 30px #ff6b9d'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ¡Feliz Año Nuevo!
          </motion.h1>
          <motion.p 
            className="subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            2026
          </motion.p>
        </motion.div>
      </div>

      {/* Montañas lejanas */}
      <div className="mountains-far">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="#1a1a3e" d="M0,160L60,170.7C120,181,240,203,360,186.7C480,171,600,117,720,112C840,107,960,149,1080,154.7C1200,160,1320,128,1380,112L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"/>
        </svg>
      </div>

      {/* Montañas cercanas */}
      <div className="mountains-near">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="#12122e" d="M0,224L48,208C96,192,192,160,288,165.3C384,171,480,213,576,218.7C672,224,768,192,864,181.3C960,171,1056,181,1152,197.3C1248,213,1344,235,1392,245.3L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"/>
        </svg>
      </div>

      {/* Mirador/Plataforma */}
      <div className="viewpoint">
        {/* Barandilla del mirador */}
        <div className="railing">
          <div className="rail-post left"></div>
          <div className="rail-horizontal"></div>
          <div className="rail-post right"></div>
        </div>

        {/* Pareja pixel art */}
        <div className="couple-container">
          {/* Persona 1 - Tú (cabello castaño claro, chaqueta azul) - DE ESPALDAS */}
          <motion.div 
            className="person person-1"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="pixel-person back-view">
              {/* Cabello largo castaño claro (vista trasera) */}
              <div className="hair hair-1-back"></div>
              {/* Cabeza (vista trasera) */}
              <div className="head head-back"></div>
              {/* Cuello */}
              <div className="neck"></div>
              {/* Ropa vista trasera: chaqueta azul */}
              <div className="outfit outfit-1-back"></div>
            </div>
          </motion.div>

          {/* Corazón secreto - ELEMENTO ESCONDIDO */}
          <motion.div 
            className="secret-heart"
            onClick={() => setShowLetter(true)}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            title="💕"
          >
            💕
          </motion.div>

          {/* Persona 2 - Ella (cabello oscuro bob, cardigan beige) - DE ESPALDAS */}
          <motion.div 
            className="person person-2"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            <div className="pixel-person back-view">
              {/* Cabello oscuro bob (vista trasera) */}
              <div className="hair hair-2-back"></div>
              {/* Cabeza (vista trasera) */}
              <div className="head head-back"></div>
              {/* Cuello */}
              <div className="neck"></div>
              {/* Ropa vista trasera: cardigan beige */}
              <div className="outfit outfit-2-back"></div>
            </div>
          </motion.div>
        </div>

        {/* Piso del mirador */}
        <div className="floor"></div>
      </div>

      {/* Árboles/vegetación */}
      <div className="trees">
        <div className="tree tree-1"></div>
        <div className="tree tree-2"></div>
        <div className="tree tree-3"></div>
        <div className="tree tree-4"></div>
      </div>

      {/* Ciudad lejana con luces */}
      <div className="distant-city">
        {Array.from({ length: 20 }, (_, i) => (
          <motion.div
            key={i}
            className="city-light"
            style={{
              left: `${5 + i * 5}%`,
              bottom: `${Math.random() * 10 + 25}%`
            }}
            animate={{
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Carta de amor */}
      <AnimatePresence>
        {showLetter && (
          <LoveLetter onClose={() => setShowLetter(false)} />
        )}
      </AnimatePresence>

      {/* Hint sutil */}
      <motion.div 
        className="hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 5 }}
      >
        Busca el corazón escondido... 💕
      </motion.div>
    </div>
  )
}

export default App
