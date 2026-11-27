const eventStart = "2027-02-20T13:30:00+08:00";
const eventStartDate = new Date(eventStart);
const eventTimeZone = "Asia/Manila";

export const invitationData = {
  celebrant: {
    name: "Zozo",

    shortMessage: "Come celebrate another magical year with me!",
    photo: "/images/hero-pic.jpg", // placeholder child photo
  },
  event: {
    title: "Lorenzo's Birthday Ceremony",
    startsAt: eventStart,
    time: new Intl.DateTimeFormat("en-US", {
      timeZone: eventTimeZone,
      hour: "numeric",
      minute: "2-digit",
    }).format(eventStartDate),
    fullDateDisplay: new Intl.DateTimeFormat("en-US", {
      timeZone: eventTimeZone,
      dateStyle: "full",
    }).format(eventStartDate),
  },
  locations: [
    {
      label: "Church",
      name: "Archdiocesan Shrine of Jesus – the Way, the Truth, and the Life",
      address: "Coral Way, Mall of Asia Complex, Pasay City",
    },
    {
      label: "Reception",
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
