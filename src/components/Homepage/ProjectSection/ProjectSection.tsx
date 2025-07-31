import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { Karla, Prompt } from "next/font/google";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faExternalLinkAlt,
  faChevronDown,
  faChevronUp,
  faRocket,
  faCode,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";

const prompt = Prompt({ weight: "600", subsets: ["latin"] });
const karla = Karla({ weight: "200", subsets: ["latin"] });

interface Project {
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

const PROJECTS: Project[] = [
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
    role: "Backend Developer",
    timeline: "4 months",
    complexity: "Intermediate",
    theme: "ocean",
    accentColor: "#2496ED",
  },
];

// Memoized technology color mapping for better performance
const TECHNOLOGY_COLORS = {
  React: "#61DAFB",
  "Next.js": "#000000",
  TypeScript: "#3178C6",
  "Node.js": "#339933",
  "Vue.js": "#4FC08D",
  Laravel: "#FF2D20",
  MongoDB: "#47A248",
  PostgreSQL: "#336791",
  Docker: "#2496ED",
  "Tailwind CSS": "#06B6D4",
  "Three.js": "#000000",
  Stripe: "#6772E5",
  Redis: "#DC382D",
  "D3.js": "#F9A03C",
  Python: "#3776AB",
  FastAPI: "#009688",
  Express: "#000000",
  WebSockets: "#FF6B6B",
  "Chart.js": "#FF6384",
  "OpenWeather API": "#4A90E2",
} as const;

