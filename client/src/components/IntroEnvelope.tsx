import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroEnvelopeProps {
  onOpenComplete: () => void;
}

export default function IntroEnvelope({
  onOpenComplete,
}: IntroEnvelopeProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;

    setIsOpening(true);

    // Sequence of animations
    setTimeout(() => setShowCard(true), 600);
    setTimeout(() => setShowConfetti(true), 900);
    setTimeout(() => setFadeOut(true), 2800);
    setTimeout(() => onOpenComplete(), 3600);
  };

  // Confetti particles
  const confettiColors = [
    '#E31C23',
    '#F5C518',
    '#1A1A1A',
    '#FFFFFF',
    '#FFE066',
  ];

  const confettiPieces = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    color: confettiColors[i % confettiColors.length],
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 0.8,
    duration: 2 + Math.random() * 1.5,
    size: 6 + Math.random() * 8,
    rotation: Math.random() * 360,
  }));

  return (
    <AnimatePresence>
      {!fadeOut && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#1A1A1A] via-[#2a1a1a] to-[#1A1A1A] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Subtle stars */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`star-${i}`}
                className="absolute text-mickey-gold/30"
                style={{
                  left: `${10 + ((i * 7) % 80)}%`,
                  top: `${15 + ((i * 11) % 70)}%`,
                  fontSize: `${10 + (i % 3) * 6}px`,
                }}
                animate={{
                  opacity: [0.2, 0.6, 0.2],
                  scale: [0.8, 1.1, 0.8],
                }}
                transition={{
                  duration: 3 + i * 0.3,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                ★
              </motion.div>
            ))}

            {/* Floating Mickey ears silhouettes */}
            <motion.div
              className="absolute top-16 left-8 md:left-20 opacity-10"
              animate={{
                y: [0, -15, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
              }}
            >
              <MickeyEars size={80} />
            </motion.div>

            <motion.div
              className="absolute bottom-24 right-10 md:right-28 opacity-10"
              animate={{
                y: [0, 12, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                delay: 1,
              }}
            >
              <MickeyEars size={60} />
            </motion.div>
          </div>

          {/* Confetti */}
          {showConfetti && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {confettiPieces.map((p) => (
                <motion.div
                  key={p.id}
                  className="absolute rounded-sm"
                  style={{
                    left: p.left,
                    top: '-5%',
                    width: p.size,
                    height: p.size * 0.6,
                    backgroundColor: p.color,
                    rotate: p.rotation,
                  }}
                  initial={{
                    y: 0,
                    opacity: 1,
                    rotate: p.rotation,
                  }}
                  animate={{
                    y: '110vh',
                    opacity: [1, 1, 0],
                    rotate: p.rotation + 720,
                    x: [0, (Math.random() - 0.5) * 100],
                  }}
                  transition={{
                    duration: p.duration,
                    delay: p.delay,
                    ease: 'easeOut',
                  }}
                />
              ))}
            </div>
          )}

          {/* Envelope container */}
          <div className="relative flex flex-col items-center px-4">
            <motion.div
              className="relative cursor-pointer select-none"
              onClick={handleOpen}
              whileHover={!isOpening ? { scale: 1.02 } : {}}
              whileTap={!isOpening ? { scale: 0.98 } : {}}
              style={{ perspective: 1200 }}
            >
              {/* Envelope body */}
              <div className="relative w-[280px] sm:w-[340px] md:w-[380px] aspect-[4/3]">
                {/* Back of envelope */}
                <div className="absolute inset-0 paper-texture envelope-shadow rounded-lg overflow-hidden border border-[#d4c4a8]">
                  {/* Subtle pattern */}
                  <div
                    className="absolute inset-0 opacity-[0.07]"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0c-2 0-3.5 1.5-3.5 3.5S18 7 20 7s3.5-1.5 3.5-3.5S22 0 20 0zm0 26c-2 0-3.5 1.5-3.5 3.5S18 33 20 33s3.5-1.5 3.5-3.5S22 26 20 26z' fill='%23000'/%3E%3C/svg%3E")`,
                    }}
                  />
                </div>

                {/* Invitation card sliding out */}
                <AnimatePresence>
                  {showCard && (
                    <motion.div
                      className="absolute left-1/2 -translate-x-1/2 w-[85%] aspect-[3/4] bg-white rounded-md card-shadow z-[25] overflow-hidden border border-mickey-gold/30"
                      initial={{
                        y: 80,
                        opacity: 0,
                        scale: 0.9,
                      }}
                      animate={{
                        y: -150,
                        opacity: 1,
                        scale: 1,
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 100,
                        damping: 18,
                        delay: 0.1,
                      }}
                    >
                      <div className="h-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-white via-cream to-soft-pink/30">
                        <div className="w-12 h-12 mb-2">
                          <MickeyEars
                            size={48}
                            color="#E31C23"
                          />
                        </div>

                        <p className="font-display text-mickey-red text-lg sm:text-xl font-semibold tracking-wide">
                          You're Invited!
                        </p>

                        <div className="w-16 h-0.5 bg-mickey-gold my-2" />

                        <p className="font-display text-mickey-black text-base sm:text-lg">
                          Zozo's
                        </p>

                        <p className="text-sm text-mickey-black/70 mt-1">
                          Baptismal Ceremony
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Envelope flap */}
                <motion.div
                  className="absolute top-0 left-0 right-0 origin-top z-20"
                  style={{
                    height: '55%',
                    clipPath:
                      'polygon(0 0, 100% 0, 50% 100%)',
                  }}
                  animate={
                    isOpening
                      ? {
                          rotateX: -160,
                          zIndex: 5,
                        }
                      : {
                          rotateX: 0,
                        }
                  }
                  transition={{
                    duration: 0.9,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                >
                  <div
                    className="w-full h-full paper-texture border-b border-[#d4c4a8] relative"
                    style={{
                      background:
                        'linear-gradient(180deg, #f5efe0 0%, #ebe0c8 100%)',
                      boxShadow: isOpening
                        ? 'none'
                        : '0 4px 12px rgba(0,0,0,0.15)',
                    }}
                  >
                    {/* Flap inner highlight */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent" />
                  </div>
                </motion.div>

                {/* Wax seal */}
                <motion.div
                  className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
                  animate={
                    isOpening
                      ? {
                          scale: [1, 1.2, 0],
                          opacity: [1, 1, 0],
                          rotate: [0, 15, -20],
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.5,
                  }}
                >
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16">
                    <div
                      className="absolute inset-0 rounded-full bg-gradient-to-br from-mickey-red to-mickey-red-dark shadow-lg"
                      style={{
                        boxShadow:
                          '0 4px 12px rgba(227,28,35,0.5), inset 0 2px 4px rgba(255,255,255,0.3)',
                      }}
                    />

                    <div className="absolute inset-1 rounded-full border-2 border-mickey-gold/60" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <MickeyEars
                        size={28}
                        color="#F5C518"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Front bottom of envelope */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[48%] paper-texture z-[15] rounded-b-lg border-t border-[#d4c4a8]"
                  style={{
                    background:
                      'linear-gradient(0deg, #ebe0c8 0%, #f5efe0 100%)',
                    clipPath:
                      'polygon(0 30%, 50% 0, 100% 30%, 100% 100%, 0 100%)',
                  }}
                />
              </div>
            </motion.div>

            {/* Instruction text */}
            <AnimatePresence>
              {!isOpening && (
                <motion.p
                  className="mt-8 text-white/90 text-sm sm:text-base font-medium tracking-widest uppercase"
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  transition={{
                    delay: 0.3,
                  }}
                >
                  <motion.span
                    animate={{
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    Tap to Open
                  </motion.span>
                </motion.p>
              )}
            </AnimatePresence>

            {/* Decorative gold line under text */}
            {!isOpening && (
              <motion.div
                className="mt-3 w-12 h-0.5 bg-mickey-gold/60 rounded-full"
                initial={{
                  scaleX: 0,
                }}
                animate={{
                  scaleX: 1,
                }}
                transition={{
                  delay: 0.5,
                  duration: 0.6,
                }}
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MickeyEars({
  size = 40,
  color = '#1A1A1A',
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size * 0.85}
      viewBox="0 0 100 85"
      fill="none"
      aria-hidden="true"
    >
      {/* Left ear */}
      <circle
        cx="22"
        cy="28"
        r="22"
        fill={color}
      />

      {/* Right ear */}
      <circle
        cx="78"
        cy="28"
        r="22"
        fill={color}
      />

      {/* Head */}
      <circle
        cx="50"
        cy="55"
        r="32"
        fill={color}
      />
    </svg>
  );
}