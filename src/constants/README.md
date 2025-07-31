# Portfolio Constants System

This directory contains all the centralized constants and configuration data for the portfolio application. This system makes the codebase more maintainable, type-safe, and easy to update.

## 📁 Directory Structure

```
src/constants/
├── index.ts              # Main export file - imports everything
├── types.ts              # TypeScript interfaces and types
├── theme.ts              # Theme colors, styling, and design tokens
├── personal.ts           # Personal information and about content
├── experience.ts         # Work experience data and achievements
├── projects.ts           # Project details and configurations
├── skills.ts             # Skills data and proficiency levels
├── navigation.ts         # Navigation items and section configs
└── README.md            # This documentation file
```

## 🚀 Quick Start

### Importing Constants

```typescript
// Import everything
import * as Constants from "@/constants";

// Import specific constants
import { personalInfo, projects, experiences } from "@/constants";

// Import types
import { PersonalInfo, Project, Experience } from "@/constants";
```

### Using Constants in Components

```typescript
import { personalInfo, aboutContent, gradients } from "@/constants";

export default function AboutSection() {
  return (
    <div className={`${gradients.primary} ${rounded.medium}`}>
      <h1>{personalInfo.name}</h1>
      <p>{aboutContent.sections[0].content}</p>
    </div>
  );
}
```

## 📋 Data Categories

### 1. Personal Information (`personal.ts`)

- **Name, title, and contact details**
- **About section content** (background, interests, motivation)
- **Profile image configuration**
- **Social media links**

**Update Example:**

```typescript
// In personal.ts
export const personalInfo: PersonalInfo = {
  name: "YOUR NAME",
  title: "YOUR TITLE",
  email: "your.email@example.com",
  // ... other fields
};
```

### 2. Experience Data (`experience.ts`)

- **Work history with achievements**
- **Company information and technologies**
- **Timeline and duration data**
- **Achievement categories**

**Update Example:**

```typescript
// In experience.ts
export const experiences: Experience[] = [
  {
    id: 1,
    title: "Your Job Title",
    company: "Your Company",
    duration: "2023 - Present",
    achievements: ["Your achievement 1", "Your achievement 2"],
    technologies: ["React", "Node.js", "TypeScript"],
    // ... other fields
  },
];
```

### 3. Projects Data (`projects.ts`)

- **Project details and descriptions**
- **Technologies and achievements**
- **GitHub and live URLs**
- **Project themes and complexity levels**

**Update Example:**

```typescript
// In projects.ts
export const projects: Project[] = [
  {
    id: 1,
    title: "Your Project",
    description: "Project description",
    technologies: ["React", "Node.js"],
    githubUrl: "https://github.com/yourusername/project",
    liveUrl: "https://project-demo.com",
    // ... other fields
  },
];
```

### 4. Skills Data (`skills.ts`)

- **Skill islands with proficiency levels**
- **Skill categories and themes**
- **Visual positioning and connections**
- **Proficiency level configurations**

**Update Example:**

```typescript
// In skills.ts
export const skillIslands: SkillIsland[] = [
  {
    id: 1,
    name: "Your Skill",
    proficiency: 90,
    color: "#61DAFB",
    // ... other fields
  },
];
```

### 5. Navigation Data (`navigation.ts`)

- **Section names and targets**
- **Social media links**
- **Footer links and contact info**
- **Scroll behavior configuration**

### 6. Theme Configuration (`theme.ts`)

- **Color schemes and gradients**
- **Typography and spacing**
- **Common styling classes**
- **Animation and transition presets**

## 🎨 Theme System

The theme system provides consistent styling across the application:

```typescript
// Using theme constants
import { gradients, transitions, rounded } from "@/constants";

// In your component
<div
  className={`${gradients.primary} ${transitions.default} ${rounded.medium}`}
>
  Content
</div>;
```

### Available Theme Constants:

- `gradients` - Background gradients
- `textGradients` - Text gradients
- `borders` - Border styles
- `transitions` - Animation transitions
- `shadows` - Shadow effects
- `backdropBlur` - Backdrop blur classes
- `rounded` - Border radius classes
- `opacity` - Opacity classes

## 🔧 Maintenance Guide

### Adding New Data

1. **Add the type definition** in `types.ts`
2. **Create the data** in the appropriate file
3. **Export it** from the file
4. **Re-export** from `index.ts` if needed

### Updating Existing Data

1. **Find the relevant file** (e.g., `personal.ts` for personal info)
2. **Update the data** directly in the constants
3. **The changes will automatically reflect** in all components

### Adding New Sections

1. **Create a new constants file** (e.g., `blog.ts`)
2. **Define types** in `types.ts`
3. **Add the data** to the new file
4. **Export from `index.ts`**

## 🛠️ Best Practices

### 1. Type Safety

Always use TypeScript interfaces for your data:

```typescript
// Define the interface
interface BlogPost {
  id: number;
  title: string;
  content: string;
  date: string;
}

// Use it in your constants
export const blogPosts: BlogPost[] = [
  // your data
];
```

### 2. Organization

Keep related data together:

```typescript
// Group related constants
export const contactInfo = {
  email: "your@email.com",
  phone: "+1234567890",
  location: "Your City, Country",
};

export const socialLinks = {
  linkedin: "https://linkedin.com/in/yourprofile",
  github: "https://github.com/yourusername",
};
```

### 3. Naming Conventions

- Use `camelCase` for variable names
- Use `PascalCase` for type names
- Use descriptive names that indicate the purpose

### 4. Documentation

Add comments for complex data structures:

```typescript
// Skill island with visual positioning and connections
export const skillIslands: SkillIsland[] = [
  {
    id: 1,
    name: "React",
    // Position on the skills map (percentage)
    x: 50, // 50% from left
    y: 50, // 50% from top
    // Connections to other skills
    connections: [2, 3, 4], // IDs of connected skills
    // ... other fields
  },
];
```

## 🔄 Migration from Hardcoded Values

If you have hardcoded values in your components, follow this pattern:

### Before:

```typescript
// Hardcoded in component
const projects = [
  {
    title: "My Project",
    description: "Project description",
    // ... more hardcoded data
  },
];
```

### After:

```typescript
// Import from constants
import { projects } from "@/constants";

// Use in component
export default function ProjectSection() {
  return (
    <div>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
```

## 📝 Common Updates

### Updating Personal Information

Edit `src/constants/personal.ts`:

```typescript
export const personalInfo: PersonalInfo = {
  name: "Your New Name",
  title: "Your New Title",
  email: "new.email@example.com",
  // ... update other fields
};
```

### Adding New Projects

Edit `src/constants/projects.ts`:

```typescript
export const projects: Project[] = [
  // ... existing projects
  {
    id: projects.length + 1, // Auto-increment ID
    title: "New Project",
    description: "New project description",
    technologies: ["React", "TypeScript"],
    // ... other required fields
  },
];
```

### Updating Skills

Edit `src/constants/skills.ts`:

```typescript
export const skillIslands: SkillIsland[] = [
  // ... existing skills
  {
    id: skillIslands.length + 1,
    name: "New Skill",
    proficiency: 85,
    // ... other required fields
  },
];
```

## 🎯 Benefits

1. **Centralized Management** - All data in one place
2. **Type Safety** - TypeScript interfaces prevent errors
3. **Easy Updates** - Change content without touching components
4. **Consistency** - Reusable styling and data patterns
5. **Scalability** - Easy to add new sections or modify existing ones
6. **Maintainability** - Clear separation of concerns

This constants system makes your portfolio incredibly maintainable and future-proof! 🚀
