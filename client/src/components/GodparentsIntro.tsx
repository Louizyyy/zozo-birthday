import { motion, useReducedMotion } from 'framer-motion';
import { useRef, useState } from 'react';
import { invitationData } from '../data/invitation';
import './GodparentsIntro.css';

interface GodparentsIntroProps {
  onOpenStart: () => void;
  onOpenComplete: () => void;
}

// Each timestamp is the start of the corresponding word, in seconds.
const narration = [
  { text: 'Dear Tito,', times: [0, 0] },
  {
    text: 'Life is one exciting race, and every race needs a pit crew!',
    times: [0.85, 1.12, 1.27, 1.5, 2.03, 2.63, 2.8, 3.1, 3.4, 3.65, 3.8, 4.12],
  },
  {
    text: 'I’m gearing up for the biggest adventure yet and I can’t cross the finish line without you!',
    times: [4.8, 5.05, 5.35, 5.5, 5.63, 5.8, 6.2, 6.75, 7.2, 7.35, 7.5, 7.85, 8.15, 8.3, 8.65, 8.9, 9.3],
  },
  { text: 'Will you be my Ninong?', times: [10.1, 10.35, 10.55, 10.75, 11] },
  { text: 'Lorenzo,', times: [12.1] },
];

const confettiColors = ['#ec2530', '#ffca47', '#fff4df', '#ff8e45', '#fff'];
const confetti = Array.from({ length: 72 }, (_, index) => {
  const angle = (index * 137.508 * Math.PI) / 180;
  const distance = 80 + (index % 11) * 24;

  return {
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance - 45,
    color: confettiColors[index % confettiColors.length],
    rotate: index % 2 === 0 ? 320 : -320,
  };
});

export default function GodparentsIntro({ onOpenStart, onOpenComplete }: GodparentsIntroProps) {
  const { celebrant } = invitationData;
  const audioRef = useRef<HTMLAudioElement>(null);
  const reduceMotion = useReducedMotion();
  const [burstOrigin, setBurstOrigin] = useState<{ left: number; top: number }>();
  const [position, setPosition] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [messageFinished, setMessageFinished] = useState(false);
  const [playbackFailed, setPlaybackFailed] = useState(false);

  const playMessage = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    setPlaybackFailed(false);
    try {
      await audio.play();
      setShowAll(false);
    } catch {
      setPlaybackFailed(true);
      setShowAll(true);
    }
  };

  return (
    <section className="godparents-intro" aria-label="Godparents invitation">
      <div className="godparents-layout">
        <img className="godparents-photo" src={`${import.meta.env.BASE_URL}images/godparents-zozo.jpg`} alt={celebrant.name} />
        <div className="godparents-divider" aria-hidden="true"><span /></div>
        <div className="godparents-copy">
          <div className="godparents-letter">
            {narration.map(({ text, times }, line) => {
              const Tag = line === 0 ? 'h1' : 'p';

              return (
                <Tag key={text} className={`godparents-line godparents-line-${line}`}>
                  <span className="sr-only">{text}</span>
                  <span aria-hidden="true">
                    {text.split(' ').map((word, index) => (
                      <span key={index} className={showAll || position >= times[index] ? 'word-visible' : 'word-hidden'}>
                        {word}{' '}
                      </span>
                    ))}
                  </span>
                </Tag>
              );
            })}
            <p className="godparents-line godparents-line-7">
              Christening and Birthday Celebration
            </p>
          </div>
        </div>
        <img
          className="godparents-racer"
          src={`${import.meta.env.BASE_URL}images/godparents-racer.png`}
          alt=""
        />
        <div className="godparents-actions">
          {messageFinished ? (
            <button type="button" className="godparents-open-button"
              disabled={Boolean(burstOrigin)}
              onClick={(event) => {
                onOpenStart();
                if (reduceMotion) {
                  onOpenComplete();
                  return;
                }

                const button = event.currentTarget.getBoundingClientRect();
                setBurstOrigin({
                  left: button.left + button.width / 2,
                  top: button.top + button.height / 2,
                });
              }}>
              <span aria-hidden="true">✉</span> Open Invitation
            </button>
          ) : (
            <button type="button" onClick={playing ? () => audioRef.current?.pause() : playMessage}>
              <span aria-hidden="true">{playing ? 'Ⅱ' : '▶'}</span>{' '}
              {playing ? 'Pause message' : position > 0 ? 'Resume message' : 'Play message'}
            </button>
          )}
        </div>
      </div>
      {playbackFailed && (
        <p className="godparents-playback-error" role="status">
          The message couldn’t play. Please try again.
        </p>
      )}
      {burstOrigin && (
        <div className="godparents-confetti" style={burstOrigin} aria-hidden="true">
          <motion.span
            className="godparents-confetti-flash"
            initial={{ scale: 0, opacity: 0.85 }}
            animate={{ scale: [0, 2.5, 4], opacity: [0.85, 0.25, 0] }}
            transition={{ duration: 0.95 }}
            onAnimationComplete={onOpenComplete}
          />
          {confetti.map(({ x, y, color, rotate }, index) => (
            <motion.span
              key={index}
              className="godparents-confetti-piece"
              style={{ backgroundColor: color }}
              initial={{ x: 0, y: 0, scale: 0.4, opacity: 1 }}
              animate={{ x: [0, x * 0.85, x], y: [0, y, y + 125], rotate, scale: [0.4, 1, 0.6], opacity: [1, 1, 0] }}
              transition={{ duration: 0.9, times: [0, 0.55, 1], ease: 'easeOut' }}
            />
          ))}
        </div>
      )}
      <audio
        ref={audioRef}
        preload="none"
        src={`${import.meta.env.BASE_URL}audio/godparents-ninong.mp3`}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(event) => setPosition(event.currentTarget.currentTime)}
        onEnded={() => {
          setPlaying(false);
          setShowAll(true);
          setMessageFinished(true);
        }}
      />
    </section>
  );
}
