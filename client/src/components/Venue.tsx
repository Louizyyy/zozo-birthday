import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';
import { invitationData } from '../data/invitation';

export default function Venue() {
  const { event } = invitationData;

  return (
    <section id="venue" className="py-20 sm:py-28 bg-gradient-to-b from-cream to-soft-pink/30 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-mickey-red font-semibold tracking-widest uppercase text-sm mb-2">Where to Find Us</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-mickey-black">
            Let's Celebrate!
          </h2>
          <div className="w-16 h-1 bg-mickey-gold mx-auto mt-4 rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
        >
          {/* Map placeholder - elegant card */}
          <div className="relative h-48 sm:h-64 bg-gradient-to-br from-mickey-black via-[#2a1a1a] to-mickey-red-dark flex items-center justify-center">
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: `radial-gradient(circle at 30% 40%, #F5C518 0%, transparent 40%), radial-gradient(circle at 70% 60%, #E31C23 0%, transparent 35%)`,
            }} />
            <div className="relative text-center">
              <MapPin className="w-12 h-12 text-mickey-gold mx-auto mb-3" />
              <p className="text-white font-display text-xl sm:text-2xl font-semibold">{event.venue}</p>
            </div>
          </div>

          <div className="p-6 sm:p-8 text-center">
            <p className="text-mickey-black/70 text-sm sm:text-base mb-6 max-w-md mx-auto leading-relaxed">
              {event.address}
            </p>

            <a
              href={event.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-mickey-red text-white font-semibold text-sm sm:text-base shadow-lg shadow-mickey-red/30 hover:bg-mickey-red-dark hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              <Navigation className="w-5 h-5" />
              Get Directions
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
