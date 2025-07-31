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
    <section className="relative z-10 flex flex-col items-center px-4 sm:px-8 md:px-16 h-[90vh] sm:h-dvh min-h-[80vh] sm:min-h-screen py-4 sm:py-8 md:py-12 w-full overflow-hidden">
      {/* Header Section */}
      <div className="w-full flex items-center justify-center relative mb-8 sm:mb-12">
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

      {/* Mobile: Fixed Image + Scrollable Content */}
      <div className="w-full flex items-start justify-center flex-1">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
          {/* Mobile Layout: Stacked */}
          <div className="block md:hidden h-[80dvh]">
            {/* Fixed Image Container */}
            <div className="relative group mb-6 sm:mb-8">
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
              {/* Subtle glow effect on hover */}
              <div
                className={`absolute inset-0 ${rounded.large} ${gradients.glass} opacity-0 group-hover:opacity-100 ${transitions.default} pointer-events-none`}
              ></div>
            </div>

            {/* Scrollable Content Container */}
            <div className="space-y-4 sm:space-y-6 h-[70%] overflow-y-scroll scrollbar-hidden">
              {/* Dynamic sections from constants */}
              {aboutContent.sections.map((section, index) => (
                <div
                  key={index}
                  className="space-y-2 sm:space-y-3 md:space-y-4"
                >
                  <h3
                    className={`${prompt.className} text-lg sm:text-xl md:text-xl font-semibold ${section.color} text-center`}
                  >
                    <span className="inline-block mr-2">{section.icon}</span>
                    {section.title}
                  </h3>
                  <p
                    className={`${karla.className} text-gray-300 leading-relaxed text-sm sm:text-base text-center`}
                  >
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Layout: Side by Side */}
          <div className="hidden md:grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-start md:items-center">
            {/* Fixed Image Container */}
            <div className="relative group order-1 md:order-1 flex-shrink-0">
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
              {/* Subtle glow effect on hover */}
              <div
                className={`absolute inset-0 ${rounded.large} ${gradients.glass} opacity-0 group-hover:opacity-100 ${transitions.default} pointer-events-none`}
              ></div>
            </div>

            {/* Content Container */}
            <div className="space-y-4 sm:space-y-6 order-2 md:order-2">
              {/* Dynamic sections from constants */}
              {aboutContent.sections.map((section, index) => (
                <div
                  key={index}
                  className="space-y-2 sm:space-y-3 md:space-y-4"
                >
                  <h3
                    className={`${prompt.className} text-lg sm:text-xl md:text-xl font-semibold text-center ${section.color} `}
                  >
                    <span className="inline-block mr-2">{section.icon}</span>
                    {section.title}
                  </h3>
                  <p
                    className={`${karla.className} text-gray-300 leading-relaxed text-sm sm:text-base text-center`}
                  >
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
