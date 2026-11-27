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
  { text: 'Will you be my Godparents?', times: [0, 0, 0, 0, 0] },
  { text: 'Because I know you’ll love me.', times: [1.9, 2.2, 2.35, 2.6, 2.9, 3.2] },
  { text: 'Because I know you’ll care.', times: [3.8, 4.1, 4.25, 4.5, 5.3] },
  { text: 'Because I know you’ll always be there.', times: [6.5, 6.8, 6.95, 7.2, 7.5, 7.9, 8.15] },
  { text: 'Thank you for being part of my life.', times: [9.30, 9.75, 9.95, 10.15, 10.45, 10.7, 10.85, 11.05] },
  { text: 'Lots of love,', times: [12, 12.25, 12.45] },
  { text: 'Lorenzo David', times: [13.1, 13.55] },
  { text: 'Or you can call me ZOZO.', times: [14.2, 14.65, 14.85, 15.05, 15.2, 15.35] },
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
        src={`${import.meta.env.BASE_URL}audio/zozomp.mp3`}
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
