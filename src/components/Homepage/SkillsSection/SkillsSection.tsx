import { Karla, Prompt } from "next/font/google";
import Image from "next/image";
import { useState } from "react";
import styles from "./SkillsSection.module.css";

const prompt = Prompt({ weight: "600", subsets: ["latin"] });
const prompt_light = Prompt({ weight: "400", subsets: ["latin"] });
const karla = Karla({ weight: "200", subsets: ["latin"] });

// Skill Island data structure
interface SkillIsland {
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

const SKILL_ISLANDS: SkillIsland[] = [
  // Core Islands (Large, Prominent) - Top row with spacing
  {
    id: 1,
    name: "React",
    category: "Frontend",
    proficiency: 95,
    color: "#61DAFB",
    size: 120,
    x: 50,
    y: 40,
    height: 180,
    theme: "tropical",
    description:
      "Advanced React with hooks, context, and performance optimization",
    shape: "organic",
    connections: [2, 3, 4],
  },
  {
    id: 2,
    name: "Node.js",
    category: "Backend",
    proficiency: 92,
    color: "#339933",
    size: 110,
    x: 20,
    y: 25,
    height: 160,
    theme: "forest",
    description: "Server-side JavaScript with Express and middleware",
    shape: "mountain",
    connections: [1, 5, 6],
  },
  {
    id: 3,
    name: "TypeScript",
    category: "Frontend",
    proficiency: 90,
    color: "#3178C6",
    size: 100,
    x: 80,
    y: 22,
    height: 150,
    theme: "arctic",
    description: "Strong typing and advanced TypeScript patterns",
    shape: "crystal",
    connections: [1, 4, 7],
  },

  // Supporting Islands (Medium) - Middle row with spacing
  {
    id: 4,
    name: "Next.js",
    category: "Frontend",
    proficiency: 88,
    color: "#000000",
    size: 90,
    x: 85,
    y: 50,
    height: 130,
    theme: "modern",
    description: "Full-stack React framework with SSR and SSG",
    shape: "geometric",
    connections: [1, 3],
  },
  {
    id: 5,
    name: "PostgreSQL",
    category: "Database",
    proficiency: 88,
    color: "#336791",
    size: 95,
    x: 15,
    y: 55,
    height: 140,
    theme: "crystal",
    description: "Advanced SQL queries and database optimization",
    shape: "geometric",
    connections: [2, 6],
  },
  {
    id: 6,
    name: "Docker",
    category: "Tools",
    proficiency: 85,
    color: "#2496ED",
    size: 85,
    x: 45,
    y: 65,
    height: 120,
    theme: "ocean",
    description: "Containerization and microservices architecture",
    shape: "organic",
    connections: [2, 5],
  },

  // Smaller Islands - Bottom row with spacing
  {
    id: 7,
    name: "Vue.js",
    category: "Frontend",
    proficiency: 85,
    color: "#4FC08D",
    size: 80,
    x: 75,
    y: 80,
    height: 110,
    theme: "zen",
    description: "Vue 3 with Composition API and ecosystem",
    shape: "organic",
    connections: [3],
  },
  {
    id: 8,
    name: "Laravel",
    category: "Backend",
    proficiency: 80,
    color: "#FF2D20",
    size: 75,
    x: 55,
    y: 85,
    height: 100,
    theme: "desert",
    description: "PHP framework with Eloquent ORM and Blade",
    shape: "organic",
    connections: [2],
  },
  {
    id: 9,
    name: "MongoDB",
    category: "Database",
    proficiency: 82,
    color: "#47A248",
    size: 80,
    x: 30,
    y: 82,
    height: 115,
    theme: "jungle",
    description: "NoSQL database with aggregation pipelines",
    shape: "organic",
    connections: [2],
  },
  {
    id: 10,
    name: "Git",
    category: "Tools",
    proficiency: 90,
    color: "#F05032",
    size: 90,
    x: 50,
    y: 3,
    height: 145,
    theme: "mountain",
    description: "Version control and collaborative development",
    shape: "mountain",
    connections: [1, 2],
  },
  {
    id: 11,
    name: "AWS",
    category: "Tools",
    proficiency: 78,
    color: "#FF9900",
    size: 70,
    x: 8,
    y: 40,
    height: 95,
    theme: "storm",
    description: "Cloud infrastructure and serverless architecture",
    shape: "organic",
    connections: [2, 6],
  },
  {
    id: 12,
    name: "GraphQL",
    category: "Backend",
    proficiency: 85,
    color: "#E10098",
    size: 75,
    x: 92,
    y: 35,
    height: 105,
    theme: "neon",
    description: "Query language and runtime for APIs",
    shape: "geometric",
    connections: [1, 2],
  },
];

const CATEGORIES = [
  { name: "Frontend", color: "#61DAFB", icon: "🌊" },
  { name: "Backend", color: "#339933", icon: "🏔️" },
  { name: "Database", color: "#336791", icon: "💎" },
  { name: "Tools", color: "#2496ED", icon: "⚡" },
];

// Organic shape paths
const ORGANIC_SHAPES = {
  organic:
    "polygon(50% 0%, 83% 12%, 100% 43%, 94% 78%, 68% 100%, 32% 100%, 6% 78%, 0% 43%, 17% 12%)",
  mountain: "polygon(50% 0%, 0% 100%, 25% 85%, 50% 100%, 75% 85%, 100% 100%)",
  crystal: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
  geometric: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
};

export default function SkillsSection() {
  const [hoveredIsland, setHoveredIsland] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedIsland, setExpandedIsland] = useState<number | null>(null);

