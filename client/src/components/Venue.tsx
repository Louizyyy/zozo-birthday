import { MapPin } from 'lucide-react';
import { formatEventTime, type InvitationLocation } from '../data/invitation';

export default function Venue({ locations }: { locations: InvitationLocation[] }) {
  return (
    <div id="venue">
      {locations.map(({ label, startsAt, name, address }) => {
        const query = encodeURIComponent(`${name}, ${address}`);

        return (
          <section key={label} className="border-b border-[#d7a346]/45 py-6 last:border-b-0 last:pb-0">
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-[#d7a346] bg-[#c80e1b] text-white shadow-md sm:h-16 sm:w-16">
                <MapPin aria-hidden="true" className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-[#bd111b]">{label}</h3>
                <time dateTime={startsAt} className="mt-1 block font-bold text-[#201d1d]">{formatEventTime(startsAt)}</time>
                <p className="mt-1 font-display text-xl font-bold leading-tight text-[#201d1d]">{name}</p>
                <p className="mt-1 text-sm text-[#201d1d]">{address}</p>
              </div>
            </div>

            <div className="mt-4 overflow-hidden rounded-2xl border border-[#d7a346]/70 bg-[#f7f0e4]">
              <iframe
                src={`https://www.google.com/maps?q=${query}&output=embed`}
                title={`${label} map`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-48 w-full border-0 sm:h-60"
              />
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${query}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm font-semibold text-[#bd111b] underline underline-offset-4"
            >
              Open {label.toLowerCase()} in Google Maps
            </a>
          </section>
        );
      })}
    </div>
  );
}
