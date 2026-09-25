import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { invitationData } from '../data/invitation';

function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(targetDate + 'T15:00:00').getTime();

    const update = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };

    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function BirthdayDetails() {
  const { event } = invitationData;
  const countdown = useCountdown(event.date);

  return (
    <section id="details" className="py-20 sm:py-28 bg-cream relative overflow-hidden">
      {/* Decorative side ears */}
      <div className="absolute top-10 left-0 opacity-[0.04] -translate-x-1/3">
        <svg width="200" height="170" viewBox="0 0 100 85" fill="#E31C23">
          <circle cx="22" cy="28" r="22" /><circle cx="78" cy="28" r="22" /><circle cx="50" cy="55" r="32" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="text-center mb-12"
        >
          <p className="text-mickey-red font-semibold tracking-widest uppercase text-sm mb-2">Save the Date</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-mickey-black">
            Baptismal Details
          </h2>
          <div className="w-16 h-1 bg-mickey-gold mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
          className="grid grid-cols-4 gap-2 sm:gap-4 mb-14 max-w-md mx-auto"
        >
          {[
            { value: countdown.days, label: 'Days' },
            { value: countdown.hours, label: 'Hours' },
            { value: countdown.minutes, label: 'Minutes' },
            { value: countdown.seconds, label: 'Seconds' },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-2xl shadow-lg border border-mickey-gold/20 p-3 sm:p-5 text-center"
            >
              <p className="font-display text-2xl sm:text-4xl font-bold text-mickey-red tabular-nums">
                {String(item.value).padStart(2, '0')}
              </p>
              <p className="text-[10px] sm:text-xs text-mickey-black/60 font-medium uppercase tracking-wider mt-1">
                {item.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Detail cards */}
        <div className="grid sm:grid-cols-3 gap-5">
          {[
            { icon: Calendar, title: 'Date', value: event.fullDateDisplay },
            { icon: Clock, title: 'Time', value: event.time },
            { icon: MapPin, title: 'Venue', value: event.venue },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-mickey-red/10 flex items-center justify-center">
                <item.icon className="w-6 h-6 text-mickey-red" />
              </div>
              <p className="text-mickey-gold text-xs font-semibold tracking-wider uppercase mb-1">{item.title}</p>
              <p className="text-mickey-black font-medium text-sm sm:text-base leading-snug">{item.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Full address */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-mickey-black/60 text-sm mt-8 max-w-md mx-auto"
        >
          {event.address}
        </motion.p>
      </div>
    </section>
  );
}
