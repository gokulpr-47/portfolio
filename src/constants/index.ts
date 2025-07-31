// Types
export * from "./types";

// Theme and styling
export * from "./theme";

// Personal information
export * from "./personal";

// Experience data
export * from "./experience";

// Projects data
export * from "./projects";

// Skills data
export * from "./skills";

// Navigation data
export * from "./navigation";

// Re-export commonly used constants for convenience
export {
  personalInfo,
  aboutContent,
  contactInfo,
  profileImage,
} from "./personal";

export {
  experiences,
  experienceCarouselOptions,
  experienceConfig,
  achievementCategories,
} from "./experience";

export {
  projects,
  projectCategories,
  complexityLevels,
  projectThemes,
  projectConfig,
} from "./projects";

export {
  skillIslands,
  skillCategories,
  organicShapes,
  proficiencyLevels,
  skillsConfig,
  skillThemes,
} from "./skills";

export {
  navigationItems,
  sections,
  navigationConfig,
  socialLinks,
  footerLinks,
  scrollConfig,
  observerOptions,
} from "./navigation";

export {
  theme,
  gradients,
  textGradients,
  borders,
  transitions,
  shadows,
  backdropBlur,
  rounded,
  opacity,
} from "./theme";
