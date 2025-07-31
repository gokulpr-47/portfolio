// Personal Information Types
export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  email: string;
  location: string;
  about: {
    background: string;
    interests: string;
    motivation: string;
  };
  socials: {
    linkedin: string;
    github: string;
    email: string;
  };
}

// Experience Types
export interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  duration: string;
  description: string;
  achievements: string[];
  technologies: string[];
  companyLogo?: string;
  link?: string;
}

// Project Types
export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  category: string;
  featured: boolean;
  achievements: string[];
  learnings: string[];
  role: string;
  timeline: string;
  complexity: string;
  theme: string;
  accentColor: string;
}

// Skills Types
export interface SkillIsland {
  id: number;
  name: string;
  category: string;
  proficiency: number;
  color: string;
  size: number;
  x: number;
  y: number;
  height: number;
  theme: string;
  description: string;
  shape: string;
  connections: number[];
}

export interface SkillCategory {
  name: string;
  color: string;
  icon: string;
}

// Navigation Types
export interface NavigationItem {
  id: number;
  name: string;
  target: string;
  sectionIndex: number;
}

// Theme Types
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: {
    start: string;
    end: string;
  };
  text: {
    primary: string;
    secondary: string;
    muted: string;
  };
  gradients: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export interface ThemeConfig {
  colors: ThemeColors;
  fonts: {
    primary: string;
    secondary: string;
  };
  spacing: {
    section: string;
    container: string;
  };
}

// Carousel Options
export interface CarouselOptions {
  loop: boolean;
  align: string;
  containScroll: boolean;
  dragFree: boolean;
  skipSnaps: boolean;
  duration: number;
}