  const getIslandsByCategory = (category: string) => {
    return SKILL_ISLANDS.filter((island) => island.category === category);
  };

  const getConnectionPoints = (islandId: number) => {
    const island = SKILL_ISLANDS.find((i) => i.id === islandId);
    if (!island) return [];

    return island.connections
      .map((connId) => {
        const connectedIsland = SKILL_ISLANDS.find((i) => i.id === connId);
        return connectedIsland
          ? { x: connectedIsland.x, y: connectedIsland.y }
          : null;
      })
      .filter(Boolean);
  };

  const getIslandColor = (island: SkillIsland) => {
    return `${island.color}30`;
  };

  const handleIslandClick = (islandId: number) => {
    setExpandedIsland(expandedIsland === islandId ? null : islandId);
  };

  return (
    <div className="flex flex-col h-full justify-between px-4 sm:px-8 md:px-16 py-8 sm:py-12 md:py-16">
      {/* Header Section */}
      <div className="relative flex items-center justify-center mb-4 sm:mb-6 md:mb-8">
        <h2
          className={`${prompt.className} text-center text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent`}
        >
          Floating Skill Islands
        </h2>
        <Image
          className="absolute right-0 top-1/2 -translate-y-1/2 w-24 sm:w-32 md:w-48 lg:w-52 max-w-[40vw] hidden xs:block opacity-60"
          src="/dots.svg"
          alt="Dots"
          width={200}
          height={100}
        />
      </div>

      {/* Category Filter */}
      {/* <div className="flex justify-center mb-6 sm:mb-8">
        <div className="flex gap-4 flex-wrap justify-center">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`${
              karla.className
            } px-4 py-2 rounded-full text-sm transition-all duration-300 ${
              selectedCategory === null
                ? "bg-gradient-to-r from-blue-400 to-purple-400 text-white shadow-lg"
                : "bg-white/10 text-white/70 hover:text-white hover:bg-white/20"
            }`}
          >
            All Islands
          </button>
          {CATEGORIES.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`${
                karla.className
              } px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                selectedCategory === category.name
                  ? "bg-gradient-to-r from-blue-400 to-purple-400 text-white shadow-lg"
                  : "bg-white/10 text-white/70 hover:text-white hover:bg-white/20"
              }`}
            >
              {category.icon} {category.name}
            </button>
          ))}
        </div>
      </div> */}

      {/* Floating Islands Container */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-full h-[65vh] sm:h-[70vh] md:h-[75vh] max-w-6xl mx-auto">
          {/* Connection Bridges */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {SKILL_ISLANDS.map((island) => {
              const connections = getConnectionPoints(island.id);
              return connections.map((point, index) => (
                <line
                  key={`${island.id}-${index}`}
                  x1={`${island.x}%`}
                  y1={`${island.y}%`}
                  x2={`${point?.x}%`}
                  y2={`${point?.y}%`}
                  stroke={
                    hoveredIsland === island.id
                      ? island.color
                      : "rgba(255,255,255,0.05)"
                  }
                  strokeWidth="1"
                  className="transition-all duration-700"
                  style={{
                    filter:
                      hoveredIsland === island.id
                        ? `drop-shadow(0 0 4px ${island.color})`
                        : "none",
                  }}
                />
              ));
            })}
          </svg>

          {/* Skill Islands */}
          {SKILL_ISLANDS.filter(
            (island) =>
              !selectedCategory || island.category === selectedCategory
          ).map((island) => (
            <div
              key={island.id}
              className={`absolute transition-all duration-1000 cursor-pointer ${
                hoveredIsland === island.id ? "z-20" : "z-10"
              } ${styles.islandWrapper}`}
              style={{
                left: `${island.x}%`,
                top: `${island.y}%`,
                animationDelay: `${island.id * 0.2}s`,
              }}
              onMouseEnter={() => setHoveredIsland(island.id)}
              onMouseLeave={() => setHoveredIsland(null)}
              onClick={() => handleIslandClick(island.id)}
            >
              {/* Island Shadow */}
              <div
                className="absolute blur-md transition-all duration-500"
                style={{
                  width: `${island.size * 1.2}px`,
                  height: `${island.size * 0.2}px`,
                  backgroundColor: "rgba(0,0,0,0.2)",
                  bottom: `-${island.size * 0.1}px`,
                  left: "50%",
                  transform: "translateX(-50%)",
                  opacity: hoveredIsland === island.id ? 0.4 : 0.2,
                  clipPath:
                    ORGANIC_SHAPES[island.shape as keyof typeof ORGANIC_SHAPES],
                }}
              />
              {/* Island Base */}
              <div
                className="relative transition-all duration-700 cursor-pointer"
                style={{
                  width: `${island.size}px`,
                  height: `${island.size}px`,
                  background: getIslandColor(island),
                  border: `1px solid ${island.color}40`,
                  boxShadow:
                    hoveredIsland === island.id
                      ? `0 0 20px ${island.color}40, 0 0 40px ${island.color}20`
                      : `0 0 10px ${island.color}20`,
                  clipPath:
                    ORGANIC_SHAPES[island.shape as keyof typeof ORGANIC_SHAPES],
                  transform:
                    hoveredIsland === island.id
                      ? "scale(1.05)"
                      : expandedIsland === island.id
                      ? "scale(1.1)"
                      : "scale(1)",
                }}
              >
                {/* Island Peak/Center */}
                <div
                  className="absolute transition-all duration-500"
                  style={{
                    width: `${island.size * 0.5}px`,
                    height: `${island.size * 0.5}px`,
                    background: `radial-gradient(circle at 40% 40%, ${island.color}60, ${island.color}30)`,
                    top: "25%",
                    left: "25%",
                    boxShadow: `inset 0 0 8px ${island.color}30`,
                    clipPath:
                      ORGANIC_SHAPES[
                        island.shape as keyof typeof ORGANIC_SHAPES
                      ],
                  }}
                />
                {/* Skill Name */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-xs drop-shadow-lg">
                    {island.name}
                  </span>
                </div>
                {/* Click Indicator */}
                {hoveredIsland === island.id && (
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-400 rounded-full flex items-center justify-center animate-pulse">
                    <span className="text-white text-xs">+</span>
                  </div>
                )}
                {/* Proficiency Indicator */}
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                  <div className="w-6 h-0.5 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${island.proficiency}%`,
                        background: `linear-gradient(90deg, ${island.color}, ${island.color}80)`,
                      }}
                    />
                  </div>
                </div>
              </div>
              {/* Island Details Tooltip */}
              <div
                className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-4 px-3 py-2 bg-black/90 backdrop-blur-sm text-white text-xs rounded-lg max-w-xs transition-all duration-300 ${
                  hoveredIsland === island.id
                    ? "opacity-100 visible"
                    : "opacity-0 invisible"
                }`}
              >
                <div className="font-semibold mb-1">
                  {island.name} ({island.proficiency}%)
                </div>
                <div className="text-white/80">{island.description}</div>
              </div>
            </div>
          ))}

          {/* Expanded Island Modal */}
          {expandedIsland && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-md rounded-2xl p-6 sm:p-8 max-w-md w-full border border-white/20 shadow-2xl">
                {(() => {
                  const island = SKILL_ISLANDS.find(
                    (i) => i.id === expandedIsland
                  );
                  if (!island) return null;

                  return (
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <h3
                          className={`${prompt.className} text-xl font-bold text-white`}
                        >
                          {island.name}
                        </h3>
                        <button
                          onClick={() => setExpandedIsland(null)}
                          className="text-white/70 hover:text-white transition-colors duration-200"
                        >
                          ✕
                        </button>
                      </div>

                      {/* Proficiency Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className={`${karla.className} text-white/80`}>
                            Proficiency
                          </span>
                          <span
                            className={`${karla.className} text-white font-semibold`}
                          >
                            {island.proficiency}%
                          </span>
                        </div>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000"
                            style={{
                              width: `${island.proficiency}%`,
                              background: `linear-gradient(90deg, ${island.color}, ${island.color}80)`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Category */}
                      <div className="flex items-center gap-2">
                        <span
                          className={`${karla.className} text-white/60 text-sm`}
                        >
                          Category:
                        </span>
                        <span
                          className={`${karla.className} px-2 py-1 rounded-full text-xs`}
                          style={{
                            backgroundColor: `${island.color}20`,
                            color: island.color,
                            border: `1px solid ${island.color}40`,
                          }}
                        >
                          {island.category}
                        </span>
                      </div>

                      {/* Description */}
                      <div className="space-y-2">
                        <h4
                          className={`${prompt_light.className} text-white font-semibold`}
                        >
                          About this skill
                        </h4>
                        <p
                          className={`${karla.className} text-white/80 text-sm leading-relaxed`}
                        >
                          {island.description}
                        </p>
                      </div>

                      {/* Connected Skills */}
                      {island.connections.length > 0 && (
                        <div className="space-y-2">
                          <h4
                            className={`${prompt_light.className} text-white font-semibold`}
                          >
                            Related Skills
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {island.connections.map((connId) => {
                              const connectedIsland = SKILL_ISLANDS.find(
                                (i) => i.id === connId
                              );
                              if (!connectedIsland) return null;

                              return (
                                <span
                                  key={connId}
                                  className={`${karla.className} px-2 py-1 rounded-full text-xs cursor-pointer transition-all duration-200 hover:scale-105`}
                                  style={{
                                    backgroundColor: `${connectedIsland.color}20`,
                                    color: connectedIsland.color,
                                    border: `1px solid ${connectedIsland.color}40`,
                                  }}
                                  onClick={() => setExpandedIsland(connId)}
                                >
                                  {connectedIsland.name}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      {/* <div className="mt-6 sm:mt-8 flex justify-center">
        <div className="flex gap-6 flex-wrap justify-center">
          {CATEGORIES.map((category) => (
            <div key={category.name} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <span className={`${karla.className} text-white/70 text-xs`}>
                {category.icon} {category.name}
              </span>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}
