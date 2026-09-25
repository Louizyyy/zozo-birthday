# Mickey Mouse Theme Birthday Invitation (React + Vite)

Premium interactive birthday invitation website with envelope opening animation.

## Stack
- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- Framer Motion
- Lucide React

## Run

```bash
npm install
npm run dev
```

Open the URL shown (usually http://localhost:5173).

## Customize

Edit `src/data/invitation.ts`:
- Celebrant name, age, photo, message
- Event date, time, venue, address
- Program schedule
- Gallery images
- Birthday wish text

## Project structure

```
src/
  components/
    IntroEnvelope.tsx   # Envelope opening experience
    Navbar.tsx
    Hero.tsx
    BirthdayDetails.tsx # Countdown + details
    Celebrant.tsx
    Program.tsx
    Venue.tsx
    RSVP.tsx
    Gallery.tsx
    BirthdayMessage.tsx
    Footer.tsx
  data/
    invitation.ts       # All editable content
  App.tsx
  main.tsx
  index.css
```
