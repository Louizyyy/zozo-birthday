import { useEffect, useRef, useState } from 'react';
import IntroEnvelope from './components/IntroEnvelope';
import GodparentsIntro from './components/GodparentsIntro';
import Hero from './components/Hero';
import BirthdayDetails from './components/BirthdayDetails';
import RSVP from './components/RSVP';
import Gallery from './components/Gallery';
import BirthdayMessage from './components/BirthdayMessage';
import Footer from './components/Footer';

function App() {
  const isGodparents = new URLSearchParams(window.location.search).get('invite') === 'godparents';
  const [showInvitation, setShowInvitation] = useState(false);
  const [isDesktopFrame, setIsDesktopFrame] = useState(() =>
    typeof window !== 'undefined' &&
    window.self === window.top &&
    window.innerWidth >= 768
  );

  const musicRef = useRef<HTMLAudioElement>(null);

  const startMusic = () => {
    const audio = musicRef.current;
    if (!audio) return;

    audio.volume = 0.3;
    void audio.play().catch((error) => {
      console.warn('Could not play background music:', error);
    });
  };

  useEffect(() => {
    const updateView = () => {
      setIsDesktopFrame(
        window.self === window.top && window.innerWidth >= 768
      );
    };

    window.addEventListener('resize', updateView);
    return () => window.removeEventListener('resize', updateView);
  }, []);

  /*
    Desktop/browser view:
    Render the exact same app inside a 430px-wide iframe so the app's
    existing mobile CSS remains the single source of truth.

    Mobile view:
    Render the app normally at the device width.

    No component CSS or responsive classes are changed by this wrapper.
  */
  if (isDesktopFrame) {
    return (
      <div
        style={{
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'stretch',
          background: '#e5e5e5',
        }}
      >
        <iframe
          title="Lorenzo's Birthday Invitation"
          src={window.location.href}
          style={{
            width: '430px',
            height: '100vh',
            border: 'none',
            display: 'block',
            background: '#fff',
            boxShadow: '0 0 30px rgba(0, 0, 0, 0.12)',
          }}
        />
      </div>
    );
  }

  return (
    <>
      <audio
        ref={musicRef}
        src={`${import.meta.env.BASE_URL}audio/birthday-music.mp3`}
        preload="auto"
        loop
      />
      {!showInvitation && (
        isGodparents ? (
          <GodparentsIntro
            onOpenStart={startMusic}
            onOpenComplete={() => setShowInvitation(true)}
          />
        ) : (
          <IntroEnvelope
            onOpenStart={startMusic}
            onOpenComplete={() => setShowInvitation(true)}
          />
        )
      )}

      {showInvitation && (
        <div className="min-h-screen">
          {/* <Navbar /> */}
          <main>
            <Hero />
            <BirthdayDetails />
            <Gallery />
            {/* <Celebrant /> */}
            <RSVP />
            <BirthdayMessage />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
