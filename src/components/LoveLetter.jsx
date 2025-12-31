import { motion } from 'framer-motion'

const LoveLetter = ({ onClose }) => {
  return (
    <motion.div 
      className="letter-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="letter-container"
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: 10 }}
        transition={{ type: "spring", damping: 15 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sobre */}
        <div className="envelope">
          <motion.div 
            className="envelope-flap"
            initial={{ rotateX: 0 }}
            animate={{ rotateX: 180 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          
          {/* Carta que sale del sobre */}
          <motion.div 
            className="letter"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: -20, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="letter-content">
              <div className="letter-header">
                <span className="heart-decoration"></span>
                <h2>Fati...</h2>
                <span className="heart-decoration"></span>
              </div>
              
              <div className="letter-body">
                <p>
                  Quiero empezar este nuevo año agradeciéndote por cada momento 
                  que hemos compartido juntos. Me siento muy afortunado de que me hayas elegido a mi como tu acompañante de vida.
                </p>
                <p>
                  Gracias por ser mi compañera de aventuras, mi mejor amiga, 
                  y el amor de mi vida. Contigo cada día es especial.
                </p>
                <p>
                  Este 2026 prometo seguir amándote con todo mi corazón, 
                  hacerte reír, secarte las lágrimas, y construir juntos 
                  más recuerdos hermosos.
                </p>
                <p className="letter-closing">
                  Te amo hoy, mañana y siempre. Feliz Año Nuevo, mi vida.
                </p>
              </div>
              
              <div className="letter-signature">
                <p>Con todo mi corazón,</p>
                <p className="signature">Camo</p>
              </div>
              
              <div className="letter-footer">
                <motion.div 
                  className="floating-hearts"
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Botón para cerrar */}
        <motion.button 
          className="close-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
        >
          ✕
        </motion.button>
        
        {/* Decoraciones flotantes */}
        <motion.div 
          className="sparkle sparkle-1"
          animate={{ 
            scale: [1, 1.5, 1], 
            opacity: [0.5, 1, 0.5],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ✨
        </motion.div>
        <motion.div 
          className="sparkle sparkle-2"
          animate={{ 
            scale: [1, 1.3, 1], 
            opacity: [0.5, 1, 0.5],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          💫
        </motion.div>
        <motion.div 
          className="sparkle sparkle-3"
          animate={{ 
            scale: [1, 1.4, 1], 
            opacity: [0.5, 1, 0.5] 
          }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          ⭐
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default LoveLetter
