import { Project } from "./types";

export const projects: Project[] = [
  {
    id: 1,
    title: "Portfolio Website",
    description:
      "A modern, interactive portfolio built with Next.js, TypeScript, and Three.js. Features smooth animations, dark theme, and responsive design.",
    technologies: ["Next.js", "TypeScript", "Three.js", "Tailwind CSS"],
    image: "/project-placeholder.svg",
    githubUrl: "https://github.com/yourusername/portfolio",
    liveUrl: "https://yourportfolio.com",
    category: "Full Stack",
    featured: true,
    achievements: [
      "Implemented smooth scroll animations and interactive elements",
      "Achieved 95+ Lighthouse performance score",
      "Created responsive design for all devices",
    ],
    learnings: [
      "Advanced Three.js integration with React",
      "Optimized bundle size and loading performance",
      "Mastered TypeScript for type-safe development",
    ],
    role: "Solo Developer",
    timeline: "3 months",
    complexity: "Advanced",
    theme: "cosmic",
    accentColor: "#61DAFB",
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    description:
      "A complete e-commerce solution with payment integration, user authentication, and admin dashboard.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    image: "/project-placeholder.svg",
    githubUrl: "https://github.com/yourusername/ecommerce",
    liveUrl: "https://ecommerce-demo.com",
    category: "Full Stack",
    featured: true,
    achievements: [
      "Integrated secure payment processing with Stripe",
      "Built comprehensive admin dashboard with analytics",
      "Implemented real-time inventory management",
    ],
    learnings: [
      "Payment gateway integration and security best practices",
      "Database design for e-commerce applications",
      "State management with Redux and Context API",
    ],
    role: "Full Stack Developer",
    timeline: "6 months",
    complexity: "Advanced",
    theme: "forest",
    accentColor: "#4FC08D",
  },
  {
    id: 3,
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates and team features.",
    technologies: ["Vue.js", "Laravel", "PostgreSQL", "WebSockets"],
    image: "/project-placeholder.svg",
    githubUrl: "https://github.com/yourusername/taskapp",
    liveUrl: "https://taskapp-demo.com",
    category: "Full Stack",
    featured: false,
    achievements: [
      "Implemented real-time collaboration features",
      "Built robust user authentication and permissions",
      "Created intuitive drag-and-drop interface",
    ],
    learnings: [
      "Real-time communication with WebSockets",
      "Vue.js 3 Composition API and ecosystem",
      "Laravel backend with Eloquent ORM",
    ],
    role: "Full Stack Developer",
    timeline: "4 months",
    complexity: "Intermediate",
    theme: "ocean",
    accentColor: "#42B883",
  },
  {
    id: 4,
    title: "AI Chat Assistant",
    description:
      "An intelligent chatbot powered by machine learning with natural language processing capabilities.",
    technologies: ["Python", "TensorFlow", "React", "FastAPI"],
    image: "/project-placeholder.svg",
    githubUrl: "https://github.com/yourusername/ai-chat",
    liveUrl: "https://ai-chat-demo.com",
    category: "AI/ML",
    featured: true,
    achievements: [
      "Achieved 85% accuracy in intent recognition",
      "Implemented real-time response generation",
      "Built scalable microservices architecture",
    ],
    learnings: [
      "Natural Language Processing with spaCy",
      "Model deployment and API development",
      "Real-time data processing with WebSockets",
    ],
    role: "AI Developer",
    timeline: "5 months",
    complexity: "Advanced",
    theme: "neon",
    accentColor: "#FF6B6B",
  },
  {
    id: 5,
    title: "Weather Dashboard",
    description:
      "A beautiful weather application with real-time data, forecasts, and interactive maps.",
    technologies: ["React", "TypeScript", "OpenWeather API", "Chart.js"],
    image: "/project-placeholder.svg",
    githubUrl: "https://github.com/yourusername/weather-app",
    liveUrl: "https://weather-dashboard.com",
    category: "Frontend",
    featured: false,
    achievements: [
      "Integrated multiple weather APIs for comprehensive data",
      "Created interactive charts and visualizations",
      "Implemented location-based weather alerts",
    ],
    learnings: [
      "API integration and data visualization",
      "Progressive Web App development",
      "Geolocation and mapping services",
    ],
    role: "Frontend Developer",
    timeline: "2 months",
    complexity: "Intermediate",
    theme: "sky",
    accentColor: "#74B9FF",
  },
];

// Project categories
export const projectCategories = [
  { name: "All", value: "all" },
  { name: "Full Stack", value: "Full Stack" },
  { name: "Frontend", value: "Frontend" },
  { name: "Backend", value: "Backend" },
  { name: "AI/ML", value: "AI/ML" },
  { name: "Mobile", value: "Mobile" },
];

// Project complexity levels
export const complexityLevels = {
  beginner: {
    label: "Beginner",
    color: "text-green-400",
    icon: "🌱",
  },
  intermediate: {
    label: "Intermediate",
    color: "text-yellow-400",
    icon: "🚀",
  },
  advanced: {
    label: "Advanced",
    color: "text-purple-400",
    icon: "⚡",
  },
};

// Project themes
export const projectThemes = {
  cosmic: {
    name: "Cosmic",
    gradient: "from-purple-600 to-pink-600",
    accent: "#8B5CF6",
  },
  forest: {
    name: "Forest",
    gradient: "from-green-600 to-emerald-600",
    accent: "#10B981",
  },
  ocean: {
    name: "Ocean",
    gradient: "from-blue-600 to-cyan-600",
    accent: "#06B6D4",
  },
  neon: {
    name: "Neon",
    gradient: "from-pink-600 to-red-600",
    accent: "#EC4899",
  },
  sky: {
    name: "Sky",
    gradient: "from-blue-500 to-indigo-500",
    accent: "#3B82F6",
  },
};

// Project section configuration
export const projectConfig = {
  title: "Featured Projects",
  subtitle:
    "Explore my latest work showcasing modern web development, innovative solutions, and creative problem-solving.",
  filters: {
    all: "All Projects",
    featured: "Featured Only",
  },
  viewOptions: {
    grid: "Grid View",
    list: "List View",
  },
};
