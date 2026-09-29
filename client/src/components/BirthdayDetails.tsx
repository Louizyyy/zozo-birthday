import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { invitationData } from '../data/invitation';

const EVENT_DATE = new Date('2026-10-28T15:00:00+08:00');

function getTimeLeft() {
  const difference = Math.max(0, EVENT_DATE.getTime() - Date.now());

  return {
    days: Math.floor(difference / 86_400_000),
    hours: Math.floor((difference / 3_600_000) % 24),
    minutes: Math.floor((difference / 60_000) % 60),
    seconds: Math.floor((difference / 1_000) % 60),
  };
}

export default function BirthdayDetails() {
  const { event } = invitationData;
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const countdown = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <section
      id="details"
      className="relative w-full overflow-hidden bg-[#fff9ee]"
    >
      {/* Background image */}
      <img
        src="/images/bg-details.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-center"
      />

      <div className="relative z-10 mx-auto max-w-3xl px-4 pb-28 pt-20 sm:px-6 sm:pb-32 sm:pt-24">
        {/* Heading */}
<motion.header
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="relative mb-8 text-center"
>
  {/* LEFT FLAG */}
  <motion.img
    src="/images/1flag.png"
    alt=""
    aria-hidden="true"
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="
      absolute
      left-[15px]
      sm:left-[-70px]
      md:left-[-100px]
      top-[10px]
      -translate-y-1/2
      w-24
      sm:w-32
      md:w-40
      lg:w-48
      h-auto
      pointer-events-none
      z-0
    "
  />

  {/* RIGHT FLAG */}
  <motion.img
    src="/images/1flag.png"
    alt=""
    aria-hidden="true"
    initial={{ opacity: 0, x: 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="
      absolute
      right-[15px]
      sm:right-[-70px]
      md:right-[-100px]
      top-[10px]
      -translate-y-1/2
      w-24
      sm:w-32
      md:w-40
      lg:w-48
      h-auto
      -scale-x-100
      pointer-events-none
      z-0
    "
  />

  {/* HEADER CONTENT */}
  <div className="relative z-10">
    <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-[#bd111b] sm:text-sm">
      Save the Date
    </p>

    <h2 className="font-display text-4xl font-bold leading-tight text-[#1d1b1b] sm:text-5xl">
      Baptismal Details
    </h2>

    <div
      aria-hidden="true"
      className="mx-auto mt-5 flex items-center justify-center gap-3"
    >
      <span className="h-px w-14 bg-[#d6a23e]" />
      <span className="text-lg text-[#d6a23e]">✦</span>
      <span className="h-px w-14 bg-[#d6a23e]" />
    </div>
  </div>
</motion.header>

        {/* Countdown */}
        <div className="mb-8 grid grid-cols-4 gap-2 sm:gap-4">
          {countdown.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              className="overflow-hidden rounded-xl border border-[#d7a346] bg-white shadow-md sm:rounded-2xl"
            >
              <div className="bg-gradient-to-b from-[#ef1725] to-[#b90b17] px-1 py-3 text-center sm:py-4">
                <span className="font-display text-2xl font-bold tabular-nums text-white sm:text-4xl">
                  {String(item.value).padStart(2, '0')}
                </span>
              </div>

              <p className="px-1 py-2 text-center text-[9px] font-semibold uppercase tracking-wider text-[#292323] sm:text-xs">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Event ticket */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="overflow-hidden rounded-[28px] border border-[#d7a346] bg-[#fffdf8]/95 shadow-[0_18px_45px_rgba(75,41,15,0.13)]"
        >
          {/* Racing stripe */}
          <div
            aria-hidden="true"
            className="h-3 bg-[repeating-linear-gradient(110deg,#c70e1c_0_22px,#fff_22px_44px)]"
          />

          <div className="px-5 py-2 sm:px-8">
            {/* Date */}
            <div className="flex items-center gap-4 py-6 sm:gap-6">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-[#d7a346] bg-[#c80e1b] text-white shadow-md sm:h-16 sm:w-16">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-7 w-7"
                  aria-hidden="true"
                >
                  <rect x="3" y="5" width="18" height="16" rx="2" />
                  <path d="M7 3v4M17 3v4M3 10h18" />
                </svg>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#bd111b]">
                  Date
                </p>
                <p className="mt-1 font-display text-xl font-bold leading-tight text-[#201d1d] sm:text-2xl">
                  Wednesday, October 28, 2026
                </p>
              </div>
            </div>

            <div className="border-t border-[#d7a346]/45" />

            {/* Time */}
            <div className="flex items-center gap-4 py-6 sm:gap-6">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-[#d7a346] bg-[#c80e1b] text-white shadow-md sm:h-16 sm:w-16">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-7 w-7"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#bd111b]">
                  Time
                </p>
                <p className="mt-1 font-display text-2xl font-bold text-[#201d1d]">
                  {event.time}
                </p>
              </div>
            </div>

            <div className="border-t border-[#d7a346]/45" />

            {/* Venue */}
            <div className="flex items-center gap-4 py-6 sm:gap-6">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-[#d7a346] bg-[#c80e1b] text-white shadow-md sm:h-16 sm:w-16">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-7 w-7"
                  aria-hidden="true"
                >
                  <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#bd111b]">
                  Venue
                </p>
                <p className="mt-1 font-display text-2xl font-bold text-[#201d1d]">
                  {event.venue}
                </p>
              </div>
            </div>

            {/* Map */}
<div className="relative overflow-hidden rounded-2xl border border-[#d7a346]/70 bg-[#f7f0e4]">
  <iframe
    src="https://www.google.com/maps?q=Le+Parc+Pasay+City+Metro+Manila&output=embed"
    title={`${event.venue} location map`}
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    className="h-48 w-full border-0 sm:h-60"
  />
</div>
  {/* Mickey Overlay */}
<motion.img
  src="/images/mickeypoint.png"
  alt="Mickey Mouse"

  /* Entrance animation */
  initial={{
    opacity: 0,
    scale: 0.7,
    x: -40,
    y: 20,
  }}

  /* After appearing, continuously move slightly */
  whileInView={{
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
  }}

  viewport={{ once: true }}

  transition={{
    opacity: {
      duration: 0.5,
      ease: "easeOut",
    },
    scale: {
      duration: 0.6,
      ease: "backOut",
    },
    x: {
      duration: 0.6,
      ease: "easeOut",
    },
    y: {
      duration: 0.6,
      ease: "easeOut",
    },
  }}

  animate={{
    y: [0, -5, 0],
    rotate: [0, -1, 0, 1, 0],
  }}

  className="
    absolute
    left-[45px]
    bottom-[45px]
    w-42
    sm:w-40
    md:w-44
    h-auto
    z-20
    pointer-events-none
    drop-shadow-[0_8px_12px_rgba(0,0,0,0.25)]
  "
/>
          </div>
          <div
            aria-hidden="true"
            className="h-3 bg-[repeating-linear-gradient(110deg,#c70e1c_0_22px,#fff_22px_44px)]"
          />
        </motion.div>
      </div>
    </section>
  );
}