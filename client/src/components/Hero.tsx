import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { invitationData } from '../data/invitation';

export default function Hero() {
  const [carReady, setCarReady] = useState(false);
  const { celebrant, event } = invitationData;

  return (
    <section
      id="hero"
      className="
        relative
        w-full
        min-h-screen
        flex
        items-center
        justify-center
        overflow-hidden
        bg-gradient-to-b
        from-mickey-black
        via-[#2a1518]
        to-mickey-red-dark
      "
    >
      {/* =========================================
          HERO BACKGROUND IMAGE
          ========================================= */}
      <div
        className="
          absolute
          inset-0
          bg-cover
          bg-center
          bg-no-repeat
          pointer-events-none
          z-0
        "
        style={{
          backgroundImage: "url('/images/bg-hero.png')",
        }}
      />

      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]">
        {/* Large faint Mickey ears */}
        <div className="absolute -top-20 -right-20 opacity-[0.06]">
          <svg width="400" height="340" viewBox="0 0 100 85" fill="white">
            <circle cx="22" cy="28" r="22" />
            <circle cx="78" cy="28" r="22" />
            <circle cx="50" cy="55" r="32" />
          </svg>
        </div>
        <div className="absolute -bottom-32 -left-16 opacity-[0.05]">
          <svg width="350" height="300" viewBox="0 0 100 85" fill="white">
            <circle cx="22" cy="28" r="22" />
            <circle cx="78" cy="28" r="22" />
            <circle cx="50" cy="55" r="32" />
          </svg>
        </div>

        {/* Floating decorative dots / stars */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-mickey-gold/40"
            style={{
              left: `${15 + i * 10}%`,
              top: `${20 + (i % 4) * 18}%`,
            }}
            animate={{ y: [0, -20, 0], opacity: [0.3, 0.7, 0.3] }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <div
        className="
          relative
          z-10
          w-full
          max-w-5xl
          mx-auto
          px-4
          sm:px-6
          pt-24
          pb-16
          text-center
        "
      >
        {/* Badge */}

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4"
        >
          <br />
        </motion.h1>

        {/* Celebrant Photo + Mickey */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="
            relative
            w-full
            max-w-[620px]
            mx-auto
            mb-8
            sm:mb-10
            flex
            justify-center
          "
        >
          {/* Zozo's Photo */}
          <div
            className="
              relative
              w-70
              h-70
              sm:w-52
              sm:h-52
              md:w-60
              md:h-60
              mx-auto
              -translate-y-[113px]
              sm:-translate-y-20
              md:-translate-y-24
            "
          >
            {/* Gold rings
            <div className="absolute -inset-2 rounded-full border-2 border-mickey-gold/60" />
            <div className="absolute -inset-4 rounded-full border border-mickey-gold/30" />
            */}

            {/* Photo */}
            <img
              src={celebrant.photo}
              alt={celebrant.name}
              className="w-full h-full object-cover rounded-full border-4 border-white shadow-2xl"
            />
          </div>

          {/* Mickey Mouse */}
          <motion.img
            src="/images/mickeyhip.png"
            alt="Mickey Mouse"
            initial={{
              opacity: 0,
              x: 30,
              y: 20,
              rotate: 5,
            }}
            animate={{
              opacity: 1,
              x: 0,
              y: 0,
              rotate: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.7,
              ease: 'easeOut',
            }}
            className="
              absolute
              w-[140px]
              sm:w-[170px]
              md:w-[220px]
              lg:w-[250px]
              h-auto
              left-1/2
              -translate-x-[-65px]
              -translate-y-[-342px]
              bottom-[85px]
              sm:left-1/2
              sm:translate-x-[35px]
              sm:bottom-[-25px]
              md:left-auto
              md:right-[-5px]
              md:translate-x-0
              md:bottom-[-30px]
              z-50
              drop-shadow-[0_12px_20px_rgba(0,0,0,0.3)]
              pointer-events-none
            "
          />
        </motion.div>

        {/* Scroll indicator */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-2 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-1.5"
          >
            <div className="w-1.5 h-2.5 rounded-full bg-white/70" />
          </motion.div>
        </motion.div> */}
      </div>

      {/* Racing Car + Smoke Effect */}
      {/* =====================================================
          RACING CAR + SMOKE EFFECT
          ===================================================== */}
      <div
        className="
          absolute
          bottom-[20px]
          left-[180px]
          -translate-x-1/2
          w-[310px]
          sm:w-[340px]
          md:w-[430px]
          lg:w-[520px]
          h-[150px]
          z-20
          pointer-events-none
        "
      >
        {/* Smoke - starts AFTER car entrance */}
        {carReady && (
          <div
            className="
              absolute
              left-[65px]
              sm:left-[-35px]
              md:left-[-45px]
              bottom-[65px]
              sm:bottom-[20px]
              z-100
            "
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/80 blur-md"
                style={{
                  width: `${100 + i * 7}px`,
                  height: `${40 + i * 7}px`,
                }}
                initial={{
                  opacity: 0,
                  x: 0,
                  y: 0,
                  scale: 0.4,
                }}
                animate={{
                  opacity: [0, 0.8, 0],
                  x: [-5, -30 - i * 12, -60 - i * 15],
                  y: [0, -10 - i * 6, -25 - i * 8],
                  scale: [0.4, 1, 1.7],
                }}
                transition={{
                  duration: 1.2,
                  delay: i * 0.18,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />
            ))}
          </div>
        )}

        {/* Racing Car */}
        <motion.img
          src="/images/mcar.png"
          alt=""
          initial={{
            x: 350,
            y: 0,
            opacity: 1,
          }}
          animate={
            carReady
              ? {
                  x: [-15, 15, -15],
                  y: [0, -3, 0],
                  rotate: [0, -1, 0, 1, 0],
                }
              : {
                  x: 0,
                  y: 0,
                  rotate: 0,
                }
          }
          transition={
            carReady
              ? {
                  duration: 0.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
              : {
                  duration: 1.2,
                  ease: 'easeOut',
                }
          }
          onAnimationComplete={() => {
            if (!carReady) {
              setCarReady(true);
            }
          }}
          className="
            absolute
            inset-0
            w-full
            h-auto
            scale-x-[-1]
            drop-shadow-[0_8px_8px_rgba(0,0,0,0.3)]
          "
        />
      </div>
    </section>
  );
}