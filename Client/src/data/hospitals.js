import { SITE } from "../config/site";

export const NEARBY_HOSPITALS = [
  {
    id: "h1",
    name: "PawCare Emergency Veterinary Hospital",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80",
    address: "Sector 18, Noida, Uttar Pradesh 201301",
    phone: SITE.phone,
    phoneDisplay: `+91 ${SITE.phone}`,
    hours: "Emergency: 24×7 · OPD: 9:00 AM – 9:00 PM",
    vetsOnDuty: "3 senior vets + 2 residents (night)",
    mapQuery: "Noida+Sector+18+veterinary",
  },
  {
    id: "h2",
    name: "Compassion Animal Clinic & Surgery",
    image:
      "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=800&q=80",
    address: "Dwarka, New Delhi 110075",
    phone: SITE.phone,
    phoneDisplay: `+91 ${SITE.phone}`,
    hours: "Mon–Sat 8:00 AM – 8:00 PM · Sun emergency only",
    vetsOnDuty: "2 consultants · Surgery slots by appointment",
    mapQuery: "Dwarka+Delhi+veterinary+clinic",
  },
  {
    id: "h3",
    name: "Hope Tails Pet Hospital",
    image:
      "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80",
    address: "Indirapuram, Ghaziabad 201014",
    phone: SITE.phone,
    phoneDisplay: `+91 ${SITE.phone}`,
    hours: "24×7 ICU · Walk-in 10:00 AM – 8:00 PM",
    vetsOnDuty: "Round-the-clock emergency team",
    mapQuery: "Indirapuram+pet+hospital",
  },
];
