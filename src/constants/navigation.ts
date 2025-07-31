import { NavigationItem } from "./types";

export const navigationItems: NavigationItem[] = [
  {
    id: 1,
    name: "HOME",
    target: "home",
    sectionIndex: 1,
  },
  {
    id: 2,
    name: "EXPERIENCE",
    target: "experience",
    sectionIndex: 2,
  },
  {
    id: 3,
    name: "SKILLS",
    target: "skills",
    sectionIndex: 3,
  },
  {
    id: 4,
    name: "PROJECTS",
    target: "projects",
    sectionIndex: 4,
  },
  {
    id: 5,
    name: "ABOUT",
    target: "about",
    sectionIndex: 5,
  },
];

// Section configurations
export const sections = {
  home: {
    id: "home",
    title: "Home",
    index: 1,
    className: "page home h-screen",
  },
  experience: {
    id: "experience",
    title: "Experience",
    index: 2,
    className: "page experience h-screen",
  },
  skills: {
    id: "skills",
    title: "Skills",
    index: 3,
    className: "page skills h-screen",
  },
  projects: {
    id: "projects",
    title: "Projects",
    index: 4,
    className: "page projects h-screen",
  },
  about: {
    id: "about",
    title: "About",
    index: 5,
    className: "page about h-screen",
  },
};

// Navigation configuration
export const navigationConfig = {
  scrollBehavior: "smooth" as ScrollBehavior,
  offset: 0,
  duration: 1000,
  easing: "easeInOutCubic",
};

// Social media links
export const socialLinks = {
  linkedin: {
    name: "LinkedIn",
    url: "https://linkedin.com/in/gokul-pr",
    icon: "faLinkedinIn",
  },
  github: {
    name: "GitHub",
    url: "https://github.com/gokul-pr",
    icon: "faGithubAlt",
  },
  email: {
    name: "Email",
    url: "mailto:gokul@example.com",
    icon: "faEnvelope",
  },
};

// Contact information
export const contactInfo = {
  email: "gokul@example.com",
  location: "India",
  availability: "Open to new opportunities",
  timezone: "IST (UTC+5:30)",
};

// Footer links
export const footerLinks = {
  sections: [
    {
      title: "Navigation",
      links: [
        { name: "Home", href: "#home" },
        { name: "Experience", href: "#experience" },
        { name: "Skills", href: "#skills" },
        { name: "Projects", href: "#projects" },
        { name: "About", href: "#about" },
      ],
    },
    {
      title: "Connect",
      links: [
        { name: "LinkedIn", href: "https://linkedin.com/in/gokul-pr" },
        { name: "GitHub", href: "https://github.com/gokul-pr" },
        { name: "Email", href: "mailto:gokul@example.com" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Resume", href: "/resume.pdf" },
        { name: "Blog", href: "https://blog.gokul.dev" },
        { name: "Portfolio", href: "https://gokul.dev" },
      ],
    },
  ],
};

// Scroll behavior configuration
export const scrollConfig = {
  smooth: true,
  duration: 1000,
  offset: 0,
  easing: "easeInOutCubic",
};

// Intersection observer options
export const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};
