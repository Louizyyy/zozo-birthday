import { useRef, useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

export default function RSVP() {
  const [form, setForm] = useState({
    name: '',
    contact: '',
    attending: '' as '' | 'yes' | 'no',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const requestInFlight = useRef(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (requestInFlight.current || !form.name.trim() || !form.attending) return;

    requestInFlight.current = true;
    setSubmitting(true);
    setSubmitError('');
    try {
      const invitationLink = new URLSearchParams(window.location.search).get('invite') === 'godparents'
        ? 'Godparents'
        : 'Regular';
      const response = await fetch(`${import.meta.env.BASE_URL}api/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, invitationLink }),
      });
      if (!response.ok) throw new Error('RSVP request failed');
      const result = await response.json();
      if (result.saved !== true) throw new Error('RSVP save was not confirmed');

      setSubmitted(true);
    } catch {
      setSubmitError('We couldn’t save your RSVP. Please try again.');
    } finally {
      requestInFlight.current = false;
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section id="rsvp" className="bg-[#fff9f0] px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mx-auto max-w-lg overflow-hidden rounded-3xl border border-[#dbad52] bg-linear-to-br from-[#fff8e8] to-[#f6dbab] p-6 shadow-lg"
        >
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-2"
            style={{
              backgroundImage:
                'conic-gradient(#241519 25%, #fff1d9 0 50%, #241519 0 75%, #fff1d9 0)',
              backgroundSize: '12px 12px',
            }}
          />
          <div className="grid grid-cols-[minmax(0,1fr)_7rem] items-center gap-3 sm:grid-cols-[minmax(0,1fr)_9rem]">
            <div>
              <div className="mb-3 grid h-10 w-10 place-items-center rounded-full bg-[#861923] text-[#fff1d9]">
                <Check aria-hidden="true" className="h-5 w-5" />
              </div>
              <h3 className="font-display text-2xl font-bold text-[#861923] sm:text-3xl">
                Thank You!
              </h3>
            </div>
            {/* Mickey image */}
              <div
              aria-hidden="true"
              className="h-40 w-full self-start bg-center bg-no-repeat sm:h-52"
              style={{
                backgroundImage: "url('/images/mickeyballoon.png')",
                backgroundSize: 'auto 100%',
              }}
            />
          </div>
          <p className="mt-4 border-t border-[#dbad52]/60 pt-4 leading-relaxed text-[#54312b]">
            {form.attending === 'yes'
              ? "We're excited to celebrate with you! See you soon"
              : "We'll miss you, but thank you for letting us know."}
          </p>
        </motion.div>
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
          <fieldset disabled={submitting} className="min-w-0 space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-mickey-black/80 mb-1.5">Guest Name *</label>
              <input
                type="text"
                required
                maxLength={120}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-mickey-red/40 focus:border-mickey-red transition text-mickey-black"
                placeholder="Your full name"
              />
            </div>

            {/* Contact */}
            <div>
              <label className="block text-sm font-medium text-mickey-black/80 mb-1.5">Contact Number</label>
              <input
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  pattern="[0-9]{11}"
                  value={form.contact}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      contact: e.target.value.replace(/[^0-9]/g, '').slice(0, 11),
                    })
                  }
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-mickey-black focus:border-mickey-red focus:outline-none focus:ring-2 focus:ring-mickey-red/40"
                  placeholder="09XXXXXXXXX (optional)"
                  title="Enter exactly 11 digits, e.g. 09123456789"
                />
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
                maxLength={1000}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-mickey-red/40 focus:border-mickey-red transition text-mickey-black resize-none"
                placeholder="Any special notes or wishes..."
              />
            </div>

            {submitError && <p role="alert" className="text-sm text-mickey-red-dark">{submitError}</p>}
            <button
              type="submit"
              disabled={submitting || !form.name.trim() || !form.attending}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-mickey-red to-mickey-red-dark text-white font-bold text-base shadow-lg shadow-mickey-red/25 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:-translate-y-0.5"
            >
              {submitting ? 'Saving…' : 'Submit RSVP'}
            </button>
          </fieldset>
        </motion.form>
      </div>
    </section>
  );
}
