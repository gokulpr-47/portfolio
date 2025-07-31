"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  Suspense,
  lazy,
} from "react";
import LandingSection from "@/components/Homepage/LandingSection/LandingSection";
import ExperienceSection from "@/components/Homepage/ExperienceSection/ExperienceSection";
import SkillsSection from "@/components/Homepage/SkillsSection/SkillsSection";
import AboutSection from "@/components/Homepage/AboutSection/AboutSection";
import Footer from "@/components/Homepage/Footer/Footer";

// Lazy load heavy components
const ProjectSection = lazy(
  () => import("@/components/Homepage/ProjectSection/ProjectSection")
);

// Loading component for lazy-loaded sections
const SectionLoader = () => (
  <div className="h-screen-mobile md:h-screen-desktop flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
      <p className="text-white/70 text-sm">Loading...</p>
    </div>
  </div>
);

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<number>(1);
  const [isIntersectionObserverSupported, setIsIntersectionObserverSupported] =
    useState(true);
  const [loadedSections, setLoadedSections] = useState<Set<number>>(
    new Set([1, 2, 3, 5])
  ); // Pre-load critical sections

  // Optimized intersection observer with error handling
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      setIsIntersectionObserverSupported(false);
      return;
    }

    const sections = scrollRef.current?.querySelectorAll(".page");
    if (!sections) return;

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionIndex = Number(entry.target.getAttribute("data-index"));
          setActiveSection(sectionIndex);

          // Lazy load sections when they come into view
          if (sectionIndex === 4 && !loadedSections.has(4)) {
            setLoadedSections((prev) => new Set([...Array.from(prev), 4]));
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [loadedSections]);

  const pages = [1, 2, 3, 4, 5];

  // Optimized scroll function with throttling
  const scrollToSection = useCallback(
    (sectionIndex: number) => {
      const sectionElement = scrollRef.current?.querySelector(
        `[data-index="${sectionIndex}"]`
      );
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: "smooth" });
        setActiveSection(sectionIndex);

        // Pre-load section when user navigates to it
        if (sectionIndex === 4 && !loadedSections.has(4)) {
          setLoadedSections((prev) => new Set([...Array.from(prev), 4]));
        }
      }
    },
    [loadedSections]
  );

  return (
    <div ref={scrollRef} className="scroll-container">
      {/* Sections */}
      <section
        className="page home h-screen-mobile md:h-screen-desktop"
        data-index="1"
      >
        <LandingSection scrollToSection={scrollToSection} />
      </section>
      <section
        className="page experience h-screen-mobile md:h-screen-desktop"
        data-index="2"
      >
        <ExperienceSection />
      </section>
      <section
        className="page skills h-screen-mobile md:h-screen-desktop"
        data-index="3"
      >
        <SkillsSection />
      </section>
      <section
        className="page projects h-screen-mobile md:h-screen-desktop"
        data-index="4"
      >
        {loadedSections.has(4) ? (
          <Suspense fallback={<SectionLoader />}>
            <ProjectSection />
          </Suspense>
        ) : (
          <SectionLoader />
        )}
      </section>
      <section
        className="page about h-screen-mobile md:h-screen-desktop"
        data-index="5"
      >
        <div className="h-full flex flex-col">
          <div className="flex-1">
            <AboutSection />
          </div>
          <div className="flex-shrink-0">
            <Footer />
          </div>
        </div>
      </section>

      {/* Pagination Dots */}
      <ul
        id="pagination"
        className="fixed top-1/2 transform -translate-y-1/2 right-8 list-none z-50"
      >
        {pages.map((page, index) => (
          <li
            key={page}
            className={`relative my-5 rounded-full w-2 h-2 transition-all duration-200 ease-in-out cursor-pointer group ${
              activeSection === page ? "bg-white" : "border-2 border-white"
            }`}
            onClick={() => scrollToSection(page)}
          >
            {/* Tooltip */}
            <span className="absolute right-6 top-1/2 transform -translate-y-1/2 px-2 py-1 text-sm bg-gray-800 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              {["Home", "Experience", "Skills", "Projects", "About"][index]}
            </span>

            {/* Dot */}
            <button
              className={`absolute left-0 top-0 w-full h-full rounded-full ${
                activeSection === page ? "bg-white" : "border-1 border-white"
              }`}
              aria-label={`Navigate to page ${page}`}
            ></button>
          </li>
        ))}
      </ul>
    </div>
  );
}
