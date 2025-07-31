import { Experience, CarouselOptions } from "./types";

export const experiences: Experience[] = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    duration: "2022 - Present",
    description:
      "Leading development of scalable web applications and mentoring junior developers.",
    achievements: [
      "Led a team of 5 developers to deliver a major feature ahead of schedule",
      "Improved application performance by 40% through optimization",
      "Implemented CI/CD pipeline reducing deployment time by 60%",
      "Mentored 3 junior developers who were promoted within 6 months",
    ],
    technologies: ["React", "Node.js", "TypeScript", "AWS", "Docker"],
    link: "https://techcorp.com",
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "InnovateLabs",
    location: "New York, NY",
    duration: "2020 - 2022",
    description:
      "Developed and maintained multiple client-facing applications with focus on user experience.",
    achievements: [
      "Built 3 client applications that increased user engagement by 35%",
      "Reduced bug reports by 50% through improved testing practices",
      "Collaborated with design team to implement responsive UI components",
      "Optimized database queries reducing load times by 25%",
    ],
    technologies: ["JavaScript", "Python", "PostgreSQL", "Redis", "GraphQL"],
    link: "https://innovatelabs.com",
  },
  {
    id: 3,
    title: "Frontend Developer",
    company: "Digital Dynamics",
    location: "Austin, TX",
    duration: "2018 - 2020",
    description:
      "Specialized in creating intuitive user interfaces and improving user experience.",
    achievements: [
      "Developed 10+ reusable component libraries used across projects",
      "Improved accessibility scores to 95%+ on all applications",
      "Reduced bundle size by 30% through code splitting",
      "Implemented automated testing achieving 90% code coverage",
    ],
    technologies: ["Vue.js", "Sass", "Webpack", "Jest", "Cypress"],
    link: "https://digitaldynamics.com",
  },
];

// Carousel options for experience section
export const experienceCarouselOptions: CarouselOptions = {
  loop: true,
  align: "start",
  containScroll: false,
  dragFree: false,
  skipSnaps: false,
  duration: 20,
};

// Experience section configuration
export const experienceConfig = {
  title: "Work Experience",
  subtitle: "My professional journey in software development",
  timeline: {
    lineColor: "from-blue-400/50 via-purple-400/50 to-transparent",
    dotColor: "from-blue-400 to-purple-400",
    dotBorder: "border-[#0a0a1a]",
    dotShadow: "shadow-blue-400/25",
  },
  card: {
    background: "bg-gradient-to-br from-gray-800/50 to-gray-900/50",
    border: "border border-blue-500/20",
    hover: "hover:border-blue-400/40",
  },
};

// Achievement categories
export const achievementCategories = {
  leadership: {
    icon: "👥",
    color: "text-blue-300",
    title: "Leadership",
  },
  technical: {
    icon: "⚡",
    color: "text-green-300",
    title: "Technical",
  },
  performance: {
    icon: "📈",
    color: "text-purple-300",
    title: "Performance",
  },
  innovation: {
    icon: "💡",
    color: "text-yellow-300",
    title: "Innovation",
  },
};
