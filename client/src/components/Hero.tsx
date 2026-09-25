import { motion } from 'framer-motion';
import { invitationData } from '../data/invitation';

export default function Hero() {
  const { celebrant, event } = invitationData;

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-mickey-black via-[#2a1518] to-mickey-red-dark">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
            transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-16 text-center">
        {/* Badge */}

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4"
        >
          {celebrant.name}'s
          <br />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-white/80 text-lg sm:text-xl max-w-xl mx-auto mb-10"
        >
          A magical celebration awaits. Join us for an unforgettable day of fun, laughter & joy!
        </motion.p>

        {/* Celebrant Photo + Mickey */}
<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.7, delay: 0.4 }}
  className="relative w-full max-w-[620px] mx-auto mb-10"
>
  {/* Zozo's Photo */}
  <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 mx-auto md:mr-[190px]">
    {/* Gold rings */}
    <div className="absolute -inset-2 rounded-full border-2 border-mickey-gold/60" />

    <div className="absolute -inset-4 rounded-full border border-mickey-gold/30" />

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
      w-[150px]
      sm:w-[190px]
      md:w-[230px]
      lg:w-[260px]
      h-auto
      left-1/2
      translate-x-[35px]
      sm:translate-x-[55px]
      md:left-auto
      md:right-[-10px]
      md:translate-x-0
      bottom-[-25px]
      md:bottom-[-35px]
      z-20
      drop-shadow-[0_12px_20px_rgba(0,0,0,0.3)]
      pointer-events-none
    "
  />
</motion.div>

        {/* Quick info cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4"
        >
          {[
            { label: 'Date', value: event.day + ', Nov 28' },
            { label: 'Time', value: event.time },
            { label: 'Venue', value: event.venue },
          ].map((item) => (
            <div
              key={item.label}
              className="px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 min-w-[120px]"
            >
              <p className="text-mickey-gold text-xs font-semibold tracking-wider uppercase mb-0.5">
                {item.label}
              </p>
              <p className="text-white text-sm sm:text-base font-medium">{item.value}</p>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-1.5"
          >
            <div className="w-1.5 h-2.5 rounded-full bg-white/70" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
