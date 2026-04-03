
import {
  logo,
  backend,
  creator,
  mobile,
  web,
  github,
  menu,
  close,
  css,
  gearXpert,
  project2,
  project3,
  mysql,
  express,
  aws,
  mui,

  gsap,
  framer,
  figma,
  git,
  html,
  javascript,
  mongodb,
  nodejs,
  reactjs,
  redux,
  tailwind,
  threejs,
  firstTestimonial,
  secondTestimonial,
  thirdTestimonial,
} from '../assets'


// Import Tekisky separately
import tekisky from "../assets/company/tekisky.png";



export const navLinks = [
  {
    id: "home",
    title: "Home",
  },
  {
    id: "about",
    title: "About",
  },
  {
    id: "pillars",
    title: "The Six Pillars",
  },
  {
    id: "contact",
    title: "Contact",
  },
  {
    id: "register-page",
    title: "Register for One Day Program",
  },
];

const services = [
  {
    title: "Spirituality",
    icon: web, // Using existing placeholders for now
  },
  {
    title: "Formation",
    icon: mobile,
  },
  {
    title: "Mission",
    icon: backend,
  },
  {
    title: "Community",
    icon: creator,
  },
];

const technologies = [
  {
    name: "Prayer",
    icon: html,
  },
  {
    name: "Word of God",
    icon: css,
  },
  {
    name: "Sacraments",
    icon: javascript,
  },
  {
    name: "Fellowship",
    icon: reactjs,
  },
  {
    name: "Evangelisation",
    icon: nodejs,
  },
  {
    name: "Option for the Poor",
    icon: mongodb,
  },
];

const pillars = [
  {
    title: "Prayer",
    icon: "https://res.cloudinary.com/dfm6raue1/image/upload/v1750400000/prayer-icon_sayl4j.png", // Hypothetical icons or generic
    description: "A personal, loving encounter with Jesus through daily prayer.",
  },
  {
    title: "Word of God",
    icon: "https://res.cloudinary.com/dfm6raue1/image/upload/v1750400000/bible-icon_sayl4j.png",
    description: "Nourishing our souls with the Word of God every day.",
  },
  {
    title: "The Sacraments",
    icon: "https://res.cloudinary.com/dfm6raue1/image/upload/v1750400000/sacrament-icon_sayl4j.png",
    description: "Frequent participation in the Sacraments, especially the Eucharist.",
  },
  {
    title: "Fellowship",
    icon: "https://res.cloudinary.com/dfm6raue1/image/upload/v1750400000/fellowship-icon_sayl4j.png",
    description: "Growing together in a community of like-minded friends.",
  },
  {
    title: "Evangelisation",
    icon: "https://res.cloudinary.com/dfm6raue1/image/upload/v1750400000/evangelise-icon_sayl4j.png",
    description: "Sharing the Good News in today's diverse environments.",
  },
  {
    title: "Option for the Poor",
    icon: "https://res.cloudinary.com/dfm6raue1/image/upload/v1750400000/poor-icon_sayl4j.png",
    description: "Carrying the mission of the Church to the peripheries.",
  },
];

const experiences = [
  {
    title: "International Presence",
    company_name: "40+ Countries",
    icon: gearXpert,
    iconBg: "#383E56",
    date: "Established Globally",
    points: [
      "Present in over 40 countries across 5 continents.",
      "Approved by the Holy See as an International Private Association of the Faithful.",
      "Transforming lives through a joyful spirituality.",
      "A community of young people, couples, and seniors.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "Jesus Youth challenged me to live a meaningful and fulfilling life rooted in Christ.",
    name: "John Doe",
    designation: "Movement Member",
    company: "Jesus Youth",
    image: firstTestimonial,
  },
];

const projects = [
  {
    name: "Spiritual Growth",
    description: "A journey of personal and communal growth through the Six Pillars of Jesus Youth spirituality.",
    tags: [
      { name: "Pillar 1", color: "blue-text-gradient" },
      { name: "Pillar 2", color: "pink-text-gradient" },
      { name: "Pillar 3", color: "green-text-gradient" },
    ],
    image: project2,
    source_code_link: "#",
  },
];

export { services, technologies, experiences, testimonials, projects, pillars };

