import { motion } from 'framer-motion';
import { invitationData } from '../data/invitation';

export default function Celebrant() {
  const { celebrant } = invitationData;

  return (
    <section id="celebrant" className="py-20 sm:py-28 bg-gradient-to-b from-soft-pink/40 to-cream relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-mickey-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-mickey-red/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-mickey-red font-semibold tracking-widest uppercase text-sm mb-2">The Star of the Day</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-mickey-black">
            Meet the Star
          </h2>
          <div className="w-16 h-1 bg-mickey-gold mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative flex-shrink-0"
          >
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72">
              <div className="absolute -inset-3 rounded-full border-2 border-dashed border-mickey-gold/50 animate-[spin_20s_linear_infinite]" />
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-mickey-red via-mickey-gold to-mickey-red p-1">
                <img
                  src={celebrant.photo}
                  alt={celebrant.name}
                  className="w-full h-full object-cover rounded-full border-4 border-white"
                />
              </div>
              <motion.div
                className="absolute -top-4 -left-2"
                animate={{ rotate: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <svg width="36" height="30" viewBox="0 0 100 85" fill="#E31C23">
                  <circle cx="22" cy="28" r="22" /><circle cx="78" cy="28" r="22" /><circle cx="50" cy="55" r="32" />
                </svg>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-center md:text-left flex-1"
          >
            <h3 className="font-display text-3xl sm:text-4xl font-bold text-mickey-black mb-2">
              {celebrant.name}
            </h3>
            <p className="text-mickey-black/70 text-lg leading-relaxed max-w-md mx-auto md:mx-0 italic font-display">
              "{celebrant.shortMessage}"
            </p>
            <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-2">
              {['🎈', '🎂', '✨', '🎁', '🌟'].map((emoji, i) => (
                <motion.span
                  key={i}
                  className="text-2xl"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                >
                  {emoji}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
