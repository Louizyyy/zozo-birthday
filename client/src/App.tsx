import { useState } from 'react';
import IntroEnvelope from './components/IntroEnvelope';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BirthdayDetails from './components/BirthdayDetails';
import Celebrant from './components/Celebrant';
import Program from './components/Program';
import Venue from './components/Venue';
import RSVP from './components/RSVP';
import Gallery from './components/Gallery';
import BirthdayMessage from './components/BirthdayMessage';
import Footer from './components/Footer';

function App() {
  const [showInvitation, setShowInvitation] = useState(false);

  return (
    <>
      {!showInvitation && (
        <IntroEnvelope onOpenComplete={() => setShowInvitation(true)} />
      )}

      {showInvitation && (
        <div className="min-h-screen">
         {/* <Navbar /> */}
          <main>
            <Hero />
          {/* <BirthdayDetails /> */}
            <Gallery />
           {/* <Celebrant /> */}
            <Program /> 
          {/* <Venue /> */}
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