// Performance-optimized project card component
const ProjectCard = React.memo(
  ({
    project,
    isExpanded,
    isHovered,
    onToggle,
    onMouseEnter,
    onMouseLeave,
    isMobile,
    isTouchDevice,
    isVisible,
  }: {
    project: Project;
    isExpanded: boolean;
    isHovered: boolean;
    onToggle: () => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    isMobile: boolean;
    isTouchDevice: boolean;
    isVisible: boolean;
  }) => {
    const getTechnologyColor = useCallback((tech: string) => {
      return (
        TECHNOLOGY_COLORS[tech as keyof typeof TECHNOLOGY_COLORS] || "#6B7280"
      );
    }, []);

    const getProjectTheme = useCallback((project: Project) => {
      const themes = {
        cosmic: "from-purple-500/20 via-blue-500/20 to-cyan-500/20",
        forest: "from-green-500/20 via-emerald-500/20 to-teal-500/20",
        ocean: "from-blue-500/20 via-cyan-500/20 to-indigo-500/20",
      };
      return themes[project.theme as keyof typeof themes] || themes.cosmic;
    }, []);

    return (
      <div
        className={`group relative smooth-transition ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        } ${isExpanded ? "z-20" : "z-10"}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onTouchStart={() => isTouchDevice && onMouseEnter()}
        onTouchEnd={() => isTouchDevice && onMouseLeave()}
      >
        <div
          className={`relative rounded-lg sm:rounded-xl overflow-hidden smooth-transition ${
            isHovered
              ? "shadow-lg sm:shadow-xl scale-105"
              : "shadow-md sm:shadow-lg scale-100"
          } min-h-[280px] sm:min-h-[320px]`}
          style={{
            background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))`,
            backdropFilter: "blur(20px)",
            border: `1px solid rgba(255,255,255,${isHovered ? 0.3 : 0.1})`,
            boxShadow: isHovered
              ? `0 8px 20px -4px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255,255,255,0.1), 0 0 15px ${project.accentColor}40`
              : `0 4px 12px -2px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255,255,255,0.05)`,
            transform: isHovered ? "scale(1.02)" : "scale(1)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {/* Project Image Section */}
          <div className="relative h-28 sm:h-32 overflow-hidden">
            <div
              className={`absolute inset-0 bg-gradient-to-br ${getProjectTheme(
                project
              )}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            <div className="w-full h-full flex items-center justify-center relative">
              <Image
                src="/project-placeholder.svg"
                alt={`${project.title} preview`}
                width={400}
                height={300}
                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300"
              />
            </div>

            {/* Interactive Overlay */}
            <div
              className={`absolute inset-0 flex items-center justify-center gap-2 sm:gap-3 transition-all duration-500 ${
                isHovered ? "opacity-100 bg-black/40" : "opacity-0 bg-black/20"
              }`}
            >
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 sm:w-8 sm:h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
                >
                  <FontAwesomeIcon icon={faGithub} className="text-xs" />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 sm:w-8 sm:h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
                >
                  <FontAwesomeIcon
                    icon={faExternalLinkAlt}
                    className="text-xs"
                  />
                </a>
              )}
            </div>

            {/* Featured Badge */}
            {project.featured && (
              <div className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-2 py-1 rounded-full text-xs font-semibold animate-pulse shadow-lg">
                <FontAwesomeIcon icon={faRocket} className="mr-1" />
                Featured
              </div>
            )}

            {/* Expand/Collapse Button */}
            <button
              onClick={onToggle}
              className="absolute bottom-2 right-2 w-6 h-6 sm:w-7 sm:h-7 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
              style={{
                boxShadow: isHovered
                  ? `0 0 15px ${project.accentColor}40`
                  : "0 0 8px rgba(255,255,255,0.2)",
              }}
            >
              <FontAwesomeIcon
                icon={isExpanded ? faChevronUp : faChevronDown}
                className="text-xs"
              />
            </button>
          </div>

          {/* Project Content */}
          <div className="p-2.5 sm:p-3 relative">
            {/* Project Meta */}
            <div className="flex justify-between items-start mb-1.5 sm:mb-2">
              <span
                className={`${karla.className} text-xs font-medium tracking-wider px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full backdrop-blur-sm`}
                style={{
                  backgroundColor: `${project.accentColor}20`,
                  color: project.accentColor,
                  border: `1px solid ${project.accentColor}40`,
                }}
              >
                {project.category}
              </span>
              <div className="flex gap-1 text-xs text-white/60">
                <span className="hidden sm:inline">{project.role}</span>
                <span className="hidden sm:inline">•</span>
                <span>{project.timeline}</span>
              </div>
            </div>

            {/* Project Title */}
            <h3
              className={`${prompt.className} text-sm sm:text-base font-bold mb-1.5 sm:mb-2 transition-all duration-300`}
              style={{
                color: isHovered ? project.accentColor : "#ffffff",
                textShadow: isHovered
                  ? `0 0 8px ${project.accentColor}40`
                  : "none",
              }}
            >
              {project.title}
            </h3>

            {/* Project Description */}
            <p
              className={`${karla.className} text-white/70 text-xs leading-relaxed mb-2 sm:mb-3 line-clamp-2`}
            >
              {project.description}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-1 mb-2 sm:mb-3">
              {project.technologies.slice(0, isMobile ? 2 : 3).map((tech) => (
                <span
                  key={tech}
                  className={`${karla.className} px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium border transition-all duration-300 hover:scale-105`}
                  style={{
                    backgroundColor: `${getTechnologyColor(tech)}20`,
                    borderColor: getTechnologyColor(tech),
                    color: getTechnologyColor(tech),
                    boxShadow: isHovered
                      ? `0 0 8px ${getTechnologyColor(tech)}40`
                      : "none",
                  }}
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > (isMobile ? 2 : 3) && (
                <span
                  className={`${karla.className} px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs text-white/60`}
                >
                  +{project.technologies.length - (isMobile ? 2 : 3)}
                </span>
              )}
            </div>

            {/* Expanded Content */}
            <div
              className={`transition-all duration-500 ease-out overflow-hidden ${
                isExpanded
                  ? "max-h-40 sm:max-h-48 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="space-y-1.5 sm:space-y-2 pt-1.5 sm:pt-2 border-t border-white/10">
                {/* Achievements */}
                <div>
                  <h4
                    className={`${prompt.className} text-xs font-semibold text-white mb-1 flex items-center gap-1`}
                  >
                    <FontAwesomeIcon
                      icon={faRocket}
                      className="text-yellow-400"
                    />
                    Achievements
                  </h4>
                  <ul className="space-y-0.5 sm:space-y-1">
                    {project.achievements
                      .slice(0, isMobile ? 1 : 2)
                      .map((achievement, idx) => (
                        <li
                          key={idx}
                          className={`${karla.className} text-xs text-white/70 flex items-start gap-1`}
                        >
                          <span className="text-blue-400 mt-0.5">•</span>
                          <span className="line-clamp-2">{achievement}</span>
                        </li>
                      ))}
                  </ul>
                </div>

                {/* Learnings */}
                <div>
                  <h4
                    className={`${prompt.className} text-xs font-semibold text-white mb-1 flex items-center gap-1`}
                  >
                    <FontAwesomeIcon
                      icon={faLightbulb}
                      className="text-purple-400"
                    />
                    Key Learnings
                  </h4>
                  <ul className="space-y-0.5 sm:space-y-1">
                    {project.learnings
                      .slice(0, isMobile ? 1 : 2)
                      .map((learning, idx) => (
                        <li
                          key={idx}
                          className={`${karla.className} text-xs text-white/70 flex items-start gap-1`}
                        >
                          <span className="text-purple-400 mt-0.5">•</span>
                          <span className="line-clamp-2">{learning}</span>
                        </li>
                      ))}
                  </ul>
                </div>

                {/* Complexity */}
                <div className="flex items-center gap-2">
                  <span className={`${karla.className} text-xs text-white/60`}>
                    Complexity:
                  </span>
                  <span
                    className={`${
                      karla.className
                    } px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium ${
                      project.complexity === "Advanced"
                        ? "bg-red-500/20 text-red-400 border border-red-400"
                        : project.complexity === "Intermediate"
                        ? "bg-yellow-500/20 text-yellow-400 border border-yellow-400"
                        : "bg-green-500/20 text-green-400 border border-green-400"
                    }`}
                  >
                    {project.complexity}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-1.5 sm:gap-2 mt-2 sm:mt-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${karla.className} flex-1 bg-white/10 hover:bg-white/20 text-white text-center py-1 px-1.5 sm:px-2 rounded-lg transition-all duration-300 text-xs border border-white/20 hover:border-white/40 hover:scale-105 hover:shadow-lg`}
                >
                  <FontAwesomeIcon icon={faCode} className="mr-1" />
                  View Code
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${karla.className} flex-1 text-white text-center py-1 px-1.5 sm:px-2 rounded-lg transition-all duration-300 text-xs hover:scale-105 hover:shadow-lg`}
                  style={{
                    background: `linear-gradient(90deg, ${project.accentColor}, ${project.accentColor}80)`,
                    boxShadow: isHovered
                      ? `0 0 15px ${project.accentColor}40`
                      : "none",
                  }}
                >
                  <FontAwesomeIcon icon={faRocket} className="mr-1" />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ProjectCard.displayName = "ProjectCard";

export default function ProjectSection() {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Optimized device detection
  useEffect(() => {
    const checkDeviceCapabilities = () => {
      const isMobileDevice = window.innerWidth < 768;
      const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

      setIsMobile(isMobileDevice);
      setIsTouchDevice(isTouch);
    };

    checkDeviceCapabilities();
    window.addEventListener("resize", checkDeviceCapabilities);

    return () => window.removeEventListener("resize", checkDeviceCapabilities);
  }, []);

  useEffect(() => {
    setIsVisible(true);
    setHasMounted(true);
  }, []);

  // Optimized hover handlers with useCallback
  const handleProjectHover = useCallback(
    (projectId: number) => {
      if (!isTouchDevice) {
        setHoveredProject(projectId);
      }
    },
    [isTouchDevice]
  );

  const handleProjectLeave = useCallback(() => {
    if (!isTouchDevice) {
      setHoveredProject(null);
    }
  }, [isTouchDevice]);

  const toggleProject = useCallback(
    (projectId: number) => {
      setExpandedProject(expandedProject === projectId ? null : projectId);
    },
    [expandedProject]
  );

  // Memoized animated particles for better performance
  const animatedParticles = useMemo(() => {
    const particleCount = isMobile ? 6 : 12; // Further reduced particle count
    return Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 2}s`,
      animationDuration: `${3 + Math.random() * 2}s`,
    }));
  }, [isMobile]);

  return (
    <section
      ref={containerRef}
      className="relative z-10 flex flex-col items-center px-4 sm:px-8 md:px-16 h-[90vh] sm:h-dvh min-h-[80vh] sm:min-h-screen py-4 sm:py-8 md:py-12 w-full overflow-hidden"
    >
      {/* Optimized Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
        {animatedParticles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: particle.animationDelay,
              animationDuration: particle.animationDuration,
            }}
          />
        ))}
      </div>

      {/* Fixed Header */}
      <div
        className={`w-full flex flex-col items-center justify-center relative mb-8 sm:mb-12 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h2
          className={`${prompt.className} text-center text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-3 sm:mb-4`}
        >
          Featured Projects
        </h2>
        <p
          className={`${karla.className} text-sm sm:text-base text-white/70 max-w-2xl mx-auto relative z-10 px-4 text-center`}
        >
          Explore my latest work showcasing modern web development, innovative
          solutions, and creative problem-solving.
        </p>
      </div>

      {/* Scrollable Project Cards Container */}
      <div className="w-full flex items-start justify-center flex-1 overflow-y-auto scrollbar-hidden">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 pb-6 sm:pb-8">
            {PROJECTS.map((project) => {
              const isHovered = hoveredProject === project.id;
              const isExpanded = expandedProject === project.id;

              return (
                <ProjectCard
                  key={project.id}
                  project={project}
                  isExpanded={isExpanded}
                  isHovered={isHovered}
                  onToggle={() => toggleProject(project.id)}
                  onMouseEnter={() => handleProjectHover(project.id)}
                  onMouseLeave={handleProjectLeave}
                  isMobile={isMobile}
                  isTouchDevice={isTouchDevice}
                  isVisible={isVisible}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Optimized CSS for animations */}
      <style jsx>{`
        /* Optimized smooth transitions */
        .smooth-transition {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform, opacity;
        }

        /* Reduced animation complexity for better performance */
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        /* Mobile optimizations */
        @media (max-width: 768px) {
          .smooth-transition {
            transition: all 0.2s ease-out;
          }
        }

        /* Hardware acceleration for transforms */
        .group:hover {
          transform: translateZ(0);
        }
      `}</style>
    </section>
  );
}
