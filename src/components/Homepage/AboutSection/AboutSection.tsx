import Image from "next/image";
import { Karla, Prompt } from "next/font/google";
import {
  personalInfo,
  aboutContent,
  profileImage,
  gradients,
  transitions,
  rounded,
  opacity,
} from "@/constants";

const prompt = Prompt({ weight: "600", subsets: ["latin"] });
const karla = Karla({ weight: "200", subsets: ["latin"] });

export default function AboutSection() {
  return (
    <section className="relative z-10 py-4 sm:py-6 px-4 sm:px-8 md:px-16 max-w-6xl mx-auto h-screen-mobile md:h-screen-desktop flex flex-col justify-center overflow-hidden">
      {/* Header Section */}
      <div className="relative flex items-center justify-center mb-4 sm:mb-6 md:mb-8">
        <h2
          className={`${prompt.className} text-center text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent`}
        >
          About Me
        </h2>
        <Image
          className="absolute right-0 top-1/2 -translate-y-1/2 w-24 sm:w-32 md:w-48 lg:w-52 max-w-[40vw] hidden xs:block opacity-60"
          src="/dots.svg"
          alt="Dots"
          width={200}
          height={100}
        />
      </div>

      {/* Scrollable Content Container */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent pr-2">
        <div className="w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-start md:items-center">
            {/* Image Container - Mobile Optimized */}
            <div className="relative group order-1 md:order-1">
              <div
                className={`${rounded.large} overflow-hidden ${gradients.glass} p-1 backdrop-blur-sm`}
              >
                <div
                  className={`${rounded.medium} overflow-hidden ${gradients.card} p-4 sm:p-6 md:p-8 flex items-center justify-center`}
                >
                  <div className="text-center">
                    <div
                      className={`w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto mb-3 sm:mb-4 ${rounded.full} bg-gradient-to-br ${profileImage.placeholder.gradient} flex items-center justify-center`}
                    >
                      <span className="text-2xl sm:text-3xl md:text-4xl text-white font-bold">
                        {profileImage.placeholder.initials}
                      </span>
                    </div>
                    <p
                      className={`${karla.className} text-gray-300 text-xs sm:text-sm`}
                    >
                      Your Photo Here
                    </p>
                  </div>
                </div>
              </div>
              {/* Subtle glow effect on hover - disabled on mobile for performance */}
              <div
                className={`absolute inset-0 ${rounded.large} ${gradients.glass} opacity-0 group-hover:opacity-100 ${transitions.default} pointer-events-none hidden md:block`}
              ></div>
            </div>

            {/* Content Container - Mobile Optimized with Scrollable Content */}
            <div className="space-y-4 sm:space-y-6 order-2 md:order-2">
              {/* Dynamic sections from constants - Mobile Optimized */}
              {aboutContent.sections.map((section, index) => (
                <div
                  key={index}
                  className="space-y-2 sm:space-y-3 md:space-y-4"
                >
                  <h3
                    className={`${prompt.className} text-lg sm:text-xl md:text-xl font-semibold ${section.color} text-center md:text-left`}
                  >
                    <span className="inline-block mr-2">{section.icon}</span>
                    {section.title}
                  </h3>
                  <p
                    className={`${karla.className} text-gray-300 leading-relaxed text-sm sm:text-base text-center md:text-left`}
                  >
                    {section.content}
                  </p>
                </div>
              ))}

              {/* Skills Preview - Re-enabled with mobile optimization */}
              {/* <div className="pt-3 sm:pt-4">
                <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center md:justify-start">
                  {aboutContent.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`${karla.className} px-2 sm:px-3 py-1 text-xs bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full text-blue-200 hover:border-blue-400 ${transitions.default} cursor-default`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
