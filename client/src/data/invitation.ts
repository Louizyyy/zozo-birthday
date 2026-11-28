const eventDate = "2027-02-20";
const eventTimeZone = "Asia/Manila";

export const invitationData = {
  celebrant: {
    name: "Zozo",

    shortMessage: "Come celebrate another magical year with me!",
    photo: "/images/hero-pic.jpg", // placeholder child photo
  },
  event: {
    title: "Lorenzo's Birthday Ceremony",
    fullDateDisplay: new Intl.DateTimeFormat("en-US", {
      timeZone: eventTimeZone,
      dateStyle: "full",
    }).format(new Date(`${eventDate}T00:00:00+08:00`)),
  },
  locations: [
    {
      label: "Christening",
      startsAt: `${eventDate}T13:30:00+08:00`,
      name: "Archdiocesan Shrine of Jesus – the Way, the Truth, and the Life",
      address: "Coral Way, Mall of Asia Complex, Pasay City",
    },
    {
      label: "Reception",
      startsAt: `${eventDate}T15:00:00+08:00`,
      name: "Jollibee Phoenix Station",
      address: "Pasay City (beside Hotel 101)",
    },
  ],
  gallery: [
  "/images/zozo1.jpg",
  "/images/zozo2.jpg",
  "/images/zozo3.jpg",
  "/images/zozo4.jpg",
  "/images/zozo5.jpg",
  "/images/zozo6.jpg",
],
  message: "However, if you wish to share a little something for our little one, monetary gifts or baby essentials would be greatly appreciated.",
  rsvpEmail: "rsvp@example.com", // placeholder
};

export type InvitationData = typeof invitationData;

export type InvitationLocation = InvitationData['locations'][number];

export function getInvitationSchedule(isGodparents: boolean) {
  return invitationData.locations.filter(({ label }) => isGodparents || label === 'Reception');
}

export function formatEventTime(startsAt: string) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: eventTimeZone,
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(startsAt));
}
