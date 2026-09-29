import { motion } from 'framer-motion';
import { invitationData } from '../data/invitation';

export default function Gallery() {
  const { gallery } = invitationData;

  return (
    <section id="gallery" className="bg-cream">
      <div className="relative mx-auto max-w-[520px] overflow-hidden bg-cream">
        {/* Background artwork: top flags and bottom racetrack */}
        <img
          src="/images/bg-memories.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-fill"
        />
        <div
        className="
          pointer-events-none
          absolute
          left-1/2
          bottom-[20px]
          z-20
          -translate-x-1/2
          select-none
        "
      >
        <span
          className="
            block
            text-center
            font-black
            text-white
            text-6xl
            sm:text-5xl
            tracking-[0.08em]
            leading-none
            opacity-90
            [transform:perspective(180px)_rotateX(58deg)_skewX(-2deg)]
            drop-shadow-[0_3px_2px_rgba(0,0,0,0.45)]
          "
        >
          FINISH
        </span>
      </div>

        <div className="relative z-10 px-4 pb-56 pt-36 sm:px-6 sm:pb-64 sm:pt-40">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-0 text-center"
          >
            <p className="mb-1 text-sm font-semibold uppercase tracking-widest text-mickey-red">
              Memories
            </p>

            <h2 className="font-display text-3xl -mb-8 font-bold text-mickey-black sm:text-4xl">
              Photo Gallery
            </h2>

            <motion.img
              src="/images/mickeymouse.png"
              alt="Mickey Mouse"
              initial={{ opacity: 0, y: 12, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mx-auto mt-0 -mb-8 h-auto w-70 object-contain drop-shadow-[0_6px_10px_rgba(0,0,0,0.15)] sm:w-48"
            />
          </motion.div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {gallery.map((src, i) => (
              <motion.div
                key={`${src}-${i}`}
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: Math.min(i * 0.07, 0.35), duration: 0.4 }}
                className="group relative aspect-square overflow-hidden rounded-2xl border-4 border-white shadow-md"
              >
                <img
                  src={src}
                  alt={`Gallery photo ${i + 1}`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}