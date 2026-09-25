import { motion } from 'framer-motion';
import { invitationData } from '../data/invitation';

export default function BirthdayMessage() {
  const { message, celebrant } = invitationData;

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-br from-mickey-black via-[#2a1518] to-mickey-red-dark relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 opacity-10">
        <svg width="80" height="68" viewBox="0 0 100 85" fill="#F5C518">
          <circle cx="22" cy="28" r="22" /><circle cx="78" cy="28" r="22" /><circle cx="50" cy="55" r="32" />
        </svg>
      </div>
      <div className="absolute bottom-10 right-10 opacity-10">
        <svg width="60" height="51" viewBox="0 0 100 85" fill="#F5C518">
          <circle cx="22" cy="28" r="22" /><circle cx="78" cy="28" r="22" /><circle cx="50" cy="55" r="32" />
        </svg>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-mickey-gold font-semibold tracking-widest uppercase text-sm mb-4">
            A Little Birthday Wish
          </p>
          <blockquote className="font-display text-xl sm:text-2xl md:text-3xl text-white leading-relaxed italic mb-8">
            "{message}"
          </blockquote>
          <div className="w-12 h-0.5 bg-mickey-gold/60 mx-auto mb-4" />
          <p className="text-white/70 text-sm">— With love, from {celebrant.name}'s family</p>
        </motion.div>
      </div>
    </section>
  );
}
