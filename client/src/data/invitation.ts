export const invitationData = {
  celebrant: {
    name: "Lorenzo 'Zozo'",
    age: 1,
    shortMessage: "Come celebrate another magical year with me!",
    photo: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=600&fit=crop&q=80", // placeholder child photo
  },
  event: {
    title: "Lorenzo's Baptismal Ceremony",
    date: "2026-11-28",
    day: "Saturday",
    time: "3:00 PM",
    venue: "Sunshine Kids Party Hall",
    address: "123 Magic Lane, Disney District, CA 90210",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=123+Magic+Lane+Disney+District+CA+90210",
    fullDateDisplay: "Saturday, November 28, 2026",
  },
  program: [
    { time: "2:45 PM", activity: "Guest Arrival", icon: "users" },
    { time: "3:00 PM", activity: "Welcome & Opening", icon: "sparkles" },
    { time: "3:15 PM", activity: "Birthday Games", icon: "gamepad" },
    { time: "3:45 PM", activity: "Food & Snacks", icon: "utensils" },
    { time: "4:15 PM", activity: "Cake Ceremony", icon: "cake" },
    { time: "4:30 PM", activity: "Birthday Song", icon: "music" },
    { time: "4:45 PM", activity: "Photo Session", icon: "camera" },
    { time: "5:00 PM", activity: "Party & Fun", icon: "party-popper" },
  ],
  gallery: [
    "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=400&fit=crop&q=80",
    "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=400&h=300&fit=crop&q=80",
    "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=400&h=400&fit=crop&q=80",
    "https://images.unsplash.com/photo-1464349153736-12acf5268ae1?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop&q=80",
  ],
  message: "Every year is another magical adventure. Come celebrate this special day filled with laughter, love, and unforgettable memories!",
  rsvpEmail: "rsvp@example.com", // placeholder
};

export type InvitationData = typeof invitationData;
