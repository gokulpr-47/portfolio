import { Karla, Prompt } from "next/font/google";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faMapMarkerAlt,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";
import "../../Carousel/embla.css";
import EmblaCarousel from "@/components/Carousel/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";

const prompt = Prompt({ weight: "600", subsets: ["latin"] });
const prompt_light = Prompt({ weight: "400", subsets: ["latin"] });
const karla = Karla({ weight: "200", subsets: ["latin"] });

interface Experience {
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

const EXPERIENCES: Experience[] = [
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

const OPTIONS: EmblaOptionsType = {
  loop: true,
  align: "start",
  containScroll: false,
  dragFree: false,
  skipSnaps: false,
  duration: 20,
};

export default function ExperienceSection() {
  return (
    <div className="flex flex-col items-center px-4 sm:px-8 md:px-16 h-[90vh] sm:h-dvh min-h-[80vh] sm:min-h-screen py-4 sm:py-8 md:py-12 w-full">
      {" "}
      {/* Header */}
      <div className="w-full flex items-center justify-center relative mb-8 sm:mb-12">
        <h2
          className={`${prompt.className} text-center text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent`}
        >
          Work Experience
        </h2>
      </div>
      {/* Experience Timeline */}
      <div className="w-full flex items-start justify-center flex-1 overflow-scroll">
        <div className="w-full max-w-5xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-2 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400/50 via-purple-400/50 to-transparent z-10"></div>

            {/* Card container */}
            <div className="ml-4 sm:ml-16">
              <div className="space-y-4 sm:space-y-5 md:space-y-6">
                {/* Experience Cards */}
                {EXPERIENCES.map((experience, index) => (
                  <div key={experience.id} className="relative group">
                    {/* Timeline Dot */}
                    <div className="absolute -left-4 sm:-left-10 top-6 w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full border-4 border-[#0a0a1a] shadow-lg shadow-blue-400/25 group-hover:scale-125 transition-transform duration-300 z-20"></div>

                    {/* Experience Card */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 hover:border-blue-400/40 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-blue-500/25">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      <div className="relative p-4 sm:p-5 md:p-6 lg:p-5">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-5">
                          <div className="flex-1">
                            <h3
                              className={`${prompt.className} text-lg sm:text-xl md:text-xl lg:text-lg font-bold text-white mb-2 sm:mb-3 group-hover:text-blue-300 transition-colors duration-300`}
                            >
                              {experience.title}
                            </h3>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm sm:text-base">
                              <div className="flex items-center gap-2 text-blue-300">
                                <FontAwesomeIcon
                                  icon={faMapMarkerAlt}
                                  className="w-3 h-3 sm:w-4 sm:h-4"
                                />
                                <span className={`${karla.className}`}>
                                  {experience.company}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-purple-300">
                                <FontAwesomeIcon
                                  icon={faCalendarAlt}
                                  className="w-3 h-3 sm:w-4 sm:h-4"
                                />
                                <span className={`${karla.className}`}>
                                  {experience.duration}
                                </span>
                              </div>
                            </div>
                          </div>
                          {experience.link && (
                            <a
                              href={experience.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-300 opacity-0 group-hover:opacity-100 mt-2 sm:mt-0"
                            >
                              <FontAwesomeIcon
                                icon={faExternalLinkAlt}
                                className="w-3 h-3 sm:w-4 sm:h-4"
                              />
                              <span
                                className={`${karla.className} text-xs sm:text-sm`}
                              >
                                Visit
                              </span>
                            </a>
                          )}
                        </div>

                        {/* Description */}
                        <p
                          className={`${karla.className} text-white/80 mb-4 sm:mb-5 leading-relaxed text-sm sm:text-base`}
                        >
                          {experience.description}
                        </p>

                        {/* Achievements */}
                        <div className="mb-4 sm:mb-5">
                          <h4
                            className={`${prompt_light.className} text-blue-300 mb-2 sm:mb-3 font-semibold text-sm sm:text-base`}
                          >
                            Key Achievements
                          </h4>
                          <ul className="space-y-1.5 sm:space-y-2">
                            {experience.achievements.map((achievement, idx) => (
                              <li
                                key={idx}
                                className={`${karla.className} text-white/70 text-xs sm:text-sm leading-relaxed flex items-start gap-2 sm:gap-3`}
                              >
                                <span className="text-blue-400 mt-1 sm:mt-1.5 flex-shrink-0">
                                  •
                                </span>
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Technologies */}
                        <div>
                          <h4
                            className={`${prompt_light.className} text-purple-300 mb-2 sm:mb-3 font-semibold text-sm sm:text-base`}
                          >
                            Technologies
                          </h4>
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {experience.technologies.map((tech, idx) => (
                              <span
                                key={idx}
                                className={`${karla.className} px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-full text-blue-300 hover:border-blue-400/60 hover:bg-gradient-to-r hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300`}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
