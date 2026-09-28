import type { ComponentType } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Sparkles,
  Gamepad2,
  Utensils,
  Cake,
  Music,
  Camera,
  PartyPopper,
} from 'lucide-react';
import { invitationData } from '../data/invitation';

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  users: Users,
  sparkles: Sparkles,
  gamepad: Gamepad2,
  utensils: Utensils,
  cake: Cake,
  music: Music,
  camera: Camera,
  'party-popper': PartyPopper,
};

export default function Program() {
  const { program } = invitationData;

  return (
    <section
      id="program"
      className="py-20 sm:py-28 bg-white relative overflow-hidden"
    >
      {/* =====================================================
          LARGE RACING FLAG
          ===================================================== */}
      <motion.img
        src="/images/2flag.png"
        alt=""
        initial={{
          opacity: 0,
          y: -20,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.7,
          ease: 'easeOut',
        }}
        className="
          absolute
          top-[-20px]
          left-1/2
          -translate-x-1/2
          w-72
          sm:w-96
          md:w-[32rem]
          lg:w-[40rem]
          h-auto
          opacity-10
          pointer-events-none
          z-0
        "
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        {/* =====================================================
            SECTION HEADER
            ===================================================== */}
        <div className="relative z-10 text-center mb-14">

          {/* =================================================
              MICKEY DECORATIONS
              ================================================= */}
          <div className="absolute inset-0 pointer-events-none z-20">

          </div>

          {/* =================================================
              HEADING
              ================================================= */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
            className="relative z-30"
          >
            <p className="text-mickey-red font-semibold tracking-widest uppercase text-sm mb-2">
              What's Happening
            </p>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-mickey-black">
              Event Program
            </h2>

            <div className="w-16 h-1 bg-mickey-gold mx-auto mt-4 rounded-full" />
          </motion.div>

        </div>

        {/* =====================================================
            TIMELINE
            ===================================================== */}
        <div className="relative z-10">

          {/* Timeline Line */}
          <div
            className="
              absolute
              left-6
              sm:left-8
              top-0
              bottom-0
              w-0.5
              bg-gradient-to-b
              from-mickey-red
              via-mickey-gold
              to-mickey-red/30
            "
          />

          <div className="space-y-6">

            {program.map((item, i) => {
              const Icon = iconMap[item.icon] || Sparkles;

              return (
                <motion.div
                  key={item.activity}
                  initial={{
                    opacity: 0,
                    x: -20,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: true,
                    margin: '-40px',
                  }}
                  transition={{
                    delay: i * 0.08,
                    duration: 0.4,
                  }}
                  className="
                    relative
                    flex
                    items-start
                    gap-4
                    sm:gap-6
                    pl-2
                  "
                >

                  {/* =========================================
                      TIMELINE ICON
                      ========================================= */}
                  <div
                    className="
                      relative
                      z-10
                      flex-shrink-0
                      w-10
                      h-10
                      sm:w-12
                      sm:h-12
                      rounded-full
                      bg-mickey-red
                      text-white
                      flex
                      items-center
                      justify-center
                      shadow-md
                    "
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  

                  {/* =========================================
                      PROGRAM CONTENT
                      ========================================= */}
                  <div
                    className="
                      flex-1
                      bg-cream/80
                      rounded-xl
                      px-4
                      py-3
                      sm:px-5
                      sm:py-4
                      border
                      border-mickey-gold/10
                      hover:border-mickey-gold/30
                      transition-colors
                    "
                  >
                    <p
                      className="
                        text-mickey-gold
                        text-xs
                        font-semibold
                        tracking-wider
                        uppercase
                        mb-0.5
                      "
                    >
                      {item.time}
                    </p>

                    <p
                      className="
                        text-mickey-black
                        font-medium
                        text-base
                        sm:text-lg
                      "
                    >
                      {item.activity}
                    </p>
                  </div>
                  

                </motion.div>
                
              );
                        })}

          </div>

          {/* =====================================================
              BOTTOM RIGHT MICKEY
              ===================================================== */}
          <motion.img
            src="/images/mickeypoint.png"
            alt="Mickey Mouse"
            initial={{
              opacity: 0,
              scale: 0.8,
              x: 20,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
              ease: 'easeOut',
            }}
            className="
              absolute
              right-[-10px]
              sm:right-[-30px]
              md:right-[-45px]

              bottom-[-50px]

              w-50
              sm:w-54
              md:w-58
              lg:w-62

              h-auto
              scale-x-[-1]
              z-40

              drop-shadow-[0_6px_10px_rgba(0,0,0,0.18)]
            "
          />

        </div>  

      </div>
    </section>
  );
}