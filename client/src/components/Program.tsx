import type { ComponentType } from 'react';
import { motion } from 'framer-motion';
import { Users, Sparkles, Gamepad2, Utensils, Cake, Music, Camera, PartyPopper } from 'lucide-react';
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
    <section id="program" className="py-20 sm:py-28 bg-white relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-mickey-red font-semibold tracking-widest uppercase text-sm mb-2">What's Happening</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-mickey-black">
            Event Program
          </h2>
          <div className="w-16 h-1 bg-mickey-gold mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-mickey-red via-mickey-gold to-mickey-red/30" />

          <div className="space-y-6">
            {program.map((item, i) => {
              const Icon = iconMap[item.icon] || Sparkles;
              return (
                <motion.div
                  key={item.activity}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="relative flex items-start gap-4 sm:gap-6 pl-2"
                >
                  {/* Dot / Icon */}
                  <div className="relative z-10 flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-mickey-red text-white flex items-center justify-center shadow-md">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-cream/80 rounded-xl px-4 py-3 sm:px-5 sm:py-4 border border-mickey-gold/10 hover:border-mickey-gold/30 transition-colors">
                    <p className="text-mickey-gold text-xs font-semibold tracking-wider uppercase mb-0.5">
                      {item.time}
                    </p>
                    <p className="text-mickey-black font-medium text-base sm:text-lg">
                      {item.activity}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
