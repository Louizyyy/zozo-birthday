import { motion } from 'framer-motion';
import { invitationData } from '../data/invitation';

export default function Gallery() {
  const { gallery } = invitationData;

  return (
    <section
      id="gallery"
      className="py-20 sm:py-28 bg-gradient-to-b from-soft-pink/20 to-cream"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-2"
        >
          <p className="text-mickey-red font-semibold tracking-widest uppercase text-sm mb-2">
            Memories
          </p>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-mickey-black">
            Photo Gallery
          
          {/* Mickey Mouse Logo - Attached to Gallery Header */}
        <motion.div
          initial={{
            opacity: 0,
            y: 15,
            scale: 0.9,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
            ease: 'easeOut',
          }}
          className="
            flex
            justify-center
            items-center
            -mt-2
            mb-3
            sm:-mt-3
            sm:mb-4
          "
        >
          <img
            src="/images/mickeymouse.png"
            alt="Mickey Mouse"
            className="
              w-76
              sm:w-48
              md:w-56
              lg:w-64
              h-auto
              object-contain
              drop-shadow-[0_6px_10px_rgba(0,0,0,0.15)]
            "
          />
        </motion.div>
        </h2>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {gallery.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{
                once: true,
                margin: '-40px',
              }}
              transition={{
                delay: i * 0.07,
                duration: 0.4,
              }}
              className="relative overflow-hidden rounded-2xl shadow-md group aspect-square"
            >
              <img
                src={src}
                alt={`Gallery ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-mickey-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}