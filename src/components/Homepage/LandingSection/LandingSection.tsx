import { useEffect, useCallback, useState, Suspense, lazy } from "react";
import { Karla, Prompt } from "next/font/google";

import { TypeAnimation } from "react-type-animation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn, faGithubAlt } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import BlurOverlay from "./BlurOverlay";

// Lazy load the heavy Three.js background component
const FractalBloomBackground = lazy(() => import("./FractalBloomBackground"));

const prompt = Prompt({ weight: "600", subsets: ["latin"] });
const karla = Karla({ weight: "200", subsets: ["latin"] });

interface LandingSectionProps {
  scrollToSection: (sectionIndex: number) => void;
}

// Fallback component for Three.js background
const BackgroundFallback = () => (
  <div className="fixed inset-0 bg-gradient-to-b from-blue-900 via-purple-900 to-black z-0" />
);

const LandingSection = ({ scrollToSection }: LandingSectionProps) => {
  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setViewportHeight();
    window.addEventListener("resize", setViewportHeight);

    return () => window.removeEventListener("resize", setViewportHeight);
  }, []);

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden">
      {/* Lazy load Three.js background with fallback */}
      <Suspense fallback={<BackgroundFallback />}>
        <FractalBloomBackground />
      </Suspense>

      <BlurOverlay />

      {/* Navbar */}
      <div className="absolute w-full px-4 py-4 sm:px-10 sm:py-6 lg:px-20 lg:py-10 flex flex-wrap justify-between items-center gap-4">
        <div className="socials flex gap-5 mt-2 ml-2">
          {/* Added margin-top (mt-2) and margin-left (ml-2) */}
          <FontAwesomeIcon icon={faLinkedinIn} className="text-xl" />
          <FontAwesomeIcon icon={faGithubAlt} className="text-xl" />
        </div>
        <div className="flex items-center mt-2 mr-2">
          {/* Added margin-top (mt-2) and margin-right (mr-2) */}
          <FontAwesomeIcon icon={faEnvelope} className="pe-2 text-xl" />
          <p className={`${karla.className} ml-2`}>GET IN TOUCH</p>
          {/* Added margin-left (ml-2) */}
        </div>
      </div>

      {/* Profile Image and Text Below */}
      <div className="absolute mt-10 sm:mt-16 md:mt-24 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center justify-center text-white text-lg sm:text-xl md:text-2xl font-bold w-full px-4">
        {/* Apply Karla font to h2 */}
        <h2
          className={`${karla.className} font-light tracking-widest text-base sm:text-lg md:text-2xl lg:text-3xl mb-2 text-center`}
        >
          SOFTWARE ENGINEER
        </h2>

        {/* Apply typing animation to h1 */}
        <TypeAnimation
          sequence={["GOKUL P R", 1000]}
          wrapper="span"
          speed={50}
          style={{
            fontSize: "1.5em",
            padding: "10px",
            display: "inline-block",
          }}
          repeat={Infinity}
          className={`${prompt.className} text-xl sm:text-2xl md:text-4xl lg:text-5xl text-center`}
        />
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-10 py-6 sm:py-10 w-full justify-center items-center">
          <p
            className={`${karla.className} text-xs sm:text-sm md:text-base tracking-widest border-2 border-transparent hover:border-white p-2 transition-all duration-300 rounded-full px-5 sm:px-7 font-light hover:font-bold cursor-pointer w-full sm:w-auto text-center`}
            onClick={() => scrollToSection(2)}
          >
            EXPERIENCE
          </p>
          <p
            className={`${karla.className} text-xs sm:text-sm md:text-base tracking-widest border-2 border-transparent hover:border-white p-2 transition-all duration-300 rounded-full px-5 sm:px-7 font-light hover:font-bold cursor-pointer w-full sm:w-auto text-center`}
            onClick={() => scrollToSection(3)}
          >
            SKILLS
          </p>
          <p
            className={`${karla.className} text-xs sm:text-sm md:text-base tracking-widest border-2 border-transparent hover:border-white p-2 transition-all duration-300 rounded-full px-5 sm:px-7 font-light hover:font-bold cursor-pointer w-full sm:w-auto text-center`}
            onClick={() => scrollToSection(4)}
          >
            PROJECTS
          </p>
          <p
            className={`${karla.className} text-xs sm:text-sm md:text-base tracking-widest border-2 border-transparent hover:border-white p-2 transition-all duration-300 rounded-full px-5 sm:px-7 font-light hover:font-bold cursor-pointer w-full sm:w-auto text-center`}
            onClick={() => scrollToSection(5)}
          >
            ABOUT
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingSection;
