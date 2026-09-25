import { invitationData } from '../data/invitation';

export default function Footer() {
  const { celebrant } = invitationData;

  return (
    <footer className="py-12 bg-mickey-black text-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 flex items-center justify-center">
        <svg width="200" height="170" viewBox="0 0 100 85" fill="white">
          <circle cx="22" cy="28" r="22" /><circle cx="78" cy="28" r="22" /><circle cx="50" cy="55" r="32" />
        </svg>
      </div>

      <div className="relative z-10 px-4">
        <div className="flex justify-center mb-4">
          <svg width="32" height="27" viewBox="0 0 100 85" fill="#F5C518">
            <circle cx="22" cy="28" r="22" /><circle cx="78" cy="28" r="22" /><circle cx="50" cy="55" r="32" />
          </svg>
        </div>
        <p className="text-white/90 font-display text-lg mb-1">
          Thank you for celebrating with us!
        </p>
        <p className="text-mickey-gold font-semibold text-base mb-6">
          {celebrant.name}'s Baptismal Celebration
        </p>
        <p className="text-white/40 text-xs">
          louidev.work
        </p>
      </div>
    </footer>
  );
}
