import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

export default function RSVP() {
  const [form, setForm] = useState({
    name: '',
    guests: '1',
    contact: '',
    attending: '' as '' | 'yes' | 'no',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.attending) return;
    // In production, send to backend / email service
    console.log('RSVP submitted:', form);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="rsvp" className="py-20 sm:py-28 bg-white">
        <div className="max-w-lg mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-cream rounded-3xl p-10 shadow-lg border border-mickey-gold/20"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-mickey-red/10 flex items-center justify-center">
              <Check className="w-8 h-8 text-mickey-red" />
            </div>
            <h3 className="font-display text-2xl font-bold text-mickey-black mb-2">Thank You!</h3>
            <p className="text-mickey-black/70">
              {form.attending === 'yes'
                ? "We're excited to celebrate with you! See you soon 🎉"
                : "We'll miss you, but thank you for letting us know."}
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="py-20 sm:py-28 bg-white relative">
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-mickey-red font-semibold tracking-widest uppercase text-sm mb-2">Kindly Reply</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-mickey-black">
            Will You Join Us?
          </h2>
          <div className="w-16 h-1 bg-mickey-gold mx-auto mt-4 rounded-full" />
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-cream/60 rounded-3xl p-6 sm:p-8 shadow-lg border border-mickey-gold/15 space-y-5"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-mickey-black/80 mb-1.5">Guest Name *</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-mickey-red/40 focus:border-mickey-red transition text-mickey-black"
              placeholder="Your full name"
            />
          </div>

          {/* Guests + Contact */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-mickey-black/80 mb-1.5">No. of Guests</label>
              <select
                value={form.guests}
                onChange={(e) => setForm({ ...form, guests: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-mickey-red/40 focus:border-mickey-red transition text-mickey-black"
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-mickey-black/80 mb-1.5">Contact Number</label>
              <input
                type="tel"
                value={form.contact}
                onChange={(e) => setForm({ ...form, contact: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-mickey-red/40 focus:border-mickey-red transition text-mickey-black"
                placeholder="Optional"
              />
            </div>
          </div>

          {/* Attendance */}
          <div>
            <label className="block text-sm font-medium text-mickey-black/80 mb-2">Will you attend? *</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setForm({ ...form, attending: 'yes' })}
                className={`flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-semibold text-sm transition-all ${
                  form.attending === 'yes'
                    ? 'bg-mickey-red text-white shadow-md'
                    : 'bg-white border border-gray-200 text-mickey-black hover:border-mickey-red/40'
                }`}
              >
                <Check className="w-4 h-4" />
                YES, I'LL BE THERE
              </button>
              <button
                type="button"
                onClick={() => setForm({ ...form, attending: 'no' })}
                className={`flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-semibold text-sm transition-all ${
                  form.attending === 'no'
                    ? 'bg-mickey-black text-white shadow-md'
                    : 'bg-white border border-gray-200 text-mickey-black hover:border-mickey-black/40'
                }`}
              >
                <X className="w-4 h-4" />
                SORRY, CAN'T MAKE IT
              </button>
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-mickey-black/80 mb-1.5">Message (optional)</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-mickey-red/40 focus:border-mickey-red transition text-mickey-black resize-none"
              placeholder="Any special notes or wishes..."
            />
          </div>

          <button
            type="submit"
            disabled={!form.name || !form.attending}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-mickey-red to-mickey-red-dark text-white font-bold text-base shadow-lg shadow-mickey-red/25 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:-translate-y-0.5"
          >
            Submit RSVP
          </button>
        </motion.form>
      </div>
    </section>
  );
}
